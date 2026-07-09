import { Op } from "sequelize";
import Slide from "../../../database/models/Slide.js";
import HomeBanner from "../../../database/models/HomeBanner.js";
import SideBanner from "../../../database/models/SideBanner.js";
import ApplicationSlide from "../../../database/models/ApplicationSlide.js";
import ApplicationHomeBanner from "../../../database/models/ApplicationHomeBanner.js";
import MobileSlider from "../../../database/models/MobileSlider.js";
import Product from "../../../database/models/Product.js";
import Brand from "../../../database/models/Brand.js";
import ProductCategory from "../../../database/models/ProductCategory.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

const activeOrder = { where: { status: 1 }, order: [["id", "ASC"]] };

export const getHomeContent = async (req, res) => {
  try {
    const [
      slides,
      homeBanners,
      sideBanners,
      applicationSlides,
      applicationHomeBanners,
      mobileSliders,
      newArrivals,
      bestSellers,
      onSale,
      categories,
      brands,
    ] = await Promise.all([
      Slide.findAll(activeOrder),
      HomeBanner.findAll(activeOrder),
      SideBanner.findAll(activeOrder),
      ApplicationSlide.findAll(activeOrder),
      ApplicationHomeBanner.findAll(activeOrder),
      MobileSlider.findAll(activeOrder),
      Product.findAll({
        where: { status: 1, new_arrival: 1 },
        include: [{ model: Brand, as: "brand" }],
        limit: 12,
        order: [["created_at", "DESC"]],
      }),
      Product.findAll({
        where: { status: 1, best_seller: 1 },
        include: [{ model: Brand, as: "brand" }],
        limit: 12,
        order: [["sold", "DESC"]],
      }),
      Product.findAll({
        where: { status: 1, d_percentage: { [Op.gt]: 0 } },
        include: [{ model: Brand, as: "brand" }],
        limit: 12,
        order: [["id", "DESC"]],
      }),
      ProductCategory.findAll({ where: { status: 1, parent_id: 0 }, order: [["order_by", "ASC"]] }),
      Brand.findAll({ where: { status: 1 }, order: [["title", "ASC"]] }),
    ]);

    return successDataResponse(
      res,
      "Home content fetched successfully",
      {
        slides,
        homeBanners,
        sideBanners,
        applicationSlides,
        applicationHomeBanners,
        mobileSliders,
        newArrivals,
        bestSellers,
        onSale,
        categories,
        brands,
      },
      200
    );
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
