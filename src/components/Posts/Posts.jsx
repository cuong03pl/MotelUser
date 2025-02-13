import axios from "axios";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

export default function Posts({ posts }) {
  return (
    <div className="mt-5 flex flex-col gap-4">
      {posts &&
        posts?.map((data, index) => {
          return <PostItem data={data} key={index} />;
        })}
      {posts.length === 0 && (
        <div className="text-center text-gray-500">Không có bài viết nào.</div>
      )}
    </div>
  );
}
