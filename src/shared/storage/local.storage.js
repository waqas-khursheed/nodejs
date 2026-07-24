import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { logger } from "../utils/logger.js";

const storageRoot = path.join(process.cwd(), "src", "storage", "uploads");

const ensureDir = (dir) => {
  if (!fsSync.existsSync(dir)) {
    fsSync.mkdirSync(dir, { recursive: true });
  }
};

// Default driver — writes/reads/deletes files on the local disk, under
// src/storage/uploads/<module>/<filename>. Same layout the app has always
// used, just moved behind the shared `storage` interface (see index.js) so
// it's swappable with s3.storage.js via STORAGE_DRIVER.
export const localStorageDriver = {
  async save(moduleName, filename, buffer) {
    const dir = path.join(storageRoot, moduleName);
    ensureDir(dir);
    await fs.writeFile(path.join(dir, filename), buffer);
  },

  async delete(moduleName, filename) {
    if (!filename) return;

    const filePath = path.join(storageRoot, moduleName, filename);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      if (err.code !== "ENOENT") {
        logger.error(`Failed to delete local file ${filePath}`, { error: err.message });
      }
    }
  },

  // Streams the file straight from disk for the /uploads/:module/:filename
  // route — equivalent to what express.static did before, just reachable
  // through the same interface the S3 driver's `serve` (a redirect) uses.
  async serve(moduleName, filename, res) {
    const filePath = path.join(storageRoot, moduleName, filename);
    res.sendFile(filePath, (err) => {
      if (err && !res.headersSent) {
        res.status(err.status || 404).end();
      }
    });
  },
};
