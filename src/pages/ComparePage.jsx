import React, { useState, useEffect } from "react";
import { GetPostById, GetApprovedPosts } from "../services/fetchAPI";
import { convertPrice } from "../utils/convertPrice";
import { Link } from "react-router-dom";
import { convertTime } from "../utils/convertTime";



function ComparePage() {
  const [motel1Slug, setMotel1Slug] = useState("");
  const [motel2Slug, setMotel2Slug] = useState("");
  const [motel1, setMotel1] = useState(null);
  const [motel2, setMotel2] = useState(null);
  const [motelOptions, setMotelOptions] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await GetApprovedPosts({ 
          pageSize: 1000 });
        
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-3 gap-4 p-3 border-b">
            <div className="font-semibold text-gray-700"></div>
            <div className="space-y-2">
              <label htmlFor="motel1" className="block text-sm font-medium text-gray-700">
                Nhà trọ 1
              </label>
              <select
                id="motel1"
                className="block w-full rounded-md border-gray-300 shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500 h-[40px]"
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
                className="block w-full rounded-md border-gray-300 shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500 h-[40px]"
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

         

          {/* Tiêu đề */}
          <div className="grid grid-cols-3 gap-4 p-6 border-b">
            <div className="font-semibold text-gray-700">Tiêu đề</div>
            <div className="font-medium">
              {motel1 ? (
                <Link to={`/details/${motel1.slug}`} className="text-blue-600 hover:underline">
                  {motel1.title}
                </Link>
              ) : (
                "-"
              )}
            </div>
            <div className="font-medium">
              {motel2 ? (
                <Link to={`/details/${motel2.slug}`} className="text-blue-600 hover:underline">
                  {motel2.title}
                </Link>
              ) : (
                "-"
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-gray-700">Giá thuê</div>
              <div className="text-red-600 font-semibold">{motel1 ? convertPrice(motel1.price) + "/tháng" : "-"}</div>
              <div className="text-red-600 font-semibold">{motel2 ? convertPrice(motel2.price) + "/tháng" : "-"}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-gray-700">Diện tích</div>
              <div>{motel1 ? `${motel1.area}m²` : "-"}</div>
              <div>{motel2 ? `${motel2.area}m²` : "-"}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-gray-700">Địa chỉ</div>
              <div className="text-gray-700 text-sm">
                {motel1 && motel1.location ? (
                  <div>
                    {motel1.location.addressLine}, {motel1.location.ward}, {motel1.location.district}, {motel1.location.province}
                  </div>
                ) : (
                  "-"
                )}
              </div>
              <div className="text-gray-700 text-sm">
                {motel2 && motel2.location ? (
                  <div>
                    {motel2.location.addressLine}, {motel2.location.ward}, {motel2.location.district}, {motel2.location.province}
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-gray-700">Chủ nhà</div>
              <div>
                {motel1 && motel1.user ? (
                  <div className="flex items-center space-x-2">
                    <img src={motel1.user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="font-medium">{motel1.user.fullName}</div>
                      <div className="text-sm text-gray-500">{motel1.user.phoneNumber}</div>
                    </div>
                  </div>
                ) : (
                  "-"
                )}
              </div>
              <div>
                {motel2 && motel2.user ? (
                  <div className="flex items-center space-x-2">
                    <img src={motel2.user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="font-medium">{motel2.user.fullName}</div>
                      <div className="text-sm text-gray-500">{motel2.user.phoneNumber}</div>
                    </div>
                  </div>
                ) : (
                  "-"
                )}
              </div>
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
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            motel1.amenities[amenity] 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-gray-100 text-gray-800 line-through"
                          }`}
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
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            motel2.amenities[amenity] 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-gray-100 text-gray-800 line-through"
                          }`}
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

        {/* Hành động */}
        <div className="flex justify-center space-x-4">
          {motel1 && (
            <Link 
              to={`/details/${motel1.slug}`} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Xem chi tiết nhà trọ 1
            </Link>
          )}
          {motel2 && (
            <Link 
              to={`/details/${motel2.slug}`} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Xem chi tiết nhà trọ 2
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComparePage;
