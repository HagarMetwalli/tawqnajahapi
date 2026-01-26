import React, { useEffect, useState } from "react";
import "../Uppernav/Uppernav.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import axios from "axios";
import { BaseUrl } from "../../App";

export default function Uppernav() {
  const [showLogout, setShowLogout] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const { t } = useTranslation();

  /* ===================== CART COUNT ===================== */
  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🛑 Guard قوي – يمنع أي request غلط
    if (!token || token === "undefined" || token === "null") {
      setCartCount(0);
      return;
    }

    const fetchCartCount = async () => {
      try {
        const res = await axios.get(`${BaseUrl}user/show-my-cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const items = res.data?.data?.items || [];
        const totalQty = items.reduce(
          (sum, item) => sum + Number(item.quantity || 0),
          0
        );

        setCartCount(totalQty);
      } catch (err) {
        // لو حصل أي error (401 / 404) صفر العداد
        setCartCount(0);
      }
    };

    fetchCartCount();

    window.addEventListener("cartUpdated", fetchCartCount);
    return () =>
      window.removeEventListener("cartUpdated", fetchCartCount);
  }, []);

  /* ===================== LANGUAGE ===================== */
  const toggleLang = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  /* ===================== LOGOUT ===================== */
  const handleLogout = () => {
    localStorage.removeItem("token"); // 👈 نمسح التوكن بس
    setCartCount(0);
    navigate("/seller/sellerlogin");
  };

  return (
    <>
      <div className="sellertn-uppernav">
        <div className="sellertn-uppernav-wrapper px-2 px-md-4">
          <img
            src={logo}
            alt="logo"
            className="tn-nav-logo"
            onClick={() => navigate("/")}
          />

          <div className="tn-search-box">
            <input type="text" placeholder={t("search")} />
            <i className="fa fa-search tn-search-icon"></i>
          </div>

          <div className="tn-left-icons">
            <span className="tn-lang-btn" onClick={toggleLang}>
              {i18n.language === "ar" ? "EN" : "AR"}
            </span>

            <i className="fa fa-bell tn-nav-icon"></i>

            {/* 🛒 CART */}
            <div
              className="cart-icon-wrapper"
              onClick={() => navigate("/cart")}
            >
              <i className="fa-solid fa-cart-arrow-down tn-nav-icon"></i>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>

            <i
              className="fa fa-user tn-nav-icon"
              onClick={() => setShowLogout(true)}
            ></i>
          </div>
        </div>
      </div>

      {showLogout && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>هل تريد تسجيل الخروج ؟</h3>
            <button className="logout-confirm" onClick={handleLogout}>
              تسجيل الخروج
            </button>
            <button
              className="logout-cancel"
              onClick={() => setShowLogout(false)}
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </>
  );
}
