import React from "react";
import { Link } from "react-router-dom";

export default function NewsItem({ data }) {
  return (
    <div className="flex items-center gap-2">
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[12px] h-[12px] text-red"
        >
          <path
            fill-rule="evenodd"
            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <Link
        to={`/news/${data?.slug}`}
        className="text-[14px] text-[#055699] line-clamp-2 hover:text-red"
      >
        {data?.title}
      </Link>
    </div>
  );
}
