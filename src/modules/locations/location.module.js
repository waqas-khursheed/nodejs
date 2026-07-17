import adminCountryRoute from "./routes/admin.country.routes.js";
import adminStateRoute from "./routes/admin.state.routes.js";
import adminCityRoute from "./routes/admin.city.routes.js";
import adminGeoContinentRoute from "./routes/admin.geoContinent.routes.js";
import adminGeoSubContinentRoute from "./routes/admin.geoSubContinent.routes.js";
import adminGeoCountryRoute from "./routes/admin.geoCountry.routes.js";
import adminGeoStateRoute from "./routes/admin.geoState.routes.js";
import adminGeoCityRoute from "./routes/admin.geoCity.routes.js";
import adminGeoZoneRoute from "./routes/admin.geoZone.routes.js";
import adminProductCityRoute from "./routes/admin.productCity.routes.js";
import userLocationRoute from "./routes/user.location.routes.js";

const locationModule = (app) => {
  // =========================
  //  USER ROUTES — public read-only lookups (Address Book, checkout pickers)
  // =========================
  app.use("/api", userLocationRoute);

  // =========================
  //  ADMIN ROUTES — legacy flat location tables
  // =========================
  app.use("/api/admin/country", adminCountryRoute);
  app.use("/api/admin/state", adminStateRoute);
  app.use("/api/admin/city", adminCityRoute);

  // =========================
  //  ADMIN ROUTES — geo_* hierarchical location tables
  // =========================
  app.use("/api/admin/geo-continent", adminGeoContinentRoute);
  app.use("/api/admin/geo-sub-continent", adminGeoSubContinentRoute);
  app.use("/api/admin/geo-country", adminGeoCountryRoute);
  app.use("/api/admin/geo-state", adminGeoStateRoute);
  app.use("/api/admin/geo-city", adminGeoCityRoute);
  app.use("/api/admin/geo-zone", adminGeoZoneRoute);

  // =========================
  //  ADMIN ROUTES — product/city availability assignment
  // =========================
  app.use("/api/admin/product-city", adminProductCityRoute);
};

export default locationModule;
