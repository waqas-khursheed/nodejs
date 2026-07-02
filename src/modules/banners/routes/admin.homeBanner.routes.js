import HomeBanner from "../../../database/models/HomeBanner.js";
import { makeImageResourceRouter } from "../shared/imageResource.routes.js";

const router = makeImageResourceRouter({
  Model: HomeBanner,
  uploadFolder: "home-banners",
  resourceLabel: "Home banner",
  listKey: "homeBanners",
});

export default router;
