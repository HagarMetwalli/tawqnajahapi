import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SellerNewordersDetails.css";
import { BaseUrl } from "../../App";

export default function SellerOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const token = localStorage.getItem("seller_token");

  useEffect(() => {
    axios
      .get(`${BaseUrl}user/my-order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setOrder(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!order) return <p>جاري تحميل الطلب...</p>;

  return (
    <div className="container orderdetails-page mt-5 pt-5">
      <h1 className="page-titleneworders">
        تفاصيل الطلب / <span>الطلبات الجديدة</span>
      </h1>

      {/* بيانات العميل */}
      <div className="customer-box">
        <div className="customer-info">
          <div>
            <h4>{order.user.name}</h4>
            <p>{order.user.phone}</p>
            <p>{order.user.city}</p>
          </div>
          <div className="left-side-price">
            {order.total} ر.س
          </div>
        </div>
      </div>

      {/* المنتجات */}
      <div className="product-details-box">
        {order.products.map((p) => (
          <div key={p.id}>
            <div className="row-line">
              <span>اسم المنتج</span>
              <p>{p.name}</p>
            </div>

            <div className="row-line">
              <span>الكمية</span>
              <p>{p.quantity}</p>
            </div>

            <div className="row-line">
              <span>السعر</span>
              <p>{p.price} ر.س</p>
            </div>
          </div>
        ))}

        <div className="row-line total">
          <span>الإجمالي</span>
          <p className="newordervalue">{order.total} ر.س</p>
        </div>
      </div>

      {/* تأكيد الطلب */}
      <div className="order-status-box">
        <button className="confirm-order-btn">
          تأكيد الطلب
        </button>
      </div>
    </div>
  );
}
