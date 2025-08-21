import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import routes from "../config/routes";
import { useSelector } from "react-redux";
import DropdownUser from "./DropdownUser/DropdownUser";
import { 
  FilterIcon, 
  MobileCloseIcon, 
  HeartIcon, 
  PostsIcon, 
  ManageIcon, 
  ChatIcon, 
  MenuIcon 
} from "./Icon/Icon";
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
            <MobileCloseIcon className="w-3.5 h-3.5 fill-black" />
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
              <HeartIcon className="w-[16px] h-[16px]" />
              <Link to={routes.favourite} className="text-[14px]">
                Tin đã lưu
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <PostsIcon className="w-[16px] h-[16px]" />
              <Link to={routes.posts} className="text-[14px]">
                Tin đã đăng
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <ManageIcon className="w-[16px] h-[16px]" />
              <Link to={routes.manage_create} className="text-[14px]">
                Quản lý
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <ChatIcon className="w-[16px] h-[16px]" />
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
                <MenuIcon className="w-7 h-7" />
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
