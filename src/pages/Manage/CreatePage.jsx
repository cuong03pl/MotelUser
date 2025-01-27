import React from "react";

export default function CreatePage() {
  return (
    <div className="max-w-[1000px] m-auto my-[100px]">
      <div className="bg-white p-6 rounded-lg shadow-md w-full min-w-[800px]">
        <h2 className="text-xl font-bold mb-4">Khu vực</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="city" className="block mb-2">
              Tỉnh/Thành phố <span className="text-red-500">*</span>
            </label>
            <select
              id="city"
              className="w-full p-2 border border-gray-300 rounded outline-none"
            >
              <option>-- Chọn Tỉnh/TP --</option>
            </select>
          </div>
          <div>
            <label for="district" className="block mb-2">
              Quận/Huyện <span className="text-red-500">*</span>
            </label>
            <select
              id="district"
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option>-- Chọn quận huyện --</option>
            </select>
          </div>
          <div>
            <label for="ward" className="block mb-2">
              Phường/Xã
            </label>
            <select
              id="ward"
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option>-- Chọn phường xã --</option>
            </select>
          </div>
          <div>
            <label for="street" className="block mb-2">
              Đường/Phố
            </label>
            <select
              id="street"
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option>-- Chọn đường phố --</option>
            </select>
          </div>
          <div>
            <label for="house-number" className="block mb-2">
              Số nhà
            </label>
            <input
              type="text"
              id="house-number"
              className="w-full p-2 border border-gray-300 rounded outline-none"
              placeholder="Nhập số nhà"
            />
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
              readonly
            />
          </div>
        </div>
      </div>

      <div className=" bg-white p-8 rounded-lg shadow-md w-full min-w-[800px] mt-5">
        <h2 className="text-xl font-semibold mb-6">Thông tin mô tả</h2>
        <form>
          <div className="mb-4">
            <label
              for="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Loại chuyên mục <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              className="w-full border border-gray-300 rounded-lg p-2 outline-none"
            >
              <option>-- Chọn loại chuyên mục --</option>
            </select>
          </div>
          <div className="mb-4">
            <label for="title" className="block text-gray-700 font-medium mb-2">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 rounded-lg p-2 outline-none"
            />
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
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded-lg p-2 h-32 outline-none"
            ></textarea>
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
                className="w-full border border-gray-300 rounded-l-lg p-2 outline-none"
              />
              <select className="border border-gray-300 rounded-r-lg p-2">
                <option>đồng/tháng</option>
              </select>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000
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
                className="w-full border border-gray-300 rounded-l-lg p-2 outline-none"
              />
              <span className="border border-gray-300 rounded-r-lg p-2 bg-gray-100">
                m<sup>2</sup>
              </span>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full min-w-[800px] mt-5">
        <h2 className="text-xl font-semibold mb-4">Đặc điểm nổi bật</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox outline-none" />
              <span>Đầy đủ nội thất</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" className="form-checkbox outline-none" />
              <span>Có máy lạnh</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" className="form-checkbox outline-none" />
              <span>Có thang máy</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" className="form-checkbox outline-none" />
              <span>Có bảo vệ 24/24</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox outline-none" />
              <span>Có gác</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" className="form-checkbox outline-none" />
              <span>Có máy giặt</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" className="form-checkbox outline-none" />
              <span>Không chung chủ</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" className="form-checkbox outline-none" />
              <span>Có hầm để xe</span>
            </label>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md w-full min-w-[800px] mt-5">
        <h2 class="text-xl font-semibold mb-4">Hình ảnh</h2>
        <div class="border-2 border-dashed border-blue bg-[#e7f0fe] p-6 rounded-lg flex flex-col items-center justify-center">
          <img
            alt="Upload icon with a camera and an upward arrow"
            class="mb-2"
            height="50"
            src="https://storage.googleapis.com/a1aa/image/dLOmljRUWL4JL9qXwMDctlsIu2EKwbqRymKeQUMDQgx0ffRoA.jpg"
            width="50"
          />
          <p class="text-blue-600">Tải ảnh từ thiết bị</p>
        </div>
        <ul class="mt-4 text-gray-600 text-sm list-disc list-inside">
          <li>Tải lên tối đa 20 ảnh trong một bài đăng</li>
          <li>Dung lượng ảnh tối đa 10MB</li>
          <li>Hình ảnh phải liên quan đến phòng trọ, nhà cho thuê</li>
          <li>Không chèn văn bản, số điện thoại lên ảnh</li>
        </ul>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg w-full min-w-[800px] mt-5">
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

      <div class="bg-white p-6 rounded-lg shadow-md w-full min-w-[800px] mt-5">
        <h2 class="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-2">Họ Tên</label>
            <input
              type="text"
              value=""
              class="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label class="block mb-2">Số điện thoại</label>
            <input
              type="text"
              value=""
              class="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
