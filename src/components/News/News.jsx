import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

export default function News() {
  const [news, setNews] = useState([]);
  // Lấy ra các tin tức
  useEffect(() => {
    const fetchAPI = async () => {
      await axios
        .get(`https://localhost:7224/api/News`, {
          params: {
            page: 1,
            pageSize: 5,
          },
        })
        .then((res) => {
          setNews(res?.data);
        });
    };

    fetchAPI();
  }, []);
  return (
    <div className="bg-white mt-5 p-3 shadow-2 rounded-xl">
      <div className="mb-4">
        <div className="mb-2 font-medium">Bài viết mới</div>
        {news?.map((data, index) => {
          return <NewsItem data={data} key={index} />;
        })}
      </div>
    </div>
  );
}
