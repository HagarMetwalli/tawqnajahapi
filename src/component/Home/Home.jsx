import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import lock from "../../assets/lock-icon.png";
import avatar from "../../assets/rateproduct.png";
import "./Home.css";

import Categories from "../Categories/Categories";
import Offerstawqnajah from "../Offerstawqnajah/Offerstawqnajah";
import OffersTawq from "../OffersTawq/OffersTawq";
import SuccessPartners from "../SuccessPartners/SuccessPartners";

import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";

export default function Home() {
  const navigate = useNavigate();

  /* ========= STATE ========= */
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
const [featuredProducts, setFeaturedProducts] = useState([]);

  /* ========= CHECK TOKEN ========= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  /* ========= GET HOME DATA ========= */
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          BaseUrl + BuyerServicesUrl.Home,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
setFeaturedProducts(res.data.data.ProductToqTajah || []);
setProducts(res.data.data.products || []);

        setBanners(res.data?.data?.bannars || []);
        // setProducts(res.data?.data?.ProductToqTajah || []);
      } catch (error) {
        console.error("Home API Error:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, [navigate]);

  /* ========= SLIDER AUTO MOVE ========= */
  useEffect(() => {
    if (!banners.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  if (loading) {
    return (
      <div className="text-center mt-5 pt-5">
        <h4>جاري تحميل الصفحة...</h4>
      </div>
    );
  }

  return (
    <div className="hero-wrapper pt-5 mt-4">
      {/* ========== HERO ========== */}
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
            <img className="lock" src={lock} alt="آمن" />
            <p className="web-text mb-0">أفضل موقع للتسوق الإلكتروني</p>
          </span>

          <h1 className="hero-heading">تجربة تسوق ذكية وآمنة</h1>

          <p className="web-order">
            أحدث المنتجات – أفضل العروض – توصيل سريع
          </p>

          <div className="products-info">
            <button
              className="customerbtn"
              onClick={() => navigate("/offerstawq")}
            >
              تسوق الآن
            </button>

            <Link to="/offerstawq" className="products-link-anchor">
              شاهد جميع المنتجات
            </Link>
          </div>

          {/* ===== RATING ===== */}
          <div className="home-rating">
            <div className="icons-stack">
              <i className="plusicon">+</i>
              <img src={avatar} alt="" className="img-1" />
              <img src={avatar} alt="" className="img-2" />
              <img src={avatar} alt="" className="img-3" />
            </div>

            <div>
              <span className="ratemaintext">+4.9 تقييم</span>
              <p className="rate-sub mb-0">ثقة أكثر من 2000 عميل</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== CATEGORIES ========== */}
      <Categories />

      {/* ========== PRODUCTS ========== */}
      <div className="container mt-5">
        <h3 className="mb-4 fw-bold">عروض طوق نجاة</h3>

  <div className="row">
    {featuredProducts.map((item) => (
      <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
        <div className="product-card">
          {/* <img src={item.image?.[0]} alt={item.name} />
               <img
                  src={item.image?.[0] || '/placeholder.png'}
                  alt=""
                  //  alt={item.name}
                /> */}
                <img
  src={item.image?.[0] || "/placeholder.png"}
  alt={item.name}
  className="product-img"
  onError={(e) => {
    e.target.src = "/placeholder.png";
  }}
/>

          <h6 className="mt-3">{item.name}</h6>
          <p className="desc">{item.description.split(" ").slice(0,3).join(" ")}</p>
          <p className="price pb-2">
            {item.priceAfterDiscount > 0
              ? item.priceAfterDiscount
              : item.price}{" "}
            {item.currency_type}
                      {/* <button>أضف الى السلة</button> */}

          </p>
          <button className="addcart  text-white border-0 pt-2 pb-2 mb-2 ">أضف الى السلة</button>

        </div>
      </div>
    ))}
  </div>
</div>
      <div className="container mt-5">
        {/* <h3 className="mb-4 fw-bold">عروض طوق نجاة</h3> */}
  <h3 className="mb-4 fw-bold"> الاقتراحات  </h3>

        <div className="row">
          {products.map((item) => (
            <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
              <div className="product-card">
                {/* <img
                  src={item.image?.[0] || '/placeholder.png'}
                  alt=""
                  //  alt={item.name}
                /> */}
                {/* <img
  src={item.image?.[0] || "/placeholder.png"}
  alt={item.name}
  className="product-img"
  onError={(e) => {
    e.target.src = "/placeholder.png";
  }}
/> */}

                <img
  src={item.image?.[0] || "/placeholder.png"}
  alt={item.name}
  className="product-img"
  onError={(e) => {
    e.target.src = "/placeholder.png";
  }}
/>



                <h6 className="mt-3">{item.name}</h6>
                <p className="desc">{item.description.split(" ").slice(0,3).join(" ")}</p>
                <p className="price">
                  {item.priceAfterDiscount && item.priceAfterDiscount > 0
                    ? item.priceAfterDiscount
                    : item.price}{" "}
                  {item.currency_type}
                </p>
                <button className="addcart  text-white border-0 pt-2 pb-2 ">أضف الى السلة</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ========== Suggestions ========== */}


      {/* ========== OFFERS ========== */}
      {/* <OffersTawq /> */}
      {/* <Offerstawqnajah /> */}

      {/* ========== PARTNERS ========== */}
      <SuccessPartners />
    </div>
  );
}
