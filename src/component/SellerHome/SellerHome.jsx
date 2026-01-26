import React, { useEffect, useState } from "react";
import axios from "axios";

import SellerServices from "../SellerServices/SellerServices";
import SellerRelatedProducts from "../SellerRelatedProducts/SellerRelatedProducts";

import { BaseUrl } from "../../App";
import SellerServicesUrl from "../../SellerServicesUrl";

import "../SellerHome/SellerHome.css";

export default function SellerHome() {
  const [animate, setAnimate] = useState(false);
  const [banners, setBanners] = useState([]);
  const [toqProducts, setToqProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);

  const token = localStorage.getItem("seller_token");

  /* =============== SLIDER EFFECT =============== */
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  /* =============== GET HOME DATA =============== */
  useEffect(() => {
    setTimeout(() => setAnimate(true), 150);

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(BaseUrl + SellerServicesUrl.SellerHome, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBanners(res.data.data?.bannars || []);
        setToqProducts(res.data.data?.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Seller Home Error:", err);
        setLoading(false);
      });
  }, [token]);

  /* =============== LOADING =============== */
  if (loading) {
    return (
      <div className="text-center py-5">
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <div className="mystorepage m-0">

      {/* =============== BANNER =============== */}
      <div className={`home-banner ${animate ? "animate" : ""}`}>
        {banners.length > 0 && (
          <img
            src={banners[currentBanner]}
            alt="banner"
            className="banner-img"
          />
        )}

        <div className="banner-overlay"></div>

        <div className="banner-text">
          <h1 className="main-title text-anim right">
            مرحباً بكم في طوق نجاة
          </h1>

          <h3 className="sub-title text-anim left">
            منصتك الآمنة للتسوق وعرض منتجاتك بسهولة
          </h3>

          <h4 className="text-anim bottom">
            يسعدنا تصفحك موقعنا
          </h4>
        </div>
      </div>

      {/* =============== SERVICES =============== */}
      <div className="home-section mt-0">
        <SellerServices />
      </div>

      {/* =============== PRODUCTS =============== */}
      <div className="home-section mb-5 pb-5">
        <SellerRelatedProducts products={toqProducts} />
      </div>

    </div>
  );
}
