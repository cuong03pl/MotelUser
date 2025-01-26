import React from "react";
import { Link } from "react-router-dom";
import Tags from "../conponents/Tags/Tags";
import RecentPosts from "../conponents/RecentPosts/RecentPosts";

export default function HomePage() {
  return (
    <div className="flex max-w-[1000px] m-auto ">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="text-[20px] font-medium mb-2">
            Kênh thông tin Phòng trọ số 1 Việt Nam
          </div>
          <div className="text-[12px] mb-3">Có 69.307 tin đăng cho thuê</div>
          <div className="">
            <ul className="flex items-center gap-5">
              <li>
                <Link className="px-4 py-2 font-medium bg-white rounded-lg text-red">
                  Toàn quốc
                </Link>
              </li>
              <li>
                <Link>Toàn quốc</Link>
              </li>
            </ul>
          </div>
          <div className="mt-5">
            <ul className="flex items-center gap-5">
              <li>
                <Link className="underline font-medium">Đề xuất</Link>
              </li>
              <li>
                <Link className="font-normal">Mới đăng</Link>
              </li>
            </ul>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <div className="p-3 bg-white rounded-lg shadow-xl">
              <div className="max-h-[260px] h-[260px] w-full">
                <img
                  className="w-full h-full"
                  src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2025/01/13/467c5f9bf67d4a23136c2_1736742102.jpg"
                  alt=""
                />
              </div>
              <div className="">
                <h3 class=" text-uppercase mb-2">
                  <Link
                    to={"/details"}
                    className=" line-clamp-2 uppercase text-red text-[13px] font-medium py-2"
                  >
                    Chính chủ cho thuê căn 2PN, 1WC, nội thất mới, thoáng mát
                    tại Tân Thới Hiệp quận 12
                  </Link>
                </h3>
                <div class="mb-2 flex items-center">
                  <span class="text-green font-medium  text-[13px]">
                    5 triệu/tháng
                  </span>
                  <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                  <span className="text-[13px]">
                    40 m<sup>2</sup>
                  </span>
                  <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                  <Link
                    class="text-body text-[13px]"
                    title="Cho thuê phòng trọ Quận 12, Hồ Chí Minh"
                  >
                    Quận 12, Hồ Chí Minh
                  </Link>
                </div>
                <div className="mb-4 text-[13px] text-[#6C757D]">
                  Địa chỉ: 113/62 khu phố 3, phường Tân Thới Hiệp, quận 12Gần
                  công viên phần mềm Quang Trung, nhà máy bia HeinekenDiện tích
                  40m22 phòng ngủ, 1 phòng khách, 1…
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <img
                      className="w-[40px] h-[40px]"
                      src="https://phongtro123.com/images/default-user.svg"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="font-normal text-[14px]">
                        Vũ Cao Hưng
                      </span>
                      <span className="font-normal text-[12px]">Hôm nay</span>
                    </div>
                  </div>
                  <div className=" flex items-center gap-4">
                    <div className="p-2 bg-green text-white text-[12px] rounded-lg">
                      0339066926
                    </div>
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Tags></Tags>
          </div>
        </div>
        <div className="">
          <div className="bg-white p-3">
            <div className="mb-4">
              <div className="mb-2 font-medium">Giá thuê</div>
              <div className="flex items-center gap-2">
                <div className="border-solid border-silver border p-2 rounded-lg">
                  <input
                    className="outline-none border-none w-full"
                    type="text"
                    placeholder="Giá thuê tối thiểu "
                  />
                </div>
                -
                <div className="border-solid border-silver border p-2 rounded-lg">
                  <input
                    className="outline-none border-none w-full"
                    type="text"
                    placeholder="Giá thuê tối đa "
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-2">Diện tích</div>
              <div className="flex items-center gap-2">
                <div className="border-solid border-silver border p-2 rounded-lg">
                  <input
                    className="outline-none border-none w-full"
                    type="text"
                    placeholder="Diện tích tối thiểu "
                  />
                </div>
                -
                <div className="border-solid border-silver border p-2 rounded-lg">
                  <input
                    className="outline-none border-none w-full"
                    type="text"
                    placeholder="Diện tích tối đa "
                  />
                </div>
              </div>
            </div>
            <button className="w-full bg-blue text py-2 font-medium text-white rounded-lg flex items-center justify-center">
              Áp dụng
            </button>
          </div>
          <div className="bg-white mt-5 p-3">
            <RecentPosts />
          </div>
          <div className="bg-white mt-5 p-3">
            <div className="mb-4">
              <div className="mb-2 font-medium">Bài viết mới</div>
              <div className="flex items-center gap-2">
                <div className="">
                  <div className="flex items-center">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-[12px] h-[12px] text-red"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <Link className="text-[14px] text-[#055699] line-clamp-2 hover:text-red">
                      Cho thuê căn hộ ngay trung tâm quận hải châu.
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
