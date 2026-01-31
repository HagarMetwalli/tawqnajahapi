import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../ProductDetails/ProductDetails.css";

// Assets
import installement from '../../assets/installement.png';
import international from '../../assets/international.png';
import Lstore from '../../assets/lorfi-store.jpg';
import productrating from '../../assets/product-rating.png';
import insta from '../../assets/insta.png';
import whatsapp from '../../assets/whatsapp.png';
import facebook from '../../assets/facebook.png';

// Icons & Config
import { IoStar } from "react-icons/io5";
import { BaseUrl } from "../../App";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userRate, setUserRate] = useState(0);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        // Fetches data from the API
        const res = await axios.get(`${BaseUrl}user/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(res.data?.data || null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">جاري التحميل...</p>
      </div>
    );
  }

  if (!product) {
    return <h2 className="text-center mt-5">المنتج غير موجود</h2>;
  }

  // Handle multiple images logic
  const images = product.images && product.images.length > 0 ? product.images : [product.img];
  const hasMultipleImages = images.length > 1;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // Handle Rating with Optimistic UI update
  const handleRate = async (rate) => {
    const previousRate = userRate;
    setUserRate(rate); 
    
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BaseUrl}user/products/${id}/add-rate`,
        { rate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to submit rating:", err);
      setUserRate(previousRate); // Revert UI if API fails
      alert("عذراً، تعذر إرسال التقييم حالياً");
    }
  };

  return (
    <div className="product-page pt-2 container mt-5">
      <h1 className="product-heading">
        تفاصيل المنتج / <span className="comm">ذات صلة</span>
      </h1>

      <div className="row product-wrapper">
        {/* Image Section */}
        <div className="product-image-boxdetails col-md-6 col-12 position-relative">
          <img src={images[currentIndex]} alt={product.name} className="main-image img-fluid rounded" />
          
          {hasMultipleImages && (
            <>
              <button className="slide-btn right" onClick={prevSlide}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button className="slide-btn left" onClick={nextSlide}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </>
          )}
        </div>

        {/* Info Section */}
        <div className="product-infoprodetails col-md-6 col-12">
          <h2 className="product-titleprodetails">{product.name}</h2>
          <div className="rating-rowdetails d-flex align-items-center mb-2">
            <span className="star-wrapperprodetails text-warning me-1"><IoStar /></span>
            <span className="rate-numberprodetails">{product.rate || 0}</span>
          </div>

          <div className="price-row my-3">
            <span className="current-price h4 text-primary fw-bold">{product.price} ر.س</span>
            {product.oldPrice && (
              <span className="old-price text-decoration-line-through ms-3 text-muted">
                {product.oldPrice} ر.س
              </span>
            )}
            {product.discount && (
              <span className="discount badge bg-danger ms-2">
                {product.discount}% خصم
              </span>
            )}
          </div>

          <p className="product-descpro2 text-muted">
            {product.desc || "لا يوجد وصف متاح لهذا المنتج حالياً."}
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="action mt-5 mb-3 d-flex justify-content-center gap-4">
        <div className="badge-card text-center">
          <img src={installement} alt="shipping" style={{width: '45px'}} />
          <p className="mt-2 mb-0 fw-bold">شحن دولي وداخلي</p>
        </div>
        <div className="badge-card text-center">
          <img src={international} alt="installment" style={{width: '45px'}} />
          <p className="mt-2 mb-0 fw-bold">تقسيط مريح</p>
        </div>
      </div>

      {/* Seller & Rating Section */}
      <div className="product-bottom-box mt-5 mb-5 p-4 border rounded shadow-sm">
        <div className="seller-box d-flex justify-content-between align-items-center flex-wrap">
          <div className="seller-info-wrap d-flex align-items-center">
            <img src={Lstore} className="seller-img rounded-circle me-3" alt="seller" style={{width: '60px', height: '60px', objectFit: 'cover'}} />
            <div className="seller-info">
              <h4 className="seller-name mb-0">متجر لورفي</h4>
              <p className="seller-location text-muted small mb-0">الرياض، المملكة العربية السعودية</p>
            </div>
          </div>
          <div className="share-icons d-flex gap-3">
            <a href="#!"><img src={facebook} alt="facebook" style={{width: '24px'}} /></a>
            <a href="#!"><img src={whatsapp} alt="whatsapp" style={{width: '24px'}} /></a>
            <a href="#!"><img src={insta} alt="instagram" style={{width: '24px'}} /></a>
          </div>
        </div>

        <hr className="my-4" />

        <h3 className="rate-title h5 mb-3">تقييمك للمنتج</h3>
        <div className="stars d-flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <img
              key={star}
              src={productrating}
              style={{ 
                opacity: userRate >= star ? 1 : 0.3, 
                cursor: "pointer",
                width: "32px",
                transition: "all 0.2s ease-in-out"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              onClick={() => handleRate(star)}
              alt={`${star} star selection`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}