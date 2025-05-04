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
    <div className="p-3 h-full">
      {gridMode ? (
        <div className="grid grid-cols-1 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white h-full flex flex-col">
          <div className="col-span-1 relative overflow-hidden h-48">
            <img
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              src={`${process.env.REACT_APP_API_URL}/${data?.imageUrls[0]}`}
            />
          
            
          </div>
          <div className="col-span-1 flex flex-col p-3 flex-grow">
            <div className="flex flex-col flex-grow">
              <div className="min-h-[50px] flex flex-col justify-center mb-2">
                <Link
                  to={`/details/${data?.slug}`}
                  className="text-[16px] font-bold line-clamp-2 hover:text-blue-600 transition-colors"
                >
                  {data?.title}
                </Link>
              </div>
            
              <div className="space-y-1 mt-1">
                <p className="text-red-600 text-[16px] font-semibold">
                  {data?.price} triệu/tháng
                  
                </p>
                <p className="text-gray-700 text-[14px]">
                  <span className="font-semibold">{data?.area} m²</span>
                </p>
                <p className="text-gray-500 text-[12px]">
                  {getProvince(data?.location?.addressLine)}
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center">
                <div className="flex items-center">
                  <img
                    alt="Profile picture of the listing owner"
                    className="w-8 h-8 rounded-full border border-gray-200"
                    height="40"
                    src={`${data?.user?.avatar}`}
                    width="40"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="ml-2 text-[12px] font-semibold">
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
        <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white h-full">
          <div className="grid grid-cols-4 gap-3 p-3 h-full">
            <div className="col-span-1 relative overflow-hidden">
              <img
                alt=""
                className="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                src={`${process.env.REACT_APP_API_URL}/${data?.imageUrls[0]}`}
              />
             
              
            </div>
            <div className="col-span-3 flex flex-col justify-between">
              <div className="flex-grow">
                <div className="h-[48px] mb-2">
                  <Link
                    to={`/details/${data?.slug}`}
                    className="text-[16px] font-bold line-clamp-2 hover:text-blue-600 transition-colors"
                  >
                    {data?.title}
                  </Link>
                </div>
             
                <div className="flex gap-1 items-center mt-2">
                  <p className="text-red-600 text-[16px] font-semibold">
                    {convertPrice(data?.price)}/tháng
                  </p>
                 
                  <div className="">•</div>
                  <p className="text-black font-bold text-[12px]">
                    {data?.area} m²
                  </p>
                </div>
                <p className="text-gray-500 text-[12px] mt-1">
                  {getProvince(data?.location?.addressLine)} • {getLastDate(data?.createAt)} ngày trước • Tin ưu tiên
                </p>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <img
                      alt="Profile picture of the listing owner"
                      className="w-8 h-8 rounded-full border border-gray-200"
                      height="40"
                      src={`${data?.user?.avatar}`}
                      width="40"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="ml-2 text-[12px] font-semibold">
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
