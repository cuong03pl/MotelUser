import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckHasPaid } from "../../../services/fetchAPI";
import { ViewIcon, DeleteIcon, PaymentIcon, CloseModalIcon } from "../../Icon/Icon";

export default function PostItem({ data, onDelete }) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // Check if post has been paid when component mounts
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await CheckHasPaid({ params: { postId: data?.id } });
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
              <ViewIcon className="w-5 h-5" />
            </Link>
          </div>
          <button
            onClick={handleOpenModalDelete}
            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white bg-red rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
          >
            <DeleteIcon className="w-5 h-5" />
          </button>
          {!isPaid && (
            <Link
              to={`/manage/pay/${data?.slug}`}
              class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white bg-green rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            >
              <PaymentIcon className="w-5 h-5" />
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
                  <CloseModalIcon className="w-5 h-5" />
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
