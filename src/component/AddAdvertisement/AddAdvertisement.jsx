import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "../AddAdvertisement/AddAdvertisement.css";
import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";

export default function AddAdvertisement() {
  const [images, setImages] = useState([]);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Handle file selection
  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 10) {
      alert("الحد الأقصى للصور هو 10");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // Remove an image
  const deleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("يرجى إضافة صورة واحدة على الأقل");
      return;
    }

    setFormSubmitting(true);

    try {
      const formData = new FormData();

      // Required fields
      formData.append("name", e.target.name.value);
      formData.append("price", e.target.price.value);
      formData.append("discount", e.target.discount.value || 0);
      formData.append("description", e.target.description.value);

      // Social links
      formData.append("linkInsta", e.target.linkInsta.value || "");
      formData.append("linkWhatsapp", e.target.linkWhatsapp.value || "");
      formData.append("linkSnab", e.target.linkSnab.value || "");
      formData.append("linkFacebook", e.target.linkFacebook.value || "");

      // Append images
      images.forEach((img) => {
        formData.append("images[]", img.file);
      });
      const token = localStorage.getItem("token");

      // Send POST request
      const response = await axios.post(
        BaseUrl + BuyerServicesUrl.AddAdvertisement,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.status === 200) {
        alert("تم نشر الإعلان بنجاح!");
        e.target.reset();
        setImages([]);
      } else {
        alert("حدث خطأ أثناء النشر: " + response.data.message);
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("خطأ في الاتصال بالخادم");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="add-ad-page container mt-5 pt-4 mb-5 pb-5">
      <h2 className="page-title mt-5 mb-4 headeradvertisement">
        إضافة إعلان <span>/ الرئيسية</span>
      </h2>

      <Form className="ad-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>اسم المنتج</Form.Label>
          <Form.Control type="text" name="name" required placeholder="اسم المنتج" />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>السعر</Form.Label>
              <Form.Control type="number" name="price" required placeholder="السعر" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>نسبة الخصم</Form.Label>
              <Form.Control type="number" name="discount" placeholder="الخصم" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>وصف المنتج</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            required
            placeholder="اكتب وصف المنتج هنا..."
          />
        </Form.Group>

        {/* Social Links */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>رابط إنستغرام</Form.Label>
              <Form.Control type="text" name="linkInsta" placeholder="linkInsta" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>رابط واتساب</Form.Label>
              <Form.Control type="text" name="linkWhatsapp" placeholder="linkWhatsapp" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>رابط سناب شات</Form.Label>
              <Form.Control type="text" name="linkSnab" placeholder="linkSnab" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>رابط فيسبوك</Form.Label>
              <Form.Control type="text" name="linkFacebook" placeholder="linkFacebook" />
            </Form.Group>
          </Col>
        </Row>

        {/* Image Upload */}
        <div className="images-section mb-4">
          <Form.Label>الصور (الحد الأقصى 10)</Form.Label>
          <div className="upload-box">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagesUpload}
              className="upload-input"
            />
            <div className="upload-content">
              <i className="fa-solid fa-cloud-arrow-up upload-icon"></i>
              <p>إضافة صور</p>
            </div>
          </div>

          {/* Preview Images */}
          <div className="preview-images">
            {images.map((img, index) => (
              <div key={index} className="preview-item">
                <img src={img.url} alt={`uploaded-${index}`} />
                <button type="button" className="remove-btn" onClick={() => deleteImage(index)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="submit-btn mb-5" disabled={formSubmitting}>
          {formSubmitting ? "جارٍ النشر..." : "نشر الإعلان"}
        </Button>
      </Form>
    </div>
  );
}
