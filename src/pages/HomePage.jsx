import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Tags from "../components/Tags/Tags";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import Posts from "../components/Posts/Posts";
import News from "../components/News/News";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPage] = useState(1);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        let url = "https://localhost:7224/api/Posts";
        let params = {
          page: page,
          pageSize: 5,
        };
        const res = await axios.get(url, { params });
        setTotalPage(res?.data?.totalPages);
        setPosts(res?.data?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAPI();
  }, [page]);
  useEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1;
    setSearchParams({ page: Number(pageParam) });

    if (page !== pageParam) {
      setPage(pageParam);
    }
  }, [searchParams]);
  const handlePageClick = (event) => {
    setSearchParams({ page: event.selected + 1 });
  };
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
          <Posts posts={posts} />
          <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t   ">
            <span class="flex  mt-2 sm:mt-auto sm:justify-center">
              <ReactPaginate
                nextLabel={
                  <svg
                    class="w-4 h-4 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                }
                previousLabel={
                  <svg
                    class="w-4 h-4 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
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
