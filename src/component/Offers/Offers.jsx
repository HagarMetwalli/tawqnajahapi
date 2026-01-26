import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";
import "../Home/Home.css";

export default function Offers() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== CHECK LOGIN + FETCH DATA ===== */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(BaseUrl + BuyerServicesUrl.Home, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOffers(res.data?.data?.ProductToqTajah || []);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  /* ===== ADD TO CART ===== */
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        BaseUrl + BuyerServicesUrl.AddToCart,
        { product_id: productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5 pt-5">
        <h4>{t("loading")}</h4>
      </div>
    );
  }

  /* ===== IMAGE INLINE STYLES ===== */
  const imgWrapStyle = {
    width: "100%",
    height: "200px",
    borderRadius: "12px",
    background: "#f5f5f5",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  return (
    <div className="container mt-5 pt-5 mb-5">
      <h2 className="fw-bold mb-2 text-end pt-5 mt-5 pb-2">
        عروض طوق نجاة
      </h2>

      <div className="row">
        {offers.map((item) => (
          <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
            <div className="product-card">
              {/* ===== CLICKABLE CARD ===== */}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/advertisementdetails/${item.id}`)}
              >
                <div style={imgWrapStyle}>
                  <img
                    src={item.image?.[0] || ""}
                    alt={item.name}
                    style={imgStyle}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>

                <h6 className="mt-3">{item.name}</h6>

                <p className="desc">
                  {item.description?.split(" ").slice(0, 3).join(" ")}
                </p>

                <p className="price">
                  {(item.priceAfterDiscount > 0
                    ? item.priceAfterDiscount
                    : item.price) +
                    " " +
                    item.currency_type}
                </p>
              </div>

              {/* ===== ADD TO CART BUTTON ===== */}
              <button
                className="addcart text-white border-0 pt-2 pb-2"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item.id);
                }}
              >
                {t("addToCart")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
