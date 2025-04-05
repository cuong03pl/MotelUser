import React, { useState } from "react";
import PostItem from "./PostItem";

export default function Posts({ posts }) {
  const [gridMode, setGridMode] = useState(false);
  // handle grid col

  const handleLayout = () => {
    setGridMode(!gridMode);
  };
  return (
    <div className="mt-5">
      <div class="flex items-center justify-between p-2 bg-white">
        <div class="flex items-center gap-2"></div>
        <div class="flex items-center">
          <div class="flex">
            <div onClick={handleLayout} className="">
              {!gridMode && (
                <svg
                  className="w-[20px] h-[20px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M384 96l0 128-128 0 0-128 128 0zm0 192l0 128-128 0 0-128 128 0zM192 224L64 224 64 96l128 0 0 128zM64 288l128 0 0 128L64 416l0-128zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z" />
                </svg>
              )}
            </div>
            <div onClick={handleLayout} className="">
              {gridMode && (
                <svg
                  className="w-[20px] h-[20px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-${gridMode ? "3" : "1"} gap-4 bg-white`}>
        {posts &&
          posts?.map((data, index) => {
            return <PostItem data={data} key={index} gridMode={gridMode} />;
          })}
        {posts.length === 0 && (
          <div className="text-center text-gray-500 h-[300px] flex justify-center items-center">
            Không có bài viết nào.
          </div>
        )}
      </div>
    </div>
  );
}
