import React, { useState } from "react";
import "../SellerMobileOffer/SellerMobileOffer.css";

 import mobile from "../../assets/mobile.jpg";
import img2 from "../../assets/key.jpg";
import img3 from "../../assets/winter-shirt.jpg";
import rating from "../../assets/Star.png";
import installement from "../../assets/installement.png";
import international from "../../assets/international.png";
import Lstore from "../../assets/lorfi-store.jpg";
import productrating from "../../assets/product-rating.png";
import insta from "../../assets/insta.png";
import whatsapp from "../../assets/whatsapp.png";
import facebook from "../../assets/facebook.png";

export default function SellerMobileOffer() {
  // صور السلايدر
  const images = [mobile, mobile, mobile];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="dproduct-page mb-5 pb-5  container c">
      {/* العنوان */}
      <h1 className="product-heading dproduct-heading2">
        تفاصيل المنتج / <span className="comm ">ذات صلة</span>
      </h1>

      <div className="product-wrapper col-md-6">
        {/* السلايدر */}
        <div className="dproduct-image-box ">
          <img
            src={images[currentIndex]}
            alt="product"
            className="main-image2"
          />
          {/* <button className="slide-btn right" onClick={prevSlide}>
            <i className="fa-solid fa-chevron-left"></i>
          </button> */}
          {/* <button className="slide-btn left" onClick={nextSlide}>
            <i className="fa-solid fa-chevron-right"></i>
          </button> */}

          {/* زر الشمال */}
        </div>

        {/* معلومات المنتج */}
        <div className="product-info col-md-6">
          <div className="dtitle-rating-row">
            <h2 className="dproduct-title">
             هاتف ذكي

            </h2>

            <div className="drating-row  ">
              <img src={rating} />
              <span className="drate-number">4.9</span>
            </div>
          </div>
          <p className="product-desc2 ">
يقدّم أداءً سريعًا وسلسًا للاستخدام اليومي، مع شاشة واضحة وتصميم عصري أنيق. </p>
          <div className="dprice-row">
            <span className="dcurrent-price">250 ر.س</span>
            <span className="dold-price">550 ر.س</span>
            <span className="ddiscount">20%</span>
          </div>
        </div>
      </div>

      <div className="big-cart d-flex align-items-center ">
        <div className="first-cart ">
          <img src={installement} alt="cart" />
          <span className="text-white d-block"> شحن دولي وداخلي</span>
        </div>
        <div className="second-cart">
          <img src={international} alt="cart" />
          <span className="text-white d-block"> تقسيط</span>
        </div>
      </div>

      {/* <div className="daction  d-flex justify-content-center">
        <div className="dinstallement ">
          <img src={installement} className="image" />
          <h4 className=" text-white">شحن دولي وداخلي</h4>
        </div>
        <div className="dinternational ">
          <img src={international} />
          <h4 className=" text-white">تقسيط</h4>
        </div>
      </div> */}
      {/* قسم المشاركة */}

      {/* كارت المتجر */}
      <div className="product-bottom-box mt-5 mb-5">
        <div className="seller-box mt-4">
          {/* المعلومات والصورة */}
          <div className="seller-info-wrap">
            <img src={Lstore} className="seller-img" alt="seller" />

            <div className="d-flex flex-column w-100">
              <div className="seller-info mb-2">
                <h4 className="seller-name">متجر لورفي</h4>
                <div className="share-icons socialicons2">
                  <img src={facebook} />
                  <img src={whatsapp} />
                  <img src={insta} />
                </div>
              </div>
              <p className="seller-location text-end">
                الرياض، المملكة العربية السعودية
              </p>
            </div>
          </div>

          {/* الأيقونات */}
        </div>

        <hr className="divider" />

        {/* قسم التقييم */}
        <h3 className="rate-title">تقييمك للمنتج</h3>

        <div className="stars">
          <img src={productrating} />
          <img src={productrating} />
          <img src={productrating} />
          <img src={productrating} />
          <img src={productrating} />
        </div>
      </div>
    </div>
  );
}
