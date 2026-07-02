import path from "path";
import fs from "fs";

const storageRoot = path.join(process.cwd(), "src", "storage", "uploads");

// Deletes a previously uploaded file for a given module (best-effort, never throws).
export const deleteUploadedFile = (moduleName, filename) => {
  if (!filename) return;

  const filePath = path.join(storageRoot, moduleName, filename);

  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error(`Failed to delete file ${filePath}:`, err.message);
    }
  });
};
