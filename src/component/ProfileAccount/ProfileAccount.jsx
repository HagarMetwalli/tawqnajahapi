import React, { useState } from "react";
import "../ProfileAccount/ProfileAccount.css";
import avatarImg from "../../assets/avatar.jpg";
import profilepicture from "../../assets/profileicon.png";
import marketingimg from "../../assets/m2.png";
import myadvertisements from "../../assets/myadvertisements.png";
import addadvertisements from "../../assets/addadvertisements.png";
import logoutimg from "../../assets/logout-img.png";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";
import axios from "axios";

export default function ProfileAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [codePhone, setCodePhone] = useState("+966");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(avatarImg);

  const handleRegister = async () => {
    const formData = new FormData();
    // المفاتيح بناءً على متطلبات السيرفر (Postman)
    formData.append("type", "customer");
    formData.append("username", username);
    formData.append("email", email);
    formData.append("code_phone", codePhone);
    formData.append("phone", phone);
    formData.append("country", "egypt");
    formData.append("password", password);
    formData.append("referral_by", "");

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      // تصحيح بناء الرابط لضمان عدم تكرار slashes
      const fullUrl = `${BaseUrl}${BuyerServicesUrl.Register}`;
      
      const response = await axios.post(fullUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      });

      alert("تم التسجيل بنجاح!");
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors; 
        let errorMessages = "";
        Object.keys(errors).forEach((key) => {
          errorMessages += `${errors[key][0]}\n`;
        });
        alert("خطأ في البيانات:\n" + errorMessages);
      } else {
        console.error("Error:", error);
        alert("حدث خطأ غير متوقع، يرجى التأكد من الرابط أو الاتصال بالإنترنت");
      }
    }
  };

  return (
    <div className="profileacc-wrapper container mt-5">
        {/* Sidebar */}
        <div className="m-marketing-sidebar mb-5 col-md-4">
          <Link to="/profileaccount" className="side-btn active white mt-5">
            <img src={profilepicture} alt="" />
            <span className="px-2">حسابي الشخصي</span>
          </Link>
          <Link to="/marketing" className="side-btn white">
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

        {/* Profile Content */}
        <div className="profile-content col-md-8">
          <div className="profile-avatar-wrapper">
            <div className="avatar-circle">
              <img src={preview} className="profile-avatar" alt="avatar" />
              <input 
                type="file" 
                id="fileInput" 
                style={{ display: "none" }} 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImageFile(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }} 
              />
              <button type="button" className="avatar-edit-btn" onClick={() => document.getElementById("fileInput").click()}>
                <i className="fa-solid fa-pen"></i>
              </button>
            </div>
          </div>

          <form className="profile-form">
            <div className="form-group mb-3">
              <label className="fw-bolder mb-2">اسم المستخدم</label>
              <input className="form-input" placeholder="ادخل اسم المستخدم" onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="form-group mb-3">
              <label className="fw-bolder mb-2">البريد الإلكتروني</label>
              <input className="form-input" placeholder="reem@email.com" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group mb-3">
              <label className="fw-bolder mb-2">كلمة المرور</label>
              <input type="password" className="form-input" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="form-group mb-3">
              <label className="fw-bolder mb-2">رقم الهاتف</label>
              <div className="phone-row d-flex">
                <input className="phone-number-input flex-grow-1" placeholder="5xxxxxxxx" onChange={(e) => setPhone(e.target.value)} />
                <select className="country-code-input" style={{width: '80px'}} onChange={(e) => setCodePhone(e.target.value)}>
                  <option value="+966">+966</option>
                  <option value="+20">+20</option>
                </select>
              </div>
            </div>

            <div className="save-wrapper mt-4">
              <button type="button" className="save-btn w-100" onClick={handleRegister}>حفظ</button>
            </div>
          </form>
        </div>

    </div>
  );
}