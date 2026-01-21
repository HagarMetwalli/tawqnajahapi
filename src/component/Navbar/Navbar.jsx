import { useState, useRef, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

import {
  FaHome,
  FaClipboardList,
  FaHeart,
  FaComments,
  FaHeadset,
  FaBullhorn,
} from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [isArabic, setIsArabic] = useState(() => {
    return i18n.language === "ar";
  });

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  /* close mobile menu on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest(".tn-nav-hamburger")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* prevent body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  return (
    <>
      {/* ================= MAIN NAVBAR ================= */}
      <div className="buyertn-nav-main">
        <div className="buyertn-nav-wrapper">
          {/* ===== LINKS ===== */}
          <Nav className={`tn-nav-links ${isArabic ? "rtl-links" : ""}`}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "tn-nav-link active" : "tn-nav-link"
              }
            >
              {t("home")}
            </NavLink>

            <NavLink
              to="/eyesupport"
              className={({ isActive }) =>
                isActive ? "tn-nav-link active" : "tn-nav-link"
              }
            >
              {t("support")}
            </NavLink>

            <NavLink
              to="/confirmedorders"
              className={({ isActive }) =>
                isActive ? "tn-nav-link active" : "tn-nav-link"
              }
            >
              {t("orders")}
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "tn-nav-link active" : "tn-nav-link"
              }
            >
              {t("favorites")}
            </NavLink>

            <NavLink
              to="/marketing"
              className={({ isActive }) =>
                isActive ? "tn-nav-link active" : "tn-nav-link"
              }
            >
              {t("marketing")}
            </NavLink>

            <NavLink
              to="/abouttawq"
              className={({ isActive }) =>
                isActive ? "tn-nav-link active" : "tn-nav-link"
              }
            >
              {t("about")}
            </NavLink>
          </Nav>

          {/* ===== DOWNLOAD APP ===== */}
          <Link to="#" className="tn-nav-download-app">
            {t("downloadApp")} <i className="fa fa-download" />
          </Link>

          {/* ===== HAMBURGER ===== */}
          <button
            className="tn-nav-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        ref={menuRef}
        className={`tn-mobile-menu ${menuOpen ? "open" : ""}`}
      >
        <ul className="tn-mobile-list">
          <li>
            <button
              className="tn-mobile-item"
              onClick={() => {
                navigate("/home");
                setMenuOpen(false);
              }}
            >
              <FaHome /> {t("home")}
            </button>
          </li>

          <li>
            <button
              className="tn-mobile-item"
              onClick={() => {
                navigate("/eyesupport");
                setMenuOpen(false);
              }}
            >
              <FaHeadset /> {t("support")}
            </button>
          </li>

          <li>
            <button
              className="tn-mobile-item"
              onClick={() => {
                navigate("/confirmedorders");
                setMenuOpen(false);
              }}
            >
              <FaClipboardList /> {t("orders")}
            </button>
          </li>

          <li>
            <button
              className="tn-mobile-item"
              onClick={() => {
                navigate("/favorites");
                setMenuOpen(false);
              }}
            >
              <FaHeart /> {t("favorites")}
            </button>
          </li>

          <li>
            <button
              className="tn-mobile-item"
              onClick={() => {
                navigate("/marketing");
                setMenuOpen(false);
              }}
            >
              <FaBullhorn /> {t("marketing")}
            </button>
          </li>

          <li>
            <button
              className="tn-mobile-item"
              onClick={() => {
                navigate("/abouttawq");
                setMenuOpen(false);
              }}
            >
              <FaComments /> {t("about")}
            </button>
          </li>
        </ul>
      </div>

      {/* ================= OVERLAY ================= */}
      <div
        className={`tn-nav-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
}
