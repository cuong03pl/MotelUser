import React from "react";
import { Link } from "react-router-dom";

export default function RecentPosts() {
  return (
    <div className="mb-4">
      <div className="mb-2 font-medium">Tin mới đăng</div>
      <div className="flex items-center gap-2">
        <div className="flex gap-2 items-center">
          <img
            className="w-[80px] h-[80px] rounded-lg"
            src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2025/01/23/img-8754_1737636803.jpg"
            alt=""
          />
          <div className="">
            <Link className="text-[13px] text-[#055699] line-clamp-2">
              Cho thuê căn hộ ngay trung tâm quận hải châu.
            </Link>
            <div className="flex items-center justify-between mt-2">
              <span class="text-green font-medium  text-[12px]">
                5 triệu/tháng
              </span>
              <span className="text-[10px]">50 phút trước</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
