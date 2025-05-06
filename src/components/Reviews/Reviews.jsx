import React, { useState } from "react";

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample reviews data - this could be fetched from an API in a real implementation
  const reviews = [
    {
      id: 1,
      name: "Nguyễn Văn Anh",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      location: "Hà Nội",
      rating: 5,
      text: "Tôi đã tìm được phòng trọ ưng ý chỉ sau 2 ngày đăng tin trên Phongtro123. Giao diện dễ sử dụng và có rất nhiều lựa chọn phù hợp với ngân sách của tôi."
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      location: "Hồ Chí Minh",
      rating: 5,
      text: "Website có bộ lọc thông minh giúp tôi dễ dàng tìm kiếm phòng trọ theo khu vực và giá cả. Tôi đã nhanh chóng tìm được phòng trọ gần trường học."
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      location: "Đà Nẵng",
      rating: 4,
      text: "Phongtro123 giúp tôi tìm kiếm phòng trọ một cách dễ dàng. Thông tin minh bạch và đầy đủ hình ảnh giúp tôi có cái nhìn tổng quan trước khi quyết định."
    },
    {
      id: 4,
      name: "Phạm Thị Dung",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      location: "Cần Thơ",
      rating: 5,
      text: "Tôi là chủ nhà trọ và đã sử dụng Phongtro123 để đăng tin. Chỉ sau vài giờ đăng tin, tôi đã có nhiều cuộc gọi từ người thuê tiềm năng. Dịch vụ rất hiệu quả!"
    },
    {
      id: 5,
      name: "Hoàng Văn Anh",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      location: "Nha Trang",
      rating: 4,
      text: "Tôi rất hài lòng với trải nghiệm sử dụng Phongtro123. Các tin đăng được kiểm duyệt kỹ lưỡng nên tôi không gặp phải các tin ảo như các trang khác."
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg 
          key={i}
          className={`w-5 h-5 ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI
      </h2>
      
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src={reviews[currentIndex].avatar} 
                  alt={reviews[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{reviews[currentIndex].name}</h3>
                  <p className="text-gray-600">{reviews[currentIndex].location}</p>
                  <div className="flex mt-1">
                    {renderStars(reviews[currentIndex].rating)}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 italic">"{reviews[currentIndex].text}"</p>
            </div>
          </div>
        </div>

        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex justify-center mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 