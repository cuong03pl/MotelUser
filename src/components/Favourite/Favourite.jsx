import React from "react";

export default function Favourite({
  favourited,
  onFavorite,
  onlyIcon = false,
}) {
  // Xử lý yêu thích bài viết
  const handleFavotite = () => {
    onFavorite();
  };
  return (
    <div
      onClick={handleFavotite}
      class="flex items-center space-x-1 cursor-pointer"
    >
      {favourited && (
        <svg
          class="size-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fa6819"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
      )}
      {!favourited && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      )}
      {!onlyIcon && (
        <span class="text-[14px]">{favourited ? "Bỏ lưu tin" : "Lưu tin"}</span>
      )}
    </div>
  );
}
