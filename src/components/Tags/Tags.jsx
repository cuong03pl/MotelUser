import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7224/api/Posts/GetLocations"
        );

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
      <ul class="flex items-center gap-2 flex-wrap">
        {tags?.map((tag, index) => {
          return (
            <li>
              <button
                onClick={() => handleTag(tag?.provinceSlug)}
                class="text-[13px] flex items-center gap-2 bg-white rounded-lg py-1 px-2 text-blue"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-[12px] h-[12px]"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                {tag?.province}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
