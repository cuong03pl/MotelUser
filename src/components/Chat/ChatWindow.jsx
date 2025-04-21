import React, { useRef, useState, useEffect } from "react";

const ChatWindow = ({
  conversation,
  messages,
  onSendMessage,
  user,
  loading,
  sendingMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";

    try {
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (error) {
      return "";
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <p>Chọn một cuộc trò chuyện để bắt đầu nhắn tin</p>
        </div>
      </div>
    );
  }

  let otherUser = {};

  if (conversation.participants) {
    otherUser =
      conversation.participants?.find(
        (participant) => participant.id !== user?.id
      ) || {};
  } else if (conversation.sender && conversation.receiver) {
    otherUser =
      conversation.sender?.id === user?.id
        ? conversation.receiver
        : conversation.sender;
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="bg-white border-b px-4 py-3 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
          {otherUser?.avatar ? (
            <img
              src={otherUser.avatar}
              alt={otherUser.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              {otherUser?.fullName?.charAt(0) || "?"}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium">{otherUser?.fullName || "Người dùng"}</h3>
          {otherUser?.isOnline && (
            <span className="text-xs text-gray-500 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Đang hoạt động
            </span>
          )}
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto px-6 py-5 bg-gray-50"
        ref={messagesContainerRef}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : !messages || messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            Chưa có tin nhắn. Hãy gửi tin nhắn đầu tiên!
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message, index) => {
              if (!message) return null;
              const isCurrentUser = message.senderId === user?.id;
              const messageTime = message.timestamp || message.createdAt;

              // Show date separator when date changes
              const showDateSeparator =
                index === 0 ||
                new Date(messageTime).toDateString() !==
                  new Date(
                    messages[index - 1]?.timestamp ||
                      messages[index - 1]?.createdAt
                  ).toDateString();

              return (
                <React.Fragment key={message.id || `msg-${index}`}>
                  {showDateSeparator && (
                    <div className="flex justify-center mb-2">
                      <div className="bg-gray-100 text-gray-500 text-xs rounded-full px-3 py-1">
                        {new Date(messageTime).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  <div
                    className={`flex ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-lg ${
                        isCurrentUser
                          ? "bg-blue !text-white rounded-br-none"
                          : "bg-white !text-gray-800 rounded-bl-none border"
                      }`}
                    >
                      <div className="break-words">{message.content}</div>
                      <div
                        className={`text-xs mt-1 flex items-center ${
                          isCurrentUser ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        <span>{formatMessageTime(messageTime)}</span>

                        {isCurrentUser && (
                          <span className="ml-2 flex items-center">
                            {message.isTemp && !message.sendFailed && (
                              <span className="text-xs mr-1">Đang gửi</span>
                            )}
                            {!message.isTemp &&
                              message.isRead !== undefined && (
                                <span className="text-xs mr-1">
                                  {message.isRead ? "Đã xem" : "Đã gửi"}
                                </span>
                              )}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                          </span>
                        )}
                      </div>

                      {message.sendFailed && (
                        <div className="text-xs text-red-400 mt-1 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          <span>Không gửi được!</span>
                          <button
                            className="ml-2 underline hover:text-red-300"
                            onClick={() => onSendMessage(message.content)}
                          >
                            Thử lại
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t p-3">
        <form onSubmit={handleSend} className="flex items-center">
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={sendingMessage}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sendingMessage}
            className={`ml-2 rounded-full p-2 ${
              newMessage.trim() && !sendingMessage
                ? "bg-blue hover:bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {sendingMessage ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
