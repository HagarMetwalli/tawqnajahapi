import React, { useEffect, useState } from "react";
import "../CanceledOrdersDetails/CanceledOrdersDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../../App";
import SellerServicesUrl from "../../SellerServicesUrl";

export default function SellerCanceledOrdersDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${BaseUrl}${SellerServicesUrl.MyOrders}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        const found = res.data.data.find((o) => o.id == id);
        setOrder(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!order) {
    return <p className="text-center mt-5">جاري تحميل الطلب...</p>;
  }

  return (
    <div className="container orderdetails-page">

      <h1 className="page-title cancelled pb-3 mt-5 fw-bold" style={{ paddingTop: "140px" }}>
        تفاصيل الطلب / <span className="neworders">الطلبات الملغاة</span>
      </h1>

      {/* Customer */}
      <div className="customer-box">
        <div className="customer-info">

          <div className="right-side">
            <div className="icon-and-text">
              <div className="text-side">
                <h4 className="name">{order.user.name}</h4>
                <p className="phone">{order.user.phone}</p>
                <p className="location">
                  {order.user.country} - {order.user.city}
                </p>
              </div>
              <div className="info">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
          </div>

          <div className="left-side-price">
            {order.total} ر.س
          </div>

        </div>
      </div>

      {/* Products */}
      <div className="product-details-box">
        {order.products.map((p) => (
          <React.Fragment key={p.id}>
            <div className="row-line">
              <span className="label">اسم المنتج</span>
              <p className="value">{p.name}</p>
            </div>

            <div className="row-line">
              <span className="label">الكمية</span>
              <p className="value">{p.qty}</p>
            </div>

            <div className="row-line">
              <span className="label">السعر</span>
              <p className="value">{p.price} ر.س</p>
            </div>
          </React.Fragment>
        ))}

        <div className="row-line">
          <span className="label">مصاريف الشحن</span>
          <p className="value">{order.shipping_cost} ر.س</p>
        </div>

        <div className="row-line total">
          <span className="label">الإجمالي</span>
          <p className="value">{order.total} ر.س</p>
        </div>
      </div>

      <div className="canceled-message text-center pt-5 pb-5">
        <p>تم إلغاء الطلب من قبل العميل</p>
      </div>

    </div>
  );
}
