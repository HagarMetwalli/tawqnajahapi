import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SellerNewOrders.css";
import { BaseUrl } from "../../App";

export default function SellerNewOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("seller_token");

  useEffect(() => {
    axios
      .get(`${BaseUrl}user/my-order?status=pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setOrders(res.data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container neworders-page mt-5 pt-5">
      <h1 className="heading pt-5 mt-5 pe-5">
        الطلبات الجديدة / <span className="main">الرئيسية</span>
      </h1>

      <div className="orders-wrapper pb-5 mb-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/seller/order-details/${order.id}`}
            className="order-card-link"
          >
            <div className="order-cardnorders">
              <p className="neworder-price-left">
                {order.total} ر.س
              </p>

              <div className="neworder-content">
                <div className="image-side">
                  <img src={order.products[0]?.image} alt="" />

                  <div className="text-sideneworder">
                    <h4 className="product-title">
                      {order.products[0]?.name}
                    </h4>

                    <p className="product-descnorders">
                      {order.products[0]?.description}
                    </p>

                    <p className="category">
                      <span className="qty">
                        x{order.products[0]?.quantity}
                      </span>
                      <span className="typenorders">
                        {order.products[0]?.category}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
