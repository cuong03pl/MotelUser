import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertTime } from "../../utils/convertTime";
import Favourite from "../Favourite/Favourite";
import { useSelector } from "react-redux";
import { AddFavoritePost, CheckFavorite } from "../../services/fetchAPI";

export default function PostItem({ data }) {
  const [favourited, setFavourited] = useState(false);
  const user = useSelector((state) => state?.user?.user_data);

  useEffect(() => {
    if (!user || !data?.id) return;

    const fetchAPI = async () => {
      try {
        const res = await CheckFavorite({
          params: {
            userId: user?.id,
            postId: data?.id,
          },
        });

        setFavourited(res?.data); // Chỉ cần cập nhật giá trị từ API
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    fetchAPI();
  }, [data?.id]);

  const handleFavotite = async () => {
    try {
      const res = await AddFavoritePost({
        params: {
          userId: user?.id,
          postId: data?.id,
        },
      });
      setFavourited((prev) => !prev);
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };
  return (
    <div className="p-3 bg-white rounded-lg shadow-xl">
      <div className="max-h-[260px] h-[260px] w-full">
        <img
          className="w-full h-full object-contain"
          src={`${process.env.REACT_APP_API_URL}/${data?.imageUrls[0]}`}
          alt=""
        />
      </div>
      <div className="">
        <h3 class=" text-uppercase mb-2">
          <Link
            to={`/details/${data?.slug}`}
            className=" line-clamp-2 uppercase text-red text-[13px] font-medium py-2"
          >
            {data?.title}
          </Link>
        </h3>
        <div class="mb-2 flex items-center">
          <span class="text-green font-medium  text-[13px]">
            {data?.price} triệu/tháng
          </span>
          <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
          <span className="text-[13px]">
            {data?.area} m<sup>2</sup>
          </span>
          <span class="block w-1 h-1 rounded-full bg-[#aaa] mx-2"></span>
          <Link
            class="text-body text-[13px]"
            title="Cho thuê phòng trọ Quận 12, Hồ Chí Minh"
          >
            {data?.location?.addressLine}, {data?.location?.ward},{" "}
            {data?.location?.district}, {data?.location?.province}
          </Link>
        </div>
        <div className="mb-4 text-[13px] text-[#6C757D] line-clamp-3">
          {data?.description.replace(/<[^>]+>/g, "")}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <img
              className="w-[40px] h-[40px]"
              src={data?.user?.avatar}
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-normal text-[14px]">
                {data?.user?.fullName}
              </span>
              <span className="font-normal text-[12px]">
                {convertTime(data?.createAt)}
              </span>
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <a
              href={`tel/${data?.user?.phoneNumber}`}
              className="p-2 bg-green text-white text-[12px] rounded-lg"
            >
              {data?.user?.phoneNumber}
            </a>
            {user && (
              <Favourite
                favourited={favourited}
                onFavorite={handleFavotite}
                onlyIcon={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
