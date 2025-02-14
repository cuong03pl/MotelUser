import React from "react";

export default function Support() {
  return (
    <div class="bg-white max-w-[1000px] mx-auto p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 mt-5">
      <img
        alt="Illustration of a woman with a headset sitting at a desk with a computer"
        class="w-64 h-64"
        height="300"
        src="https://storage.googleapis.com/a1aa/image/rSPdmJ0QJvCaixzxElpalo4MNSQdLzwzpdKCOl6f23A.jpg"
        width="300"
      />
      <div class="text-center md:text-left">
        <div class="flex items-center justify-center md:justify-start">
          <i class="fas fa-headset text-2xl"></i>
        </div>
        <h2 class="text-2xl font-semibold mb-2">Hỗ trợ chủ nhà </h2>
        <p class="text-gray-600 mb-4">
          Nếu bạn cần hỗ trợ , vui lòng liên hệ số điện thoại bên dưới:
        </p>
        <div class="space-y-4">
          <a
            class=" bg-red text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
            href="tel:0909316890"
          >
            <i class="fas fa-phone-alt"></i>
            <span>ĐT: 0339066926</span>
          </a>
          <a
            class=" bg-blue text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
            href="https://zalo.me/0909316890"
          >
            <i class="fas fa-comment-dots"></i>
            <span>Zalo: 0339066926</span>
          </a>
          <p class="text-gray-600">Hỗ trợ ngoài giờ</p>
          <a
            class=" bg-blue text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
            href="https://zalo.me/Phongtro123"
          >
            <i class="fas fa-comment-dots"></i>
            <span>Zalo: Phongtro456</span>
          </a>
        </div>
      </div>
    </div>
  );
}
