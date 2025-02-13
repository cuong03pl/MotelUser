import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../config/routes";
import axios from "axios";
import { useSelector } from "react-redux";
import { convertTime } from "../../utils/convertTime";
import { toast } from "react-toastify";
import Post from "../../components/Manage/Post/Post";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  const [isReload, setIsReload] = useState(false);
  const user = useSelector((state) => state?.user?.user_data);
  useEffect(() => {
    const fetchAPI = async () => {
      await axios
        .get(`https://localhost:7224/api/Users/GetUserPosts/${user?.id}`)
        .then((res) => {
          setPosts(res?.data);
        });
    };

    fetchAPI();
  }, [isReload]);

  const successNotify = (message) =>
    toast.success(message, {
      position: "bottom-right",
      pauseOnHover: false,
    });
  const handleDelete = async (id, handleOpenModalDelete) => {
    await axios.delete(`https://localhost:7224/api/Posts/${id}`).then((res) => {
      successNotify("Xóa thành công");
      setIsReload(isReload ? false : true);
      handleOpenModalDelete();
    });
  };
  return (
    <div className="max-w-[1000px] m-auto py-[100px]  h-full">
      {posts && (
        <>
          <div class=" flex justify-start mb-5">
            <div className="flex border border-[#c2c0c0] rounded-full py-2 px-4 w-80 ">
              <input
                class="w-full bg-transparent border-none outline-none px-2"
                placeholder="Tìm theo mã tin hoặc tiêu đề"
                type="text"
              />
              <button class="flex items-center text-gray-500">
                <svg
                  className="w-[12px] h-[12px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Post posts={posts} onDelete={handleDelete} />
          </div>
        </>
      )}
      {!posts && (
        <div class="flex flex-col items-center justify-center h-full">
          <img
            alt="Illustration of a person with a magnifying glass and a folder"
            class="mb-4"
            src="https://placehold.co/200x200"
          />
          <p class="text-gray-600">Tìm thấy 0 tin đăng</p>
          <p class="text-gray-600">
            Bấm{" "}
            <Link class="text-blue underline" to={routes.manage_create}>
              vào đây
            </Link>{" "}
            để bắt đầu đăng tin
          </p>
        </div>
      )}
    </div>
  );
}
