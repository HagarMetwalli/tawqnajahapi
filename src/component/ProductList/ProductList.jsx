import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../App";
import BuyerServicesUrl from "../../BuyerServicesUrl";
import { mapProduct } from "../../models/Product/ProductResponseModel";
import "./ProductList.css";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("BuyerServicesUrl.GetProductList",BuyerServicesUrl.GetProductList)
        const token = localStorage.getItem("token");
        const res = await axios.get(BaseUrl + BuyerServicesUrl.GetProductList, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const mappedProducts = res.data?.data?.map(mapProduct) || [];
        setProducts(mappedProducts);
      } catch (err) {
        if (err.response?.status === 401) navigate("/login");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center mt-5 pt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="productList">
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
