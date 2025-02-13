import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../config/routes";
import axios from "axios";
import { useSelector } from "react-redux";
import { convertTime } from "../../utils/convertTime";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state?.user?.user_data);
  useEffect(() => {
    const fetchAPI = async () => {
      await axios
        .get(`https://localhost:7224/api/Users/GetUserPosts/${user?.id}`)
        .then((res) => {
          setPosts(res?.data);
        });
    };

    fetchAPI();
  }, [user]);

  return (
    <div className="max-w-[1000px] m-auto py-[100px]  h-full">
      {posts && (
        <>
          <div class=" flex justify-start mb-5">
            <div className="flex border border-[#c2c0c0] rounded-full py-2 px-4 w-80 ">
              <input
                class="w-full bg-transparent border-none outline-none px-2"
                placeholder="Tìm theo mã tin hoặc tiêu đề"
                type="text"
              />
              <button class="flex items-center text-gray-500">
                <svg
                  className="w-[12px] h-[12px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {posts?.map((data, index) => {
              return (
                <div className="p-3 bg-white rounded-lg shadow-xl flex items-center gap-5">
                  <div className="">
                    <h3 class=" text-uppercase mb-2">
                      <Link
                        to={`/details/${data?.slug}`}
                        className=" line-clamp-2 uppercase text-red text-[13px] font-medium py-2"
                      >
                        {data?.title}
                      </Link>
                    </h3>
                    <div class="mb-2 flex items-center">
                      <span class="text-green font-medium  text-[13px]">
                        {data?.price} triệu/tháng
                      </span>
                      <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                      <span className="text-[13px]">
                        {data?.area} m<sup>2</sup>
                      </span>
                      <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                      <Link
                        class="text-body text-[13px]"
                        title="Cho thuê phòng trọ Quận 12, Hồ Chí Minh"
                      >
                        {data?.location?.addressLine}, {data?.location?.ward},{" "}
                        {data?.location?.district}, {data?.location?.province}
                      </Link>
                    </div>
                    <div className="mb-4 text-[13px] text-[#6C757D] line-clamp-3">
                      {data?.description.replace(/<[^>]+>/g, "")}
                    </div>
                  </div>
                  <div className="">
                    <Link
                      class="bg-red text-white px-3 py-1 rounded hover:bg-red-700"
                      to={`/manage/posts/${data?.slug}`}
                    >
                      Xem
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {!posts && (
        <div class="flex flex-col items-center justify-center h-full">
          <img
            alt="Illustration of a person with a magnifying glass and a folder"
            class="mb-4"
            src="https://placehold.co/200x200"
          />
          <p class="text-gray-600">Tìm thấy 0 tin đăng</p>
          <p class="text-gray-600">
            Bấm{" "}
            <Link class="text-blue underline" to={routes.manage_create}>
              vào đây
            </Link>{" "}
            để bắt đầu đăng tin
          </p>
        </div>
      )}
    </div>
  );
}
