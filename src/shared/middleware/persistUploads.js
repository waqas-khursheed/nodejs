import path from "path";
import { storage } from "../storage/index.js";

const generateFilename = (originalname) => {
  const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return unique + path.extname(originalname).toLowerCase();
};

// Runs after multer (buffered in memory, see upload.js) and resizeUploadedImages
// — writes each file's buffer to whichever storage driver is active
// (local disk or S3, see shared/storage/index.js) and stamps `.filename`
// onto the file object so every controller can keep reading
// `req.file(s).<field>[0].filename` exactly like it did when multer wrote
// straight to disk, regardless of which driver actually persisted the byte.
export const persistUploadedFiles = async (req, res, next) => {
  try {
    const moduleName = req.module || "common";
    const files = req.file ? [req.file] : Object.values(req.files || {}).flat();

    await Promise.all(
      files.map(async (file) => {
        const filename = generateFilename(file.originalname);
        await storage.save(moduleName, filename, file.buffer, file.mimetype);
        file.filename = filename;
      })
    );

    next();
  } catch (err) {
    next(err);
  }
};
