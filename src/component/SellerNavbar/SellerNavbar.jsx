import { useState } from "react";
import { Container } from "react-bootstrap";
import "./SellerNavbar.css";
import { useNavigate, NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { CiCreditCard1 } from "react-icons/ci";
import { FaBullhorn, FaShieldAlt, FaFileContract } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AiOutlineHome, AiOutlineShop } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function SellerNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

const sidebarLinks = [
  { icon: <AiOutlineHome />, text: "الرئيسية", path: "/seller/sellerhome" },
  { icon: <AiOutlineShop />, text: "متجري", path: "/seller/sellermystore" },
  { icon: <HiOutlineClipboardList />, text: "طلباتي", path: "/seller/sellerconfirmedorders" },

  { icon: <FiUser />, text: "معلومات الحساب", path: "/seller/sellerprofileaccount" },
  { icon: <FaBullhorn />, text: "تسويق", path: "/seller/sellermarketingreferral" },
  { icon: <FaBullhorn />, text: "الدعم", path: "/seller/selleresupport" },
  // { icon: <FaShieldAlt />, text: "سياسة الخصوصية", path: "/seller/sellerprivacy" },
  //  { icon: <FaFileContract />, text: "الشروط والأحكام", path: "/seller/sellerterms" },
];

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <div className="tn-nav-main seller-nav-main">
        <Container className="tn-nav-wrapper">
          
          <div className="tn-buttons-box pt-2">
            <button className="tn-nav-app-btn">
              تحميل التطبيق
            </button>
          </div>

          {/* Desktop Links */}
          <div className="sellertn-nav-linkss">
            <NavLink to="/seller/sellerhome" className="tn-nav-link">الرئيسية</NavLink>
            <NavLink to="/seller/sellermystore" className="tn-nav-link">متجري</NavLink>
            <NavLink to="/seller/sellerconfirmedorders" className="tn-nav-link">طلباتي</NavLink>
            <NavLink to="/seller/sellercontractpage" className="tn-nav-link">معلومات الحساب</NavLink>
            <NavLink to="/seller/sellermarketingreferral" className="tn-nav-link">التسويق</NavLink>
            <NavLink to="/seller/selleresupport" className="tn-nav-link">الدعم</NavLink>

          </div>

          {/* Hamburger */}
          <button
            className="tn-nav-hamburger"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
        </Container>
      </div>

      {/* ===== OVERLAY ===== */}
      <div
        className={`tn-nav-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ===== SIDEBAR ===== */}
      <div className={`tn-nav-sidebar ${sidebarOpen ? "open" : ""}`}>

        <button
          className="tn-nav-close-sidebar"
          onClick={() => setSidebarOpen(false)}
        >
          <IoClose size={26} />
        </button>

        <div className="tn-nav-sidebar-header">
          {/* <h3>محمود استور</h3>
          <span className="date">تاريخ الانضمام 25/10/2025</span> */}
        </div>

        {/* <ul className="tn-nav-sidebar-links">
          {sidebarLinks.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setSidebarOpen(false);
                navigate(item.path);
              }}
            >
              <span className="tn-nav-sidebar-item">
                {item.icon}
                {item.text}
              </span>
              <IoIosArrowBack />
            </li>
          ))}
        </ul> */}
<ul className="tn-nav-sidebar-links scroll-area pt-1">
  {sidebarLinks.map((item, index) => (
    <li
      key={index}
      onClick={() => {
        setSidebarOpen(false);
        navigate(item.path);
      }}
    >
      <span className="tn-nav-sidebar-item">
        {item.icon}
        {item.text}
      </span>
      <IoIosArrowBack />
    </li>
  ))}
</ul>

        {/* <button className="sellertn-nav-logout-btn">
          تسجيل الخروج من التطبيق <MdLogout />
        </button> */}
      </div>
    </>
  );
}
