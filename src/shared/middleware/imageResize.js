import sharp from "sharp";

const MAX_WIDTH = 1600;

// GIF is intentionally excluded — sharp only reads/writes its first frame,
// which would silently kill any animation in an uploaded animated GIF.
const RESIZABLE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const resizeFileBuffer = async (file) => {
  if (!file || !RESIZABLE_MIME_TYPES.has(file.mimetype)) return;

  const image = sharp(file.buffer);
  const metadata = await image.metadata();
  if (!metadata.width || metadata.width <= MAX_WIDTH) return;

  file.buffer = await image.resize({ width: MAX_WIDTH, withoutEnlargement: true }).toBuffer();
};

// Runs after multer has buffered the upload(s) in memory (see upload.js) —
// resizes anything wider than MAX_WIDTH before persistUploads.js writes the
// buffer to whichever storage driver is active. Previously uploaded images
// were served at whatever resolution the customer/admin uploaded them at,
// with no compression step, which hurts page-load performance on a
// product-image-heavy storefront.
export const resizeUploadedImages = async (req, res, next) => {
  try {
    const files = req.file ? [req.file] : Object.values(req.files || {}).flat();
    await Promise.all(files.map(resizeFileBuffer));
    next();
  } catch (err) {
    next(err);
  }
};
