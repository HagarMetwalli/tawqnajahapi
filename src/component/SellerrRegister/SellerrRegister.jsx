import React, { useState } from "react";
import "./SellerrRegister.css";

import registerbg from "../../assets/register-bg.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../App";
import SellerServicesUrl from "../../SellerServicesUrl";

export default function SellerRegister() {
  const navigate = useNavigate();

  // ===== States =====
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [code, setCode] = useState("+20");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [activityType, setActivityType] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [branchesCount, setBranchesCount] = useState("");
  const [period, setPeriod] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // ===== Validation =====
  const validate = () => {
    let temp = {};

    if (!username.trim()) temp.username = "اسم المستخدم مطلوب";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email))
      temp.email = "البريد الإلكتروني غير صالح";

    if (!country) temp.country = "يرجى اختيار الدولة";

    if (!phone) temp.phone = "رقم الجوال مطلوب";
    if (phone && (phone.length < 7 || phone.length > 12))
      temp.phone = "رقم الجوال يجب أن يكون بين 7 و12 رقم";

    if (!password || password.length < 6)
      temp.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ===== Submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");

    try {
      const payload = {
        type: "seller", // ✅ صح
        username,
        email,
        country: country.toLowerCase(),
        code_phone: code,
        phone,
        password,

        activity_type: activityType,
        area,
        address,
        count_branches: branchesCount,
        period,
      };

      if (referralCode.trim()) {
        payload.referral_code = referralCode;
      }

      const response = await axios.post(
        BaseUrl + SellerServicesUrl.Register,
        payload
      );

      console.log("SELLER REGISTER SUCCESS", response.data);
      navigate("/seller/sellerlogin");

    } catch (error) {
      console.log(error.response?.data);
      setApiError(
        error.response?.data?.message || "فشل إنشاء الحساب"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registeration">
      <div className="container-fluid">
        <div className="row">

          {/* image */}
          <div className="image col-12 col-md-6 p-0">
            <img src={registerbg} alt="register" className="login-image" />
          </div>

          {/* form */}
          <div className="form col-12 col-md-6 d-flex flex-column text-end">
            <div className="mb-4 text-center">
              <img src={logo} alt="logo" />
            </div>

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

            <div className="row mt-3">
              <div className="col-md-6">
                <label>المدينة / المحافظة</label>
                <input className="form-control" value={area}
                  onChange={(e) => setArea(e.target.value)} />
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

            <label className="mt-3">كود المسوق (اختياري)</label>
            <input
              className="form-control"
              placeholder="######"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />

            {apiError && <p className="text-danger mt-2">{apiError}</p>}

            <button
              className="btn w-100 mt-4 text-white"
              style={{ backgroundColor: "#1d3a77", borderRadius: "10px" }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
