import { storage } from "../storage/index.js";
import { logger } from "./logger.js";

// Deletes a previously uploaded file for a given module (best-effort, never
// throws, not awaited by callers — matches how this always behaved even
// when it was a raw fs.unlink). Delegates to whichever storage driver is
// active (local disk or S3, see shared/storage/index.js).
export const deleteUploadedFile = (moduleName, filename) => {
  if (!filename) return;

  storage.delete(moduleName, filename).catch((err) => {
    logger.error(`Failed to delete uploaded file ${moduleName}/${filename}`, { error: err.message });
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
