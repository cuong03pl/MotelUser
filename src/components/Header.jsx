import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import routes from "../config/routes";
import { useSelector } from "react-redux";
import DropdownUser from "./DropdownUser/DropdownUser";
import { FilterIcon } from "./Icon/Icon";
import CustomModal from "./Modal/Modal";
import FilterModal from "./Modal/FilterModal";
import { GetCategories } from "../services/fetchAPI";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state?.user?.user_data);
  const token = useSelector((state) => state?.user?.user_token);
  const { slug } = useParams();
  const isLoggedIn = !!user || !!token;

  // Lấy ra các danh mục
  useEffect(() => {
    const fetchAPI = async () => {
      await GetCategories().then((res) => {
        setCategories(res.data);
      });
    };
    fetchAPI();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 right-0 left-0 border-b px-4 sm:px-10 bg-white font-sans min-h-[70px] max-h-[120px] tracking-wide z-[9999]">
      <div className="max-w-[1200px] flex flex-wrap items-center gap-4 w-full mx-auto h-[60px]">
        <Link to={"/"}>
          <img
            alt="Phongtro123.com logo"
            className="h-8"
            height="50"
            src="https://static.chotot.com/storage/APP_WRAPPER/logo/pty-logo-appwrapper.png"
            width="150"
          />
        </Link>

        <div
          id="collapseMenu"
          className="lg:!flex lg:flex-auto max-lg:hidden max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 fill-black"
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

          <div className="lg:!flex lg:flex-auto items-center max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <ul className="lg:flex items-center lg:gap-x-8 max-lg:space-y-2">
              <li className=" hidden max-lg:block">
                <a href="javascript:void(0)">
                  <img
                    src="https://readymadeui.com/readymadeui.svg"
                    alt="logo"
                    className="w-36"
                  />
                </a>
              </li>
              <li className="  max-lg:block">
                <button
                  onClick={handleOpenModal}
                  className="flex items-center gap-2 border border-[#ddd] rounded-3xl px-[10px] py-[5px]"
                >
                  <FilterIcon className="w-[20px] h-[20px]" />
                  <span> Bộ lọc</span>
                </button>
              </li>
              <li>
                <Link
                  to={routes.compare}
                  className="hover:text-[#007bff] text-black block font-medium text-[15px]"
                >
                  So sánh
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {!isLoggedIn && (
          <ul className="lg:flex lg:items-center ml-auto max-lg:block lg:space-x-2">
            <li className="max-lg:border-b max-lg:py-3 max-lg:mt-2 w-[100px] h-[40px]">
              <Link
                to={routes.register}
                className="text-[15px] w-full h-full flex items-center justify-center bg-blue text-white rounded-lg font-medium"
              >
                Đăng kí
              </Link>
            </li>

            <li className="max-lg:border-b max-lg:py-3 max-lg:mt-2 w-[100px] h-[40px]">
              <Link
                to={"/login"}
                className="text-[15px] w-full h-full flex items-center justify-center bg-[#e5193b] text-white rounded-lg font-medium"
              >
                Đăng nhập
              </Link>
            </li>
          </ul>
        )}
        {isLoggedIn && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-[16px] h-[16px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <Link to={routes.favourite} className="text-[14px]">
                Tin đã lưu
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-[16px] h-[16px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64l241.9 0c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5 608 384c0 35.3-28.7 64-64 64l-241.9 0c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5 32 128c0-35.3 28.7-64 64-64zm64 64l-64 0 0 64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64l64 0 0-64zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" />
              </svg>
              <Link to={routes.posts} className="text-[14px]">
                Tin đã đăng
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.28571 2C5.14907 2 4.05898 2.45153 3.25526 3.25526C2.45153 4.05898 2 5.14907 2 6.28571V17.7143C2 18.8509 2.45153 19.941 3.25526 20.7447C4.05898 21.5485 5.14907 22 6.28571 22H17.7143C18.8509 22 19.941 21.5485 20.7447 20.7447C21.5485 19.941 22 18.8509 22 17.7143V6.28571C22 5.14907 21.5485 4.05898 20.7447 3.25526C19.941 2.45153 18.8509 2 17.7143 2H6.28571ZM3.42857 6.28571C3.42857 5.52795 3.72959 4.80123 4.26541 4.26541C4.80123 3.72959 5.52795 3.42857 6.28571 3.42857H17.7143C18.472 3.42857 19.1988 3.72959 19.7346 4.26541C20.2704 4.80123 20.5714 5.52795 20.5714 6.28571V17.7143C20.5714 18.472 20.2704 19.1988 19.7346 19.7346C19.1988 20.2704 18.472 20.5714 17.7143 20.5714H6.28571C5.52795 20.5714 4.80123 20.2704 4.26541 19.7346C3.72959 19.1988 3.42857 18.472 3.42857 17.7143V6.28571Z" fill="currentColor"></path><rect x="6" y="7" width="3" height="3" rx="1.5" fill="currentColor"></rect><path d="M12 8.5C12 8.08579 12.3358 7.75 12.75 7.75H17.25C17.6642 7.75 18 8.08579 18 8.5C18 8.91421 17.6642 9.25 17.25 9.25H12.75C12.3358 9.25 12 8.91421 12 8.5Z" fill="currentColor"></path><rect x="6" y="14" width="3" height="3" rx="1.5" fill="currentColor"></rect><path d="M12 15.5C12 15.0858 12.3358 14.75 12.75 14.75H17.25C17.6642 14.75 18 15.0858 18 15.5C18 15.9142 17.6642 16.25 17.25 16.25H12.75C12.3358 16.25 12 15.9142 12 15.5Z" fill="currentColor"></path></svg>
              <Link to={routes.manage_create} className="text-[14px]">
                Quản lý
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[16px] h-[16px]"
              >
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
              </svg>
              <Link to={routes.chat} className="text-[14px]">
                Tin nhắn
              </Link>
            </div>
            <DropdownUser user={user} />
            <li>
              <Link
                to={"/manage/create"}
                className="px-4 py-2 text-sm rounded font-semibold text-white bg-[#fa6819] transition-all ease-in-out duration-300 hover:bg-opacity-75"
              >
                Đăng bài
              </Link>
              <button id="toggleOpen" className="lg:hidden">
                <svg
                  className="w-7 h-7"
                  fill="#000"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </div>
        )}
      </div>
      <div className="border-t border-solid border-[#ccc]">
        <ul className=" flex justify-center items-center gap-5">
          {categories?.map((category, index) => {
            return (
              <li
                key={index}
                className={`hover:text-[#E51F40]  cursor-pointer ${slug && (slug?.includes(category?.slug) ? "text-red" : "")
                  }`}
              >
                <Link
                  className="py-4 px-2 block"
                  to={`/category/${category?.slug}`}
                >
                  {category?.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <CustomModal
        content={<FilterModal onClose={handleOpenModal} />}
        isOpen={isModalOpen}
        onClose={handleOpenModal}
      />
    </header>
  );
}
