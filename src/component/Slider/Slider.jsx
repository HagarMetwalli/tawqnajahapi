import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider({ items = [] }) {
  if (!Array.isArray(items)) {
    console.error("Slider items is not an array:", items);
    return null;
  }

  return (
    <div className="categories-slider-wrapper">
      <Swiper
        className="categories-slider"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {items.map((cat, index) => (
          <SwiperSlide key={index}>
            <div className="customer-category-box">
              <img
                src={cat.img}
                alt={cat.name}
                className="customer-category-icon"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
              <p className="customer-category-name">
                {cat.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
