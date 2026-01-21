import React, { useEffect, useState } from "react";
import "../ConfirmedOrders/ConfirmedOrders.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";

export default function ConfirmedOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (orderStatus) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BaseUrl}${BuyerServicesUrl.MyOrders}?status=${orderStatus}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    
      setOrders(res.data.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(status);
  }, [status]);

  return (
    <div className="orders-page mt-5 pt-5 mobileorders">
      <div className="container mt-5">
        <div className="row">

          {/* Tabs */}
          <div className="col-lg-3 tabssection">
            <div className="orders-right-tabs">
              <button
                className={`cright-tab ${status === "pending" ? "active" : ""}`}
                onClick={() => setStatus("pending")}
              >
                الطلبات الحالية
              </button>

              <button
                className={`cright-tab ${status === "completed" ? "active" : ""}`}
                onClick={() => setStatus("completed")}
              >
                الطلبات المكتملة
              </button>

              <button
                className={`cright-tab ${status === "cancel" ? "active" : ""}`}
                onClick={() => setStatus("cancel")}
              >
                الطلبات الملغية
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="col-lg-9 col-12">
            <div className="cards-wrapper mt-5">

              {loading && <p>جاري التحميل...</p>}

              {!loading && orders.length === 0 && (
                <p>لا توجد طلبات</p>
              )}

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="corder-mobile-card"
                  onClick={() =>
                    navigate("/confirmordersdetails", { state: order })
                  }
                >
                  <div className="order-mobile-content">
                    <h3>طلب رقم #{order.order_number}</h3>
                    <span>{order.payment_type}</span>
                    <span>{order.final_total} ر.س</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
