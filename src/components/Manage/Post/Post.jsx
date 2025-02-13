import React from "react";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";

export default function Post({ posts, onDelete }) {
  return (
    <>
      {posts?.map((data, index) => {
        return <PostItem data={data} onDelete={onDelete} key={index} />;
      })}
    </>
  );
}
