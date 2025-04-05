import React, { useState, useEffect } from "react";
import { GetPostById, GetApprovedPosts } from "../services/fetchAPI";

function ComparePage() {
  const [motel1Slug, setMotel1Slug] = useState("");
  const [motel2Slug, setMotel2Slug] = useState("");
  const [motel1, setMotel1] = useState(null);
  const [motel2, setMotel2] = useState(null);
  const [motelOptions, setMotelOptions] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await GetApprovedPosts({});
        const posts = res?.data?.data;
        console.log(posts);

        if (posts) {
          setMotelOptions(
            posts.map((post) => ({
              value: post.slug,
              label: post.title,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (motel1Slug) {
      console.log(motel1Slug);

      fetchMotelData(motel1Slug).then(setMotel1);
    } else {
      setMotel1(null);
    }

    if (motel2Slug) {
      fetchMotelData(motel2Slug).then(setMotel2);
    } else {
      setMotel2(null);
    }
  }, [motel1Slug, motel2Slug]);

  const fetchMotelData = async (slug) => {
    console.log(slug);

    try {
      const res = await GetPostById(slug);
      return res?.data;
    } catch (error) {
      console.error("Error fetching motel data:", error);
      return null;
    }
  };

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-2xl font-bold mb-4">So sánh nhà trọ</h1>
      <div className="grid grid-cols-3 gap-4 bg-white p-3 shadow-2 rounded-lg">
        <div className="font-bold"></div>
        <div>
          <select
            id="motel1"
            className="border p-2 max-w-full outline-none"
            value={motel1Slug}
            onChange={(e) => setMotel1Slug(e.target.value)}
          >
            <option value="">Select Motel 1</option>
            {motelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="motel2"
            className="border p-2 max-w-full outline-none"
            value={motel2Slug}
            onChange={(e) => setMotel2Slug(e.target.value)}
          >
            <option value="">Select Motel 2</option>
            {motelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>Đánh giá</div>
        <div>{motel1 ? motel1.star : "-"}</div>
        <div>{motel2 ? motel2.star : "-"}</div>

        <div>Giá</div>
        <div>{motel1 ? motel1.price : "-"}</div>
        <div>{motel2 ? motel2.price : "-"}</div>
        <div>Diện tích</div>
        <div>{motel1 ? motel1.area : "-"}</div>
        <div>{motel2 ? motel2.area : "-"}</div>

        <div>Tiện nghi</div>
        <div>
          {motel1 && motel1.amenities
            ? typeof motel1.amenities === "object"
              ? Object.keys(motel1.amenities).join(", ")
              : Array.isArray(motel1.amenities)
              ? motel1.amenities.join(", ")
              : motel1.amenities
            : "-"}
        </div>
        <div>
          {motel2 && motel2.amenities
            ? typeof motel2.amenities === "object"
              ? Object.keys(motel2.amenities).join(", ")
              : Array.isArray(motel2.amenities)
              ? motel2.amenities.join(", ")
              : motel2.amenities
            : "-"}
        </div>
      </div>
    </div>
  );
}

export default ComparePage;
