import React from "react";
import { Link } from "react-router-dom";
import routes from "../../config/routes";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/user/userSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user_data);

  return (
    <div class="bg-white p-4 h-screen fixed mt-[48px] w-[250px]">
      <div class="flex flex-col items-center">
        <img
          alt="User profile picture"
          class="rounded-full mb-2"
          height="100"
          src={user?.avatar}
          width="100"
        />
        <div class="text-center">
          <p class="font-semibold">{user?.fullName}</p>
          <p class="text-gray-500">{user?.phoneNumber}</p>
        </div>
      </div>
      <div class="mt-6">
        <ul class="space-y-4">
          <li>
            <Link
              to={routes.manage_create}
              className="flex items-center text-gray-700 gap-3"
            >
              <svg
                className="w-[18px] h-[18px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#000000"
                  d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"
                />
              </svg>
              <span className="text-[14px] font-bold">Đăng tin mới</span>
            </Link>
          </li>
          <li>
            <Link
              to={routes.posts}
              className="flex items-center text-gray-700 gap-3"
            >
              <svg
                className="w-[18px] h-[18px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M0 96C0 60.7 28.7 32 64 32l132.1 0c19.1 0 37.4 7.6 50.9 21.1L289.9 96 448 96c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-256c0-8.8-7.2-16-16-16l-161.4 0c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7L64 80z" />
              </svg>
              <span className="text-[14px]">Danh sách tin đăng</span>
            </Link>
          </li>
          <li>
            <Link
              to={routes.profile}
              className="flex items-center text-gray-700 gap-3"
            >
              <svg
                className="w-[18px] h-[18px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
              </svg>
              <span className="text-[14px]">Quản lý tài khoản</span>
            </Link>
          </li>
          <li
            onClick={() => dispatch(logOut())}
            class="flex items-center text-gray-700 gap-3 cursor-pointer"
          >
            <svg
              className="w-[18px] h-[18px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
            </svg>
            <span className="text-[14px]">Đăng xuất</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
