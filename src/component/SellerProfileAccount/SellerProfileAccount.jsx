 import React, { useState } from "react";
 import "./SellerProfileAccount.css";
 import avatarImg from "../../assets/avatar.jpg";
 import profilepicture from "../../assets/profileicon.png";
 import accountimg from "../../assets/account-img.png";
 import marketingimg from "../../assets/m2.png";
 import survimg from "../../assets/surv-img.png";
 import logoutimg from "../../assets/logout-img.png";
import { Link } from "react-router-dom";

//  import facebookIcon from "../../assets/logos_facebook.png";

 export default function SellerProfileAccount() {
   const [code, setCode] = useState("+966");
   const [showCodes, setShowCodes] = useState(false);
   const [filter, setFilter] = useState("");
   const [phone, setPhone] = useState("");

   const countries = [
     { key: "+966", name: "السعودية" },
     { key: "+971", name: "الإمارات" },
     { key: "+20", name: "مصر" },
     { key: "+962", name: "الأردن" },
     { key: "+974", name: "قطر" },
   ];

   return (
     <div className="profile-wrapper container" style={{marginTop:"90px"}}>

      <div className="marketing-sidebar mt-5 pt-5 ">
   
           {/* <button className="side-btn">
            <img src={profilepicture} /> حسابي الشخصي 
           </button> */}
   
    <button className="side-btn2 active text-white">
     <Link
       to="/seller/sellerprofileaccount"
       className="text-white text-decoration-none d-flex align-items-center"
     >
       <img className="ps-3 sidebar-icon " src={profilepicture} alt="Profile" />
       حسابي الشخصي
     </Link>
   </button>
   
             
     <button className="side-btn2 ">
         <Link to="/seller/sellerbankaccount" className="text-dark text-decoration-none">
           <img className='ps-3' src={accountimg} alt="Bank Account" />
           الحساب البنكي
         </Link>
         </button>
     <button className="side-btn2 ">
       <Link to="/seller/sellermarketingreferral" className="text-dark text-decoration-none">
         <img className='ps-3' src={marketingimg} alt="Marketing" />
         التسويق
       </Link>
     </button>
   
     <button className="side-btn2">
       <Link to="/seller/sellercontractpage" className="text-dark text-decoration-none">
         <img className='ps-3' src={survimg} alt="Contracts" />
         التقييم والعقود
       </Link>
     </button>
   
       <button className="side-btn2 logout">
       <Link to="/accounttype" className="text-white text-decoration-none">
         <img className='ps-3' src={logoutimg} alt="Logout" />
         تسجيل الخروج
       </Link>
     </button>
   
         </div>

       <div className="profile-content">

         <div className="profile-avatar-wrapper">
           <div className="avatar-circle">
             <img src={avatarImg} className="profile-avatar" alt="avatar" />
             <button className="avatar-edit-btn">
               <i className="fa-solid fa-pen"></i>
             </button>
           </div>
         </div>

       
         <form className="profile-form">

           <div className="form-group">
             <label className=" fw-bolder mb-2">اسم المحل / البائع</label>
             <input className="form-input" placeholder="ادخل اسم المستخدم" />
           </div>

           <div className="form-group">
             <label className=" fw-bolder mb-2">البريد الإلكتروني</label>
             <input className="form-input" placeholder="reem@email.com" />
           </div>

           <div className="form-group">
             <label className=" fw-bolder mb-2">العنوان</label>
             <input className="form-input" placeholder="الرياض، السعودية" />
           </div>

       
      <div className="form-group">
  <label className="fw-bolder mb-2">رقم الهاتف</label>

  <div className="phone-row">
    {/* كود الدولة */}
       <input
      type="tel"
      className="phone-number-input"
      placeholder="123 456 789"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
    <select
      className="country-code-input"
      value={code}
      onChange={(e) => setCode(e.target.value)}
    >
      <option value="+966">+966</option>
      <option value="+20">+20</option>
      <option value="+971">+971</option>
      <option value="+962">+962</option>
      <option value="+974">+974</option>
    </select>

    {/* رقم الهاتف */}
 
  </div>
</div>

         
           <div className="form-group">
             <label className=" fw-bolder mb-2">مواقع التواصل الاجتماعي</label>
             <div className="social-row">
               <div className="social-input-box">
                 {/* <img src={facebookIcon} alt="fb" className="input-icon" /> */}
                 <input
                   type="text"
                   className="form-input"
                   placeholder="www.facebook.com/username"
                 />
               </div>
             </div>
           </div>

         
           <div className="save-wrapper">
             <button type="button" className="save-btn">حفظ</button>
           </div>

         </form>
       </div>
     </div>
   );
 }
