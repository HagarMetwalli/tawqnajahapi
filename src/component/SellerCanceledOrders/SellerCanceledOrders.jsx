import React from 'react'
import '../SellerCanceledOrders/SellerCanceledOrders.css'
import img from "../../assets/winter-shirt.jpg";
import { useNavigate, useLocation } from "react-router-dom";

export default function SellerCanceledOrders() {

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
    navigate(`/seller/sellercanceledordersdetails`);
  };

  return (
    <div className="container neworders-page mt-5 pt-5 mb-5 pb-5 cancelmobileorders">

      <div className="row mb-5">

        {/* ====== الجزء اليمين (التابات) ====== */}
        <div className="col-lg-3  d-lg-block   ">
          <div className="orders-right-tabs pt-5">

            <button
                className={`cright-tab cright-btn ${
                  location.pathname === "/seller/sellerconfirmedorders" ? "active" : ""
                }`}
                onClick={() => navigate("/seller/sellerconfirmedorders")}
              >
                الطلبات الحالية
              </button>

              <button
                className={`cright-tab cright-btn2 ${
                  location.pathname === "/seller/sellershippedorders" ? "" : ""
                }`}
                onClick={() => navigate("/seller/sellershippedorders")}
              >
                الطلبات المكتملة
              </button>

              <button
                className={`cright-tab cright-btn3 ${
                  location.pathname === "/seller/sellercanceledorders" ? "active" : ""
                }`}
                onClick={() => navigate("/seller/sellercanceledorders")}
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
