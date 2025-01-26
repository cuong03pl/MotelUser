import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <html>
      <body class="bg-yellow-200">
        <div class="container mx-auto max-w-6xl py-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-800">
            <div>
              <h2 class="font-bold mb-4 text-[15px]">VỀ PHONGTRO123.COM</h2>
              <ul>
                <li class="mb-2 text-[12px]">
                  <Link to={"/"} class="hover:underline">
                    Giới thiệu
                  </Link>
                </li>
                <li class="mb-2 text-[12px]">
                  <Link to={"/"} class="hover:underline">
                    Quy chế hoạt động
                  </Link>
                </li>
                <li class="mb-2 text-[12px]">
                  <Link to={"/"} class="hover:underline">
                    Quy định sử dụng
                  </Link>
                </li>
                <li class="mb-2 text-[12px]">
                  <Link to={"/"} class="hover:underline">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li class="mb-2 text-[12px]">
                  <Link to={"/"} class="hover:underline">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="font-bold mb-4 text-[15px]">DÀNH CHO KHÁCH HÀNG</h2>
              <ul>
                <li class="mb-2 text-[12px]">
                  <Link to={"/"} class="hover:underline">
                    Câu hỏi thường gặp
                  </Link>
                </li>
                <li class="mb-2 text-[12px]">
                  <Link to={"/"} class="hover:underline">
                    Hướng dẫn đăng tin
                  </Link>
                </li>
                <li class="mb-2 text-[12px]">
                  <Link to={"/"} class="hover:underline">
                    Bảng giá dịch vụ
                  </Link>
                </li>
                <li class="mb-2 text-[12px]">
                  <Link to={"/"} class="hover:underline">
                    Quy định đăng tin
                  </Link>
                </li>
                <li class="mb-2 text-[12px]">
                  <Link to={"/"} class="hover:underline">
                    Giải quyết khiếu nại
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="font-bold mb-4 text-[15px]">PHƯƠNG THỨC THANH TOÁN</h2>
              <div class="flex space-x-2">
                <Link to={"/"}>
                  <img
                    alt="MoMo payment method"
                    height="30"
                    src="https://storage.googleapis.com/a1aa/image/xGiheZjRKG27GKj2mxHYXBqWn3jHS1PjuygGVPXXs03EqeIUA.jpg"
                    width="50"
                  />
                </Link>
                <Link to={"/"}>
                  <img
                    alt="Visa payment method"
                    height="30"
                    src="https://storage.googleapis.com/a1aa/image/qNEp6iLJOU7mIFrhiG6czAeRRu4sQS9bpsXRfsQakMIEU9IUA.jpg"
                    width="50"
                  />
                </Link>
                <Link to={"/"}>
                  <img
                    alt="MasterCard payment method"
                    height="30"
                    src="https://storage.googleapis.com/a1aa/image/498rnQ9WU2bGCxR2fLGSIuuprrLlsuajHFPBrT5HagzDqeIUA.jpg"
                    width="50"
                  />
                </Link>
                <Link to={"/"}>
                  <img
                    alt="JCB payment method"
                    height="30"
                    src="https://storage.googleapis.com/a1aa/image/20qeR0oHx5SRIyFkedGZfaXOtpXnfm6X1fueOdtRaY0eCqeIUA.jpg"
                    width="50"
                  />
                </Link>
              </div>
              <div class="flex space-x-2 mt-2">
                <Link to={"/"}>
                  <img
                    alt="Internet Banking payment method"
                    height="30"
                    src="https://storage.googleapis.com/a1aa/image/i7Y1eNSNT0UFGy5lf4CvQd6McVOhex500LQP6xpn1VQMo6RoA.jpg"
                    width="50"
                  />
                </Link>
                <Link to={"/"}>
                  <img
                    alt="Cash payment method"
                    height="30"
                    src="https://storage.googleapis.com/a1aa/image/Mz3tkj2TwC7LGVmmBF9Z2jXedypnciKZbpFgTMTy2QxBqeIUA.jpg"
                    width="50"
                  />
                </Link>
              </div>
            </div>
            <div>
              <h2 class="font-bold mb-4 text-[15px]">
                THEO DÕI PHONGTRO123.COM
              </h2>
              <div class="flex space-x-2">
                <Link to={"/"}>
                  <i class="fab fa-facebook fa-2x"></i>
                </Link>
                <Link to={"/"}>
                  <i class="fab fa-youtube fa-2x"></i>
                </Link>
                <Link to={"/"}>
                  <i class="fab fa-zalo fa-2x"></i>
                </Link>
                <Link to={"/"}>
                  <i class="fab fa-twitter fa-2x"></i>
                </Link>
                <Link to={"/"}>
                  <i class="fab fa-tiktok fa-2x"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
