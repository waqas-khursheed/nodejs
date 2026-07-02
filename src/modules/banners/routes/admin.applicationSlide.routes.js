import ApplicationSlide from "../../../database/models/ApplicationSlide.js";
import { makeImageResourceRouter } from "../shared/imageResource.routes.js";

const router = makeImageResourceRouter({
  Model: ApplicationSlide,
  uploadFolder: "application-slides",
  resourceLabel: "Application slide",
  listKey: "applicationSlides",
});

export default router;
