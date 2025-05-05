import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  CreateBooking,
  GetPostById,
  UpdateBookingStatus,
  GetBookingByPost,
} from "../../services/fetchAPI";
import { checkPayment, paymentConfig } from "../../utils/payment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Map from "../../components/Map/Map";
import { convertPrice } from "../../utils/convertPrice";
import sendTelegramMessage from "../../services/sendTele";
export default function PaymentPage() {
  const { postId } = useParams();
  const user = useSelector((state) => state?.user?.user_data);
  const [isDeposited, setIsDeposited] = useState(false);
  const [post, setPost] = useState(null);
  const [booking, setBooking] = useState(null);
  const intervalRef = useRef(null);
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
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetPostById(postId);

        if (res?.data) {
          setPost(res?.data);
          setSelectedFeatures(res?.data?.amenities);
          
          // Fetch booking information after getting post details
          const bookingRes = await GetBookingByPost(res?.data?.id);
          if (bookingRes?.data) {
            console.log(bookingRes);
            
            setBooking(bookingRes?.data?.data[0]);
            console.log(bookingRes?.data?.data[0]);
            
          }
        }
      } catch (error) {}
    };

    fetchAPI();
  }, [postId]);

  const handleDeposit = async () => {
    try {
      const res = await UpdateBookingStatus(
        { postId: post?.id, userId: user?.id },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {}
  };
  const successNotify = (message) =>
    toast.success(message, {
      position: "bottom-right",
      pauseOnHover: false,
    });
  useEffect(() => {
    if (isDeposited) return;
    intervalRef.current = setInterval(async () => {
      const isCheck = await checkPayment();

      if (isCheck) {
        handleDeposit();
        clearInterval(intervalRef.current);
        setIsDeposited(true);
        successNotify("Thanh toán thành công");
        
        const telegramMessage = `<b>✅ Thanh toán thành công!</b>\n\n<b>📌 Tiêu đề:</b> ${post?.title}\n<b>💰 Giá:</b> ${convertPrice(post?.price)} đồng/tháng\n<b>📏 Diện tích:</b> ${post?.area}m²\n<b>📍 Địa chỉ:</b> ${post?.location?.addressLine}, ${post?.location?.ward}, ${post?.location?.district}, ${post?.location?.province}\n\n<b>👤 Người đăng:</b> ${user?.fullName || 'Unknown User'}`;
        sendTelegramMessage(telegramMessage);
      }
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [post?.id]);
  return (
    <div className="  max-w-[1000px] m-auto my-[100px] flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="text-black text-[28px] font-bold">Xem trước</div>
          <div className=" flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="max-h-[260px] h-[260px] w-full bg-white">
                <Swiper
                  className="mySwiper h-full"
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                >
                  {post?.imageUrls?.map((img, index) => {
                    return (
                      <SwiperSlide className="w-full h-full">
                        <img
                          className="w-full h-full object-contain"
                          src={`${process.env.REACT_APP_API_URL}/${img}`}
                          alt=""
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="py-5 ">
                  <h3 className="text-black text-[16px] font-semibold">
                    {post?.title}
                  </h3>
                  <div className="flex items-center gap-2 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-[13px] h-[13px]"
                    >
                      <path
                        fill-rule="evenodd"
                        d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span className="text-[13px]">
                      {post?.location?.addressLine}, {post?.location?.ward},{" "}
                      {post?.location?.district}, {post?.location?.province}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div class="mb-2 flex items-center">
                      <span class="text-[#e5193b] font-bold  text-[16px]">
                        {post?.price} triệu/tháng
                      </span>
                      <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                      <span className="text-[13px]">
                        {post?.area} m<sup>2</sup>
                      </span>
                      <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                      <Link class="text-body text-[13px]">
                        {post?.location?.district}, {post?.location?.province}
                      </Link>
                    </div>
                    {/* {!deposite && (
                      <div className="">
                        <Link
                          to={`/pay/${post?.slug}`}
                          class=" text-white bg-red  font-medium rounded-lg text-sm px-5 py-2.5 "
                        >
                          Đặt cọc
                        </Link>
                      </div>
                    )} */}
                  </div>
                </div>
                <div class="">
                  <div class="flex items-center justify-between py-2 border-b">
                    <div class="flex items-center">
                      <i class="fas fa-ruler-combined text-xl"></i>
                      <span class="ml-2">Diện tích</span>
                    </div>
                    <span class="font-bold">{post?.area} m²</span>
                  </div>

                  <div class="flex items-center justify-between py-2">
                    <div class="flex items-center">
                      <i class="fas fa-key text-xl"></i>
                      <span class="ml-2">Số tiền cọc</span>
                    </div>
                    <span class="font-bold">{convertPrice(post?.price)}</span>
                  </div>
                </div>
                {/* Description */}
                <div className="py-5">
                  <h4 className="font-medium text-[18px]">Mô tả chi tiết</h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: post?.description }}
                  />
                </div>

                <div className="py-5">
                  <h4 className="font-medium text-[18px] mb-3">Vị trí</h4>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="mb-3">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-[16px] h-[16px] text-red-500"
                        >
                          <path
                            fill-rule="evenodd"
                            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="text-[14px] font-medium">
                          {post?.location?.addressLine}, {post?.location?.ward},{" "}
                          {post?.location?.district}, {post?.location?.province}
                        </span>
                      </div>
                    </div>
                    <Map address={post?.location} />
                  </div>
                </div>
                <div className="py-5">
                  <h2 className="text-xl font-semibold mb-4">
                    Đặc điểm nổi bật
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      {Object?.keys(selectedFeatures)
                        ?.slice(0, 4)
                        .map((feature) => (
                          <label
                            key={feature}
                            className="flex items-center space-x-2 mt-2"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox outline-none"
                              checked={selectedFeatures[feature]}
                              readOnly
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
                              readOnly
                            />
                            <span>{feature}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div class="w-full">
            <div class="text-black text-center">
              Quét mã QR để thanh toán
            </div>
            <div class="flex justify-center items-center mt-3">
              <img src={booking ? paymentConfig(booking?.price * 1000000) : 10000000} alt="" />
            </div>
            
            <div className="mt-6 bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-center mb-3">Bảng Phí</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b border-r text-left">Giá thuê (triệu/tháng)</th>
                      <th className="py-2 px-4 border-b text-left">Phí</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={`${post?.price < 3 ? 'bg-blue-50' : ''}`}>
                      <td className="py-2 px-4 border-b border-r">Dưới 3 triệu</td>
                      <td className="py-2 px-4 border-b">100.000 VND</td>
                    </tr>
                    <tr className={`${post?.price >= 3 && post?.price <= 5 ? 'bg-blue-50' : ''}`}>
                      <td className="py-2 px-4 border-b border-r">Từ 3 đến 5 triệu</td>
                      <td className="py-2 px-4 border-b">150.000 VND</td>
                    </tr>
                    <tr className={`${post?.price > 5 ? 'bg-blue-50' : ''}`}>
                      <td className="py-2 px-4 border-b border-r">Trên 5 triệu</td>
                      <td className="py-2 px-4 border-b">200.000 VND</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Phí thanh toán của bạn:</span> {' '}
                  {post?.price < 3 
                    ? '100.000 VND' 
                    : post?.price <= 5 
                      ? '150.000 VND' 
                      : '200.000 VND'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
