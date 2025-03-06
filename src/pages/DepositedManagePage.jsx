import React, { useEffect, useState } from "react";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import News from "../components/News/News";
import Tags from "../components/Tags/Tags";
import Posts from "../components/Posts/Posts";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { GetUserBookings, GetUserFavorite } from "../services/fetchAPI";
import { post } from "../utils/request";

export default function DepositedManagePage() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state?.user?.user_data);
  // Lấy danh sách bài viết được yêu thích của user
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetUserBookings(user?.id);

        setPosts(res?.data?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAPI();
  }, []);
  return (
    <div className="max-w-[1000px] m-auto py-[100px]  h-full">
      {posts &&
        posts?.map((post) => {
          console.log(post?.post);

          return (
            <>
              <div className="p-3 bg-white rounded-lg shadow-xl flex items-center justify-between gap-5">
                <div className="">
                  <h3 class=" text-uppercase mb-2">
                    <Link
                      to={`/details/${post?.post?.slug}`}
                      className=" line-clamp-2 uppercase text-red text-[13px] font-medium py-2"
                    >
                      {post?.post?.title}
                    </Link>
                  </h3>
                  <div class="mb-2 flex items-center">
                    <span class="text-green font-medium  text-[13px]">
                      {post?.post?.price} triệu/tháng
                    </span>
                    <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                    <span className="text-[13px]">
                      {post?.post?.area} m<sup>2</sup>
                    </span>
                    <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                    <span
                      class="text-body text-[13px]"
                      title="Cho thuê phòng trọ Quận 12, Hồ Chí Minh"
                    >
                      {post?.post?.location?.addressLine},{" "}
                      {post?.post?.location?.ward},{" "}
                      {post?.post?.location?.district},{" "}
                      {post?.post?.location?.province}
                    </span>
                  </div>
                  <div className="mb-4 text-[13px] text-[#6C757D] line-clamp-3">
                    {post?.post?.description.replace(/<[^>]+>/g, "")}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      {!posts && (
        <div class="flex flex-col items-center justify-center h-full">
          <img
            alt="Illustration of a person with a magnifying glass and a folder"
            class="mb-4"
            src="https://placehold.co/200x200"
          />
          <p class="text-gray-600">Tìm thấy 0 tin đăng</p>
        </div>
      )}
    </div>
  );
}
