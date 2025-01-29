import React from "react";

export default function ProfilePage() {
  return (
    <div className="max-w-[1000px] m-auto my-[100px] flex flex-col items-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-[600px]">
        <div class="flex items-center mb-6">
          <img
            alt="Profile picture placeholder"
            class="w-16 h-16 rounded-full mr-4"
            height="64"
            src="https://storage.googleapis.com/a1aa/image/jnSAZiKxxyJUGpRx9cC2OJA2U6sqnsr51yhgmHEiXjIzSQCF.jpg"
            width="64"
          />
          <div>
            <h2 class="text-xl font-semibold">Hoàng Kim Cường</h2>
            <p class="text-gray-600">0523674507</p>
          </div>
        </div>
        <button class="flex items-center justify-center w-full py-2 mb-6 border border-gray-300 rounded-lg text-gray-700">
          <i class="fas fa-camera mr-2"></i>
          Đổi ảnh đại diện
        </button>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700">Số điện thoại</label>
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              type="text"
              value="0523674507"
            />
          </div>
          <div>
            <label class="block text-gray-700">Tên liên hệ</label>
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              type="text"
              value="Hoàng Kim Cường"
            />
          </div>
          <div>
            <label class="block text-gray-700">Email</label>
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              type="text"
              value="-"
            />
          </div>
          <div>
            <label class="block text-gray-700">Mật khẩu</label>
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              type="password"
              value="********"
            />
          </div>
        </div>
        <button class="w-full py-3 mt-6 text-white bg-red rounded-lg">
          Cập nhật
        </button>
      </div>
    </div>
  );
}
