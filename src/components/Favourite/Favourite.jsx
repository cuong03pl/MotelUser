import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { HeartFilledIcon, HeartOutlineIcon } from "../Icon/Icon";

export default function Favourite({
  favourited,
  onFavorite,
  onlyIcon = false,
}) {
  const user = useSelector((state) => state?.user?.user_data);
  const token = useSelector((state) => state?.user?.user_token);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isAnimating, setIsAnimating] = useState(false);

  // Xử lý yêu thích bài viết
  const handleFavotite = () => {
    // Kiểm tra đăng nhập
    if (!user || !token) {
      toast.error('Bạn cần đăng nhập để sử dụng tính năng này', {
        position: 'bottom-right',
        pauseOnHover: false,
      });
      // Lưu trang hiện tại và redirect về login
      navigate('/login', { 
        state: { from: location } 
      });
      return;
    }

    // Trigger animation nếu user đã đăng nhập
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    onFavorite();
  };

  return (
    <button
      onClick={handleFavotite}
      className={`flex flex-row items-center gap-2 rounded-lg px-2 py-2 text-sm hover:text-red-500 hover:bg-gray-100 transition-all ${
        onlyIcon ? "p-1" : ""
      }`}
    >
      {favourited ? (
        <HeartFilledIcon 
          className={`w-6 h-6 transform transition-transform ${isAnimating ? 'scale-125' : ''}`}
        />
      ) : (
        <HeartOutlineIcon 
          className="w-6 h-6 hover:text-red-500 transition-colors"
        />
      )}
      {!onlyIcon && <span>Yêu thích</span>}
    </button>
  );
}
