import adminCategoryRoute from "./routes/admin.category.routes.js";

const categoryModule = (app) => {

    // =========================
    //  ADMIN ROUTES
    // =========================
    app.use("/api/admin/category", adminCategoryRoute)
};

export default categoryModule;