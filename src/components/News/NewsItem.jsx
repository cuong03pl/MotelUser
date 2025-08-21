import React from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "../Icon/Icon";

export default function NewsItem({ data }) {
  return (
    <div className="flex items-center gap-2">
      <div className="">
        <ChevronRightIcon className="w-[12px] h-[12px] text-red" />
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
