import * as signalR from "@microsoft/signalr";

class SignalRService {
  constructor() {
    this.connection = null;
    this.connectionPromise = null;
    this.messageCallbacks = [];
    this.joinedConversations = [];
    this.isConnecting = false;
    this.isDisconnecting = false;
    this.retryCount = 0;
  }

  isConnected() {
    return (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Connected
    );
  }

  getConnectionState() {
    return this.connection ? this.connection.state : "No connection";
  }

  getDebugInfo() {
    return {
      connectionState: this.getConnectionState(),
      isConnecting: this.isConnecting,
      isDisconnecting: this.isDisconnecting,
      joinedConversations: [...this.joinedConversations],
      callbackCount: this.messageCallbacks.length,
      connectionId: this.connection?.connectionId || "none",
    };
  }

  async startConnection() {
    this.logConnectionStatus();

    if (this.isConnecting && this.connectionPromise) {
      return this.connectionPromise;
    }

    if (this.isDisconnecting) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (this.isDisconnecting) {
        throw new Error("Cannot connect while disconnecting");
      }
    }

    if (this.isConnected()) {
      return this.connectionPromise;
    }

    if (this.connection) {
      try {
        this.isDisconnecting = true;
        await this.connection.stop();
        this.isDisconnecting = false;
      } catch (err) {
        console.warn("Error stopping old connection:", err);
        this.isDisconnecting = false;
      }
      this.connection = null;
      this.connectionPromise = null;
    }

    this.isConnecting = true;
    this.retryCount++;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_URL}/chatHub`)
      .withAutomaticReconnect([0, 2000, 5000, 10000, 15000, 30000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.onreconnected((connectionId) => {
      this.joinedConversations.forEach((convId) => {
        this.joinConversation(convId).catch((err) =>
          console.error(`Failed to rejoin conversation ${convId}:`, err)
        );
      });
    });

    this.connection.on(
      "ReceiveMessage",
      (senderId, content, conversationId, timestamp, messageId) => {
        const message = {
          id: messageId || `server-${Date.now()}`,
          senderId: senderId,
          content: content,
          conversationId: conversationId,
          timestamp: timestamp || new Date().toISOString(),
          isRead: false,
        };

        this.messageCallbacks.forEach((callback) => callback(message));
      }
    );

    this.connection.on(
      "UserJoinedConversation",
      (connectionId, conversationId) => {}
    );

    this.connectionPromise = this.connection
      .start()
      .then(() => {
        if (this.joinedConversations.length > 0) {
          this.joinedConversations.forEach((convId) => {
            this.joinConversation(convId).catch((err) => {
              console.error(`Failed to auto-join conversation ${convId}:`, err);
            });
          });
        }

        this.isConnecting = false;
        this.logConnectionStatus();
        return this.connection;
      })
      .catch((err) => {
        console.error("SignalR Connection Error: ", err);
        this.connection = null;
        this.connectionPromise = null;
        this.isConnecting = false;
        this.logConnectionStatus();
        throw err;
      });

    return this.connectionPromise;
  }

  onReceiveMessage(callback) {
    if (this.messageCallbacks.includes(callback)) {
      return () => {
        this.messageCallbacks = this.messageCallbacks.filter(
          (cb) => cb !== callback
        );
      };
    }

    this.messageCallbacks.push(callback);

    if (!this.isConnected()) {
      this.startConnection().catch((err) => {
        console.error(
          "Failed to establish connection after registering callback:",
          err
        );
      });
    }

    return () => {
      this.messageCallbacks = this.messageCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }

  async joinConversation(conversationId) {
    if (!conversationId) {
      console.error("Cannot join conversation: No conversation ID provided");
      return false;
    }

    const conversationIdStr = String(conversationId);

    if (this.joinedConversations.includes(conversationIdStr)) {
      return true;
    }

    if (!this.connection) {
      console.error(
        "Cannot join conversation: SignalR connection not established"
      );
      try {
        await this.startConnection();
      } catch (err) {
        console.error("Failed to establish connection before joining:", err);
        throw new Error("SignalR connection not established");
      }
    }

    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      console.warn(
        `Connection not in Connected state (${this.connection.state}). Trying to reconnect...`
      );
      try {
        await this.connection.start();
      } catch (err) {
        console.error("Failed to reconnect before joining conversation:", err);
        throw new Error("Failed to reconnect");
      }
    }

    let retries = 0;
    while (
      this.connection.state !== signalR.HubConnectionState.Connected &&
      retries < 3
    ) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      retries++;
    }

    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      console.error(
        `Connection not ready after ${retries} retries. Current state: ${this.connection.state}`
      );
      throw new Error("Connection not in ready state");
    }

    try {
      await this.connection.invoke("JoinConversation", conversationIdStr);

      if (!this.joinedConversations.includes(conversationIdStr)) {
        this.joinedConversations.push(conversationIdStr);
      }

      return true;
    } catch (err) {
      console.error(`Error joining conversation ${conversationIdStr}:`, err);
      try {
        await this.connection.invoke("JoinConversation", conversationIdStr);

        if (!this.joinedConversations.includes(conversationIdStr)) {
          this.joinedConversations.push(conversationIdStr);
        }

        return true;
      } catch (retryErr) {
        console.error(
          `Failed to join conversation even after retry: ${conversationIdStr}`,
          retryErr
        );
        throw err;
      }
    }
  }

  async sendMessage(conversationId, senderId, receiverId, content) {
    if (!this.isConnected()) {
      console.error("Cannot send message: Not connected to SignalR hub");
      await this.startConnection();
    }

    try {
      await this.connection.invoke(
        "SendMessageToConversation",
        senderId,
        receiverId,
        conversationId,
        content
      );

      return true;
    } catch (err) {
      console.error("Error sending message via SignalR:", err);
      return false;
    }
  }

  async stopConnection() {
    if (this.isDisconnecting) {
      return;
    }

    if (this.connection) {
      this.isDisconnecting = true;
      this.joinedConversations = [];
      try {
        await this.connection.stop();
      } catch (err) {
        console.error("Error disconnecting SignalR:", err);
      } finally {
        this.connection = null;
        this.connectionPromise = null;
        this.isDisconnecting = false;
      }
    } else {
    }
  }
}

const signalRService = new SignalRService();
export default signalRService;
