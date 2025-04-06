import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Filter() {
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [minArea, setMinArea] = useState(null);
  const [maxArea, setMaxArea] = useState(null);
  const navigate = useNavigate();

  // Xử lý lọc theo giá, diện tích
  const handleFilter = () => {
    const params = {
      minPrice,
      maxPrice,
      minArea,
      maxArea,
    };

    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != null && v !== "")
    );
    const queryString = new URLSearchParams(cleanedParams).toString();
    navigate(`?${queryString}`, { replace: true });
  };
  return (
    <div className="bg-white p-3">
      <div className="mb-4">
        <div className="mb-2 font-medium">Giá thuê</div>
        <div className="flex items-center gap-2">
          <div className="border-solid border-silver border p-2 rounded-lg">
            <input
              className="outline-none border-none w-full"
              type="text"
              placeholder="Giá thuê tối thiểu "
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          -
          <div className="border-solid border-silver border p-2 rounded-lg">
            <input
              className="outline-none border-none w-full"
              type="text"
              placeholder="Giá thuê tối đa "
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-2">Diện tích</div>
        <div className="flex items-center gap-2">
          <div className="border-solid border-silver border p-2 rounded-lg">
            <input
              className="outline-none border-none w-full"
              type="text"
              placeholder="Diện tích tối thiểu "
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
            />
          </div>
          -
          <div className="border-solid border-silver border p-2 rounded-lg">
            <input
              className="outline-none border-none w-full"
              type="text"
              placeholder="Diện tích tối đa "
              value={maxArea}
              onChange={(e) => setMaxArea(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleFilter}
        className="w-full bg-[#fa6819] text py-2 font-medium text-white rounded-lg flex items-center justify-center"
      >
        Áp dụng
      </button>
    </div>
  );
}
