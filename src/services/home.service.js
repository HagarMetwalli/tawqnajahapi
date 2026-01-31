// src/services/home.service.js
import axios from "axios";
import { BaseUrl } from "../App";
import BuyerServicesUrl from "../BuyerServicesUrl";
import { mapProduct } from "../models/Product/ProductResponseModel";

export const fetchHomeData = async (token) => {
  const res = await axios.get(BaseUrl + BuyerServicesUrl.Home, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = res.data?.data || {};

  return {
    banners: data.bannars || [],
    featuredProducts: (data.ProductToqTajah || []).map(mapProduct),
    products: (data.products || []).map(mapProduct),
  };
};
