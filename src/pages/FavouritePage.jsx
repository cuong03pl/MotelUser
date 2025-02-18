import React, { useEffect, useState } from "react";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import News from "../components/News/News";
import Tags from "../components/Tags/Tags";
import Posts from "../components/Posts/Posts";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function FavouritePage() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state?.user?.user_data);
  // Lấy danh sách bài viết được yêu thích của user
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const url = `https://localhost:7224/api/Users/GetUserFavorite/${user?.id}`;
        const res = await axios.get(url);
        setPosts(res?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAPI();
  }, []);
  return (
    <div className="flex max-w-[1000px] m-auto ">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="text-[20px] font-medium mb-2">Tin đã lưu</div>
          <div className="text-[12px] mb-3">Có {posts.length} tin đã lưu</div>

          <Posts posts={posts} />
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
          <News />
        </div>
      </div>
    </div>
  );
}
