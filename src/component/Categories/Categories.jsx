import React, { useEffect, useState } from "react";
import "./Categories.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";

import Slider from "../Slider/Slider";
import defaultImg from "../../assets/mobile-img.png";

export default function Categories() {
  const { t } = useTranslation();

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

      const rawCategories = response.data?.data?.data || [];

      const formattedCategories = rawCategories.map((cat) => ({
        name: cat.name, 
        img:
          cat.icon && cat.icon !== ""
            ? cat.icon
            : defaultImg,
      }));

      setCategories(formattedCategories);
    } catch (err) {
      console.error(err);
      setError(t("categoriesError"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center">{t("loading")}</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="customer-categories-section mt-5">
      <div className="container">
        <h2 className="customer-categories-title">
          {t("categories")}
        </h2>

        <Slider items={categories} />
      </div>
    </div>
  );
}
