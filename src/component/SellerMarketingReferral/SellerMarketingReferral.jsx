import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerMarketingReferral.css";

import giftImg from "../../assets/gift.png";
import phoneIcon from "../../assets/phoneicon.png";

import profilepicture from "../../assets/profile-img.png";
import accountimg from "../../assets/account-img.png";
import marketingimg from "../../assets/m-img.png";
import survimg from "../../assets/surv-img.png";
import logoutimg from "../../assets/logout-img.png";

import { Link, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../App";
import SellerServicesUrl from "../../SellerServicesUrl";

export default function SellerMarketingReferral() {
  const navigate = useNavigate();

  // ✅ seller token ONLY
  // const token = localStorage.getItem("seller_token");
  // const token =localStorage.getItem("token") || localStorage.getItem("seller_token");
const token = localStorage.getItem("token");


  const [code, setCode] = useState("");
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState("0.00");
  const [loading, setLoading] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");

  /* ===== GUARD ===== */
  useEffect(() => {
    if (!token) {
      navigate("/accounttype");
    }
  }, [token, navigate]);

  /* ===== GET MARKETING DATA ===== */
  useEffect(() => {
    if (!token || token === "undefined" || token === "null") return;

    setLoading(true);

axios
  .get(BaseUrl + SellerServicesUrl.GetMarketingData, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

      .then((res) => {
        const data = res.data?.data || {};
        setCode(data.code ?? "");
        setCount(data.count ?? 0);
        setAmount(data.amount ?? "0.00");
      })
      .catch((err) => {
        console.log("GET MARKETING DATA ERROR", err);

        // unauthorized → logout seller
        if (err.response?.status === 401) {
          localStorage.removeItem("seller_token");
          localStorage.removeItem("seller_user");
          localStorage.removeItem("sellerLoggedIn");
          navigate("/accounttype");
        }
      })
      .finally(() => setLoading(false));
  }, [token, navigate]);

  /* ===== COPY CODE ===== */
  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopyMsg("تم نسخ الكود ✅");
      setTimeout(() => setCopyMsg(""), 1500);
    } catch {
      setCopyMsg("لم يتم النسخ ❌");
      setTimeout(() => setCopyMsg(""), 1500);
    }
  };

  /* ===== LOGOUT SELLER ===== */
  const handleLogout = () => {
    localStorage.removeItem("seller_token");
    localStorage.removeItem("seller_user");
    localStorage.removeItem("sellerLoggedIn");
    navigate("/accounttype");
  };

  return (
    <div className="marketing-wrapper container mt-5 pt-5">
      {/* ===== SIDEBAR ===== */}
      <div className="marketing-sidebar mt-5 pt-5">
        <button className="side-btn2">
          <Link
            to="/seller/sellerprofileaccount"
            className="text-dark text-decoration-none d-flex align-items-center"
          >
            <img className="ps-3" src={profilepicture} alt="" />
            حسابي الشخصي
          </Link>
        </button>

        <button className="side-btn2">
          <Link
            to="/seller/sellerbankaccount"
            className="text-dark text-decoration-none"
          >
            <img className="ps-3" src={accountimg} alt="" />
            الحساب البنكي
          </Link>
        </button>

        <button className="side-btn2 active">
          <Link
            to="/seller/sellermarketingreferral"
            className="text-white text-decoration-none"
          >
            <img className="ps-3" src={marketingimg} alt="" />
            التسويق
          </Link>
        </button>

        <button className="side-btn2">
          <Link
            to="/seller/sellercontractpage"
            className="text-dark text-decoration-none"
          >
            <img className="ps-3" src={survimg} alt="" />
            التقييم والعقود
          </Link>
        </button>

        <button className="side-btn2 logout" onClick={handleLogout}>
          <img className="ps-3" src={logoutimg} alt="" />
          تسجيل الخروج
        </button>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="marketing-contentt2 mt-5">
        <div className="marketing-illustration">
          <img src={giftImg} alt="gift" />
        </div>

        <h2 className="marketing-title2">
          شارك كود الإحالة الخاص بك مع اصدقائك!
        </h2>

        <p className="marketing-subtitle">
          كل شخص يستخدم كودك لتسجيل الدخول تحصل على مكافآت مالية
        </p>

        {loading ? (
          <p>جاري تحميل البيانات...</p>
        ) : (
          <>
            {/* ===== CODE ===== */}
            <div
              className="info-box"
              style={{ cursor: "pointer" }}
              onClick={handleCopy}
            >
              <span className="info-icon">
                <img src={phoneIcon} alt="" />
              </span>
              <span className="info-text">
                {code || "لا يوجد كود بعد"}
              </span>
            </div>

            {copyMsg && <p style={{ marginTop: 8 }}>{copyMsg}</p>}

            {/* ===== COUNT ===== */}
            <div className="info-box">
              <span className="info-value">{count}</span>
              <span className="info-text">
                عدد المستخدمين الذين استخدموا كودك
              </span>
            </div>

            {/* ===== AMOUNT ===== */}
            <div className="info-box">
              <span className="info-value">${amount}</span>
              <span className="info-text">رصيدك الحالي</span>
            </div>
          </>
        )}

        <button className="withdraw-btn" disabled={amount === "0.00"}>
          سحب الأرباح
        </button>
      </div>
    </div>
  );
}
