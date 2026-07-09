import Joi from "joi";
import FaqCategory from "../../../database/models/FaqCategory.js";
import Faq from "../../../database/models/Faq.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required(),
});

const updateSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150),
}).min(1);

const router = makeLookupResourceRouter({
  Model: FaqCategory,
  resourceLabel: "FAQ category",
  listKey: "faqCategories",
  searchField: "title",
  childBlock: {
    countFn: (id) => Faq.count({ where: { category_id: id } }),
    errorCode: "HAS_FAQS",
    errorMsg: "Cannot delete category — it still has FAQs assigned to it",
  },
  createSchema,
  updateSchema,
});

export default router;
