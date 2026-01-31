import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";
import { mapProduct } from "../../models/Product/ProductResponseModel";
import "./CategoryProducts.css";

export default function CategoryProducts() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const categoryName = state?.categoryName || ""; // get category from navigation state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // optional: for API errors

  useEffect(() => {
    if (!categoryName) {
      setLoading(false);
      return;
    }

    const fetchProductsByCategory = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(BaseUrl + BuyerServicesUrl.GetProductList, {
          headers: { Authorization: `Bearer ${token}` },
        });
 
        const allProducts = res.data?.data?.map(mapProduct) || [];
        const filtered = allProducts.filter(
          (p) => p.categoryName?.trim() === categoryName.trim()
        );

        setProducts(filtered);
      } catch (err) {
        if (err.response?.status === 401) navigate("/seller/sellerlogin");
        console.error(err);
        setError("حدث خطأ أثناء تحميل المنتجات"); 
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryName, navigate]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  if (!categoryName)
    return (
      <div className="text-center mt-5">
        <h4>لم يتم اختيار فئة</h4>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5 text-danger">
        <h4>{error}</h4>
      </div>
    );

  if (products.length === 0)
    return (
      <div className="text-center mt-5">
        <h4>لا توجد منتجات في هذه الفئة</h4>
      </div>
    );

  return (
    <div className="productList">
      <h4 className="mb-4 fw-bold">{categoryName}</h4>
      <div className="row mt-4">
        {products.map((item, i) => (
          <div className="col-lg-4 col-md-6 mb-4" key={i}>
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
