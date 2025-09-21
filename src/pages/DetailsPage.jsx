/** @format */

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import Tags from "../components/Tags/Tags";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { convertTime } from "../utils/convertTime";
import News from "../components/News/News";
import Favourite from "../components/Favourite/Favourite";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import CustomModal from "../components/Modal/Modal";
import ShareModal from "../components/Modal/ShareModal";
import ReportModal from "../components/Modal/ReportModal";
import Comment from "../components/Comment/Comment";
import Map from "../components/Map/Map";
import AmenitiesIcons from "../components/AmenitiesIcons/AmenitiesIcons";
import { toast } from "react-toastify";
import {
  AddFavoritePost,
  CheckFavorite,
  CreateConversation,
  GetCountUserPost,
  GetPostById,
  GetPostsByProvinceSlug,
  GetUserPosts,
} from "../services/fetchAPI";
import { convertPrice } from "../utils/convertPrice";
import {
  LocationIcon,
  PhoneIcon,
  ChatDotsIcon,
  ShareIcon,
  WarningIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "../components/Icon/Icon";

Modal.setAppElement("#root");
export default function DetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatePosts, setRelatePosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [countPost, setCountPost] = useState(0);
  const [favourited, setFavourited] = useState(false);
  const user = useSelector((state) => state?.user?.user_data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
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
  // Lấy ra thông tin chi tiết bài viết
  useEffect(() => {
    const fetchAPI = async () => {
      await GetPostById(id).then((res) => {
        setPost(res?.data?.data);
        setSelectedFeatures(res?.data?.data?.amenities);
      });
    };

    fetchAPI();
  }, [id]);

  // Lấy bài viết thông qua tỉnh thành phố
  useEffect(() => {
    if (!post?.id) return;

    const fetchAPI = async () => {
      try {
        const res = await GetPostsByProvinceSlug(post?.id, {
          params: {
            page: 1,
            pageSize: 10,
          },
        });

        setRelatePosts(res?.data?.data?.data);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    fetchAPI();
  }, [post?.id]);

  // Lấy các bài viết của người đăng
  useEffect(() => {
    if (!post?.id) return;

    const fetchAPI = async () => {
      try {
        const res = await GetUserPosts(post?.ownerId);
        setUserPosts(res?.data?.data);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    fetchAPI();
  }, [post?.ownerId]);

  // Lấy số lượng bài viết của 1 user
  useEffect(() => {
    if (!post?.ownerId) return;
    const fetchAPI = async () => {
      await GetCountUserPost(post?.ownerId).then((res) => {
        setCountPost(res?.data?.data?.postCount);
      });
    };
    fetchAPI();
  }, [post]);

  // check favourite
  useEffect(() => {
    if (!user || !post?.id) return;

    const fetchAPI = async () => {
      try {
        const res = await CheckFavorite({
          params: {
            userId: user?.id,
            postId: post?.id,
          },
        });

        setFavourited(res?.data);
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    fetchAPI();
  }, [post?.id]);

  const handleFavorite = async () => {
    try {
      const res = await AddFavoritePost({
        params: {
          userId: user?.id,
          postId: post?.id,
        },
      });
      setFavourited((prev) => !prev);
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  const handleOpenModal = (Component) => {
    if (typeof Component == "function") {
      setModalContent(
        <Component onClose={handleOpenModal} postId={post?.id} />
      );
    }
    setIsModalOpen((prev) => !prev);
  };

  const handleChat = async () => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để sử dụng tính năng chat", {
        position: "bottom-right",
        pauseOnHover: false,
      });
      navigate("/login", { state: { from: `/details/${id}` } });
      return;
    }

    const response = await CreateConversation({
      senderId: user.id,
      receiverId: post?.ownerId,
    });

    navigate(`/chat/${response?.data?.id}`);
  };
  return (
    <div className=" max-w-[1000px] m-auto ">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className=" flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="max-h-[260px] h-[260px] w-full bg-white">
                {/* Ảnh */}
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
                {/* Thông tin bài viết */}
                <div className="py-5 ">
                  <h3 className="text-black text-[16px] font-semibold">
                    {post?.title}
                  </h3>
                  <div className="flex items-center gap-2 py-2">
                    <LocationIcon className="w-[13px] h-[13px]" />
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
                <div className="py-5">
                  <h4 className="font-medium text-[18px]">Mô tả chi tiết</h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: post?.description }}
                  />
                </div>

                {/* Vị trí */}
                <div className="py-5">
                  <h4 className="font-medium text-[18px] mb-3">Vị trí</h4>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="mb-3">
                      <div className="flex items-center gap-2">
                        <LocationIcon className="w-[16px] h-[16px] text-red-500" />
                        <span className="text-[14px] font-medium">
                          {post?.location?.addressLine}, {post?.location?.ward},{" "}
                          {post?.location?.district}, {post?.location?.province}
                        </span>
                      </div>
                    </div>
                    <Map address={post?.location} />
                  </div>
                </div>
                {/* Đặc điểm nổi bật */}
                <div className="py-5">
                  <h2 className="text-xl font-semibold mb-4">
                    Đặc điểm nổi bật
                  </h2>
                  <AmenitiesIcons amenities={selectedFeatures} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Tags></Tags>
          </div>
        </div>
        <div className="w-full">
          {/* Thông tin người đăng */}
          <div className="bg-white p-3">
            <div className="flex flex-col gap-3 items-center">
              <div className="border border-solid border-[#ccc] p-1 rounded-full">
                <img
                  className="w-[100px] h-[100px]"
                  src={post?.user?.avatar}
                  alt=""
                />
              </div>
              <div className=" flex flex-col items-center w-full">
                <span className="text-[16px] font-semibold">
                  {post?.user?.fullName}
                </span>
                <div class="my-2 flex items-center">
                  <span className="text-[13px]">{countPost} tin đăng</span>
                  <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                  <span className="text-[13px]">
                    {" "}
                    Tham gia từ: {convertTime(post?.user?.createdOn)}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="flex w-full items-center justify-center gap-2 bg-green px-3 py-2 rounded-lg text-white">
                    <PhoneIcon className="w-[18px] h-[18px]" />
                    <a
                      href={`tel:${post?.user?.phoneNumber}`}
                      className="text-[18px]"
                    >
                      {post?.user?.phoneNumber}{" "}
                    </a>
                  </div>
                  <div
                    onClick={() => handleChat()}
                    className="flex items-center justify-center gap-2 bg-blue px-3 py-2 rounded-lg text-white w-full cursor-pointer"
                  >
                    <ChatDotsIcon className="w-[18px] h-[18px]" />

                    <span className="text-[18px]">Chat</span>
                  </div>
                </div>
                <div class="flex gap-5 items-center py-3 w-full justify-between">
                  <Favourite
                    onFavorite={handleFavorite}
                    favourited={favourited}
                  />

                  <div
                    onClick={() => handleOpenModal(ShareModal)}
                    class="flex items-center space-x-1 cursor-pointer"
                  >
                    <ShareIcon className="w-[16px] h-[16px]" />

                    <span class="text-[14px]">Chia sẻ</span>
                  </div>
                  <div
                    onClick={() => handleOpenModal(ReportModal)}
                    class="flex items-center space-x-1 cursor-pointer"
                  >
                    <WarningIcon className="w-[16px] h-[16px]" />

                    <span class="text-[14px]">Báo xấu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white mt-5 p-3">
            <RecentPosts />
          </div>
          <News />
        </div>
      </div>
      <div className="bg-white mt-5 p-3 rounded-md">
        <Comment slug={id} postId={post?.id} />
      </div>
      {/* Tin đăng cùng khu vực */}
      <div className="bg-white mt-5 p-3 rounded-md">
        <div className="justify-between flex items-center">
          <h3 className="font-semibold">Tin đăng cùng khu vực </h3>
          <div className="flex gap-2">
            <button className="swiper-button-prev swiper-prev-1 !static !mt-0 !h-[40px] !w-[40px] bg-white border border-[#ccc] border-solid rounded-lg !text-red">
              <ArrowLeftIcon className="!w-[20px] !h-[20px]" />
            </button>
            <button className="swiper-button-next swiper-next-1 !static !mt-0 !h-[40px] !w-[40px] bg-white border border-[#ccc] border-solid rounded-lg !text-red">
              <ArrowRightIcon className="!w-[20px] !h-[20px]" />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <Swiper
            className=" h-full py-3"
            spaceBetween={30}
            slidesPerView={4}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".swiper-prev-1",
              nextEl: ".swiper-next-1",
            }}
            modules={[Navigation]}
          >
            {relatePosts?.map((res, index) => {
              return (
                <SwiperSlide className="w-full h-full">
                  <div className="">
                    <img
                      className="rounded-lg object-contain h-[174px] w-[232px] "
                      src={`${process.env.REACT_APP_API_URL}/${res?.imageUrls[0]}`}
                      alt=""
                    />
                    <div className="pt-[10px]">
                      <Link
                        to={`/details/${res?.slug}`}
                        className="uppercase text-[14px] font-semibold text-[#055699] line-clamp-2"
                      >
                        {res?.title}
                      </Link>
                      <div class="mb-2 flex items-center">
                        <span class="text-green font-medium  text-[13px]">
                          {res?.price} triệu/tháng
                        </span>
                        <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                        <span className="text-[13px]">
                          {res?.area} m<sup>2</sup>
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      {/* Tin đăng khác của người đăng */}
      <div className="bg-white mt-5 p-3 rounded-md">
        <div className="justify-between flex items-center">
          <h3 className="font-semibold">
            Tin đăng khác của {post?.user?.fullName}{" "}
          </h3>
          <div className="flex gap-2">
            <button className="swiper-button-prev swiper-prev-2 !static !mt-0 !h-[40px] !w-[40px] bg-white border border-[#ccc] border-solid rounded-lg !text-red">
              <ArrowLeftIcon className="!w-[20px] !h-[20px]" />
            </button>
            <button className="swiper-button-next swiper-next-2 !static !mt-0 !h-[40px] !w-[40px] bg-white border border-[#ccc] border-solid rounded-lg !text-red">
              <ArrowRightIcon className="!w-[20px] !h-[20px]" />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <Swiper
            className=" h-full py-3"
            spaceBetween={30}
            slidesPerView={4}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".swiper-prev-2",
              nextEl: ".swiper-next-2",
            }}
            modules={[Navigation]}
          >
            {userPosts?.map((res, index) => {
              return (
                <SwiperSlide className="w-full h-full">
                  <div className="">
                    <img
                      className="rounded-lg object-contain h-[174px] w-[232px] "
                      src={`${process.env.REACT_APP_API_URL}/${res?.imageUrls[0]}`}
                      alt=""
                    />
                    <div className="pt-[10px]">
                      <Link
                        to={`/details/${res?.slug}`}
                        className="uppercase text-[14px] font-semibold text-[#055699] line-clamp-2"
                      >
                        {res?.title}
                      </Link>
                      <div class="mb-2 flex items-center">
                        <span class="text-green font-medium  text-[13px]">
                          {res?.price} triệu/tháng
                        </span>
                        <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
                        <span className="text-[13px]">
                          {res?.area} m<sup>2</sup>
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <CustomModal
        content={modalContent}
        isOpen={isModalOpen}
        onClose={handleOpenModal}
      ></CustomModal>
    </div>
  );
}
