import React, { useEffect, useState } from "react";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import News from "../components/News/News";
import { Link, useParams } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import Tags from "../components/Tags/Tags";
import axios from "axios";

export default function CategoryPage() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        let params = {
          page: 1,
          pageSize: 10,
        };
        const url = `https://localhost:7224/api/Posts/GetPostsByCategory/${slug}`;
        const res = await axios.get(url, { params });
        setPosts(res?.data?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAPI();
  }, [slug]);
  return (
    <div className="flex max-w-[1000px] m-auto ">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="text-[20px] font-medium mb-2">
            Kênh thông tin Phòng trọ số 1 Việt Nam
          </div>
          <div className="text-[12px] mb-3">
            Có {posts.length} tin đăng cho thuê
          </div>
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
          <Posts posts={posts} />
          <div className="mt-5">
            <Tags></Tags>
          </div>
        </div>
        <div className="">
          <div className="bg-white mt-5 p-3">
            <RecentPosts />
          </div>
          <News />
        </div>
      </div>
    </div>
  );
}
