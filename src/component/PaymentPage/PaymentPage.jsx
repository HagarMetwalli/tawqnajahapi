import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./PaymentPage.css";
import { BaseUrl } from "../../App";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
console.log("CSdc",location.state?.cartId)
  const cartId = location.state?.cartId; // جاي من Cart.jsx
  const [method, setMethod] = useState("cash");
  const [form, setForm] = useState({
    name: "",
    account_number: "",
    cvv: "",
    expair_date: "",
  });

  const payNow = async () => {
    if (!cartId) {
      alert("السلة غير متاحة");
      return;
    }

    const payload = {
      cart_id: cartId,
      payment_methode: method,
    };

    if (method === "visa") {
      if (!form.name || !form.account_number || !form.cvv || !form.expair_date) {
        alert("من فضلك أدخل جميع بيانات البطاقة");
        return;
      }
      Object.assign(payload, form);
    }

    try {
      await axios.post(`${BaseUrl}user/send-order`, payload, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      navigate("/confirmedorders");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("فشل تنفيذ عملية الدفع");
    }
  };

  return (
    <div className="payment-page container mb-5 mt-5 pt-5 pb-5">

      <h1 className="payment-title mt-5 pt-5">
        الدفع / <span>العربة</span> / التسوق
      </h1>

      <div className="payment-wrapper">

        {/* ===== Left Box - Order Summary ===== */}
        <div className="order-summary">
          <h3 className="summary-title">محتويات الطلب</h3>
          <div className="summary-row"><span>المنتجات</span><span>2</span></div>
          <div className="summary-row"><span>المجموع</span><span>230</span></div>
          <div className="summary-row"><span>الشحن</span><span>30</span></div>
          <div className="summary-row total"><span>الإجمالي</span><span className="total-num">260</span></div>
        </div>

        {/* ===== Right Box - Payment Methods ===== */}
        <div className="payment-methods">
          <label className="method-row">
            <span>نقداً</span>
            <input type="radio" name="pay" checked={method === "cash"} onChange={() => setMethod("cash")} />
          </label>

          <label className="method-row">
            <span>فيزا</span>
            <input type="radio" name="pay" checked={method === "visa"} onChange={() => setMethod("visa")} />
          </label>

          {method === "visa" && (
            <div className="visa-form">
              <input
                placeholder="اسم صاحب البطاقة"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="رقم البطاقة"
                maxLength={14}
                value={form.account_number}
                onChange={(e) => setForm({ ...form, account_number: e.target.value })}
              />
              <input
                placeholder="CVV"
                maxLength={3}
                value={form.cvv}
                onChange={(e) => setForm({ ...form, cvv: e.target.value })}
              />
              <input
                placeholder="MM/YY"
                value={form.expair_date}
                onChange={(e) => setForm({ ...form, expair_date: e.target.value })}
              />
            </div>
          )}

          <button className="pay-btn" onClick={payNow}>ادفع الآن</button>
        </div>

      </div>

    </div>
  );
}
