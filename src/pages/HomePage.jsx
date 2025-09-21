/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Tags from "../components/Tags/Tags";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import Posts from "../components/Posts/Posts";
import News from "../components/News/News";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Filter from "../components/Filter/Filter";
import { GetApprovedPosts, GetCountPost } from "../services/fetchAPI";
import AboutUs from "../components/AboutUs/AboutUs";
import Reviews from "../components/Reviews/Reviews";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPage] = useState(1);
  const [totalPost, setTotalPost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentPage = Number(searchParams.get("page")) || 1;

  // Lấy ra các bài viết
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);
        setError(null);

        let params = {
          page: currentPage,
          pageSize: 20,
          minPrice: searchParams.get("minPrice") || null,
          maxPrice: searchParams.get("maxPrice") || null,
          minArea: searchParams.get("minArea") || null,
          maxArea: searchParams.get("maxArea") || null,
          categoryId: searchParams.get("categoryId") || null,
          provinceSlug: searchParams.get("provinceSlug") || null,
          districtSlug: searchParams.get("districtSlug") || null,
        };
        const res = await GetApprovedPosts(params);

        setTotalPage(res?.data?.totalPages);

        setPosts(res?.data?.data?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Không thể tải danh sách bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [searchParams, currentPage]);

  // Lấy số lượng bài viết
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetCountPost();
        setTotalPost(res?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAPI();
  }, []);

  const handlePageClick = (event) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, page: event.selected + 1 });
    window.scrollTo(0, 0);
  };

  return (
    <div className="">
      <div className="flex max-w-[1000px] m-auto mt-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="text-[20px] font-medium mb-2">
              Kênh thông tin Phòng trọ số 1 Việt Nam
            </div>

            <div className="">
              <div className="">
                <Tags />
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <Posts posts={posts} />
            )}

            <div className="flex justify-center mt-6 mb-6">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="flex items-center gap-2"
                pageClassName="px-3 py-1 h-[40px] flex items-center text-[16px] cursor-pointer"
                activeClassName="bg-blue text-white rounded-md"
                previousClassName="px-3 py-1 rounded-l-md h-[40px] flex items-center text-[16px] cursor-pointer bg-[#ccc]"
                nextClassName="px-3 py-1 rounded-r-md h-[40px] flex items-center text-[16px] cursor-pointer bg-[#ccc]"
                pageLinkClassName="px-3 py-1 h-[40px] flex items-center"
              />
            </div>
          </div>
          <div className="">
            <Filter />
            <div className="bg-white mt-5 p-3">
              <RecentPosts />
            </div>
            <News />
          </div>
        </div>
      </div>

      <Reviews />
      <AboutUs />
    </div>
  );
}
