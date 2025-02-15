import React, { useEffect, useState } from "react";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import News from "../components/News/News";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function NewsPage() {
  const { id } = useParams();
  const [news, setNews] = useState({});
  useEffect(() => {
    const fetchAPI = async () => {
      await axios
        .get(`https://motel.azurewebsites.net/api/News/${id}`)
        .then((res) => {
          setNews(res?.data);
        });
    };

    fetchAPI();
  }, [id]);

  return (
    <div className=" max-w-[1000px] m-auto ">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 px-5 py-3 bg-white rounded-lg shadow-1">
          <div className="text-[26px] font-semibold">{news?.title}</div>
          <div className="">
            <div dangerouslySetInnerHTML={{ __html: news?.description }} />
          </div>
        </div>
        <div className="w-full">
          <div className="bg-white mt-5 p-3">
            <RecentPosts />
          </div>
          <News />
        </div>
      </div>
    </div>
  );
}
