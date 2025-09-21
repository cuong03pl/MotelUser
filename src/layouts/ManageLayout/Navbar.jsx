import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import routes from "../../config/routes";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/user/userSlice";
import {
  CreatePostIcon,
  FolderIcon,
  LogoutIcon,
  ProfileIcon,
} from "../../components/Icon/Icon";

export default function Navbar() {
  const MENU_ITEMS = [
    {
      title: "Đăng tin mới",
      icon: <CreatePostIcon className="w-[18px] h-[18px]" />,
      to: routes.manage_create,
    },
    {
      title: "Danh sách tin đăng",
      icon: <FolderIcon className="w-[18px] h-[18px]" />,
      to: routes.posts,
    },
    {
      title: "Quản lý tài khoản",
      icon: <ProfileIcon className="w-[18px] h-[18px]" />,
      to: routes.profile,
    },
    {
      title: "Đăng Xuất",
      icon: <LogoutIcon className="w-[18px] h-[18px]" />,
      action: () => dispatch(logOut()),
    },
  ];
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user_data?.data);
  const location = useLocation();

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
          {MENU_ITEMS?.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={item?.to}
                  onClick={item?.action}
                  className={`flex items-center gap-3 ${
                    location.pathname.includes(item?.to)
                      ? "text-gray-700"
                      : "text-gray-500 "
                  }`}
                >
                  {item?.icon}
                  <span className="text-[14px] font-medium">{item?.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
