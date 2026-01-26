import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../SellerRelatedProducts/SellerRelatedProducts.css";

export default function SellerRelatedProducts({ products = [] }) {
  const location = useLocation();

  // 👇 هل إحنا في صفحة رؤية المزيد؟
  const isFullPage =
    location.pathname.includes("sellerrelatedproducts");

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="sellerrelated-section m-auto pb-5 pt-4">

      {/* ===== Header ===== */}
      <div className="related-header">
        <h3 className="related-title">ذات صلة</h3>

        {/* ✅ الزر يظهر بس في Home */}
        {!isFullPage && (
          <Link
            to="/seller/sellerrelatedproductswrapper"
            className="related-view-btn"
          >
            رؤية المزيد
          </Link>
        )}
      </div>

      {/* ===== Cards ===== */}
      <div className="related-cards">
        {products.map((item) => {
          const finalPrice =
            item.priceAfterDiscount && item.priceAfterDiscount > 0
              ? item.priceAfterDiscount
              : item.price;

          return (
            <Link
              to={`/seller/productdetails/${item.id}`}
              className="related-card px-3"
              key={item.id}
            >
              <img
                src={item.image?.[0]}
                className="related-img pt-4 m-auto"
              />

              <h4 className="related-name">{item.name}</h4>

              <p className="desc">{item.description}</p>

              <p className="price">
                {finalPrice} {item.currency_type}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
