import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import {
  CreateBooking,
  CreatePost,
  GetCategories,
} from "../../services/fetchAPI";
import { useNavigate } from "react-router-dom";
import sendTelegramMessage from "../../services/sendTele";
import { convertPrice } from "../../utils/convertPrice";

// config giống summernote 
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
export default function CreatePage() {
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
  const user = useSelector((state) => state?.user?.user_data);
  const navigate = useNavigate();
  // Xử lý khi upload file
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages].slice(0, 20));
  };
  // Lấy ra các tỉnh thành phố
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
  // Lấy ra các quận huyện ứng với tỉnh tp được chọn
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

  // Lấy ra các đường phố ứng với quận huyện
  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await fetch(
        `https://provinces.open-api.vn/api/d/${selectedDistrict?.code}?depth=2`
      );
      const data = await response.json();
      const wardOptions = data?.wards.map((ward) => ({
        value: ward.name,
        label: ward.name,
        code: ward.code,
      }));
      setWards(wardOptions);
    };

    if (selectedDistrict?.code) {
      fetchDistricts();
    }
  }, [selectedDistrict]);
  useEffect(() => {
    const fetchProvinces = async () => {
      await GetCategories().then((res) =>
        setCategories(
          res.data.map((data) => {
            return { value: data?.id, label: data?.name };
          })
        )
      );
    };

    fetchProvinces();
  }, []);

  // Xử lý chọn checkbox
  const handleCheckboxChange = (feature) => {
    setSelectedFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
    }));
  };

  //  Xử lý tạo mới bài viết
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("Price", price);
    formData.append("Area", area);
    formData.append("VideoURL", video);
    formData.append("OwnerId", user?.id);
    formData.append("Available", true);
    formData.append("Is_Browse", 0);
    formData.append("CategoryId", selectedCategory?.value);
    formData.append("Location.Province", selectedProvince?.label || "");
    formData.append("Location.District", selectedDistrict?.label || "");
    formData.append("Location.Ward", selectedWard?.label || "");
    formData.append("Location.AddressLine", selectedInfoMore || "");
    formData.append("Location.ProvinceId", selectedProvince?.code);
    formData.append("Location.DistrictId", selectedDistrict?.code);
    formData.append("Location.WardId", selectedWard?.code);
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
      
    await CreatePost(formData)
      .then(async (res) => {
        const postId = res?.data?.id;
        const slugs = res?.data?.slug;
        await CreateBooking(
          { postId: postId, userId: user?.id },
          { headers: { "Content-Type": "application/json" } }
        ).then((res) => {
          // Send Telegram message after successful booking
          const telegramMessage = `<b>🆕 Đơn hàng mới!</b>\n\n<b>📌 Tiêu đề:</b> <a href="${process.env.REACT_APP_FRONT_URL}/${slugs}">${title}</a>\n<b>💰 Giá:</b> ${convertPrice(price)} đồng/tháng\n<b>📏 Diện tích:</b> ${area}m²\n<b>📍 Địa chỉ:</b> ${selectedInfoMore}, ${selectedWard?.label || ''}, ${selectedDistrict?.label || ''}, ${selectedProvince?.label || ''}\n\n<b>👤 Người đăng:</b> ${user?.fullName || 'Unknown User'}\n\n${/cọc|đặt cọc|tiền cọc|đặt tiền cọc|cộc/i.test(description) ? "⚠️ <b>CHÚ Ý:</b> Bài đăng có đề cập đến CỌC, cần xem xét lại nội dung!" : ""}
          `;
          sendTelegramMessage(telegramMessage);
          
          navigate(`/manage/pay/${slugs}`);
        });
      })
      .catch((err) => {
        errorNotify("Thêm thất bại");
      });
  };

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
              onChange={(e) => setSelectedProvince(e)}
              options={provinces}
            />
          </div>
          <div>
            <label for="district" className="block mb-2">
              Quận/Huyện <span className="text-red-500">*</span>
            </label>

            <Select
              placeholder="-- Chọn quận huyện --"
              onChange={(e) => setSelectedDistrict(e)}
              options={districts}
            />
          </div>
          <div>
            <label for="ward" className="block mb-2">
              Phường/Xã
            </label>

            <Select
              placeholder="-- Chọn phường xã --"
              onChange={(e) => setSelectedWard(e)}
              options={wards}
            />
          </div>
          <div>
            <label for="house-number" className="block mb-2">
              Thông tin thêm
            </label>
            <input
              type="text"
              id="house-number"
              onChange={(e) => setSelectedInfoMore(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded outline-none"
              placeholder="Nhập thông tin thêm"
            />
          </div>
        </div>
        <div>
          <label for="address" className="block mb-2">
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 outline-none"
            placeholder="Địa chỉ"
            value={`${`${selectedInfoMore},` || ""}${
              selectedWard?.value ? ` ${selectedWard.value}, ` : ""
            }${selectedDistrict?.value ? `${selectedDistrict.value}, ` : ""}${
              selectedProvince?.value ? `${selectedProvince.value} ` : ""
            }`}
            readOnly
          />
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
            />
          </div>
          <div className="mb-4">
            <label for="title" className="block text-gray-700 font-medium mb-2">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <textarea
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
            {Object.keys(selectedFeatures)
              .slice(0, 4)
              .map((feature) => (
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
            {Object.keys(selectedFeatures)
              .slice(4)
              .map((feature) => (
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
        <label className="border-2 border-dashed border-blue bg-[#e7f0fe] p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer">
          <img
            alt="Upload icon"
            className="mb-2"
            height="50"
            src="https://storage.googleapis.com/a1aa/image/dLOmljRUWL4JL9qXwMDctlsIu2EKwbqRymKeQUMDQgx0ffRoA.jpg"
            width="50"
          />
          <p className="text-blue-600">Tải ảnh từ thiết bị</p>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <ul className="mt-4 text-gray-600 text-sm list-disc list-inside">
          <li>Tải lên tối đa 20 ảnh trong một bài đăng</li>
          <li>Dung lượng ảnh tối đa 10MB</li>
          <li>Hình ảnh phải liên quan đến phòng trọ, nhà cho thuê</li>
          <li>Không chèn văn bản, số điện thoại lên ảnh</li>
          <li>
            Tải lên đúng hình ảnh, vì sau khi đăng không thể chỉnh sửa ảnh
          </li>
        </ul>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Uploaded ${index}`}
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
