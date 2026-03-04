import { app, initializeApp } from "./app.js";
import config from "./config/config.js";

const PORT = config.port || 3000;

const startServer = async () => {
  try {
    await initializeApp();
    app.listen(PORT, () => {
      console.log("Server is running");
      console.log(`Port: ${PORT}`);
      console.log(`Local URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();