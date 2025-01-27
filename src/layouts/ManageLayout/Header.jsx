import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav class="bg-blue text-white py-2 fixed w-full h-[48px]">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <img
            alt="Phongtro123.com logo"
            class="h-8"
            height="50"
            src="https://phongtro123.com/images/logo-phongtro-white.svg"
            width="150"
          />
        </div>
        <div class="flex items-center space-x-6 text-sm"></div>
        <div class="flex items-center space-x-4 text-sm">
          <Link class="flex items-center space-x-1 hover:underline" href="#">
            <i class="far fa-heart"></i>
            <span>Tin đã lưu</span>
          </Link>
          <Link class="flex items-center space-x-1 hover:underline" href="#">
            <i class="far fa-folder"></i>
            <span>Quản lý</span>
          </Link>
          <div class="flex items-center space-x-1">
            <img
              alt="User avatar"
              class="h-6 w-6 rounded-full"
              height="30"
              src="https://storage.googleapis.com/a1aa/image/bMoVT8EEk2qrH5IONRC38ZWsTo9BFitLQzFq8mKm2ArBeeIUA.jpg"
              width="30"
            />
            <span>Hoàng Kim Cương</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <Link
            class="bg-red text-white px-3 py-1 rounded hover:bg-red-700"
            to={""}
          >
            Đăng tin
          </Link>
        </div>
      </div>
    </nav>
  );
}
