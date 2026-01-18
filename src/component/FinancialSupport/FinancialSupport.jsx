import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

import "../FinancialSupport/FinancialSupport.css";
import eyedark from "../../assets/eyedark.png";
import whitesupport from "../../assets/whitesupport.png";

import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";

export default function FinancialSupport() {
  const token = localStorage.getItem("token");

  /* ===== STATE ===== */
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");

  const [charities, setCharities] = useState([]);
  const [charityId, setCharityId] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  /* ===== GET CHARITIES ===== */
  useEffect(() => {
    axios
      .get(BaseUrl + BuyerServicesUrl.GetCharity, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCharities(res.data.data || []);
      })
      .catch((err) => {
        console.log("GET CHARITIES ERROR", err);
      });
  }, [token]);

  /* ===== SEND FINANCIAL SUPPORT (PACKAGES) ===== */
const handleSubmit = () => {
  if (!charityId || !amount) {
    setModalType("error");
    setModalMessage("من فضلك اختار الجهة وقيمة الباقة ❌");
    setShowModal(true);
    return;
  }
const user = JSON.parse(localStorage.getItem("user"));

const payload = {
  user_id: user.id,
  charity_id: Number(charityId),
  support_type: "financial_support",
  plan_value: Number(amount),        // 👈 بدل amount
  description: "تبرع باقة مالية",    // 👈 إجباري
};

console.log("PAYLOAD 👉", payload);



  setLoading(true);

  axios
    .post(BaseUrl + BuyerServicesUrl.SendSupportRequest, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setModalType("success");
      setModalMessage("تم إرسال طلب الباقة بنجاح ✅");
      setShowModal(true);

      setCharityId("");
      setAmount("");
    })
    .catch((err) => {
      setModalType("error");
      setModalMessage(err.response?.data?.message || "حدث خطأ ❌");
      setShowModal(true);
      console.log(err.response?.data);
    })
    .finally(() => setLoading(false));
};


  return (
    <>
      {/* ===== MODAL ===== */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        dialogClassName="custom-success-modal"
      >
        <Modal.Body className="custom-modal-body text-center">
          <div className={`modal-icon ${modalType}`}>✓</div>

          <h4 className="modal-title-text">
            {modalType === "success" ? "تم بنجاح" : "تنبيه"}
          </h4>

          <p className="modal-desc">{modalMessage}</p>

          <button
            className="modal-confirm-btn"
            onClick={() => setShowModal(false)}
          >
            حسناً
          </button>
        </Modal.Body>
      </Modal>

      {/* ===== PAGE ===== */}
      <div className="support-wrapper">
        <div className="container">
          <div className="row">

            {/* ===== TABS ===== */}
            <div className="col-lg-3 d-lg-block support-tabs-column">
              <div className="support-tabs tabs2">

                <Link
                  to="/eyesupport"
                  className="text-decoration-none support-tab inactive-tab"
                >
                  <img src={eyedark} alt="" />
                  <span className="eye-text">الدعم العيني</span>
                </Link>

                <Link
                  to="/financialsupport"
                  className="text-decoration-none support-tab active-tab"
                >
                  <img src={whitesupport} alt="" />
                  <span className="f-text mx-3 text-white">الباقات</span>
                </Link>

              </div>
            </div>

            {/* ===== FORM ===== */}
            <div className="col-lg-9 col-12">

              {/* الجهة المدعومة */}
              <div className="mb-4">
                <label className="label-title pt-3">
                  الجهة المدعومة
                </label>

                <select
                  className="form-control input-box custom-select"
                  value={charityId}
                  onChange={(e) => setCharityId(e.target.value)}
                >
                  <option value="">اختر الجهة المدعومة</option>
                  {charities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* قيمة الباقة */}
              <div className="mb-4">
                <label className="label-title">قيمة الباقة</label>

                <select
                  className="form-control input-box custom-select"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                >
                  <option value="">اختر المبلغ</option>
                  <option value="100">100 ريال</option>
                  <option value="250">250 ريال</option>
                  <option value="500">500 ريال</option>
                  <option value="1000">1000 ريال</option>
                </select>
              </div>

              <button
                className="submit-btn w-100"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "جاري الإرسال..." : "إرسال الطلب"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
