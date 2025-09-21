import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  CreateComment,
  GetReviews,
  GetReviewsByPost,
} from "../../services/fetchAPI";

export default function Comment({ slug, postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const user = useSelector((state) => state?.user?.user_data);

  // toasty hiển thị thông báo lỗi
  const errorNotify = (message) =>
    toast.error(message, {
      position: "bottom-right",
      pauseOnHover: false,
    });

  // toasty hiển thị thông báo thành công
  const successNotify = (message) =>
    toast.success(message, {
      position: "bottom-right",
      pauseOnHover: false,
    });
  // Lấy comment của bài viết
  useEffect(() => {
    const fetchAPI = async () => {
      await GetReviewsByPost(slug).then((res) => {
        setComments(res?.data?.data);
      });
    };

    fetchAPI();
  }, [slug, isReload]);

  // Xử lý comment bài viết
  const handleComment = async (content) => {
    await CreateComment({
      comment: content,
      postId: postId,
      userId: user?.id,
    })
      .then((res) => {
        successNotify("Bình luận thành công !");
        setContent("");
        setIsReload((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);

        errorNotify("Lỗi bình luận");
      });
  };
  return (
    <div>
      <h2 class="text-xl font-semibold mb-4">Bình luận</h2>

      {user && (
        <div class="mb-4">
          <textarea
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Viết bình luận..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!content}
              onClick={() => handleComment(content)}
              class={`mt-2 px-4 py-2 bg-[#fa6819] text-white rounded-lg hover:opacity-75 ${
                !content && "opacity-55 cursor-not-allowed"
              }`}
            >
              Gửi
            </button>
          </div>
        </div>
      )}

      <div class="space-y-4">
        {comments?.map((comment, index) => {
          return <CommentItem comment={comment} key={index} />;
        })}
      </div>
    </div>
  );
}
