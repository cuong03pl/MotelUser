import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertTime } from "../../utils/convertTime";
import Favourite from "../Favourite/Favourite";
import { useSelector } from "react-redux";
import { AddFavoritePost, CheckFavorite } from "../../services/fetchAPI";
import getProvince from "../../utils/getProvince";
import getLastDate from "../../utils/getLastDate";
import { convertPrice } from "../../utils/convertPrice";

export default function PostItem({ data, gridMode }) {
  
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
    <div className="p-3">
      {gridMode ? (
        <div class="grid-cols-1 grid ">
          <div class=" col-span-1">
            <img
              alt=""
              class="w-full h-full object-cover rounded-lg"
              src={`${process.env.REACT_APP_API_URL}/${data?.imageUrls[0]}`}
            />
          </div>
          <div class="col-span-1 flex flex-col justify-between ml-2">
            <div className="">
            <Link
            to={`/details/${data?.slug}`}
           class="text-[14px] font-bold line-clamp-2"
          >
            {data?.title}
          </Link>
            
              <div className="flex gap-1 items-center">
                <p class="text-red text-[16px] font-semibold">
                  {data?.price} triệu/tháng
                </p>
                <div className="">•</div>
                <p class="text-blackfont-bold text-[12px]">
                  {data?.area} m²
                </p>
              </div>
              <p class="text-gray-500 text-[12px]">
              {getProvince(data?.location?.addressLine)} • {getLastDate(data?.createAt)} ngày trước
              </p>
            </div>
            <div className="flex justify-between">
              <div class="flex items-center mt-2">
                <div class="flex items-center">
                  <img
                    alt="Profile picture of the listing owner"
                    class="w-8 h-8 rounded-full"
                    height="40"
                    src={`${data?.user?.avatar}`}
                    width="40"
                  />
                </div>
                <div className="flex flex-col">
                  <span class="ml-2 text-[12px] font-semibold">
                    {data?.user?.fullName}
                  </span>
                  
                </div>
              </div>
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
      ) : (
        <div className="pt-3 border-t ">
          <div class="grid-cols-4 grid ">
            <div class=" col-span-1">
              <img
                alt=""
                class="w-full h-full object-cover rounded-lg"
                src={`${process.env.REACT_APP_API_URL}/${data?.imageUrls[0]}`}
              />
            </div>
            <div class="col-span-3 flex flex-col justify-between ml-2">
              <div className="">
              <Link
            to={`/details/${data?.slug}`}
           class="text-[14px] font-bold line-clamp-2"
          >
            {data?.title}
          </Link>
             
                <div className="flex gap-1 items-center">
                  <p class="text-red text-[16px] font-semibold">
                    {convertPrice(data?.price)}/tháng
                  </p>
                  <div className="">•</div>
                  <p class="text-blackfont-bold text-[12px]">
                    {data?.area} m²
                  </p>
                </div>
                <p class="text-gray-500 text-[12px]">
                  {getProvince(data?.location?.addressLine)} • {getLastDate(data?.createAt)} ngày trước • Tin ưu tiên
                </p>
              </div>
              <div className="flex justify-between">
                <div class="flex items-center mt-2">
                  <div class="flex items-center">
                    <img
                      alt="Profile picture of the listing owner"
                      class="w-8 h-8 rounded-full"
                      height="40"
                      src={`${data?.user?.avatar}`}
                      width="40"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span class="ml-2 text-[12px] font-semibold">
                      {data?.user?.fullName}
                    </span>
                   
                  </div>
                </div>
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
      )}
    </div>
  );
}
