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
  
  const currentPage = Number(searchParams.get("page")) || 1;
  
  // Lấy ra các bài viết
  useEffect(() => {
    const fetchAPI = async () => {
      try {
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
        setPosts(res?.data?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
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
  
            <Posts posts={posts} />
            {totalPages > 0 && (
              <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t">
                <span className="flex mt-2 sm:mt-auto sm:justify-center">
                  <ReactPaginate
                    nextLabel={
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    }
                    previousLabel={
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    }
                    breakLabel="..."
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    forcePage={currentPage - 1}
                    containerClassName="inline-flex items-center space-x-2"
                    pageClassName="px-3 py-1 rounded-md h-[40px] flex items-center text-[16px] cursor-pointer"
                    activeClassName="bg-purple-600 text-white"
                    previousClassName="px-3 py-1 rounded-l-md h-[40px] flex items-center text-[16px] cursor-pointer"
                    nextClassName="px-3 py-1 rounded-r-md h-[40px] flex items-center text-[16px] cursor-pointer"
                    pageLinkClassName="px-3 py-1 h-[40px] flex items-center"
                  />
                </span>
              </div>
            )}
  
          
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
