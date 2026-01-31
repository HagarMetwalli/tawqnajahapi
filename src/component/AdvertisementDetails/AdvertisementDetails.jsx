import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../AdvertisementDetails/AdvertisementDetails.css";

import rating from "../../assets/Star.png";
import installement from "../../assets/installement.png";
import international from "../../assets/international.png";
import productrating from "../../assets/product-rating.png";
import insta from "../../assets/insta.png";
import whatsapp from "../../assets/whatsapp.png";
import facebook from "../../assets/facebook.png";

import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";

export default function AdvertisementDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userRate, setUserRate] = useState(0); // track user rating

  // Fetch product by ID
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(BaseUrl+BuyerServicesUrl.GetProductById.replace("{id}", id), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data?.data.productDetails;
          console.log("aaxda", data);

        setAd(data);
        if (data?.avg_rate) setUserRate(Math.round(data.avg_rate));
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!ad) {
    return (
      <div className="text-center mt-5 pt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  const images = ad.image || [];

  // Handle user rating click
  const handleRate = async (rate) => {
    setUserRate(rate); // update stars immediately
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        BaseUrl+ BuyerServicesUrl.RateProduct.replace("{id}", id), // bind ID here
        { rate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Rating error:", err);
    }
  };

  return (
    <div className="dproduct-page mb-5 pb-5 container c">
      {/* ===== TITLE ===== */}
      <h1 className="product-heading dproduct-heading2">
        تفاصيل الإعلان / <span className="comm">{ad.categoryName}</span>
      </h1>

      <div className="product-wrapper col-md-6">
        {/* ===== IMAGE ===== */}
        <div className="dproduct-image-box">
          {images.length > 0 ? (
            <img
              src={images[currentIndex]}
              alt={ad.name}
              className="main-image2"
            />
          ) : (
            <div className="main-image2 d-flex align-items-center justify-content-center">
              لا توجد صورة
            </div>
          )}
        </div>

        {/* ===== INFO ===== */}
        <div className="product-info col-md-6">
          <div className="dtitle-rating-row">
            <h2 className="dproduct-title">{ad.name}</h2>
            <div className="drating-row">
              <img src={rating} alt="star" />
              <span className="drate-number">{ad.avg_rate?.toFixed(1) || 0}</span>
            </div>
          </div>

          <p className="product-desc2">{ad.description}</p>

          <div className="dprice-row">
            <span className="dcurrent-price">
              {ad.priceAfterDiscount} {ad.currency_type}
            </span>
            <span className="dold-price">
              {ad.price} {ad.currency_type}
            </span>
            <span className="ddiscount">{ad.discount}%</span>
          </div>
        </div>
      </div>

      {/* ===== SHIPPING / INSTALLMENT ===== */}
      <div className="big-cart d-flex align-items-center">
        <div className="first-cart">
          <img src={international} alt="" />
          <span className="text-white d-block">
            {ad.delivery_type === "internal" ? "شحن داخلي" : "شحن دولي"}
          </span>
        </div>

        {ad.is_installment === 1 && (
          <div className="second-cart">
            <img src={installement} alt="" />
            <span className="text-white d-block">تقسيط</span>
          </div>
        )}
      </div>

      {/* ===== STORE CARD ===== */}
      <div className="product-bottom-box mt-5 mb-5">
        <div className="seller-box mt-4">
          <div className="seller-info-wrap">
            <img
              src={ad.store_image || "/placeholder.jpg"}
              className="seller-img"
              alt="seller"
            />
            <div className="d-flex flex-column w-100">
              <div className="seller-info mb-2">
                <h4 className="seller-name">{ad.store_name || "المتجر"}</h4>
                <div className="share-icons socialicons2">
                  {ad.linkFacebook && <img src={facebook} alt="facebook" />}
                  {ad.linkWhatsapp && <img src={whatsapp} alt="whatsapp" />}
                  {ad.linkInsta && <img src={insta} alt="instagram" />}
                </div>
              </div>
              <p className="seller-location text-end">الحالة: {ad.status}</p>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* ===== STAR RATING ===== */}
        <h3 className="rate-title">تقييمك للمنتج</h3>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((i) => (
            <img
              key={i}
              src={productrating}
              style={{
                opacity: userRate >= i ? 1 : 0.3,
                cursor: "pointer",
                marginRight: 5,
              }}
              onClick={() => handleRate(i)}
              alt={`${i} stars`}
            />
          ))}
        </div>
        <p className="text-muted small mt-2">
          إجمالي التقييمات: {ad.total_rate || 0}
        </p>
      </div>
    </div>
  );
}
