import CommonPage from "../../../database/models/CommonPage.js";
import ContactUsPage from "../../../database/models/ContactUsPage.js";
import FaqCategory from "../../../database/models/FaqCategory.js";
import Faq from "../../../database/models/Faq.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

const handleError = (res, error) => {
  return errorResponse(
    res,
    process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
    500
  );
};

export const getPage = async (req, res) => {
  try {
    const page = await CommonPage.findOne({ where: { page_name: req.params.slug, status: 1 } });
    if (!page) return errorResponse(res, "Page not found", 404);

    return successDataResponse(res, "Page fetched successfully", page, 200);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getContactUsPage = async (req, res) => {
  try {
    const page = await ContactUsPage.findOne({ where: { status: 1 }, order: [["id", "ASC"]] });
    if (!page) return errorResponse(res, "Contact us page not found", 404);

    return successDataResponse(res, "Contact us page fetched successfully", page, 200);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getFaqs = async (req, res) => {
  try {
    const categories = await FaqCategory.findAll({
      include: [{ model: Faq, as: "faqs" }],
      order: [["id", "ASC"]],
    });

    return successDataResponse(res, "FAQs fetched successfully", { categories }, 200);
  } catch (error) {
    return handleError(res, error);
  }
};
