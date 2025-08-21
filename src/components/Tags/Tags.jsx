import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetLocations } from "../../services/fetchAPI";
import { SearchIcon } from "../Icon/Icon";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  // Lấy ra các tag tương đương với tỉnh thành phố
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetLocations();
        setTags(res?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAPI();
  }, []);
  const handleTag = (slug) => {
    navigate(`/?provinceSlug=${slug}`, { replace: true });
  };

  return (
    <>
      <div className="mb-2 font-medium">Tìm kiếm theo từ khóa</div>
      <ul className="flex items-center gap-2 flex-wrap">
        {tags?.map((tag, index) => {
          return (
            <li key={index}>
              <button
                onClick={() => handleTag(tag?.provinceSlug)}
                className="text-[13px] flex items-center gap-2 bg-white rounded-lg py-1 px-2 text-blue"
              >
                <SearchIcon className="w-[12px] h-[12px]" />
                {tag?.province}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
