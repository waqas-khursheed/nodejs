import Joi from "joi";
import SideBanner from "../../../database/models/SideBanner.js";
import { makeImageResourceRouter } from "../shared/imageResource.routes.js";

const router = makeImageResourceRouter({
  Model: SideBanner,
  uploadFolder: "side-banners",
  resourceLabel: "Side banner",
  listKey: "sideBanners",
  extraCreateFields: {
    type: Joi.string().max(255).required(),
  },
  extraUpdateFields: {
    type: Joi.string().max(255),
  },
});

export default router;
