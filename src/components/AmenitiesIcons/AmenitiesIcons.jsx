import React from "react";

const AmenitiesIcons = ({ amenities }) => {
 
  const amenityIcons = {
    "Đầy đủ nội thất": (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    "Có máy lạnh": (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    "Có thang máy": (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    "Có bảo vệ 24/24": (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    "Có gác": (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    "Có máy giặt": (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7.5M6 6h.01M12 6h.01M18 6h.01M17 17H7a2 2 0 11-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2z" />
      </svg>
    ),
    "Không chung chủ": (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    "Có hầm để xe": (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  };

  
  const amenityGroups = {
    "Tiện nghi chung": ["Đầy đủ nội thất", "Có máy lạnh", "Có máy giặt"],
    "An ninh & Tiện ích": ["Có bảo vệ 24/24", "Có thang máy", "Có hầm để xe"],
    "Đặc điểm": ["Có gác", "Không chung chủ"],
  };

  return (
    <div className="py-5">
      <h2 className="text-xl font-semibold mb-6">Tiện nghi & Đặc điểm</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(amenityGroups).map(([groupName, groupAmenities]) => (
          <div key={groupName} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-3">{groupName}</h3>
            <div className="space-y-3">
              {groupAmenities.map((amenity) => (
                <div 
                  key={amenity} 
                  className={`flex items-center space-x-3 ${amenities[amenity] ? "" : "opacity-40"}`}
                >
                  <div className={`p-2 rounded-full ${amenities[amenity] ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"}`}>
                    {amenityIcons[amenity]}
                  </div>
                  <span className={`${amenities[amenity] ? "font-medium" : "line-through text-gray-500"}`}>
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesIcons; 