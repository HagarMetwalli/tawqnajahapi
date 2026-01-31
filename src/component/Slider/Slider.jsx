import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
export default function Slider({ items = [], onItemClick }) {
  return (
    <div className="categories-slider-wrapper">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {items.map((cat, index) => (
          <SwiperSlide key={cat.id}>
            <div
              className="customer-category-box cursor-pointer"
              onClick={() => onItemClick(index)} // ✅ here
            >
              <i className={`fa-solid ${cat.icon} category-icon`}></i>
              <p className="customer-category-name">{cat.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

