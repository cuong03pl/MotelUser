import React, { useEffect, useState } from "react";
import { CloseIcon } from "../Icon/Icon";
import axios from "axios";
import Select from "react-select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetCategories } from "../../services/fetchAPI";
const priceRanges = [
  { label: "Tất cả", min: 0, max: 100000000 },
  { label: "Dưới 1 triệu", min: 0, max: 1 },
  { label: "1 - 2 triệu", min: 1, max: 2 },
  { label: "2 - 3 triệu", min: 2, max: 3 },
  { label: "3 - 5 triệu", min: 3, max: 5 },
  { label: "5 - 7 triệu", min: 5, max: 7 },
  { label: "7 - 10 triệu", min: 7, max: 10 },
  { label: "10 - 15 triệu", min: 10, max: 15 },
  { label: "Trên 15 triệu", min: 15, max: 100000000 },
];
const areaFilters = [
  { label: "Tất cả", min: 0, max: 100000000 },
  { label: "Dưới 20m²", min: 0, max: 20 },
  { label: "Từ 20m² - 30m²", min: 20, max: 30 },
  { label: "Từ 30m² - 50m²", min: 30, max: 50 },
  { label: "Từ 50m² - 70m²", min: 50, max: 70 },
  { label: "Từ 70m² - 90m²", min: 70, max: 90 },
  { label: "Trên 90m²", min: 90, max: 100000000 },
];
export default function FilterModal({ onClose }) {
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") || ""
  );
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedPrice, setSelectedPrice] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });
  const [selectedArea, setSelectedArea] = useState({
    min: searchParams.get("minArea") || "",
    max: searchParams.get("maxArea") || "",
  });

  const navigate = useNavigate();
  // Lấy ra các danh mục
  useEffect(() => {
    const fetchAPI = async () => {
      await GetCategories().then((res) => {
        setCategories(res.data);
      });
    };
    fetchAPI();
  }, []);

  // Lấy ra tất cả các tỉnh thành phố
  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await fetch("https://provinces.open-api.vn/api/p");
      const data = await response.json();
      const provinceOptions = data.map((province) => ({
        value: province.name,
        label: province.name,
        code: province.code,
      }));
      setProvinces(provinceOptions);
    };

    fetchProvinces();
  }, []);
  // Lấy ra các quận huyện của tỉnh/TP được chọn
  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await fetch(
        `https://provinces.open-api.vn/api/p/${selectedProvince?.code}?depth=2`
      );
      const data = await response.json();

      const districtOptions = data?.districts.map((district) => ({
        value: district.name,
        label: district.name,
        code: district.code,
      }));
      setDistricts(districtOptions);
    };

    if (selectedProvince?.code) {
      fetchDistricts();
    }
  }, [selectedProvince]);

  // Xử lý lọc theo giá, diện tích, danh mục, địa chỉ
  const handleFilter = () => {
    const params = {
      minPrice: selectedPrice?.min,
      maxPrice: selectedPrice?.max,
      minArea: selectedArea?.min,
      maxArea: selectedArea?.max,
      categoryId: categoryId,
      provinceSlug: selectedProvince?.value,
      districtSlug: selectedDistrict?.value,
      page: 1,
    };

    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != null && v !== "")
    );
    const queryString = new URLSearchParams(cleanedParams).toString();
    navigate(`?${queryString}`, { replace: true });
    onClose();
  };
  return (
    <div class="max-w-[500px] mx-auto  p-6 ">
      <div className=" flex items-center justify-between border-b border-[#ccc] pb-3">
        <span className="text-[20px]">Bộ lọc</span>
        <span onClick={onClose}>
          <CloseIcon className="w-[20px] h-[20px]" />
        </span>
      </div>
      <div class="mb-6 mt-5">
        <h2 class="text-xl font-semibold mb-4">Danh mục cho thuê</h2>
        <div class="flex flex-wrap gap-4">
          {categories?.map((res, index) => {
            return (
              <button
                onClick={() => setCategoryId(res?.id)}
                key={index}
                class={`flex items-center gap-2 px-4 py-2 border rounded-full ${
                  categoryId === res?.id
                    ? "border-red bg-red text-white "
                    : "border-gray-300 text-black"
                } `}
              >
                {res?.name}
              </button>
            );
          })}
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Lọc theo khu vực</h2>
        <div class="flex flex-wrap gap-4">
          <div class="flex flex-col">
            <label for="tinh-thanh" class="mb-2">
              Tỉnh thành
            </label>
            <Select
              placeholder="-- Chọn Tỉnh/Thành Phố --"
              onChange={(e) => setSelectedProvince(e)}
              options={provinces}
            />
          </div>
          <div class="flex flex-col">
            <label for="quan-huyen" class="mb-2">
              Quận huyện
            </label>
            <Select
              placeholder="-- Chọn quận huyện --"
              onChange={(e) => setSelectedDistrict(e)}
              options={districts}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 class="text-xl font-semibold mb-4">Khoảng giá</h2>
        <div class="flex flex-wrap gap-4">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              className={`px-4 py-2 border rounded-full ${
                Number(selectedPrice.min) === range.min &&
                Number(selectedPrice.max) === range.max
                  ? "text-white bg-red border-red"
                  : "text-gray-600 border-gray-300"
              }`}
              onClick={() => setSelectedPrice(range)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Khoảng diện tích</h2>
        <div class="flex flex-wrap gap-2">
          {areaFilters.map((filter, index) => (
            <button
              key={index}
              className={`px-4 py-2 border rounded-full ${
                Number(selectedArea.min) === filter.min &&
                Number(selectedArea.max) === filter.max
                  ? "text-white bg-red border-red"
                  : "text-gray-600 border-gray-300"
              }`}
              onClick={() => setSelectedArea(filter)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleFilter}
          className="bg-[#fa6819] w-full px-[13px] py-2 rounded-xl text-white"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
}
