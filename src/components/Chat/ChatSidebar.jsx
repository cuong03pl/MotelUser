import React, { useState } from "react";

const ChatSidebar = ({
  conversations,
  currentConversation,
  onSelectConversation,
  user,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getOtherUser = (conversation) => {
    if (!conversation) return {};

    if (conversation.participants) {
      return (
        conversation.participants?.find(
          (participant) => participant.id !== user?.id
        ) || {}
      );
    } else if (conversation.sender && conversation.receiver) {
      return conversation.sender?.id === user?.id
        ? conversation.receiver
        : conversation.sender;
    }
    return {};
  };

  const formatLastMessageTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) {
      return "Vừa xong";
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} phút trước`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)} giờ trước`;
    } else if (diff < 604800) {
      return `${Math.floor(diff / 86400)} ngày trước`;
    } else {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  const filteredConversations =
    conversations?.filter((conversation) => {
      const otherUser = getOtherUser(conversation);
      return otherUser?.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    }) || [];

  return (
    <div className="w-80 bg-white border-r overflow-hidden flex flex-col">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Tìm kiếm cuộc trò chuyện..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-gray-500 text-center">
            {searchTerm
              ? "Không tìm thấy cuộc trò chuyện."
              : "Chưa có cuộc trò chuyện nào."}
          </div>
        ) : (
          <div>
            {filteredConversations.map((conversation) => {
              const otherUser = getOtherUser(conversation);
              const isActive = currentConversation?.id === conversation.id;
              const hasUnread = conversation.unreadCount > 0;

              return (
                <div
                  key={conversation.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    isActive ? "bg-blue-50" : ""
                  }`}
                  onClick={() => onSelectConversation(conversation)}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gray-300 mr-3 overflow-hidden">
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
                      {otherUser?.isOnline && (
                        <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3
                          className={`font-medium truncate ${
                            hasUnread ? "font-bold" : ""
                          }`}
                        >
                          {otherUser?.fullName || "Người dùng"}
                        </h3>
                        <span className="text-xs text-gray-500 ml-1 whitespace-nowrap">
                          {formatLastMessageTime(conversation.updatedAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p
                          className={`text-sm text-gray-600 truncate ${
                            hasUnread ? "font-semibold text-gray-800" : ""
                          }`}
                        >
                          {conversation.lastMessageContent ||
                            "Chưa có tin nhắn"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
