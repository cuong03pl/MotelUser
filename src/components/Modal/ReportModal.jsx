import React from "react";
import { CloseIcon } from "../Icon/Icon";

export default function ReportModal({ onClose }) {
  return (
    <div className="w-[300px]">
      <div className=" flex items-center justify-between border-b border-[#ccc] pb-3">
        <span className="text-[20px]">Báo cáo</span>
        <span onClick={onClose}>
          <CloseIcon className="w-[20px] h-[20px]" />
        </span>
      </div>
      <div className="mt-5">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">
            Lý do phản ánh:
          </label>
          <div class="flex items-center mb-2">
            <input class="mr-2" id="scam" name="reason" type="radio" />
            <label class="text-gray-700" for="scam">
              Tin có dấu hiệu lừa đảo
            </label>
          </div>
          <div class="flex items-center mb-2">
            <input class="mr-2" id="duplicate" name="reason" type="radio" />
            <label class="text-gray-700" for="duplicate">
              Tin trùng lặp nội dung
            </label>
          </div>
          <div class="flex items-center mb-2">
            <input class="mr-2" id="unreachable" name="reason" type="radio" />
            <label class="text-gray-700" for="unreachable">
              Không liên hệ được chủ tin đăng
            </label>
          </div>
          <div class="flex items-center mb-2">
            <input class="mr-2" id="incorrect" name="reason" type="radio" />
            <label class="text-gray-700" for="incorrect">
              Thông tin không đúng thực tế (giá, diện tích, hình ảnh...)
            </label>
          </div>
          <div class="flex items-center mb-2">
            <input class="mr-2" id="other" name="reason" type="radio" />
            <label class="text-gray-700" for="other">
              Lý do khác
            </label>
          </div>
          <textarea
            class="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Mô tả thêm"
            rows="4"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">
            Thông tin liên hệ
          </label>
          <input
            class="w-full p-2 border border-gray-300 rounded mb-2 outline-none"
            placeholder="Họ tên của bạn"
            type="text"
          />
          <input
            class="w-full p-2 border border-gray-300 rounded mb-2 outline-none"
            placeholder="Số điện thoại của bạn"
            type="text"
          />
        </div>
        <div class="mb-4">
          <button className="bg-red w-full px-[13px] py-2 rounded-xl text-white">
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
