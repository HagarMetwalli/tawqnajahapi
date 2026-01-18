import React, { useState } from "react";
import "../SellerUppernav/SellerUppernav.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function SellerUppernav() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // هنا بعدين تحطي clear token / localStorage
    // localStorage.removeItem("token");

    setShowLogout(false);
    navigate("/login"); // أو accounttype حسب مشروعك
  };

  return (
    <>
      <div className="sellertn-uppernav">
        <div className="sellertn-uppernav-wrapper px-2 px-md-4">
          <img src={logo} alt="logo" className="tn-nav-logo" />
<div className="tn-search-box">
          <input type="text" placeholder="البحث عن المنتج" />
          <i className="fa fa-search tn-search-icon"></i>
        </div>
          <div className="tn-left-icons">
            <span className="tn-lang-btn">EN</span>

            <i className="fa fa-bell tn-nav-icon"></i>

            {/* زر تسجيل الخروج */}
            <i
              className="fa fa-user tn-nav-icon logout-icon"
              onClick={() => setShowLogout(true)}
            ></i>
          </div>
        </div>
      </div>

      {/* ===== Logout Modal ===== */}
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
