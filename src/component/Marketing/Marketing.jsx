import React, { useEffect, useState } from "react";
import "./Marketing.css";

import profileimg from "../../assets/profile-img.png";
import myadvertisements from "../../assets/myadvertisements.png";
import marketinglogo from "../../assets/marketing-logo.png";
import marketingimg from "../../assets/m-img.png";
import addadvertisements from "../../assets/addadvertisements.png";
import logoutimg from "../../assets/logout-img.png";

import { Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";

export default function Marketing() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [marketingStatus, setMarketingStatus] = useState(null);

  // مهم عشان نفرّق بين:
  // "الـ API راجع pending" و "اليوزر ضغط فعلاً"
  const [hasClicked, setHasClicked] = useState(
    localStorage.getItem("marketing_clicked") === "true"
  );

  /* ===== GET MARKETING DATA ===== */
  useEffect(() => {
    axios
      .get(BaseUrl + BuyerServicesUrl.GetMarketingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMarketingStatus(res.data.data?.status || null);
      })
      .catch(() => {
        setMarketingStatus(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  /* ===== SEND MARKETING REQUEST ===== */
  const handleMarketingRequest = () => {
    setSending(true);

    axios
      .get(BaseUrl + BuyerServicesUrl.SendMarketingRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setMarketingStatus("pending");
        setHasClicked(true);
        localStorage.setItem("marketing_clicked", "true");
      })
      .catch((err) => {
        console.log("SEND MARKETING ERROR", err);
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="mmarketing-page mt-5 mb-5">
      <div className="container mt-5 mb-5 pb-5">
        <div className="row mb-5 pb-5">

          {/* ===== SIDEBAR ===== */}
          <div className="m-marketing-sidebar mt-3 mb-5 col-md-6">
            <Link to="/profileaccount" className="side-btn white mt-5">
              <img src={profileimg} alt="" />
              <span className="px-2">حسابي الشخصي</span>
            </Link>

            <Link to="/marketing" className="side-btn active d-flex justify-content-start">
              <img src={marketingimg} alt="" />
              <span className="px-2">التسويق</span>
            </Link>

            <Link to="/myaddvertisements" className="side-btn white">
              <img src={myadvertisements} alt="" />
              <span className="px-2">إعلاناتي</span>
            </Link>

            <Link to="/addadvertisement" className="side-btn white">
              <img src={addadvertisements} alt="" />
              <span className="px-2">إضافة إعلان</span>
            </Link>

            <Link to="/accounttype" className="side-btn logout">
              <img src={logoutimg} alt="" />
              <span className="px-2">تسجيل الخروج</span>
            </Link>
          </div>

          {/* ===== MAIN CONTENT ===== */}
          <div className="marketing-content col-md-6">
            <img
              src={marketinglogo}
              alt="طوق النجاة"
              className="marketing-logo"
            />

            {loading ? (
              <p className="text-center">جاري التحميل...</p>
            ) : marketingStatus === "pending" && hasClicked ? (
              <>
                <div className="pending-box">
                  ⏳ طلبك قيد المراجعة
                </div>

                <p className="pending-desc">
                  تم إرسال طلبك بنجاح وهو الآن قيد المراجعة،
                  <br />
                  سيتم الرد في أسرع وقت.
                </p>
              </>
            ) : (
              <>
                <p className="marketing-text">
                  انضم لبرنامج التسويق بالعمولة وابدأ بكسب عمولات علي
                  <br />
                  كل مستخدم يستخدم كودك الخاص كلما زاد عدد
                  <br />
                  المستخدمين. زادت أرباحك!
                </p>

                <button
                  className="marketing-main-btn"
                  onClick={handleMarketingRequest}
                  disabled={sending}
                >
                  {sending ? "جاري الإرسال..." : "طلب تسويق"}
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
