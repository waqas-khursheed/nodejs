import authRoutes from "./routes/auth.routes.js";

const authModule = (app) => {

    // =========================
    // AUTH ROUTES
    // =========================
    app.use("/api/auth", authRoutes);
};

export default authModule;