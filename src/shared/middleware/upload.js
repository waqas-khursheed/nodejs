import multer from "multer";
import { AppError } from "../errors/AppError.js";
import { resizeUploadedImages } from "./imageResize.js";
import { persistUploadedFiles } from "./persistUploads.js";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_FILE_SIZE = Number(process.env.MAX_UPLOAD_FILE_SIZE_MB || 5) * 1024 * 1024;

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    return cb(
      new AppError(
        `Invalid file type "${file.mimetype}". Allowed types: jpeg, png, webp, gif.`,
        400
      )
    );
  }

  cb(null, true);
};

// Always buffers in memory instead of writing to disk — the file only ever
// lands on disk if the active storage driver is "local" (see
// persistUploads.js/shared/storage), so this same multer config works
// unchanged whether STORAGE_DRIVER is "local" or "s3".
const multerUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    // No global `files` cap here — each route's own `.fields([{ name, maxCount }])`
    // already bounds every field independently. A shared cross-field cap (e.g. 10)
    // previously rejected the entire request once combined field counts exceeded
    // it (e.g. products: 1 featured + 1 hovered + 10 gallery = 12 > 10), even
    // though every individual field was within its own declared maxCount.
  },
});

// Wraps multer's `.single`/`.fields` so every route that accepts an upload
// automatically gets image resizing and persistence (to whichever storage
// driver is active) too, instead of every route file having to remember to
// add those as separate middleware after multer's.
export const upload = {
  single: (fieldName) => [multerUpload.single(fieldName), resizeUploadedImages, persistUploadedFiles],
  fields: (fields) => [multerUpload.fields(fields), resizeUploadedImages, persistUploadedFiles],
};
