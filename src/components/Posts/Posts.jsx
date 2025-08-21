import React, { useState } from "react";
import PostItem from "./PostItem";
import { ListViewIcon, GridViewIcon, EmptyStateIcon } from "../Icon/Icon";

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
              <ListViewIcon className="w-[20px] h-[20px]" />
            </button>
            <button 
              onClick={handleLayout}
              className={`p-2 rounded-md transition-all ${gridMode ? 'bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <GridViewIcon className="w-[20px] h-[20px]" />
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
            <EmptyStateIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium">Không có bài viết nào.</p>
            <p className="mt-1">Vui lòng thử lại với bộ lọc khác hoặc quay lại sau.</p>
          </div>
        )}
      </div>
    </div>
  );
}
