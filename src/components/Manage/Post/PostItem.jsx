import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckHasPaid } from "../../../services/fetchAPI";

export default function PostItem({ data, onDelete }) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // Check if post has been paid when component mounts
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await CheckHasPaid({ params: { postId: data?.id } });
        console.log(res);
        setIsPaid(res?.data || false);
        
      } catch (error) {
        console.error("Error checking payment status:", error);
        setIsPaid(false);
      }
    };

    if (data?.id) {
      checkPaymentStatus();
    }
  }, [data?.id]);

  // Xử lý hiển thị model xóa bài viết
  const handleOpenModalDelete = () => {
    setIsOpenDelete(isOpenDelete ? false : true);
  };
  // Xử lý xóa bài viết
  const handleDelete = async (id) => {
    onDelete(id, handleOpenModalDelete);
  };
  return (
    <>
      <div className="p-3 bg-white rounded-lg shadow-xl flex items-center justify-between gap-5">
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
        <div className="flex items-center gap-4">
          <div className="">
            <Link
              class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white bg-blue rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
              to={`/manage/posts/${data?.slug}`}
            >
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
              </svg>
            </Link>
          </div>
          <button
            onClick={handleOpenModalDelete}
            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white bg-red rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          {!isPaid && (
            <Link
              to={`/manage/pay/${data?.slug}`}
              class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white bg-green rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm64 320l-64 0 0-64c35.3 0 64 28.7 64 64zM64 192l0-64 64 0c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64l0 64-64 0zm64-192c-35.3 0-64-28.7-64-64l64 0 0 64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* modal xóa bài viết */}
      {isOpenDelete && (
        <div className="fixed inset-0 z-[99999] flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
          <div class="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-[600px]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[24px] font-semibold">Delete</div>
              <div className="">
                <button
                  onClick={() => handleOpenModalDelete()}
                  class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="">
              Are you sure you want to delete this article?
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(data?.id)}
                className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
