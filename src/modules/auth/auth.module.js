import authRoutes from "./routes/auth.routes.js";
import adminAuthRoutes from "./routes/admin.auth.routes.js";
import adminManagementRoutes from "./routes/admin.management.routes.js";

const authModule = (app) => {

    // =========================
    // AUTH ROUTES
    // =========================
    app.use("/api/auth", authRoutes);

    // =========================
    // AUTH ADMIN ROUTES
    // =========================
    app.use("/api/admin/auth", adminAuthRoutes)

    // =========================
    // ADMIN ACCOUNT MANAGEMENT (super admin only)
    // =========================
    app.use("/api/admin/admins", adminManagementRoutes);
};

export default authModule;