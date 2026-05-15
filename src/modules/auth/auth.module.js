import authRoutes from "./routes/auth.routes.js";
import adminAuthRoutes from "./routes/admin.auth.routes.js";

const authModule = (app) => {

    // =========================
    // AUTH ROUTES
    // =========================
    app.use("/api/auth", authRoutes);
    
    // =========================
    // AUTH ADMIN ROUTES
    // =========================
    app.use("/api/admin/auth", adminAuthRoutes)
};

export default authModule;