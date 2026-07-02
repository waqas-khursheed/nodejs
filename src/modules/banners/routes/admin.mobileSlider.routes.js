import MobileSlider from "../../../database/models/MobileSlider.js";
import { makeImageResourceRouter } from "../shared/imageResource.routes.js";

const router = makeImageResourceRouter({
  Model: MobileSlider,
  uploadFolder: "mobile-sliders",
  resourceLabel: "Mobile slider",
  listKey: "mobileSliders",
});

export default router;
