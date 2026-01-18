import React, { useState, useRef } from "react";
import axios from "axios";
import "../SellerOtp/SellerOtp.css";
import logo from "../../assets/logo.png";
import registerbg from "../../assets/register-bg.png";
import { useNavigate } from "react-router-dom";

export default function SellerOtp() {
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    setError("");

    if (otp.some((digit) => digit === "")) {
      setError("من فضلك أدخل رمز التحقق كامل");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://toknagah.viking-iceland.online/api/user/auth/verification-otp",
        {
          email,
          otp: otp.join(""),
        }
      );

      navigate("/seller/sellerresetpassword");
    } catch (err) {
      setError(
        err.response?.data?.message || "رمز التحقق غير صحيح"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-container">
        <div className="row">

          {/* IMAGE */}
          <div className="otp-image col-md-6 p-0">
            <img src={registerbg} alt="OTP" />
          </div>

          {/* FORM */}
          <div className="otp-form col-12 col-md-6 text-end">
            <div className="otp-logo text-center mb-4">
              <img src={logo} alt="logo" />
            </div>

            <h3 className="otp-title text-center mb-2">
              التحقق من البريد الإلكتروني
            </h3>

            <p className="otp-desc text-center">
              أدخل رمز التحقق المرسل إلى بريدك الإلكتروني
            </p>

            <div className="otp-inputs d-flex justify-content-center gap-3 my-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                />
              ))}
            </div>

            {error && (
              <small className="otp-error d-block text-center">
                {error}
              </small>
            )}

            <button
              className="otp-btn mt-4 text-white"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "جاري التأكيد..." : "تأكيد"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
