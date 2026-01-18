import React from "react";
import "../Favorites/Favorites.css";
import wintershirt from "../../assets/wintershirt.jpg";
import carticon from "../../assets/cartsvg.svg";
import { Link } from "react-router-dom";

export default function Favorites() {
  return (
    <div className="p-table mt-5 mb-5">
      <div className="container mt-5">
        <div className="table-wrapper pt-5">
          {/* HEADER OUTSIDE THE TABLE */}
          <div className="table-header mt-5">
            <span>المنتجات (2)</span>
            <span>السعر</span>
            <span className="datetext">التاريخ</span>
          </div>

          <table className="table custom-table">
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="brdr">
                  {/* PRODUCT CELL */}
                  <td>
                    <Link
                      to="/winterdetails"
                      className="prod-link text-decoration-none"
                    >
                      <div className="prod-info">
                        <img
                          className="shirt"
                          src={wintershirt}
                          alt="product"
                        />
                        <div className="prod-text text-dark text-decoration-none">
                          {/* الاسم + الريتنج في نفس السطر */}
                          <div className="title-rating-row mb-2">
                            <p className="prod-name mb-0">تيشيرت شتوي</p>

                            <div className="prod-rate">
                              <i className="fa fa-star"></i>
                              <span>4.9</span>
                            </div>
                          </div>
                          <div className="card-desc d-md-none">
                            <p className="mb-0 text-muted">
                              تيشيرت شتوي أنيق،..
                              
                          
                            </p>
                          </div>
                          <div className="pricenumber fw-bold d-flex gap-1 d-md-none">
                            <span>السعر : </span>
                            <span> 100 ر.س </span>
                          </div>
                          <div className="card-btn-sm d-md-none">
                            <span className="text-white ms-2">
                              إضافة للعربة
                            </span>
                            <img src={carticon} alt="cart" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </td>

                  {/* PRICE */}
                  <td className="cprice ">
                    <span className="pricenumber">100 ر.س</span>
                  </td>

                  {/* DATE */}
                  <td className="cdate ">15/2/2025</td>

                  {/* BUTTON */}
                  <td className="cart-btn text-center d-none d-md-flex">
                    <span className="text-white">إضافة للعربة</span>
                    <img src={carticon} alt="cart" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* BOTTOM ACTION BUTTONS */}
          <div className="fav-actions mb-5">
            <button className="add-all">
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
