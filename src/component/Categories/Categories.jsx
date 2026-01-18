import React, { useEffect, useState } from "react";
import "./Categories.css";
import axios from "axios";

import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";

import Slider from "../Slider/Slider";
import defaultImg from "../../assets/mobile-img.png"; // صورة افتراضية

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

const getCategories = async () => {
  try {
    setLoading(true);

    const response = await axios.get(
      BaseUrl + BuyerServicesUrl.GetCategories
    );

    // ✅ هنا فقط الـ Array
    const rawCategories = response.data.data.data;

    const formattedCategories = rawCategories.map(cat => ({
      name: cat.name,
      img: cat.icon && cat.icon !== ""
        ? cat.icon
        : require("../../assets/mobile-img.png"),
    }));

    setCategories(formattedCategories);

  } catch (err) {
    console.error(err);
    setError("حصل خطأ أثناء تحميل الفئات");
  } finally {
    setLoading(false);
  }
};

  if (loading) return <p className="text-center">جاري التحميل...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="customer-categories-section mt-5">
      <div className="container">
        <h2 className="customer-categories-title">الفئات</h2>

        <Slider items={categories} />
      </div>
    </div>
  );
}
