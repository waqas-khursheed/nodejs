import adminCategoryRoute from "./routes/admin.category.routes.js";
import userCategoryRoute from "./routes/user.category.routes.js";

const categoryModule = (app) => {

    // =========================
    //  ADMIN ROUTES
    // =========================
    app.use("/api/admin/category", adminCategoryRoute)

    // =========================
    //  USER ROUTES
    // =========================
    app.use("/api/categories", userCategoryRoute);
};

export default categoryModule;