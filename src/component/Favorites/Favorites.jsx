import React, { useState, useEffect } from "react";
import "../Favorites/Favorites.css";
import carticon from "../../assets/cartsvg.svg";
import axios from "axios";
import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favoritesProducts, setFavoritesProducts] = useState([]);

  // ===== جلب المنتجات المفضلة من API =====
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${BaseUrl}${BuyerServicesUrl.GetProductsFavoriteList}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        setFavoritesProducts(res.data.data.data || []);
      } catch (err) {
        console.error(err.response?.data || err);
      }
    };

    fetchFavorites();
  }, []);

  // ===== إضافة منتج للعربة =====
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("يرجى تسجيل الدخول");
        return;
      }

      await axios.post(
        BaseUrl + BuyerServicesUrl.AddToCart,
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.dispatchEvent(new Event("cartUpdated"));
      alert("تم إضافة المنتج للعربة");
    } catch (err) {
      console.log(err);
    }
  };

  // ===== إضافة الكل للعربة =====
  const addAllToCart = () => {
    favoritesProducts.forEach((item) => addToCart(item.id));
  };

  return (
    <div className="p-table mt-5 mb-5">
      <div className="container mt-5">
        <div className="table-wrapper pt-5">
          {/* HEADER */}
          <div className="table-header mt-5">
            <span>المنتجات ({favoritesProducts.length})</span>
            <span>السعر</span>
            <span className="datetext">التاريخ</span>
          </div>

          <table className="table custom-table">
            <tbody>
              {favoritesProducts.map((item) => (
                <tr key={item.id} className="brdr">
                  {/* PRODUCT CELL */}
                  <td>
                    <Link to={`/productdetails/${item.id}`} className="prod-link text-decoration-none">
                      <div className="prod-info">
                        <img
                          className="shirt"
                          src={item.image?.[0]}
                          alt={item.name}
                        />
                        <div className="prod-text text-dark text-decoration-none">
                          <div className="title-rating-row mb-2">
                            <p className="prod-name mb-0">{item.name}</p>
                            <div className="prod-rate">
                              <i className="fa fa-star"></i>
                              <span>{item.avg_rate?.toFixed(1)}</span>
                            </div>
                          </div>
                          <div className="card-desc d-md-none">
                            <p className="mb-0 text-muted">{item.description}</p>
                          </div>
                          <div className="pricenumber fw-bold d-flex gap-1 d-md-none">
                            <span>السعر : </span>
                            <span>{item.price} {item.currency_type}</span>
                          </div>
                          <div className="card-btn-sm d-md-none">
                            <span className="text-white ms-2">إضافة للعربة</span>
                            <img src={carticon} alt="cart" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </td>

                  {/* PRICE */}
                  <td className="cprice">
                    <span className="pricenumber">{item.price} {item.currency_type}</span>
                  </td>

                  {/* DATE */}
                  <td className="cdate">{/* لو فيه تاريخ تقدر تحطيه هنا */}</td>

                  {/* BUTTON */}
                  <td className="cart-btn text-center d-none d-md-flex">
                    <span className="text-white">إضافة للعربة</span>
                    <img src={carticon} alt="cart" />
                    <button
                      className="addcart text-white border-0 pt-2 pb-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item.id);
                      }}
                    >
                      إضافة للعربة
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* BOTTOM ACTION BUTTONS */}
          <div className="fav-actions mb-5">
            <button className="add-all" onClick={addAllToCart}>
              <img src={carticon} alt="cart" />
              إضافة الكل للعربة
            </button>

            <button className="delete-all">حذف عربة التسوق</button>
          </div>
        </div>
      </div>
    </div>
  );
}
