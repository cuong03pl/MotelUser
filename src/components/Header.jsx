import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../config/routes";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import DropdownUser from "./DropdownUser/DropdownUser";
import { setUserId } from "../features/user/userSlice";
export default function Header() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.user_token);
  useEffect(() => {
    const fetchAPI = async () => {
      const user_data = jwtDecode(token);
      dispatch(setUserId(user_data?.sub));
      await axios
        .get(`https://localhost:7224/api/Users/${user_data?.sub}`)
        .then((res) => {
          setUser(res.data);
        });
    };
    if (token) {
      fetchAPI();
    }
  }, [token]);
  return (
    <header class=" border-b px-4 sm:px-10 bg-white font-sans min-h-[70px] tracking-wide relative z-50">
      <div class="flex flex-wrap items-center gap-4 w-full max-w-6xl mx-auto h-[60px]">
        <Link to={"/"} class="max-sm:hidden">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            class="w-36"
          />
        </Link>
        <Link to={"/"} class="hidden max-sm:block">
          <img
            src="https://readymadeui.com/readymadeui-short.svg"
            alt="logo"
            class="w-9"
          />
        </Link>

        <div
          id="collapseMenu"
          class="lg:!flex lg:flex-auto lg:ml-12 max-lg:hidden max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            class="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>

          <div class="lg:!flex lg:flex-auto max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <ul class="lg:flex lg:gap-x-8 max-lg:space-y-2">
              <li class="mb-6 hidden max-lg:block">
                <a href="javascript:void(0)">
                  <img
                    src="https://readymadeui.com/readymadeui.svg"
                    alt="logo"
                    class="w-36"
                  />
                </a>
              </li>
              <li class="max-lg:border-b max-lg:py-3">
                <a
                  href="javascript:void(0)"
                  class="hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]"
                >
                  Home
                </a>
              </li>
              <li class="max-lg:border-b max-lg:py-3">
                <a
                  href="javascript:void(0)"
                  class="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
                >
                  Shop
                </a>
              </li>
              <li class="max-lg:border-b max-lg:py-3">
                <a
                  href="javascript:void(0)"
                  class="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
                >
                  Sale
                </a>
              </li>
              <li class="max-lg:border-b max-lg:py-3">
                <a
                  href="javascript:void(0)"
                  class="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
                >
                  Manage
                </a>
              </li>
            </ul>
          </div>
        </div>

        {!user && (
          <ul class="lg:flex lg:items-center ml-auto max-lg:block lg:space-x-8">
            <li class="max-lg:border-b max-lg:py-3 max-lg:mt-2">
              <Link
                to={routes.register}
                class="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
              >
                Sign Up
              </Link>
            </li>

            <li>
              <Link
                to={"/login"}
                class="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to={"/manage/create"}
                class="px-4 py-2 text-sm rounded font-semibold text-white border-2 border-[#1d294f] bg-[#1d294f] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#1d294f]"
              >
                Đăng bài
              </Link>
              <button id="toggleOpen" class="lg:hidden">
                <svg
                  class="w-7 h-7"
                  fill="#000"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        )}
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-[16px] h-[16px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <Link to={""} className="text-[14px]">
                Tin đã lưu
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <svg
                class="w-[16px] h-[16px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                stroke="currentColor"
              >
                <path d="M0 96C0 60.7 28.7 32 64 32l132.1 0c19.1 0 37.4 7.6 50.9 21.1L289.9 96 448 96c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-256c0-8.8-7.2-16-16-16l-161.4 0c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7L64 80z" />
              </svg>
              <Link to={routes.manage_create} className="text-[14px]">
                Quản lý
              </Link>
            </div>
            <DropdownUser user={user} />
          </div>
        )}
      </div>
      <div className="border-t border-solid border-[#ccc]">
        <ul className=" flex justify-center items-center gap-5">
          <li className="hover:text-[#E51F40]  cursor-pointer">
            <Link className="py-4 px-2 block" to={"/"}>
              Phòng trọ
            </Link>
          </li>
          <li className="hover:text-[#E51F40]  cursor-pointer">
            <Link className="py-4 px-2 block" to={"/"}>
              Phòng trọ
            </Link>
          </li>
          <li className="hover:text-[#E51F40]  cursor-pointer">
            <Link className="py-4 px-2 block" to={"/"}>
              Phòng trọ
            </Link>
          </li>
          <li className="hover:text-[#E51F40]  cursor-pointer">
            <Link className="py-4 px-2 block" to={"/"}>
              Phòng trọ
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
