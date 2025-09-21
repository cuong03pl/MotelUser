import React, { useEffect, useState } from "react";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import News from "../components/News/News";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import Tags from "../components/Tags/Tags";
import Filter from "../components/Filter/Filter";
import ReactPaginate from "react-paginate";
import { GetPostsByCategory } from "../services/fetchAPI";
import {
  ChevronRightSmallIcon,
  ChevronLeftSmallIcon,
} from "../components/Icon/Icon";

export default function CategoryPage() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPage] = useState(1);
  // Lấy ra các bài viết thuộc category
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        let params = {
          page,
          pageSize: 5,
          minPrice: searchParams.get("minPrice") || null,
          maxPrice: searchParams.get("maxPrice") || null,
          minArea: searchParams.get("minArea") || null,
          maxArea: searchParams.get("maxArea") || null,
        };
        const res = await GetPostsByCategory(slug, { params });

        setPosts(res?.data?.data?.data);
        setTotalPage(res?.data?.data?.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAPI();
  }, [searchParams, slug, page]);
  useEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1;

    if (page !== pageParam) {
      setPage(pageParam);
    }
  }, [searchParams]);
  const handlePageClick = (event) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, page: event.selected + 1 });
  };
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
          {totalPages > 0 && (
            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t">
              <span className="flex mt-2 sm:mt-auto sm:justify-center">
                <ReactPaginate
                  nextLabel={
                    <ChevronRightSmallIcon className="w-4 h-4 fill-current" />
                  }
                  previousLabel={
                    <ChevronLeftSmallIcon className="w-4 h-4 fill-current" />
                  }
                  breakLabel="..."
                  pageCount={totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  initialPage={page > 0 ? page - 1 : 0}
                  containerClassName="inline-flex items-center space-x-2"
                  pageClassName="px-3 py-1 rounded-md  h-[40px] flex items-center text-[16px] cursor-pointer"
                  activeClassName="bg-purple-600 text-white"
                  previousClassName="px-3 py-1  rounded-l-md h-[40px] flex items-center text-[16px] cursor-pointer"
                  nextClassName="px-3 py-1  rounded-r-md h-[40px] flex items-center text-[16px] cursor-pointer"
                  pageLinkClassName="px-3 py-1 h-[40px]  flex items-center"
                />
              </span>
            </div>
          )}
          <div className="mt-5">
            <Tags></Tags>
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
  );
}
