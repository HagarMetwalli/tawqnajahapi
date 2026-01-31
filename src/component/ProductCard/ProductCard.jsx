import React from "react";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  if (!product) return null;

  const {
    name,
    price,
    priceAfterDiscount,
    discount,
    description,
    avgRate,
    images,
    currencyType,
  } = product;

  return (
    <div className="product-card">
      {/* Discount tag */}
      {discount > 0 && <div className="discount-tag">{discount}%</div>}

      {/* Product image */}
      <img
        src={images?.[0] || "/placeholder.jpg"}
        alt={name}
        className="product-img"
      />

      {/* Product info */}
      <div className="product-info">
        <h5 className="product-title">{name}</h5>

        {/* Rating */}
        <div className="product-rating">
          <i className="fa-solid fa-star" style={{ color: "#ffa500" }}></i>{" "}
          {avgRate?.toFixed(1) || 0}
        </div>

        {/* Description */}
        <p className="product-desc">{description}</p>

        {/* Price */}
        <div className="price-row">
          <span className="current-price">
            {priceAfterDiscount > 0 ? priceAfterDiscount : price} {currencyType}
          </span>
          {discount > 0 && priceAfterDiscount > 0 && (
            <span className="old-price">{price} {currencyType}</span>
          )}
        </div>
      </div>
    </div>
  );
}
