import ApplicationHomeBanner from "../../../database/models/ApplicationHomeBanner.js";
import { makeImageResourceRouter } from "../shared/imageResource.routes.js";

const router = makeImageResourceRouter({
  Model: ApplicationHomeBanner,
  uploadFolder: "application-home-banners",
  resourceLabel: "Application home banner",
  listKey: "applicationHomeBanners",
});

export default router;
