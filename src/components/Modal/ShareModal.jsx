import React from "react";
import { CloseIcon } from "../Icon/Icon";

export default function ShareModal({ onClose }) {
  return (
    <>
      <div className="w-[300px] flex items-center justify-between border-b border-[#ccc] pb-3">
        <span className="text-[20px]">Chia sẻ</span>
        <span onClick={onClose}>
          <CloseIcon className="w-[20px] h-[20px]" />
        </span>
      </div>
      <div className="mt-5">
        <div className="mb-2">Chia sẻ đường dẫn tin đăng</div>
        <div className="border-[#ccc] border px-2 py-2">
          <textarea className="w-full text-[13px]" name="" id="" rows={3}>
            https://phongtro123.com/tinh-thanh/ho-chi-minh/can-ho-mini-ban-cong-cao-cap-30m-doi-dien-etown-cong-hoa-than-nhan-trung.html
          </textarea>
        </div>
        <div className="mt-2">
          <button className="bg-red w-full px-[13px] py-2 rounded-xl text-white">
            Sao chép
          </button>
        </div>
      </div>
    </>
  );
}
