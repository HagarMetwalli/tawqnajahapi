import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* ===================== CHECK LOGIN ===================== */
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCart();
    // eslint-disable-next-line
  }, []);

  /* ===================== GET CART ===================== */
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BaseUrl}${BuyerServicesUrl.ShowCart}`, {
        headers: {
          Authorization: `Bearer ${token}`,
                Accept: "application/json",
        },
        
      });
      console.log(res);
      console.log(BaseUrl + BuyerServicesUrl.ShowCart);

      setCart(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ===================== CHANGE QUANTITY (+ / -) ===================== */
  const changeQuantity = async (itemId, qty) => {
    try {
      await axios.post(
        `${BaseUrl}${BuyerServicesUrl.ChangeCart}`,
        {
          item_id: itemId,
          quantity: qty, // +1 or -1
        },
        {
          headers: { Authorization: `Bearer ${token}` ,
                Accept: "application/json",
        },
        }
      );

      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  /* ===================== REMOVE ITEM ===================== */
const removeItem = async (itemId) => {
  if (!itemId) return; // ⭐⭐⭐ يمنع أي call غلط

  try {
    await axios.delete(
      `${BaseUrl}${BuyerServicesUrl.RemoveCart}/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error(err.response?.data || err);
  }
};

  /* ===================== SEND ORDER ===================== */
  const sendOrder = async () => {
    try {
      await axios.post(
        `${BaseUrl}user/send-order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
                  Accept: "application/json",

          },
        }
      );
      navigate("/confirmedorders");
    } catch (err) {
      alert("السلة غير صالحة أو فارغة");
    }
  };

  /* ===================== UI ===================== */
  if (loading) {
    return <p className="text-center mt-5">جاري التحميل...</p>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="text-center mt-5 pt-5">
        <h3>سلة التسوق فارغة</h3>
        <button className="order-btn mt-3" onClick={() => navigate("/")}>
          الرجوع للتسوق
        </button>
      </div>
    );
  }

  /* ===================== TOTALS ===================== */
  const finalTotal = Number(cart?.total || 0) + Number(cart?.fees || 0);

  return (
    <div className="cart-page container mt-5 pt-5">
      <div className="cart-layout mt-5">
        {/* ================= CART ITEMS ================= */}
        <div className="cart-items">
          <div className="cart-header">المنتجات ({cart.items.length})</div>

          {cart.items.map((item) => (
            <div className="cart-item" key={item.id_item}>
              <img
                src={item.image}
                alt={item.product_name}
                className="cart-img"
              />

              <div className="cart-info">
                <h4>{item.product_name}</h4>
                <p className="desc">{item.product_description}</p>

                <p className="price">
                  {(item.product_price_after_discount || item.product_price) +
                    " " +
                    item.product_currency}
                </p>
              </div>

              <div className="qty-box">
                <button
                  onClick={() =>
                    item.quantity === 1
                      ? removeItem(item.id_item)
                      : changeQuantity(item.id_item, -1)
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => changeQuantity(item.id_item, 1)}>+</button>
              </div>

              <div className="item-total">
                {item.quantity *
                  (item.product_price_after_discount || item.product_price)}{" "}
                {item.product_currency}
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id_item)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="cart-summary">
          <h4>محتويات الطلب</h4>

          <div className="summary-row">
            <span>المجموع</span>
            <span>{cart.total} ر.س</span>
          </div>

          <div className="summary-row">
            <span>الشحن</span>
            <span>{cart.fees} ر.س</span>
          </div>

          <div className="summary-row total">
            <span>الإجمالي</span>
            <span>{finalTotal} ر.س</span>
          </div>

          <button className="checkout-btn" onClick={sendOrder}>
            التحويل للدفع
          </button>
        </div>
      </div>
    </div>
  );
}
