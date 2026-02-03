import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Myaddvertisements/Myaddvertisements.css";
import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";
export default function Myaddvertisements() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    
    axios
      .get(BaseUrl + BuyerServicesUrl.ShowAdvertisements,  {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      .then((res) => {
        if (res.data.status === 200) {
          setItems(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="sellerrelated-section m-auto pb-5 pt-4">
      <div className="related-header mb-5 pb-5">
        {/* Optional header */}
      </div>

      <div className="related-cards mb-5">
        {items.map((item, index) => {
          let link = "#"; // Keep current linking logic if needed
          return (
            <Link
              to={link}
              className="related-card"
              key={item.id}
            >
              <img src={item.image[0]} alt={item.name} />
              <h4>{item.name}</h4>
              <p className="desc">{item.description}</p>
              <p className="price">
                {item.priceAfterDiscount
                  ? `${item.priceAfterDiscount} ر.س`
                  : `${item.price} ر.س`}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
