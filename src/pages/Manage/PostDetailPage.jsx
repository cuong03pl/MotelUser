import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GetCategories,
  GetPostById,
  UpdatePost,
} from "../../services/fetchAPI";
const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};
export default function PostDetailPage() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedWard, setSelectedWard] = useState({});
  const [selectedInfoMore, setSelectedInfoMore] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [video, setVideo] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState({
    "Đầy đủ nội thất": false,
    "Có máy lạnh": false,
    "Có thang máy": false,
    "Có bảo vệ 24/24": false,
    "Có gác": false,
    "Có máy giặt": false,
    "Không chung chủ": false,
    "Có hầm để xe": false,
  });
  const [images, setImages] = useState([]);
  const [post, setPost] = useState({});
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [selectedWardId, setSelectedWardId] = useState(null);
  const { id } = useParams();

  const user = useSelector((state) => state?.user?.user_data);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages].slice(0, 20));
  };

  // Lấy ra các tỉnh thành phố
  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await fetch("https://provinces.open-api.vn/api/v1/p");
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

  // Lấy ra các quận huyện ứng với tỉnh tp được chọn
  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await fetch(
        `https://provinces.open-api.vn/api/v1/p/${selectedProvinceId}?depth=2`
      );
      const data = await response.json();

      const districtOptions = data?.districts.map((district) => ({
        value: district.name,
        label: district.name,
        code: district.code,
      }));
      setDistricts(districtOptions);
    };
    if (selectedProvinceId) {
      fetchDistricts();
    }
  }, [selectedProvinceId]);

  // Lấy ra các đường phố ứng với quận huyện
  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await fetch(
        `https://provinces.open-api.vn/api/v1/d/${selectedDistrictId}?depth=2`
      );
      const data = await response.json();
      const wardOptions = data?.wards.map((ward) => ({
        value: ward.name,
        label: ward.name,
        code: ward.code,
      }));
      setWards(wardOptions);
    };

    if (selectedDistrictId) {
      fetchDistricts();
    }
  }, [selectedDistrictId, selectedDistrict]);
  useEffect(() => {
    const fetchProvinces = async () => {
      await GetCategories().then((res) => {
        setCategories(
          res.data.map((data) => {
            return { value: data?.id, label: data?.name };
          })
        );
      });
    };

    fetchProvinces();
  }, []);
  const handleCheckboxChange = (feature) => {
    setSelectedFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
    }));
  };
  // Xử lý update bài viết
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("Price", price);
    formData.append("Area", area);
    formData.append("VideoURL", video);
    formData.append("OwnerId", user?.id);
    formData.append("Available", post?.available);
    formData.append("Is_Browse", post?.is_Browse);
    formData.append("CategoryId", selectedCategory.value || selectedCategory);

    formData.append(
      "Location.Province",
      selectedProvince?.label || post?.location?.province
    );
    formData.append(
      "Location.District",
      selectedDistrict?.label || post?.location?.district
    );
    formData.append(
      "Location.Ward",
      selectedWard?.label || post?.location?.ward
    );
    formData.append("Location.AddressLine", selectedInfoMore || "");

    formData.append(
      "Location.ProvinceId",
      selectedProvince?.code || selectedProvinceId
    );
    formData.append(
      "Location.DistrictId",
      selectedDistrict?.code || selectedDistrictId
    );
    formData.append("Location.WardId", selectedWard?.code || selectedWardId);
    if (selectedFeatures) {
      Object.entries(selectedFeatures).forEach(([key, value]) => {
        formData.append(`Amenities[${key}]`, value);
      });
    }
    const imagePromises = images.map(async (imageUrl) => {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `image-${Date.now()}.png`, {
        type: blob.type,
      });
      return file;
    });

    const imageFiles = await Promise.all(imagePromises);
    imageFiles.forEach((file) => {
      formData.append("imageFiles", file);
    });

    const errorNotify = (message) =>
      toast.error(message, {
        position: "bottom-right",
        pauseOnHover: false,
      });
    const successNotify = (message) =>
      toast.success(message, {
        position: "bottom-right",
        pauseOnHover: false,
      });
    await UpdatePost(post?.id, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        successNotify("Sửa bài viết thành công. Vui lòng đợi xét duyệt");
      })
      .catch((err) => {
        errorNotify("Thêm thất bại");
      });
  };
  useEffect(() => {
    const fetchAPI = async () => {
      await GetPostById(id).then((res) => {
        setSelectedCategory(res?.data?.categoryId);
        setDescription(res?.data?.description);
        setTitle(res?.data?.title);
        setPrice(res?.data?.price);
        setArea(res?.data?.area);
        setSelectedProvinceId(res?.data?.location?.provinceId);
        setSelectedDistrictId(res?.data?.location?.districtId);
        setSelectedWardId(res?.data?.location?.wardId);
        setSelectedInfoMore(res?.data?.location?.addressLine);
        setSelectedFeatures(res?.data?.amenities);
        setImages(res?.data?.imageUrls);
        setPost(res?.data);
      });
    };

    fetchAPI();
  }, [id]);
  return (
    <div className=" max-w-[1000px] m-auto my-[100px] flex flex-col items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[800px]">
        <h2 className="text-xl font-bold mb-4">Khu vực</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="city" className="block mb-2">
              Tỉnh/TP <span className="text-red-500">*</span>
            </label>
            <Select
              placeholder="-- Chọn Tỉnh/Thành Phố --"
              onChange={(e) => {
                setSelectedProvince(e);
                setSelectedProvinceId(e.code);
              }}
              options={provinces}
              value={provinces.filter(
                (data) => data?.code === selectedProvinceId
              )}
            />
          </div>
          <div>
            <label for="district" className="block mb-2">
              Quận/Huyện <span className="text-red-500">*</span>
            </label>
            <Select
              placeholder="-- Chọn quận huyện --"
              onChange={(e) => {
                setSelectedDistrict(e);
                setSelectedDistrictId(e.code);
              }}
              options={districts}
              value={districts.filter(
                (data) => data?.code === selectedDistrictId
              )}
            />
          </div>
          <div>
            <label for="ward" className="block mb-2">
              Phường/Xã
            </label>
            <Select
              placeholder="-- Chọn phường xã --"
              onChange={(e) => {
                setSelectedWard(e);
                setSelectedWardId(e.code);
              }}
              options={wards}
              value={wards.filter((data) => data?.code === selectedWardId)}
            />
          </div>
          <div>
            <label for="house-number" className="block mb-2">
              Thông tin thêm
            </label>
            <input
              type="text"
              id="house-number"
              value={selectedInfoMore}
              onChange={(e) => setSelectedInfoMore(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded outline-none"
              placeholder="Nhập thông tin thêm"
            />
          </div>
        </div>
      </div>

      <div className=" bg-white p-8 rounded-lg shadow-md w-full max-w-[800px] mt-5">
        <h2 className="text-xl font-semibold mb-6">Thông tin mô tả</h2>
        <form>
          <div className="mb-4">
            <label
              for="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Loại chuyên mục <span className="text-red-500">*</span>
            </label>

            <Select
              placeholder="-- Chọn loại chuyên mục --"
              onChange={(e) => setSelectedCategory(e)}
              options={categories}
              value={categories?.filter(
                (data) =>
                  data?.value === selectedCategory ||
                  data?.value === selectedCategory?.value
              )}
            />
          </div>
          <div className="mb-4">
            <label for="title" className="block text-gray-700 font-medium mb-2">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <textarea
              value={title}
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none"
            ></textarea>
            <p className="text-gray-500 text-sm mt-1">
              (Tối thiểu 30 ký tự, tối đa 100 ký tự)
            </p>
          </div>
          <div className="mb-4">
            <label
              for="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Nội dung mô tả <span className="text-red-500">*</span>
            </label>
            <ReactQuill
              modules={modules}
              value={description}
              onChange={setDescription}
              theme="snow"
            />
            <p className="text-gray-500 text-sm mt-1">
              (Tối thiểu 50 ký tự, tối đa 5000 ký tự)
            </p>
          </div>
          <div className="mb-4">
            <label for="price" className="block text-gray-700 font-medium mb-2">
              Giá cho thuê <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-l-lg p-2 outline-none"
              />
              <select className="border border-gray-300 rounded-r-lg p-2">
                <option>đồng/tháng</option>
              </select>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1
            </p>
          </div>
          <div className="mb-4">
            <label for="area" className="block text-gray-700 font-medium mb-2">
              Diện tích <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input
                type="text"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full border border-gray-300 rounded-l-lg p-2 outline-none"
              />
              <span className="border border-gray-300 rounded-r-lg p-2 bg-gray-100">
                m<sup>2</sup>
              </span>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[800px] mt-5">
        <h2 className="text-xl font-semibold mb-4">Đặc điểm nổi bật</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            {selectedFeatures &&
              Object?.keys(selectedFeatures)
                .slice(0, 4)
                ?.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox outline-none"
                      checked={selectedFeatures[feature]}
                      onChange={() => handleCheckboxChange(feature)}
                    />
                    <span>{feature}</span>
                  </label>
                ))}
          </div>
          <div>
            {selectedFeatures &&
              Object?.keys(selectedFeatures)
                .slice(4)
                ?.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox outline-none"
                      checked={selectedFeatures[feature]}
                      onChange={() => handleCheckboxChange(feature)}
                    />
                    <span>{feature}</span>
                  </label>
                ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[800px] mt-5">
        <h2 className="text-xl font-semibold mb-4">Hình ảnh</h2>

        <p className="text-red italic">
          Để tránh đảm bảo hình ảnh chính xác chúng tôi không cho phép bạn chỉnh
          sửa hình ảnh
        </p>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {images?.map((img, index) => (
            <img
              key={index}
              alt={`Uploaded ${index}`}
              src={`${process.env.REACT_APP_API_URL}/${img}`}
              className="w-full h-24 object-cover rounded"
            />
          ))}
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-[800px] mt-5">
        <h2 class="text-xl font-semibold mb-4">Video</h2>
        <div class="mb-4">
          <label
            class="block text-sm font-medium text-gray-700"
            for="video-link"
          >
            Video Link (Youtube)
          </label>
          <input
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="video-link"
            type="text"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
        <div class="mb-4 text-sm text-gray-600">
          <p class="font-semibold">Lưu ý:</p>
          <p>
            Bạn có thể chọn video từ Youtube để hiển thị trên bài viết của mình.
          </p>
          <p>https://www.youtube.com/watch?v=xxxxxxxxxxx</p>
        </div>
      </div>

      <div
        onClick={handleSubmit}
        className="bg-[#fa6819] hover:opacity-75 p-2 rounded-lg shadow-md flex items-center justify-center w-full max-w-[800px] mt-5 text-white cursor-pointer"
      >
        Tiếp tục
      </div>
    </div>
  );
}
