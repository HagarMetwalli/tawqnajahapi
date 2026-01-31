import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import lock from "../../assets/lock-icon.png";
import avatar from "../../assets/rateproduct.png";
import "./Home.css";

import Categories from "../Categories/Categories";
import SuccessPartners from "../SuccessPartners/SuccessPartners";

import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";
import { fetchHomeData } from "../../services/home.service";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ===== ADD TO CART ===== */
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        BaseUrl + BuyerServicesUrl.AddToCart,
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  /* ===== CHECK LOGIN ===== */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  /* ===== GET HOME DATA ===== */
  useEffect(() => {
    const fetchHome = async () => {
      try 
      {
        const token = localStorage.getItem("token");
        const { banners, featuredProducts, products } = await fetchHomeData(token);

        setBanners(banners);
        setFeaturedProducts(featuredProducts);
        setProducts(products);
      } catch (error) {
        if (error.response?.status === 401) navigate("/login");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, [navigate]);

  /* ===== SLIDER ===== */
  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => setCurrent((prev) => (prev + 1) % banners.length), 5000);
    return () => clearInterval(interval);
  }, [banners]);

  if (loading) {
    return (
      <div className="text-center mt-5 pt-5">
        <h4>{t("loading")}</h4>
      </div>
    );
  }

  const imgWrapStyle = {
    width: "100%",
    height: "200px",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#f6f6f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  return (
    <div className="hero-wrapper pt-5 mt-4">
      {/* ===== HERO ===== */}
      <div className="hero-container">
        <div className="hero-left">
          {banners.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="banner"
              className={`slide-image ${index === current ? "fade-in" : ""}`}
            />
          ))}
        </div>

        <div className="hero-right">
          <span className="hero-tag">
            <img className="lock" src={lock} alt="secure" />
            <p className="web-text mb-0">{t("heroTag")}</p>
          </span>

          <h1 className="hero-heading">{t("heroTitle")}</h1>
          <p className="web-order">{t("heroDesc")}</p>

          <div className="products-info">
            <button
              className="customerbtn"
              onClick={() => navigate("/offerstawq")}
            >
              {t("shopNow")}
            </button>

            <Link to="/offerstawq" className="products-link-anchor">
              {t("viewAll")}
            </Link>
          </div>

          <div className="home-rating">
            <div className="icons-stack">
              <i className="plusicon">+</i>
              <img src={avatar} alt="" className="img-1" />
              <img src={avatar} alt="" className="img-2" />
              <img src={avatar} alt="" className="img-3" />
            </div>

            <div>
              <span className="ratemaintext">{t("rating")}</span>
              <p className="rate-sub mb-0">{t("ratingSub")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CATEGORIES ===== */}
      <Categories />

      {/* ===== FEATURED OFFERS ===== */}
      <div className="container">
        <div className="homeheader d-flex justify-content-between mb-2">
          <h3 className="fw-bold">{t("featuredOffers")}</h3>
          <span
            className="home-view-btn"
            onClick={() => navigate("/seller/sellerproductlist")}
            style={{ cursor: "pointer" }}
          >
            رؤية المزيد
          </span>
        </div>

        <div className="row">
          {featuredProducts.map((item) => (
            <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
              <div className="product-card">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/advertisementdetails/${item.id}`)}
                >
                  <div style={imgWrapStyle}>
                    <img
                      src={item.images?.[0] || ""}
                      alt={item.name}
                      className="product-img"
                      style={imgStyle}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>

                  <h6 className="mt-3">{item.name}</h6>
                  <p className="desc">
                    {item.description?.split(" ").slice(0, 3).join(" ")}
                  </p>
                  <p className="price">
                    {(item.priceAfterDiscount > 0
                      ? item.priceAfterDiscount
                      : item.price) +
                      " " +
                      item.currencyType}
                  </p>
                </div>

                <button
                  className="addcart text-white border-0 pt-2 pb-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item.id);
                  }}
                >
                  {t("addToCart")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== SUGGESTIONS ===== */}
      <div className="container mt-5">
        <div className="homeheader d-flex justify-content-between">
          <h3 className="mb-4 fw-bold">{t("suggestions")}</h3>
        </div>

        <div className="row">
          {products.map((item) => (
            <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
              <div className="product-card">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/advertisementdetails/${item.id}`)}
                >
                  <div style={imgWrapStyle}>
                    <img
                      src={item.images?.[0] || ""}
                      alt={item.name}
                      className="product-img"
                      style={imgStyle}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>

                  <h6 className="mt-3">{item.name}</h6>
                  <p className="desc">
                    {item.description?.split(" ").slice(0, 3).join(" ")}
                  </p>
                  <p className="price">
                    {(item.priceAfterDiscount > 0
                      ? item.priceAfterDiscount
                      : item.price) +
                      " " +
                      item.currencyType}
                  </p>
                </div>

                <button className="addcart text-white border-0 pt-2 pb-2">
                  {t("addToCart")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SuccessPartners />
    </div>
  );
}
