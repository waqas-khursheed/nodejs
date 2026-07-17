import Admin from "./Admin.js";
import ApplicationHomeBanner from "./ApplicationHomeBanner.js";
import ApplicationSlide from "./ApplicationSlide.js";
import AssignAttrToProduct from "./AssignAttrToProduct.js";
import AssignCatToProduct from "./AssignCatToProduct.js";
import AssignTagToProduct from "./AssignTagToProduct.js";
import AssignTagToTag from "./AssignTagToTag.js";
import AttributeItem from "./AttributeItem.js";
import BillingDetail from "./BillingDetail.js";
import Brand from "./Brand.js";
import Cart from "./Cart.js";
import City from "./City.js";
import CommonPage from "./CommonPage.js";
import ContactUsPage from "./ContactUsPage.js";
import Country from "./Country.js";
import Coupon from "./Coupon.js";
import Exchange from "./Exchange.js";
import Faq from "./Faq.js";
import FaqCategory from "./FaqCategory.js";
import GeoCity from "./GeoCity.js";
import GeoContinent from "./GeoContinent.js";
import GeoCountry from "./GeoCountry.js";
import GeoState from "./GeoState.js";
import GeoSubContinent from "./GeoSubContinent.js";
import GeoZone from "./GeoZone.js";
import HomeBanner from "./HomeBanner.js";
import MetaCouponCategory from "./MetaCouponCategory.js";
import MobileCoupon from "./MobileCoupon.js";
import MobileSlider from "./MobileSlider.js";
import Notification from "./Notification.js";
import Order from "./Order.js";
import OrderDetail from "./OrderDetail.js";
import OrderGallery from "./OrderGallery.js";
import OrderStatusHistory from "./OrderStatusHistory.js";
import PasswordReset from "./PasswordReset.js";
import Product from "./Product.js";
import ProductAttribute from "./ProductAttribute.js";
import ProductCategory from "./ProductCategory.js";
import ProductCity from "./ProductCity.js";
import ProductGallery from "./ProductGallery.js";
import ProductTag from "./ProductTag.js";
import QueryForm from "./QueryForm.js";
import RandomCoupon from "./RandomCoupon.js";
import ResetPasswordCode from "./ResetPasswordCode.js";
import Review from "./Review.js";
import RewardsEarningMethod from "./RewardsEarningMethod.js";
import RewardSetting from "./RewardSetting.js";
import SideBanner from "./SideBanner.js";
import SizeChart from "./SizeChart.js";
import Slide from "./Slide.js";
import State from "./State.js";
import Stock from "./Stock.js";
import StockItem from "./StockItem.js";
import Subscribe from "./Subscribe.js";
import UsedCoupon from "./UsedCoupon.js";
import User from "./User.js";
import UserAddress from "./UserAddress.js";
import UserReward from "./UserReward.js";
import WebSetting from "./WebSetting.js";
import Wishlist from "./Wishlist.js";

const models = {
  Admin,
  ApplicationHomeBanner,
  ApplicationSlide,
  AssignAttrToProduct,
  AssignCatToProduct,
  AssignTagToProduct,
  AssignTagToTag,
  AttributeItem,
  BillingDetail,
  Brand,
  Cart,
  City,
  CommonPage,
  ContactUsPage,
  Country,
  Coupon,
  Exchange,
  Faq,
  FaqCategory,
  GeoCity,
  GeoContinent,
  GeoCountry,
  GeoState,
  GeoSubContinent,
  GeoZone,
  HomeBanner,
  MetaCouponCategory,
  MobileCoupon,
  MobileSlider,
  Notification,
  Order,
  OrderDetail,
  OrderGallery,
  OrderStatusHistory,
  PasswordReset,
  Product,
  ProductAttribute,
  ProductCategory,
  ProductCity,
  ProductGallery,
  ProductTag,
  QueryForm,
  RandomCoupon,
  ResetPasswordCode,
  Review,
  RewardsEarningMethod,
  RewardSetting,
  SideBanner,
  SizeChart,
  Slide,
  State,
  Stock,
  StockItem,
  Subscribe,
  UsedCoupon,
  User,
  UserAddress,
  UserReward,
  WebSetting,
  Wishlist,
};

Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export default models;
export {
  Admin,
  ApplicationHomeBanner,
  ApplicationSlide,
  AssignAttrToProduct,
  AssignCatToProduct,
  AssignTagToProduct,
  AssignTagToTag,
  AttributeItem,
  BillingDetail,
  Brand,
  Cart,
  City,
  CommonPage,
  ContactUsPage,
  Country,
  Coupon,
  Exchange,
  Faq,
  FaqCategory,
  GeoCity,
  GeoContinent,
  GeoCountry,
  GeoState,
  GeoSubContinent,
  GeoZone,
  HomeBanner,
  MetaCouponCategory,
  MobileCoupon,
  MobileSlider,
  Notification,
  Order,
  OrderDetail,
  OrderGallery,
  OrderStatusHistory,
  PasswordReset,
  Product,
  ProductAttribute,
  ProductCategory,
  ProductCity,
  ProductGallery,
  ProductTag,
  QueryForm,
  RandomCoupon,
  ResetPasswordCode,
  Review,
  RewardsEarningMethod,
  RewardSetting,
  SideBanner,
  SizeChart,
  Slide,
  State,
  Stock,
  StockItem,
  Subscribe,
  UsedCoupon,
  User,
  UserAddress,
  UserReward,
  WebSetting,
  Wishlist,
};
