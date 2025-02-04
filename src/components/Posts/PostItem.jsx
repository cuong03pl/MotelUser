import React from "react";
import { Link } from "react-router-dom";
import { convertTime } from "../../utils/convertTime";

export default function PostItem({ data }) {
  console.log(data);

  return (
    <div className="p-3 bg-white rounded-lg shadow-xl">
      <div className="max-h-[260px] h-[260px] w-full">
        <img
          className="w-full h-full object-contain"
          src={`https://localhost:7224/${data?.imageUrls[0]}`}
          alt=""
        />
      </div>
      <div className="">
        <h3 class=" text-uppercase mb-2">
          <Link
            to={`/details/${data?.id}`}
            className=" line-clamp-2 uppercase text-red text-[13px] font-medium py-2"
          >
            {data?.title}
          </Link>
        </h3>
        <div class="mb-2 flex items-center">
          <span class="text-green font-medium  text-[13px]">
            {data?.price} triệu/tháng
          </span>
          <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
          <span className="text-[13px]">
            {data?.area} m<sup>2</sup>
          </span>
          <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
          <Link
            class="text-body text-[13px]"
            title="Cho thuê phòng trọ Quận 12, Hồ Chí Minh"
          >
            {data?.location?.addressLine}, {data?.location?.ward},{" "}
            {data?.location?.district}, {data?.location?.province}
          </Link>
        </div>
        <div className="mb-4 text-[13px] text-[#6C757D] line-clamp-3">
          {data?.description.replace(/<[^>]+>/g, "")}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <img
              className="w-[40px] h-[40px]"
              src="https://phongtro123.com/images/default-user.svg"
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-normal text-[14px]">
                {data?.user?.fullName}
              </span>
              <span className="font-normal text-[12px]">
                {convertTime(data?.createAt)}
              </span>
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <div className="p-2 bg-green text-white text-[12px] rounded-lg">
              {data?.user?.phoneNumber}
            </div>
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
