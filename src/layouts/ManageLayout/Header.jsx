import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const user = useSelector((state) => state?.user?.user_data?.data);

  return (
    <nav class="bg-blue text-white py-2 fixed w-full h-[48px] z-99999">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <Link to={"/"}>
            <img
              alt="Phongtro123.com logo"
              class="h-8"
              height="50"
              src="https://phongtro123.com/images/logo-phongtro-white.svg"
              width="150"
            />
          </Link>
        </div>
        <div class="flex items-center space-x-6 text-sm"></div>
        <div class="flex items-center space-x-4 text-sm">
          <div class="flex items-center space-x-1">
            <img
              alt="User avatar"
              class="h-6 w-6 rounded-full"
              height="30"
              src={user?.avatar}
              width="30"
            />
            <span>{user?.fullName}</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <Link
            class="bg-red text-white px-3 py-1 rounded hover:bg-red-700"
            to={"/manage/create"}
          >
            Đăng tin
          </Link>
        </div>
      </div>
    </nav>
  );
}
