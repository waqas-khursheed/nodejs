import multer from "multer";
import path from "path";
import fs from "fs";
import { AppError } from "../errors/AppError.js";

const storageRoot = path.join(process.cwd(), "src", "storage", "uploads");

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// create folder helper
const createFolderIfNotExist = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const moduleName = req.module || "common";

    const folder = path.join(storageRoot, moduleName);

    createFolderIfNotExist(folder);

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname).toLowerCase());
  },
});

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

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 10,
  },
});
