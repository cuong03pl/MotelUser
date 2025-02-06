import axios from "axios";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

export default function Posts({ slug }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        let url = "https://localhost:7224/api/Posts";
        let params = {
          page: 1,
          pageSize: 10,
        };

        if (slug) {
          url = `https://localhost:7224/api/Posts/GetPostsByCategory/${slug}`;
        }
        const res = await axios.get(url, { params });
        setPosts(res?.data?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAPI();
  }, [slug]);
  return (
    <div className="mt-5 flex flex-col gap-4">
      {posts?.map((data, index) => {
        return <PostItem data={data} key={index} />;
      })}
    </div>
  );
}
