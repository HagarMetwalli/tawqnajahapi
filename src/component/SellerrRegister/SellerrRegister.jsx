import React, { useState } from "react";
import "./SellerrRegister.css";

import registerbg from "../../assets/register-bg.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../App";
import SellerServicesUrl from "../../SellerServicesUrl";

export default function SellerrRegister() {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [code, setCode] = useState("+20");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [activityType, setActivityType] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
const [branchesCount, setBranchesCount] = useState("");
const [period, setPeriod] = useState("");

  /* ================= VALIDATION ================= */
 const validate = () => {
  let temp = {};

  if (!username.trim()) temp.username = "اسم المستخدم مطلوب";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) temp.email = "البريد الإلكتروني مطلوب";
  else if (!emailPattern.test(email.trim()))
    temp.email = "البريد الإلكتروني غير صالح";

  if (!country) temp.country = "يرجى اختيار الدولة";

  if (!phone) temp.phone = "رقم الجوال مطلوب";
  else if (phone.length < 7 || phone.length > 12)
    temp.phone = "رقم الجوال غير صحيح";

  if (!password || password.length < 6)
    temp.password = "كلمة المرور لا تقل عن 6 أحرف";

  if (!activityType)
    temp.activityType = "نوع النشاط مطلوب";

  if (!image)
    temp.image = "صورة المتجر مطلوبة";

  if (!branchesCount)
    temp.branchesCount = "عدد الفروع مطلوب";

  if (!period)
    temp.period = "مدة الاشتراك مطلوبة";

  setErrors(temp);
  return Object.keys(temp).length === 0;
};

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");

    try {
      const formData = new FormData();

      formData.append("type", "saller"); // ✅ مهم
      formData.append("username", username.trim());
      formData.append("email", email.trim().toLowerCase());
      formData.append("country", country);
      formData.append("code_phone", code);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("area", area);
      formData.append("address", address);
      formData.append("activity_type", activityType);
      formData.append("image", image);
formData.append("count_branches", branchesCount);
formData.append("period", period);

      if (referralCode.trim()) {
        formData.append("referral_by", referralCode);
      }

      const res = await axios.post(
        BaseUrl + SellerServicesUrl.SellerrRegister,
        formData
      );

      console.log("REGISTER SUCCESS", res.data);
      navigate("/seller/sellerlogin");

    } catch (error) {
      console.log("REGISTER ERROR", error.response?.data);
      setApiError(
        error.response?.data?.message || "فشل إنشاء الحساب"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= JSX ================= */
  return (
    <div className="registeration">
      <div className="container-fluid">
        <div className="row">

          {/* IMAGE */}
          <div className="image col-12 col-md-6 p-0">
            <img src={registerbg} alt="register" className="login-image" />
          </div>

          {/* FORM */}
          <div className="form col-12 col-md-6 d-flex flex-column text-end">
            <div className="mb-4 text-center">
              <img src={logo} alt="logo" />
            </div>

            <form onSubmit={handleSubmit}>
              <label>اسم المحل / البائع</label>
              <input className="form-control" value={username}
                onChange={(e) => setUsername(e.target.value)} />
              {errors.username && <small className="text-danger">{errors.username}</small>}

              <label className="mt-3">البريد الإلكتروني</label>
              <input className="form-control" value={email}
                onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <small className="text-danger">{errors.email}</small>}

              <label className="mt-3">كلمة المرور</label>
              <div className="special-password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  className="special-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"} special-pass-icon`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {errors.password && <small className="text-danger">{errors.password}</small>}

              <label className="mt-3">رقم الجوال</label>
              <div className="d-flex gap-2">
                <select className="form-control" style={{ width: "110px" }}
                  value={code} onChange={(e) => setCode(e.target.value)}>
                  <option value="+20">+20</option>
                  <option value="+966">+966</option>
                  <option value="+971">+971</option>
                </select>
                <input className="form-control" value={phone}
                  onChange={(e) => setPhone(e.target.value)} />
              </div>
              {errors.phone && <small className="text-danger">{errors.phone}</small>}

              <div className="row mt-3">
                <div className="col-md-6">
                  <label>المدينة / المحافظة</label>
                  {/* <input className="form-control" value={area}
                    onChange={(e) => setArea(e.target.value)} /> */}
                    <select
  className="form-control"
  value={area}
  onChange={(e) => setArea(e.target.value)}
>
  <option value="">اختر المدينة</option>
  <option value="1">القاهرة</option>
  <option value="2">الجيزة</option>
  <option value="3">الإسكندرية</option>
</select>

                </div>

                <div className="col-md-6">
                  <label>الدولة</label>
                  <select className="form-control" value={country}
                    onChange={(e) => setCountry(e.target.value)}>
                    <option value="">اختر الدولة</option>
                    <option value="egypt">مصر</option>
                    <option value="saudi">السعودية</option>
                    <option value="uae">الإمارات</option>
                  </select>
                </div>
              </div>

              <label className="mt-3">العنوان</label>
              <input className="form-control" value={address}
                onChange={(e) => setAddress(e.target.value)} />

              <label className="mt-3">نوع النشاط</label>
              <select className="form-control"
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}>
                <option value="">اختر نوع النشاط</option>
                <option value="store">متجر</option>
                <option value="company">شركة</option>
              </select>
              {errors.activityType && <small className="text-danger">{errors.activityType}</small>}

              <label className="mt-3">صورة المتجر</label>
              <input type="file" className="form-control"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])} />
              {errors.image && <small className="text-danger">{errors.image}</small>}
<label className="mt-3">عدد الفروع</label>
<input
  type="number"
  className="form-control"
  value={branchesCount}
  onChange={(e) => setBranchesCount(e.target.value)}
/>
{errors.branchesCount && (
  <small className="text-danger">{errors.branchesCount}</small>
)}

<label className="mt-3">مدة الاشتراك</label>
<select
  className="form-control"
  value={period}
  onChange={(e) => setPeriod(e.target.value)}
>
  <option value="">اختر المدة</option>
  <option value="1_month">شهر</option>
  <option value="3_months">3 شهور</option>
  <option value="6_months">6 شهور</option>
  <option value="1_year">سنة</option>
</select>
{errors.period && (
  <small className="text-danger">{errors.period}</small>
)}

              <label className="mt-3">كود المسوق (اختياري)</label>
              <input className="form-control"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)} />

              {apiError && <p className="text-danger mt-2">{apiError}</p>}

              <button
                type="submit"
                className="btn w-100 mt-4 text-white"
                style={{ backgroundColor: "#1d3a77", borderRadius: "10px" }}
                disabled={loading}
              >
                {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
