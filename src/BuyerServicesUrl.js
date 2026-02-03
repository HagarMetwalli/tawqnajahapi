
const BuyerServicesUrl = {
 //Auth
  Login: "user/auth/login",
  Register: "user/auth/register",
  LogOut:"user/auth/logout",
  ChangePassword: "user/auth/change-password",
  ForgetPassword: "user/auth/forget-password",
  ResetPassword: "user/auth/reset-password",

  //categories
  GetCategory: "user/categories",

  //Product
  GetProductList: "user/products?type=normal",
  GetProductsFavoriteList: "user/products-favorite",
  GetProductById: "user/products/{id}",
  RateProduct:"user/products/{id}/add-rate",
  AddProductToFavorites:"user/products/{id}/favorite",
  // Marketing ✅
  Marketing: "user/marketing",
  // Support
GetAllCharity: "user/get-charity",
//Home
Home:"user/home",
// Category
GetCategories: "user/categories",
// support
 GetCharity: "user/get-charity",
  GetKindSupport: "user/get-kind-support",
  SendSupportRequest: "user/send-support",
 //marketing
  // marketing ✅
GetMarketingData: "user/get-markting-data",
SendMarketingRequest: "user/send-markting-request",
// Orders
MyOrders: "user/my-order",
//cart 
AddToCart:"user/add-to-cart",
ShowCart:"user/show-my-cart",
ChangeCart:"user/change-cart",
RemoveCart:"user/remove-from-cart",
//Adds
AddAdvertisement:"user/products/create-ad",
ShowAdvertisements:"user/products-my-ads",

};

export default BuyerServicesUrl;