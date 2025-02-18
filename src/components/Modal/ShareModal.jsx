import React from "react";
import { CloseIcon } from "../Icon/Icon";
import { useLocation } from "react-router-dom";

export default function ShareModal({ onClose }) {
  let location = useLocation();
  const fullURL = `${window.location.origin}${location.pathname}${location.search}`;
  // Xử lý copy link url bài viết hiện tại
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullURL);
    } catch (err) {
      console.error("Copy failed!", err);
    }
  };
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
            {fullURL}
          </textarea>
        </div>
        <div className="mt-2">
          <button
            onClick={handleCopy}
            className="bg-red w-full px-[13px] py-2 rounded-xl text-white"
          >
            Sao chép
          </button>
        </div>
      </div>
    </>
  );
}
