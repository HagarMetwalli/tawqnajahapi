import React, { useEffect, useState } from "react";
import "../SellerCanceledOrders/SellerCanceledOrders.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../App";
import SellerServicesUrl from "../../SellerServicesUrl";

export default function SellerCanceledOrders() {
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${BaseUrl}${SellerServicesUrl.MyOrders}?status=cancel`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setOrders(res.data.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container neworders-page mt-5 pt-5 mb-5 pb-5 cancelmobileorders">
      <div className="row mb-5">

        {/* ===== Tabs ===== */}
        <div className="col-lg-3 d-lg-block">
          <div className="orders-right-tabs pt-5">

            <button
              className="cright-tab"
              onClick={() => navigate("/seller/sellerconfirmedorders")}
            >
              الطلبات الحالية
            </button>

            <button
              className="cright-tab"
              onClick={() => navigate("/seller/sellershippedorders")}
            >
              الطلبات المكتملة
            </button>

            <button className="cright-tab active">
              الطلبات الملغية
            </button>

          </div>
        </div>

        {/* ===== Orders Cards ===== */}
        <div className="col-lg-9 col-12">
          <div className="cards-wrapper" style={{ marginTop: "97px" }}>

            {orders.length === 0 && (
              <p className="text-center">لا توجد طلبات ملغية</p>
            )}

            {orders.map((order) => (
              <div
                key={order.id}
                className="corder-mobile-card"
                onClick={() =>
                  navigate(`/seller/sellercanceledordersdetails/${order.id}`)
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  src={order.products?.[0]?.image}
                  alt=""
                  className="corder-mobile-img"
                />

                <div className="order-mobile-content">
                  <h3 className="corder-mobile-title">
                    {order.products?.[0]?.name}
                  </h3>

                  <p className="corder-mobile-desc">
                    {order.products?.[0]?.description}
                  </p>

                  <div className="order-bottom-row">
                    <span className="order-badge">
                      x{order.products?.[0]?.qty}
                    </span>
                    <span className="corder-type">
                      {order.products?.[0]?.category}
                    </span>
                    <span className="confirmorder-price2">
                      {order.total} ر.س
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
