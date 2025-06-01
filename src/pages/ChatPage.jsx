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

  const mountedRef = useRef(false);

  const handleNewMessage = useCallback(
    (message) => {
      if (!mountedRef.current) return;

      if (message.conversationId === currentConversation?.id) {
        setMessages((prevMessages) => {
          const messageExists = prevMessages.some(
            (msg) =>
              msg.id === message.id ||
              (msg.isTemp &&
                msg.content === message.content &&
                msg.senderId === message.senderId)
          );

          if (!messageExists) {
            return [...prevMessages, message];
          }
          return prevMessages;
        });
      }

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

        return updatedConversations.sort(
          (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
        );
      });
    },
    [currentConversation, user]
  );

  const {
    isConnected,
    joinConversation,
    sendMessage: sendSignalRMessage,
    error: signalRError,
  } = useSignalR(user?.id, handleNewMessage);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (signalRError) {
      console.error("SignalR Error:", signalRError);
    }
  }, [signalRError]);

  useEffect(() => {
    if (!mountedRef.current || !id || !user?.id) return;

    const fetchConversation = async () => {
      try {
        setLoading(true);
        const response = await GetConversationById(id);

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

  useEffect(() => {
    if (!mountedRef.current || !currentConversation) return;

    const fetchMessages = async () => {
     

      try {
        setLoading(true);
        const response = await GetMessages(currentConversation?.id);

        if (!mountedRef.current) return;

        if (response && response.data) {
          setMessages(response.data);

          setConversations((prevConversations) =>
            prevConversations.map((conv) =>
              conv.id === currentConversation.id
                ? { ...conv, unreadCount: 0 }
                : conv
            )
          );
        } else {
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

    if (currentConversation?.id && isConnected) {
      joinConversation(currentConversation.id);
    }
  }, [currentConversation, isConnected, joinConversation]);

  const handleSelectConversation = (conversation) => {

    setCurrentConversation(conversation);
    navigate(`/chat/${conversation?.id}`);
  };

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

      setMessages((prev) => [...prev, tempMessage]);

      const signalRSent = await sendSignalRMessage(
        currentConversation.id,
        content,
        receiverId
      );

      if (!signalRSent) {
        const response = await SendMessage({
          conversationId: currentConversation.id,
          senderId: user.id,
          receiverId: receiverId,
          content: content,
        });

        if (response && response.data) {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === tempMessage.id ? response.data : msg))
          );
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempMessage.id ? { ...msg, sendFailed: true } : msg
            )
          );
        }
      }

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

        return updatedConversations.sort(
          (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
        );
      });
    } catch (error) {
      console.error("Error sending message:", error);
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
      const response = await GetConversations(user.id);
      if (response && response.data && mountedRef.current) {
        setConversations(response.data);

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
