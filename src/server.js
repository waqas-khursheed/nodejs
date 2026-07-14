import { app, initializeApp } from "./app.js";
import config from "./config/config.js";
import { logger } from "./shared/utils/logger.js";

const PORT = config.port || 3000;

const startServer = async () => {
  try {
    await initializeApp();
    app.listen(PORT, () => {
      logger.info("Server is running", { port: PORT, url: `http://localhost:${PORT}` });
    });
  } catch (error) {
    logger.error("Failed to start server", { error: error.message, stack: error.stack });
    process.exit(1);
  }
};

startServer();
