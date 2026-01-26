// SellerRelatedProductsWrapper.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SellerRelatedProducts from "../SellerRelatedProducts/SellerRelatedProducts";
import { BaseUrl } from "../../App";
import SellerServicesUrl from "../../SellerServicesUrl";

export default function SellerRelatedProductsWrapper() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("seller_token");

  useEffect(() => {
    axios.get(BaseUrl + SellerServicesUrl.SellerHome, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setProducts(res.data.data?.products || []);
    });
  }, []);

  return <SellerRelatedProducts products={products} />;
}
