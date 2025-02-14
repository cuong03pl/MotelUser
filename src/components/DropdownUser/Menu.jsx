import React from "react";
import { LogoutIcon, ProfileIcon } from "../Icon/Icon";
import { Link } from "react-router-dom";

const handleLogout = () => {};
const MENU_ITEMS = [
  {
    title: "Đổi thông tin",
    icon: <ProfileIcon className="w-4 h-4" />,
    to: "/manage/profile",
  },
  {
    title: "Đăng xuất",
    icon: <LogoutIcon className="w-4 h-4" />,
    onClick: handleLogout,
  },
];

export default function Menu() {
  return (
    <ul className="bg-white px-4 py-2 shadow-lg rounded-lg border border-gray-200">
      {MENU_ITEMS?.map((item, index) => (
        <Link
          to={item?.to}
          onClick={item?.onClick}
          key={index}
          className="px-3 py-2 hover:bg-gray-100 rounded transition duration-200 cursor-pointer flex gap-2 items-center"
        >
          <span>{item.icon}</span>
          {item.title}
        </Link>
      ))}
    </ul>
  );
}
