import React, { useState, useEffect } from 'react';
import { GetAllUsers } from '../../services/fetchAPI';

const NewConversation = ({ user, onConversationCreated }) => {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState('');

    // Tải danh sách người dùng từ API khi modal mở
    useEffect(() => {
        if (showModal) {
            fetchUsers();
        }
    }, [showModal]);

    // Lấy danh sách người dùng từ API
    const fetchUsers = async () => {
        try {
            setSearchLoading(true);
            // Đây là nơi bạn sẽ gọi API để lấy danh sách người dùng
            // Giả sử GetAllUsers đã được định nghĩa trong fetchAPI.js
            const response = await GetAllUsers();
            if (response && response.data) {
                // Lọc ra những người dùng khác với người dùng hiện tại
                const filteredUsers = response.data.filter(u => u.id !== user?.id);
                setAllUsers(filteredUsers);
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách người dùng:", error);
            setError("Không thể tải danh sách người dùng");
        } finally {
            setSearchLoading(false);
        }
    };

    // Lọc người dùng theo từ khóa tìm kiếm
    useEffect(() => {
        if (searchTerm) {
            const filtered = allUsers.filter(user =>
                user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setUsers(filtered);
        } else {
            setUsers([]);
        }
    }, [searchTerm, allUsers]);

    const handleCreateConversation = async () => {
        if (!selectedUser) return;

        try {
            setLoading(true);
            setError('');

            // Gọi callback để tạo cuộc trò chuyện mới (1-1)
            await onConversationCreated({
                recipientId: selectedUser.id,
            });

            // Đóng modal
            setShowModal(false);
            setSelectedUser(null);
            setSearchTerm('');
        } catch (error) {
            console.error('Error creating conversation:', error);
            setError('Không thể tạo cuộc trò chuyện. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                </svg>
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-medium">Tạo cuộc trò chuyện mới</h3>
                            <p className="text-sm text-gray-500">Chỉ hỗ trợ nhắn tin 1-1</p>
                        </div>

                        <div className="p-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tìm người dùng
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập tên người dùng..."
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {searchLoading ? (
                                <div className="flex justify-center py-4">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
                                <>
                                    {users.length > 0 && (
                                        <div className="mb-4 max-h-60 overflow-y-auto border rounded">
                                            {users.map(userItem => (
                                                <div
                                                    key={userItem.id}
                                                    onClick={() => setSelectedUser(userItem)}
                                                    className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center ${selectedUser?.id === userItem.id ? 'bg-blue-50' : ''
                                                        }`}
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                                                        {userItem.avatar ? (
                                                            <img
                                                                src={userItem.avatar}
                                                                alt={userItem.fullName}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                                {userItem.fullName?.charAt(0) || '?'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{userItem.fullName}</h4>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {searchTerm && users.length === 0 && (
                                        <p className="text-sm text-gray-500 mb-4">Không tìm thấy người dùng nào</p>
                                    )}
                                </>
                            )}

                            {selectedUser && (
                                <div className="mb-4 p-3 bg-blue-50 rounded flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                                        {selectedUser.avatar ? (
                                            <img
                                                src={selectedUser.avatar}
                                                alt={selectedUser.fullName}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                {selectedUser.fullName?.charAt(0) || '?'}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium">{selectedUser.fullName}</h4>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="mb-4 p-2 bg-red-50 text-red-600 rounded text-sm">
                                    {error}
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedUser(null);
                                    setSearchTerm('');
                                }}
                                className="px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleCreateConversation}
                                disabled={!selectedUser || loading}
                                className={`px-4 py-2 rounded ${!selectedUser || loading
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                            >
                                {loading ? 'Đang tạo...' : 'Tạo'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewConversation; 