import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  GetConversations,
  GetMessages,
  SendMessage,
  CreateConversation,
  GetConversationById,
} from "../services/fetchAPI";
import ChatSidebar from "../components/Chat/ChatSidebar";
import ChatWindow from "../components/Chat/ChatWindow";
import NewConversation from "../components/Chat/NewConversation";
import { useNavigate, useParams } from "react-router-dom";
import useSignalR from "../hooks/useSignalR";

const ChatPage = () => {
  const user = useSelector((state) => state?.user?.user_data);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageSending, setMessageSending] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Use refs to track mounted state
  const mountedRef = useRef(false);

  // Handle new message from SignalR
  const handleNewMessage = useCallback(
    (message) => {
      if (!mountedRef.current) return;

      //   console.log("[DEBUG] New message received via SignalR:", message);

      // Check if message belongs to current conversation
      if (message.conversationId === currentConversation?.id) {
        // console.log(
        //   `[DEBUG] Message belongs to current conversation: ${currentConversation.id}`
        // );
        setMessages((prevMessages) => {
          // Check if message already exists (avoid duplicates)
          const messageExists = prevMessages.some(
            (msg) =>
              msg.id === message.id ||
              (msg.isTemp &&
                msg.content === message.content &&
                msg.senderId === message.senderId)
          );

          if (!messageExists) {
            // console.log("[DEBUG] Adding new message to display");
            return [...prevMessages, message];
          }
          //   console.log("[DEBUG] Message already exists, not adding duplicate");
          return prevMessages;
        });
      }

      // Update conversation with new message (to show unread indicator)
      setConversations((prevConversations) => {
        if (!prevConversations || prevConversations.length === 0) {
          return prevConversations;
        }

        const updatedConversations = prevConversations.map((conv) =>
          conv.id === message.conversationId
            ? {
                ...conv,
                lastMessageContent: message.content,
                updatedAt: message.timestamp,
                unreadCount:
                  (conv.unreadCount || 0) +
                  (message.senderId !== user?.id ? 1 : 0),
              }
            : conv
        );

        // Sort with newest conversation first
        return updatedConversations.sort(
          (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
        );
      });
    },
    [currentConversation, user]
  );

  // Initialize SignalR with the custom hook
  const {
    isConnected,
    joinConversation,
    sendMessage: sendSignalRMessage,
    error: signalRError,
  } = useSignalR(user?.id, handleNewMessage);

  // Set mounted flag on component mount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Show SignalR errors if any
  useEffect(() => {
    if (signalRError) {
      console.error("SignalR Error:", signalRError);
      // You could display a toast message here
    }
  }, [signalRError]);

  // Join conversation when ID changes
  useEffect(() => {
    // Do nothing if component unmounted or no ID
    if (!mountedRef.current || !id || !user?.id) return;

    const fetchConversation = async () => {
      try {
        setLoading(true);
        const response = await GetConversationById(id);
        console.log(response);

        const convData = response.data;

        setCurrentConversation(convData);

        if (convData?.id && isConnected) {
          await joinConversation(convData.id);
        }
      } catch (error) {
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchConversation();
  }, [id, user?.id, isConnected, joinConversation]);

  // Load conversations list
  useEffect(() => {
    if (!mountedRef.current || !user?.id) return;

    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await GetConversations(user.id);

        if (response && response.data && mountedRef.current) {
          setConversations(response.data);
        }
      } catch (error) {
        console.error("[DEBUG] Error loading conversations list:", error);
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchConversations();
  }, [user?.id]);

  // Load messages for current conversation
  useEffect(() => {
    if (!mountedRef.current || !currentConversation) return;

    const fetchMessages = async () => {
      console.log(
        `[DEBUG] Loading messages for conversation:`,
        currentConversation
      );

      try {
        setLoading(true);
        const response = await GetMessages(currentConversation?.id);

        if (!mountedRef.current) return;

        if (response && response.data) {
          setMessages(response.data);

          // Mark conversation as read when opened
          setConversations((prevConversations) =>
            prevConversations.map((conv) =>
              conv.id === currentConversation.id
                ? { ...conv, unreadCount: 0 }
                : conv
            )
          );
        } else {
          console.log("[DEBUG] No message data returned");
          setMessages([]);
        }
      } catch (error) {
        console.error("[DEBUG] Error loading messages:", error);
        if (mountedRef.current) {
          setMessages([]);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchMessages();

    // Join new conversation group when changing to a new conversation
    if (currentConversation?.id && isConnected) {
      joinConversation(currentConversation.id);
    }
  }, [currentConversation, isConnected, joinConversation]);

  // Handle conversation selection
  const handleSelectConversation = (conversation) => {
    console.log(conversation);

    // console.log("[DEBUG] Selecting conversation:", conversation);
    setCurrentConversation(conversation);
    navigate(`/chat/${conversation?.id}`);
  };

  // Send a message
  const handleSendMessage = async (content) => {
    if (!content.trim() || !currentConversation) return;

    setMessageSending(true);

    try {
      let receiverId = "";
      if (currentConversation.receiver && currentConversation.sender) {
        receiverId =
          currentConversation.sender?.id === user?.id
            ? currentConversation.receiver.id
            : currentConversation.sender.id;
      } else if (currentConversation.participants) {
        const otherUser = currentConversation.participants.find(
          (p) => p.id !== user?.id
        );
        receiverId = otherUser?.id || "";
      }

      // Create temporary message to show immediately in UI
      const tempMessage = {
        id: `temp-${Date.now()}`,
        conversationId: currentConversation.id,
        senderId: user.id,
        receiverId: receiverId,
        content: content,
        timestamp: new Date().toISOString(),
        isRead: false,
        isTemp: true,
      };

      // Add temporary message to UI
      setMessages((prev) => [...prev, tempMessage]);

      // Try to send via SignalR first
      const signalRSent = await sendSignalRMessage(
        currentConversation.id,
        content,
        receiverId
      );

      // If SignalR fails or isn't available, send via API
      if (!signalRSent) {
        // console.log("[DEBUG] SignalR send failed, sending via API");
        const response = await SendMessage({
          conversationId: currentConversation.id,
          senderId: user.id,
          receiverId: receiverId,
          content: content,
        });

        if (response && response.data) {
          // Replace temp message with real one from API
          setMessages((prev) =>
            prev.map((msg) => (msg.id === tempMessage.id ? response.data : msg))
          );
        } else {
          // Mark as failed if API call fails
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempMessage.id ? { ...msg, sendFailed: true } : msg
            )
          );
        }
      }

      // Update conversation list to show last message
      setConversations((prevConversations) => {
        if (!prevConversations) return prevConversations;

        const updatedConversations = prevConversations.map((conv) =>
          conv.id === currentConversation.id
            ? {
                ...conv,
                lastMessageContent: content,
                updatedAt: new Date().toISOString(),
              }
            : conv
        );

        // Sort with newest conversation first
        return updatedConversations.sort(
          (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
        );
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Mark last message as failed
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.isTemp) {
          return prev.map((msg) =>
            msg.id === lastMsg.id ? { ...msg, sendFailed: true } : msg
          );
        }
        return prev;
      });
    } finally {
      setMessageSending(false);
    }
  };

  const handleConversationCreated = async (newConversationData) => {
    try {
      setLoading(true);
      // Refresh conversations list after creating a new one
      const response = await GetConversations(user.id);
      if (response && response.data && mountedRef.current) {
        setConversations(response.data);

        // Navigate to the new conversation if available
        if (newConversationData?.id) {
          navigate(`/chat/${newConversationData.id}`);
        }
      }
    } catch (error) {
      console.error("Error after creating new conversation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[500px] bg-gray-100">
      <ChatSidebar
        conversations={conversations}
        currentConversation={currentConversation}
        onSelectConversation={handleSelectConversation}
        user={user}
      />
      <ChatWindow
        conversation={currentConversation}
        messages={messages}
        onSendMessage={handleSendMessage}
        loading={loading}
        sendingMessage={messageSending}
        user={user}
      />
      <NewConversation
        user={user}
        onConversationCreated={handleConversationCreated}
      />
    </div>
  );
};

export default ChatPage;
