import React from "react";
import { Link } from "react-router-dom";
import routes from "../../config/routes";

export default function PostsPage() {
  return (
    <div className="px-5 py-2 m-auto my-[100px]  h-screen">
      <div class=" flex justify-start">
        <div className="flex border border-[#c2c0c0] rounded-full py-2 px-4 w-80 ">
          <input
            class="w-full bg-transparent border-none outline-none px-2"
            placeholder="Tìm theo mã tin hoặc tiêu đề"
            type="text"
          />
          <button class="flex items-center text-gray-500">
            <svg
              className="w-[12px] h-[12px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center h-full">
        <img
          alt="Illustration of a person with a magnifying glass and a folder"
          class="mb-4"
          src="https://placehold.co/200x200"
        />
        <p class="text-gray-600">Tìm thấy 0 tin đăng</p>
        <p class="text-gray-600">
          Bấm{" "}
          <Link class="text-blue underline" to={routes.manage_create}>
            vào đây
          </Link>{" "}
          để bắt đầu đăng tin
        </p>
      </div>
    </div>
  );
}
