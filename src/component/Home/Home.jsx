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

  /* ===== TOGGLE FAVORITE (Optimistic UI) ===== */
  const toggleFavorite = async (e, productId, type) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    // Logic to flip the is_favorite boolean locally
    const updateList = (list) =>
      list.map((p) =>
        p.id === productId ? { ...p, is_favorite: !p.is_favorite } : p
      );

    // Apply change immediately to the UI
    if (type === "featured") setFeaturedProducts(updateList(featuredProducts));
    else setProducts(updateList(products));

    try {
      const url = BaseUrl + BuyerServicesUrl.AddProductToFavorites.replace("{id}", productId);
      await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error("Failed to update favorite", err);
      // Rollback UI if the API call fails
      if (type === "featured") setFeaturedProducts(updateList(featuredProducts));
      else setProducts(updateList(products));
    }
  };

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchHomeData(token);
        setBanners(data.banners || []);
        setFeaturedProducts(data.featuredProducts || []);
        setProducts(data.products || []);
      } catch (error) {
        if (error.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, [navigate]);

  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => setCurrent((prev) => (prev + 1) % banners.length), 5000);
    return () => clearInterval(interval);
  }, [banners]);

  if (loading) return <div className="text-center mt-5 pt-5"><h4>{t("loading")}</h4></div>;

  const imgWrapStyle = {
    width: "100%",
    height: "200px",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#f6f6f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // Required for absolute heart icon
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  return (
    <div className="hero-wrapper pt-5 mt-4">
      {/* ... Hero Section remains same ... */}
      <div className="hero-container">
        <div className="hero-left">
          {banners.map((img, index) => (
            <img key={index} src={img} alt="banner" className={`slide-image ${index === current ? "fade-in" : ""}`} />
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
            <button className="customerbtn" onClick={() => navigate("/offerstawq")}>{t("shopNow")}</button>
            <Link to="/offerstawq" className="products-link-anchor">{t("viewAll")}</Link>
          </div>
        </div>
      </div>

      <Categories />

      {/* ===== FEATURED OFFERS ===== */}
      <div className="container">
        <div className="homeheader d-flex justify-content-between mb-2">
          <h3 className="fw-bold">{t("featuredOffers")}</h3>
          <span className="home-view-btn" onClick={() => navigate("/seller/sellerproductlist")} style={{ cursor: "pointer" }}>رؤية المزيد</span>
        </div>
        <div className="row">
          {featuredProducts.map((item) => (
            <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
              <div className="product-card">
                <div style={{ cursor: "pointer" }} onClick={() => navigate(`/advertisementdetails/${item.id}`)}>
                  <div style={imgWrapStyle}>
                    {/* Mark if is_favorite (Solid Red/Orange Heart) */}
                    <div 
                      className={`fav-btn ${item.is_favorite ? "active" : ""}`}
                      onClick={(e) => toggleFavorite(e, item.id, "featured")}
                    >
                      {item.is_favorite ? "❤" : "♡"}
                    </div>
                    <img src={item.images?.[0] || ""} alt={item.name} style={imgStyle} />
                  </div>
                  <h6 className="mt-3">{item.name}</h6>
                  <p className="price">{(item.priceAfterDiscount > 0 ? item.priceAfterDiscount : item.price) + " " + item.currencyType}</p>
                </div>
                <button className="addcart text-white border-0 pt-2 pb-2" onClick={(e) => { e.stopPropagation(); addToCart(item.id); }}>
                  {t("addToCart")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== SUGGESTIONS ===== */}
      <div className="container mt-5">
        <h3 className="mb-4 fw-bold">{t("suggestions")}</h3>
        <div className="row">
          {products.map((item) => (
            <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
              <div className="product-card">
                <div style={{ cursor: "pointer" }} onClick={() => navigate(`/advertisementdetails/${item.id}`)}>
                  <div style={imgWrapStyle}>
                    <div 
                      className={`fav-btn ${item.is_favorite ? "active" : ""}`}
                      onClick={(e) => toggleFavorite(e, item.id, "products")}
                    >
                      {item.is_favorite ? "❤" : "♡"}
                    </div>
                    <img src={item.images?.[0] || ""} alt={item.name} style={imgStyle} />
                  </div>
                  <h6 className="mt-3">{item.name}</h6>
                  <p className="price">{(item.priceAfterDiscount > 0 ? item.priceAfterDiscount : item.price) + " " + item.currencyType}</p>
                </div>
                <button className="addcart text-white border-0 pt-2 pb-2" onClick={(e) => { e.stopPropagation(); addToCart(item.id); }}>
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