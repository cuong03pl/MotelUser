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
      <div className="flex items-center justify-between p-4 bg-white rounded-t-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-gray-800">
            Danh sách tin đăng ({posts?.length || 0})
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">Hiển thị:</div>
          <div className="flex bg-gray-100 p-1 rounded-md">
            <button 
              onClick={handleLayout}
              className={`p-2 rounded-md transition-all ${!gridMode ? 'bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <svg
                className="w-[20px] h-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z" />
              </svg>
            </button>
            <button 
              onClick={handleLayout}
              className={`p-2 rounded-md transition-all ${gridMode ? 'bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <svg
                className="w-[20px] h-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M384 96l0 128-128 0 0-128 128 0zm0 192l0 128-128 0 0-128 128 0zM192 224L64 224 64 96l128 0 0 128zM64 288l128 0 0 128L64 416l0-128zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`grid gap-4 bg-gray-50 p-4 rounded-b-lg ${gridMode ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr' : 'grid-cols-1'}`}>
        {posts && posts.length > 0 ? (
          posts?.map((data, index) => {
            return <PostItem data={data} key={index} gridMode={gridMode} />;
          })
        ) : (
          <div className="text-center text-gray-500 bg-white p-10 rounded-lg shadow-sm col-span-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">Không có bài viết nào.</p>
            <p className="mt-1">Vui lòng thử lại với bộ lọc khác hoặc quay lại sau.</p>
          </div>
        )}
      </div>
    </div>
  );
}
