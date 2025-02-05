import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecentPosts() {
  const [latestPosts, setLatestPosts] = useState([]);
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7224/api/Posts/GetLatestPosts"
        );
        setLatestPosts(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy bài đăng mới nhất:", error);
      }
    };

    fetchLatestPosts();
  }, []);
  return (
    <div className="mb-4">
      <div className="mb-2 font-medium">Tin mới đăng</div>
      <div className="flex flex-col items-center gap-2">
        {latestPosts?.map((post, index) => {
          console.log(post);

          return (
            <div className="flex gap-2 items-center">
              <img
                className="min-w-[80px] h-[80px] rounded-lg block"
                src={`https://localhost:7224/${post?.imageUrls[0]}`}
                alt=""
              />
              <div className="">
                <Link
                  to={`/details/${post?.slug}`}
                  className="text-[13px] text-[#055699] line-clamp-2"
                >
                  {post?.title}
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <span class="text-green font-medium  text-[12px]">
                    {post?.price} triệu/tháng
                  </span>
                  <span className="text-[10px]">
                    {post?.location?.province}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
