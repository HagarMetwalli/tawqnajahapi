import { Outlet, useLocation } from "react-router-dom";
import SellerNavbar from "../SellerNavbar/SellerNavbar";
import SellerUppernav from "../SellerUppernav/SellerUppernav";
import SellerFooter from "../SellerFooter/SellerFooter";
import ScrollTop from "../ScrollTop/ScrollTop"

export default function SellerLayout() {
  const location = useLocation();

  // ✅ صفحات فورم السيلر فقط
  const authRoutes = [
    "/seller/sellerlogin",
    "/seller/sellerregister",
    "/seller/sellerforgetpassword",
    "/seller/sellerresetpassword",
    "/seller/sellerchangepassword",
    "/seller/selleraccounttype",
  ];

  const hideLayout = authRoutes.some((route) =>
    location.pathname.toLowerCase().startsWith(route)
  );

  return (
    <>
    <ScrollTop/>
      {!hideLayout && <SellerUppernav />}
      {!hideLayout && <SellerNavbar />}

      <Outlet />

      {!hideLayout && <SellerFooter />}
    </>
  );
}
