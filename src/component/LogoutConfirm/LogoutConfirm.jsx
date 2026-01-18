import React from "react";
import "../LogoutConfirm/LogoutConfirm.css";
import profilepicture from "../../assets/profileicon.png";

import profileimg from "../../assets/profile-img.png";
import accountimg from "../../assets/account-img.png";
import marketingimg from "../../assets/m2.png";
import survimg from "../../assets/surv-img.png";

import myadvertisements from "../../assets/myadvertisements.png";
import addadvertisements from "../../assets/addadvertisements.png";
import logoutimg from "../../assets/logout-img.png";

import { Link, useNavigate } from "react-router-dom";

export default function LogoutConfirm() {
  const navigate = useNavigate();
  return (
    <div className="logout-wrapper container pt-4" >

      {/* ==== SIDEBAR ==== */}
    
           {/* <div className="logoutmarketing-sidebar ">
         
                      <Link to="/profileaccount" className="side-btn white mt-5 ">
                        <img src={profileimg} alt="" />
                        <span className="logout-text px-2">حسابي الشخصي</span>
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
             <button className="side-btn logout">
               <img src={logoutimg} alt="" /> 
                 <Link to='/accounttype' className="text-white text-decoration-none"> 
              تسجيل الخروج
                </Link>
             </button>

           </div> */}

      {/* ==== LOGOUT CONTENT ==== */}
      <div className="logout-content mt-5 ">
        <h2 className="logout-title mt-5">هل تريد تسجيل الخروج ؟</h2>

   <button
      className="logout-main-btn2"
      onClick={() => navigate("/seller/sellerlogin")}
    >
      تسجيل الخروج
    </button>
      </div>

    </div>
  );
}
