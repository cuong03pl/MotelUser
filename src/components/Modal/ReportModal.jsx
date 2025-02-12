import React, { useState } from "react";
import { CloseIcon } from "../Icon/Icon";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ReportModal({ onClose, postId }) {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const userId = useSelector((state) => state?.user?.user_id);

  const handleReport = () => {
    axios
      .post(
        "https://localhost:7224/api/Reports",
        {
          reason,
          note,
          postId,
          userId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        onClose();
        setNote("");
        setReason("");
      })
      .catch((err) => {});
  };
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
            <input
              class="mr-2"
              id="scam"
              name="reason"
              type="radio"
              onChange={(e) => setReason(e.target.value)}
              value="Tin có dấu hiệu lừa đảo"
            />
            <label class="text-gray-700" for="scam">
              Tin có dấu hiệu lừa đảo
            </label>
          </div>
          <div class="flex items-center mb-2">
            <input
              class="mr-2"
              id="duplicate"
              name="reason"
              type="radio"
              onChange={(e) => setReason(e.target.value)}
              value="Tin trùng lặp nội dung"
            />
            <label class="text-gray-700" for="duplicate">
              Tin trùng lặp nội dung
            </label>
          </div>
          <div class="flex items-center mb-2">
            <input
              class="mr-2"
              id="unreachable"
              name="reason"
              type="radio"
              onChange={(e) => setReason(e.target.value)}
              value=" Không liên hệ được chủ tin đăng"
            />
            <label class="text-gray-700" for="unreachable">
              Không liên hệ được chủ tin đăng
            </label>
          </div>
          <div class="flex items-center mb-2">
            <input
              class="mr-2"
              id="incorrect"
              name="reason"
              type="radio"
              onChange={(e) => setReason(e.target.value)}
              value="Thông tin không đúng thực tế (giá, diện tích, hình ảnh...)"
            />
            <label class="text-gray-700" for="incorrect">
              Thông tin không đúng thực tế (giá, diện tích, hình ảnh...)
            </label>
          </div>
          <div class="flex items-center mb-2">
            <input
              class="mr-2"
              id="other"
              name="reason"
              type="radio"
              onChange={(e) => setReason(e.target.value)}
              value="Lý do khác"
            />
            <label class="text-gray-700" for="other">
              Lý do khác
            </label>
          </div>
          <textarea
            class="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Mô tả thêm"
            rows="4"
            value={note}
            name="note"
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        <div class="mb-4">
          <button
            onClick={handleReport}
            className="bg-red w-full px-[13px] py-2 rounded-xl text-white"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
