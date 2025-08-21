import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../config/routes";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Post from "../../components/Manage/Post/Post";
import { DeletePost, GetUserPosts } from "../../services/fetchAPI";
import { SearchIcon } from "../../components/Icon/Icon";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  const [isReload, setIsReload] = useState(false);
  const user = useSelector((state) => state?.user?.user_data);
  // Lấy ra các bài viết của user đang đăng nhập
  useEffect(() => {
    const fetchAPI = async () => {
      await GetUserPosts(user?.id).then((res) => {
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
  // Xử lý xóa baif viết
  const handleDelete = async (id, handleOpenModalDelete) => {
    await DeletePost(id).then((res) => {
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
                <SearchIcon className="w-[12px] h-[12px]" />
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
