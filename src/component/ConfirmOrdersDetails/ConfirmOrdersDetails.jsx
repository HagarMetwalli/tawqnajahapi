import React from "react";
import "../ConfirmOrdersDetails/ConfirmOrdersDetails.css";

import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmOrderDetails() {
    const location = useLocation();
  const navigate = useNavigate();
    const order = location.state;
  // لو حد فتح الصفحة direct من غير state
  if (!order) {
    return (
      <div className="container text-center mt-5 pt-5 mb-5 pb-5">
        <h3 className="mt-5 pt-5">لا توجد بيانات لهذا الطلب</h3>
        <button
          className="order-btn mt-3"
          onClick={() => navigate("/confirmedorders")}
        >
          الرجوع للطلبات
        </button>
      </div>
    );
  }
 
  return (
    <div className="container orderdetails-page">

      {/* عنوان الصفحة */}
      <h1
        className="page-title mt-5 conpage-title"
        style={{ paddingTop: "140px" }}
      >
        تفاصيل الطلب / <span className="neworders"> الطلبات الحالية</span>
      </h1>

      {/* زر الطلب */}
      <div className="buttonn mb-4">
        <button className="order-btn">
          طلب رقم #{order.order_number}
        </button>
      </div>

      {/* بيانات العميل */}
      <div className="customer-box">
        <div className="customer-info">

          <div className="right-side">
            <div className="icon-and-text">

              <div className="text-side">
                <h4 className="name text-dark">
                  رقم المستخدم: {order.user_id}
                </h4>
                <p className="phone">
                  طريقة الدفع: {order.payment_type}
                </p>
                <p className="location">
                  حالة الطلب: {order.status}
                </p>
              </div>

              <div className="info">
                <i className="fa-solid fa-user"></i>
              </div>

            </div>
          </div>

          <div className="left-side-price">
            {order.final_total} ر.س
          </div>

        </div>
      </div>

      {/* تفاصيل الطلب */}
      <div className="product-details-box">

        <div className="row-line">
          <span className="label">رقم السلة</span>
          <p className="value">{order.cart_id}</p>
        </div>

        <div className="row-line">
          <span className="label">السعر</span>
          <p className="value">{order.total} ر.س</p>
        </div>

        <div className="row-line">
          <span className="label">مصاريف الشحن</span>
          <p className="value">{order.fees} ر.س</p>
        </div>

        <div className="row-line total">
          <span className="label">الإجمالي</span>
          <p className="value">{order.final_total} ر.س</p>
        </div>

      </div>

      {/* حالة الطلب */}
      <div className="buttonn mb-5">
        <button className="product-btn">
          حالة الطلب: {order.status}
        </button>
      </div>

    </div>
  );
}