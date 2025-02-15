import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/user/userSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user_data);
  const [phone, setPhone] = useState(user?.phoneNumber);
  const [fullname, setFullname] = useState(user?.fullName);

  const successNotify = (message) =>
    toast.success(message, {
      position: "bottom-right",
      pauseOnHover: false,
    });

  const handleUpdate = async () => {
    try {
      let url = `https://motel.azurewebsites.net/api/Users/${user?.id}`;
      const res = await axios.put(url, {
        phoneNumber: phone,
        fullName: fullname,
      });
      successNotify("Cập nhật thông tin thành công");
      dispatch(updateUser({ fullName: fullname, phoneNumber: phone }));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  return (
    <div className="max-w-[1000px] m-auto my-[100px] flex justify-center items-center h-full">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-[600px]">
        <div class="flex items-center mb-6">
          <img
            alt="Profile picture placeholder"
            class="w-16 h-16 rounded-full mr-4"
            height="64"
            src="https://storage.googleapis.com/a1aa/image/jnSAZiKxxyJUGpRx9cC2OJA2U6sqnsr51yhgmHEiXjIzSQCF.jpg"
            width="64"
          />
          <div>
            <h2 class="text-xl font-semibold">{user?.fullName}</h2>
            <p class="text-gray-600">{user?.phoneNumber}</p>
          </div>
        </div>
        {/* <button class="flex items-center justify-center w-full py-2 mb-6 border border-gray-300 rounded-lg text-gray-700">
          <i class="fas fa-camera mr-2"></i>
          Đổi ảnh đại diện
        </button> */}
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700">Số điện thoại</label>
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label class="block text-gray-700">Tên liên hệ</label>
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          {/* <div>
            <label class="block text-gray-700">Mật khẩu</label>
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              type="password"
              value="********"
            />
          </div> */}
        </div>
        <button
          onClick={handleUpdate}
          class="w-full py-3 mt-6 text-white bg-red rounded-lg"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
}
