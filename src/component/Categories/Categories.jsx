import React, { useEffect, useState } from "react";
import "./Categories.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";

import Slider from "../Slider/Slider";

export default function Categories() {
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ فئات ثابتة هتظهر حتى لو مش جاية من الـ API
  const staticCategories = [
    { id: "market", name: "السوق", icon: "fa-store" },
    { id: "games", name: "ألعاب", icon: "fa-gamepad" },
    { id: "furniture", name: "أثاث", icon: "fa-couch" },
  ];

  // ✅ mapping لتعديل الاسم المعروض حسب اللي جاي من الـ API
  const nameMapping = {
    "العاب": "ألعاب",
    "اثاث": "أثاث",
    "الكتروني": "كتب",
    "سوق": "السوق",
  };

  // ✅ mapping للأيقونات (Font Awesome)
  const categoryIcons = {
    "الكترونيات": "fa-mobile-screen-button",
    "ازياء": "fa-shirt",
    "صحه": "fa-heart-pulse",
    "مطبخ": "fa-utensils",
    "ألعاب": "fa-gamepad",
    "السوق": "fa-store",
    "أثاث": "fa-couch",
    "كتب": "fa-book",
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);

      const response = await axios.get(BaseUrl + BuyerServicesUrl.GetCategories);

      const rawCategories = response.data?.data?.data || [];

      const formattedCategories = rawCategories.map((cat) => {
        const displayName = nameMapping[cat.name] || cat.name;

        return {
          id: cat.id,
          name: displayName,
          icon: categoryIcons[displayName] || "fa-layer-group",
        };
      });

      // ✅ دمج + منع التكرار (لو السيرفر رجّع نفس الفئة)
      const merged = [
        ...staticCategories,
        ...formattedCategories.filter(
          (cat) => !staticCategories.some((s) => s.name === cat.name)
        ),
      ];

      setCategories(merged);
    } catch (err) {
      console.error(err);
      setError(t("categoriesError"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">{t("loading")}</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="customer-categories-section mt-5">
      <div className="container">
        <h2 className="customer-categories-title">{t("categories")}</h2>
        <Slider items={categories} />
      </div>
    </div>
  );
}
