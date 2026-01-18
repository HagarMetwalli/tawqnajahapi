import React from 'react'
import '../ShippedOrders/ShippedOrders.css'
import img from "../../assets/winter-shirt.jpg";
import { useNavigate, useLocation } from "react-router-dom";

export default function ShippedOrders() {

  const navigate = useNavigate(); 
  const location = useLocation();

  const orders = [
    {
      id: 1,
      title: "جاكيت شتوي",
      desc: "جاكيت أبيض - تخفيض خاص",
      category: "ملابس",
      qty: 1,
      price: "149.99 ر.س",
      img: img,
    },
  ];

  const goToDetails = (id) => {
    navigate(`/shippedordersdetails`);
  };

  return (
    <div className="container neworders-page mt-5 pt-5 mb-5 pb-5">

      <div className="row">

        {/* ====== الجزء اليمين (التابات) ====== */}
        <div className="col-lg-3  d-lg-block pt-5 ">
          <div className="orders-right-tabs ">
            
           <button
                className={`cright-tab cright-btn ${
                  location.pathname === "/confirmedorders" ? "active" : ""
                }`}
                onClick={() => navigate("/confirmedorders")}
              >
                الطلبات الحالية
              </button>

              <button
                className={`cright-tab cright-btn2 ${
                  location.pathname === "/shippedorders" ? "active" : ""
                }`}
                onClick={() => navigate("/shippedorders")}
              >
                الطلبات المكتملة
              </button>

              <button
                className={`cright-tab cright-btn3 ${
                  location.pathname === "/canceledorders" ? "" : ""
                }`}
                onClick={() => navigate("/canceledorders")}
              >
                الطلبات الملغية
              </button>

          </div>
        </div>

        {/* ====== الجزء الشمال (الكروت) ====== */}
             <div className="col-lg-9 col-12 justify-content-start">
            <div className="cards-wrapper" style={{marginTop:"97px"}}>
              {orders.map((order) => (
                <div key={order.id} className="corder-mobile-card"
                onClick={() => goToDetails(order.id)}
  style={{ cursor: "pointer" }}>
                  <img
                    src={order.img}
                    alt={order.title}
                    className="corder-mobile-img"
                  />

                  <div className="order-mobile-content">
                    <h3 className="corder-mobile-title">{order.title}</h3>
                    <p className="corder-mobile-desc">{order.desc}</p>

                    <div className="order-bottom-row">
                      <span className="order-badge">x{order.qty}</span>
                      <span className="corder-type">ملابس</span>
                      <span className="confirmorder-price2">
                        {order.price} 
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
