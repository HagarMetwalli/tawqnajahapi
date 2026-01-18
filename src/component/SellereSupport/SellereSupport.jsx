import React, { useEffect, useState } from "react";
import "../SellereSupport/SellereSupport.css";
import fsupport from "../../assets/fsupport.png";
import eyedark from "../../assets/eyesupport.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";
import { Modal, Button } from "react-bootstrap";


export default function SellereSupport() {
  const token = localStorage.getItem("token"); 
const [showModal, setShowModal] = useState(false);
const [modalMessage, setModalMessage] = useState("");
const [modalType, setModalType] = useState("success"); // success | error

  const [charities, setCharities] = useState([]);
  const [kinds, setKinds] = useState([]);

  const [charityId, setCharityId] = useState("");
  const [kindId, setKindId] = useState("");
  const [description, setDescription] = useState("");

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

  /* ===== GET KIND SUPPORT ===== */
  useEffect(() => {
    axios
      .get(BaseUrl + BuyerServicesUrl.GetKindSupport, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setKinds(res.data.data || []);
      })
      .catch((err) => {
        console.log("GET KIND SUPPORT ERROR", err);
      });
  }, [token]);

  /* ===== SEND REQUEST ===== */
const handleSubmit = () => {
  if (!charityId || !kindId || !description.trim()) {
   setModalType("error");
      setModalMessage("من فضلك كمل كل البيانات ❌");
      setShowModal(true);
          return;
  }

  const user = JSON.parse(localStorage.getItem("user")); 

  const payload = {
    user_id: user.id,          
    charity_id: Number(charityId),
    kind_support_id: Number(kindId),
    support_type : "kind_support" , 
    description: description.trim(),
  };
console.log("USER", user);

  console.log("SEND SUPPORT PAYLOAD", payload);

  setLoading(true);

  axios.post(
    BaseUrl + BuyerServicesUrl.SendSupportRequest,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
.then(() => {
  setModalType("success");
  setModalMessage("تم إرسال الطلب بنجاح ✅");
  setShowModal(true);

  setCharityId("");
  setKindId("");
  setDescription("");
})
.catch((err) => {
  setModalType("error");
  setModalMessage("حصل خطأ، راجعي البيانات ❌");
  setShowModal(true);

  console.log("SEND SUPPORT ERROR", err.response?.data);
})
.finally(() => setLoading(false));

};



  return (
    <>
<Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  centered
  backdrop="static"
  dialogClassName="custom-success-modal"
>
  <Modal.Body className="custom-modal-body text-center">
    <div className={`modal-icon ${modalType}`}>
      ✓
    </div>

    <h4 className="modal-title-text">
      {modalType === "success" ? "تم بنجاح" : "تنبيه"}
    </h4>

    <p className="modal-desc">
      {modalMessage}
    </p>

    <button
      className="modal-confirm-btn"
      onClick={() => setShowModal(false)}
    >
      حسناً
    </button>
  </Modal.Body>
</Modal>


          <div className="support-wrapper">
      <div className="container">
        <div className="row">

          {/* ===== TABS ===== */}
          <div className="col-lg-3 d-lg-block">
            <div className="support-tabs">

              <Link
                to="/eyesupport"
                className="support-tab active-tab text-decoration-none"
              >
                <img src={eyedark} alt="" />
                <span className="eye-text">الدعم العيني</span>
              </Link>

              <Link
                to="/financialsupport"
                className="support-tab inactive-tab text-decoration-none"
              >
                <img src={fsupport} alt="" />
                <span className="f-text">الباقات</span>
              </Link>

            </div>
          </div>

          {/* ===== FORM ===== */}
          <div className="col-lg-9 col-12">

            <div className="mb-4">
              <label className="label-title pt-3">
                الجهة المدعومة
              </label>
      <select
  className="form-control input-box custom-select"
  value={charityId}
  onChange={(e) => setCharityId(e.target.value)}
>
  <option value="">الجهة المدعومة</option>

  {charities.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>

            </div>

            <div className="mb-4">
              <label className="label-title">
                نوع الدعم العيني
              </label>
              <select
                className="form-control input-box custom-select"
                value={kindId}
                onChange={(e) => setKindId(e.target.value)}
              >
                <option value="">نوع الدعم العيني</option>
                {kinds.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="label-title">
                وصف المنتج
              </label>
              <textarea
                rows="4"
                className="form-control input-box"
                placeholder=":تجربة أول ريكوست للدعم العيني"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
