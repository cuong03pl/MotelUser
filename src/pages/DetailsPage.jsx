import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import Tags from "../components/Tags/Tags";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { convertTime } from "../utils/convertTime";
import News from "../components/News/News";
export default function DetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [countPost, setCountPost] = useState(0);

  useEffect(() => {
    const fetchAPI = async () => {
      await axios.get(`https://localhost:7224/api/Posts/${id}`).then((res) => {
        setPost(res?.data);
      });
    };

    fetchAPI();
  }, [id]);
  // get count post
  useEffect(() => {
    const fetchAPI = async () => {
      await axios
        .get(`https://localhost:7224/api/Users/countPost/${post?.ownerId}`)
        .then((res) => {
          setCountPost(res?.data);
        });
    };
    if (post.ownerId) {
      fetchAPI();
    }
  }, [post]);
  return (
    <div className=" max-w-[1000px] m-auto ">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className=" flex flex-col gap-4">
            <div className="p-3 bg-white rounded-lg shadow-xl">
              <div className="max-h-[260px] h-[260px] w-full">
                <Swiper
                  className="mySwiper h-full"
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                >
                  {post?.imageUrls?.map((img, index) => {
                    return (
                      <SwiperSlide className="w-full h-full">
                        <img
                          className="w-full h-full object-contain"
                          src={`https://localhost:7224/${img}`}
                          alt=""
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="py-5 ">
                <h3 className="text-red font-semibold">{post?.title}</h3>
                <div className="flex items-center gap-2 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[13px] h-[13px]"
                  >
                    <path
                      fill-rule="evenodd"
                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="text-[13px]">
                    {post?.location?.addressLine}, {post?.location?.ward},{" "}
                    {post?.location?.district}, {post?.location?.province}
                  </span>
                </div>
                <div class="mb-2 flex items-center">
                  <span class="text-green font-medium  text-[16px]">
                    {post?.price} triệu/tháng
                  </span>
                  <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                  <span className="text-[13px]">
                    {post?.area} m<sup>2</sup>
                  </span>
                  <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                  <Link class="text-body text-[13px]">
                    {post?.location?.district}, {post?.location?.province}
                  </Link>
                </div>
              </div>
              <div className="border-b border-solid border-[#cdcccc]"></div>
              {/* Description */}
              <div className="py-5">
                <h4 className="font-medium text-[18px]">Thông tin mô tả</h4>
                <div dangerouslySetInnerHTML={{ __html: post?.description }} />
              </div>
              <div className="border-b border-solid border-[#cdcccc]"></div>
              <div className="py-5">
                <div className="flex gap-3 items-center">
                  <div className="border border-solid border-[#ccc] p-1 rounded-full">
                    <img
                      className="w-[100px] h-[100px]"
                      src={post?.user?.avatar}
                      alt=""
                    />
                  </div>
                  <div className="">
                    <span className="text-[16px] font-semibold">
                      {post?.user?.fullName}
                    </span>
                    <div class="my-2 flex items-center">
                      <span className="text-[13px]">{countPost} tin đăng</span>
                      <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                      <span className="text-[13px]">
                        Tham gia từ: {convertTime(post?.user?.createdOn)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center gap-2 bg-green px-3 py-2 rounded-2xl text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-[16px] h-[16px]"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="text-[14px]">
                          {post?.user?.phoneNumber}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 bg-blue px-3 py-2 rounded-2xl text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-[16px] h-[16px]"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                          />
                        </svg>

                        <span className="text-[14px]">Nhắn Zalo</span>
                      </div>
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
        <div className="w-full">
          <div className="bg-white p-3">
            <div className="flex flex-col gap-3 items-center">
              <div className="border border-solid border-[#ccc] p-1 rounded-full">
                <img
                  className="w-[100px] h-[100px]"
                  src={post?.user?.avatar}
                  alt=""
                />
              </div>
              <div className=" flex flex-col items-center w-full">
                <span className="text-[16px] font-semibold">
                  {post?.user?.fullName}
                </span>
                <div class="my-2 flex items-center">
                  <span className="text-[13px]">{countPost} tin đăng</span>
                  <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                  <span className="text-[13px]">
                    {" "}
                    Tham gia từ: {convertTime(post?.user?.createdOn)}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="flex w-full items-center justify-center gap-2 bg-green px-3 py-2 rounded-2xl text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-[18px] h-[18px]"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span className="text-[18px]">
                      {post?.user?.phoneNumber}{" "}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-blue px-3 py-2 rounded-2xl text-white w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-[18px] h-[18px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>

                    <span className="text-[18px]">Nhắn Zalo</span>
                  </div>
                </div>
                <div class="flex gap-5 items-center py-3 w-full justify-between">
                  <div class="flex items-center space-x-1 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-[16px] h-[16px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <span class="text-[14px]">Lưu tin</span>
                  </div>
                  <div class="flex items-center space-x-1 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-[16px] h-[16px]"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span class="text-[14px]">Chia sẻ</span>
                  </div>
                  <div class="flex items-center space-x-1 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-[16px] h-[16px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      />
                    </svg>

                    <span class="text-[14px]">Báo xấu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white mt-5 p-3">
            <RecentPosts />
          </div>
          <News />
        </div>
      </div>
      <div className="bg-white mt-5 p-3 rounded-md">
        <h3 className="font-semibold">Tin đăng cùng khu vực </h3>
        <div className="grid grid-cols-4 gap-4 py-3">
          <div className="">
            <img
              className="rounded-lg"
              src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2025/01/24/z5945596990786-788b6de6f8c774d466ebd2b6b97e3cc9_1737685699.jpg"
              alt=""
            />
            <div className="pt-[10px]">
              <Link className="uppercase text-[14px] font-semibold text-[#055699] line-clamp-2">
                CHO THUÊ KÝ TÚC XÁ CAO CẤP GIÁ RẺ QUẬN 10
              </Link>
              <div class="mb-2 flex items-center">
                <span class="text-green font-medium  text-[13px]">
                  5 triệu/tháng
                </span>
                <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                <span className="text-[13px]">
                  40 m<sup>2</sup>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <img
              className="rounded-lg"
              src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2025/01/24/z5945596990786-788b6de6f8c774d466ebd2b6b97e3cc9_1737685699.jpg"
              alt=""
            />
            <div className="pt-[10px]">
              <Link className="uppercase text-[14px] font-semibold text-[#055699] line-clamp-2">
                CHO THUÊ KÝ TÚC XÁ CAO CẤP GIÁ RẺ QUẬN 10
              </Link>
              <div class="mb-2 flex items-center">
                <span class="text-green font-medium  text-[13px]">
                  5 triệu/tháng
                </span>
                <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                <span className="text-[13px]">
                  40 m<sup>2</sup>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <img
              className="rounded-lg"
              src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2025/01/24/z5945596990786-788b6de6f8c774d466ebd2b6b97e3cc9_1737685699.jpg"
              alt=""
            />
            <div className="pt-[10px]">
              <Link className="uppercase text-[14px] font-semibold text-[#055699] line-clamp-2">
                CHO THUÊ KÝ TÚC XÁ CAO CẤP GIÁ RẺ QUẬN 10
              </Link>
              <div class="mb-2 flex items-center">
                <span class="text-green font-medium  text-[13px]">
                  5 triệu/tháng
                </span>
                <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                <span className="text-[13px]">
                  40 m<sup>2</sup>
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <img
              className="rounded-lg"
              src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2025/01/24/z5945596990786-788b6de6f8c774d466ebd2b6b97e3cc9_1737685699.jpg"
              alt=""
            />
            <div className="pt-[10px]">
              <Link className="uppercase text-[14px] font-semibold text-[#055699] line-clamp-2">
                CHO THUÊ KÝ TÚC XÁ CAO CẤP GIÁ RẺ QUẬN 10
              </Link>
              <div class="mb-2 flex items-center">
                <span class="text-green font-medium  text-[13px]">
                  5 triệu/tháng
                </span>
                <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                <span className="text-[13px]">
                  40 m<sup>2</sup>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
