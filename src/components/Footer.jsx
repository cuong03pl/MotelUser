import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-bold mb-5 text-base border-b border-gray-700 pb-2">VỀ PHONGTRO123.COM</h2>
            <ul>
              <li className="mb-3 text-sm">
                <Link to={"/"} className="hover:text-yellow-400 transition duration-300">
                  Giới thiệu
                </Link>
              </li>
              <li className="mb-3 text-sm">
                <Link to={"/"} className="hover:text-yellow-400 transition duration-300">
                  Quy chế hoạt động
                </Link>
              </li>
              <li className="mb-3 text-sm">
                <Link to={"/"} className="hover:text-yellow-400 transition duration-300">
                  Quy định sử dụng
                </Link>
              </li>
              <li className="mb-3 text-sm">
                <Link to={"/"} className="hover:text-yellow-400 transition duration-300">
                  Chính sách bảo mật
                </Link>
              </li>
              <li className="mb-3 text-sm">
                <Link to={"/"} className="hover:text-yellow-400 transition duration-300">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="font-bold mb-5 text-base border-b border-gray-700 pb-2">DÀNH CHO KHÁCH HÀNG</h2>
            <ul>
              <li className="mb-3 text-sm">
                <Link to={"/"} className="hover:text-yellow-400 transition duration-300">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li className="mb-3 text-sm">
                <Link to={"/"} className="hover:text-yellow-400 transition duration-300">
                  Hướng dẫn đăng tin
                </Link>
              </li>
              <li className="mb-3 text-sm">
                <Link to={"/"} className="hover:text-yellow-400 transition duration-300">
                  Bảng giá dịch vụ
                </Link>
              </li>
              <li className="mb-3 text-sm">
                <Link to={"/"} className="hover:text-yellow-400 transition duration-300">
                  Quy định đăng tin
                </Link>
              </li>
              <li className="mb-3 text-sm">
                <Link to={"/"} className="hover:text-yellow-400 transition duration-300">
                  Giải quyết khiếu nại
                </Link>
              </li>
            </ul>
          </div>
          
     
          <div>
            <h2 className="font-bold mb-5 text-base border-b border-gray-700 pb-2">THEO DÕI PHONGTRO123.COM</h2>
            <div className="flex gap-4">
              <Link to={"/"} className="text-white hover:text-blue-500 transition">
                <i className="fab fa-facebook fa-2x"></i>
              </Link>
              <Link to={"/"} className="text-white hover:text-red-500 transition">
                <i className="fab fa-youtube fa-2x"></i>
              </Link>
              <Link to={"/"} className="text-white hover:text-blue-400 transition">
                <i className="fab fa-twitter fa-2x"></i>
              </Link>
              <Link to={"/"} className="text-white hover:text-black transition">
                <i className="fab fa-tiktok fa-2x"></i>
              </Link>
            </div>
            <div className="mt-5">
              <p className="text-sm mb-2">Tải ứng dụng tìm kiếm phòng trọ</p>
              <div className="flex gap-2">
                <Link to={"/"} className="block">
                  <img 
                    src="https://phongtro123.com/images/app-store.svg" 
                    alt="App Store" 
                    className="h-10"
                  />
                </Link>
                <Link to={"/"} className="block">
                  <img 
                    src="https://phongtro123.com/images/google-play.svg" 
                    alt="Google Play" 
                    className="h-10"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm">
          <p className="mb-2">© 2025 PhongTro123.com - All Rights Reserved</p>
          <p>Địa chỉ: Số 298 Đ. Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội, Việt Nam</p>
        </div>
      </div>
    </footer>
  );
}
