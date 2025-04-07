import React, { useState, useEffect } from "react";
import { GetPostById, GetApprovedPosts } from "../services/fetchAPI";
import { convertPrice } from "../utils/convertPrice";



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
    try {
      const res = await GetPostById(slug);
      return res?.data;
    } catch (error) {
      console.error("Error fetching motel data:", error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">So sánh nhà trọ</h1>
          <p className="mt-2 text-sm text-gray-600">
            Chọn hai nhà trọ để so sánh các thông tin chi tiết
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-6 border-b">
            <div className="font-semibold text-gray-700"></div>
            <div className="space-y-2">
              <label htmlFor="motel1" className="block text-sm font-medium text-gray-700">
                Nhà trọ 1
              </label>
              <select
                id="motel1"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={motel1Slug}
                onChange={(e) => setMotel1Slug(e.target.value)}
              >
                <option value="">Chọn nhà trọ</option>
                {motelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="motel2" className="block text-sm font-medium text-gray-700">
                Nhà trọ 2
              </label>
              <select
                id="motel2"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={motel2Slug}
                onChange={(e) => setMotel2Slug(e.target.value)}
              >
                <option value="">Chọn nhà trọ</option>
                {motelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-gray-700">Đánh giá</div>
              <div className="flex items-center">
                {motel1 ? (
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{motel1.star}</span>
                  </div>
                ) : (
                  "-"
                )}
              </div>
              <div className="flex items-center">
                {motel2 ? (
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{motel2.star}</span>
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-gray-700">Giá</div>
              <div>{motel1 ? convertPrice(motel1.price) : "-"}</div>
              <div>{motel2 ? convertPrice(motel2.price) : "-"}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-gray-700">Diện tích</div>
              <div>{motel1 ? `${motel1.area}m²` : "-"}</div>
              <div>{motel2 ? `${motel2.area}m²` : "-"}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-gray-700">Tiện nghi</div>
              <div className="space-y-1">
                {motel1 && motel1.amenities ? (
                  <div className="flex flex-wrap gap-2">
                    {typeof motel1.amenities === "object"
                      ? Object.keys(motel1.amenities).map((amenity) => (
                        <span
                          key={amenity}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {amenity}
                        </span>
                      ))
                      : Array.isArray(motel1.amenities)
                        ? motel1.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {amenity}
                          </span>
                        ))
                        : motel1.amenities}
                  </div>
                ) : (
                  "-"
                )}
              </div>
              <div className="space-y-1">
                {motel2 && motel2.amenities ? (
                  <div className="flex flex-wrap gap-2">
                    {typeof motel2.amenities === "object"
                      ? Object.keys(motel2.amenities).map((amenity) => (
                        <span
                          key={amenity}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {amenity}
                        </span>
                      ))
                      : Array.isArray(motel2.amenities)
                        ? motel2.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {amenity}
                          </span>
                        ))
                        : motel2.amenities}
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparePage;
