import axios from "axios";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      await axios
        .get(`https://localhost:7224/api/Posts`, {
          params: {
            page: 1,
            pageSize: 10,
          },
        })
        .then((res) => {
          setPosts(res?.data?.data);
          console.log(res?.data);
        });
    };

    fetchAPI();
  }, []);

  return (
    <div className="mt-5 flex flex-col gap-4">
      {posts?.map((data, index) => {
        return <PostItem data={data} key={index} />;
      })}
    </div>
  );
}
