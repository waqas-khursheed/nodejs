import multer from "multer";
import path from "path";
import fs from "fs";

const storageRoot = path.join(process.cwd(), "src", "storage", "uploads");

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

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });