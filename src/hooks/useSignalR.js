import { useState, useEffect, useRef, useCallback } from "react";
import signalRService from "../services/signalRService";

const useSignalR = (userId, messageHandler) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const mountedRef = useRef(false);
  const unsubscribeRef = useRef(null);
  const pendingConversationRef = useRef(null);

  const connect = useCallback(async () => {
    if (!userId || !mountedRef.current) {
      return false;
    }

    try {
      setError(null);
      await signalRService.startConnection();
      setIsConnected(true);

      if (pendingConversationRef.current) {
        joinConversation(pendingConversationRef.current);
      }

      return true;
    } catch (err) {
      console.error("SignalR connection error:", err);
      setError(err.message || "Failed to connect to chat service");
      setIsConnected(false);
      return false;
    }
  }, [userId]);

  const joinConversation = useCallback(
    async (conversationId) => {
      if (!conversationId) {
        return false;
      }

      if (!signalRService.isConnected()) {
        pendingConversationRef.current = conversationId;
        await connect();
        return false;
      }

      try {
        await signalRService.joinConversation(conversationId);
        pendingConversationRef.current = null;
        return true;
      } catch (err) {
        console.error("Error joining conversation:", err);
        return false;
      }
    },
    [connect]
  );

  const sendMessage = useCallback(
    async (conversationId, content, receiverId) => {
      if (!userId || !conversationId || !content) {
        return false;
      }

      if (!signalRService.isConnected()) {
        const connected = await connect();
        if (!connected) {
          return false;
        }
      }

      return await signalRService.sendMessage(
        conversationId,
        userId,
        receiverId,
        content
      );
    },
    [userId, connect]
  );

  useEffect(() => {
    mountedRef.current = true;

    const setupMessageHandler = () => {
      if (messageHandler && typeof messageHandler === "function") {
        unsubscribeRef.current = signalRService.onReceiveMessage((message) => {
          if (!mountedRef.current) return;
          messageHandler(message);
        });
      }
    };
    if (userId) {
      connect().then(() => {
        if (mountedRef.current) {
          setupMessageHandler();
        }
      });
    }

    return () => {
      mountedRef.current = false;

      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [userId, connect, messageHandler]);

  return {
    isConnected,
    error,
    connect,
    joinConversation,
    sendMessage,
    connectionState: signalRService.getConnectionState(),
    disconnect: signalRService.stopConnection,
  };
};

export default useSignalR;
