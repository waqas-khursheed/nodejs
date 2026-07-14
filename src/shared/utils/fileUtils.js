import path from "path";
import fs from "fs";
import { logger } from "./logger.js";

const storageRoot = path.join(process.cwd(), "src", "storage", "uploads");

// Deletes a previously uploaded file for a given module (best-effort, never throws).
export const deleteUploadedFile = (moduleName, filename) => {
  if (!filename) return;

  const filePath = path.join(storageRoot, moduleName, filename);

  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") {
      logger.error(`Failed to delete file ${filePath}`, { error: err.message });
    }
  });
};

// Cleans up the old file when a field is being replaced with a new upload —
// this "is there an old one to remove" branch was repeated inline everywhere
// a model has a replaceable image field (products, banners, CMS, ...).
export const scheduleImageReplacement = (moduleName, oldFilename, newFilename) => {
  if (newFilename && oldFilename) {
    deleteUploadedFile(moduleName, oldFilename);
  }
};
