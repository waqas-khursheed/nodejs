// Single place that reads which file-storage backend is active and its
// settings — everything else (upload middleware, the /uploads route,
// delete-on-replace logic) imports `storage` from shared/storage/index.js
// and never reads these env vars directly. Flip STORAGE_DRIVER in .env to
// move from local disk to S3 without touching any calling code.
const driver = (process.env.STORAGE_DRIVER || "local").toLowerCase();

export const storageConfig = {
  driver,

  s3: {
    bucket: process.env.S3_BUCKET,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // Optional — only needed for S3-compatible providers (DigitalOcean
    // Spaces, MinIO, Cloudflare R2, ...) or path-style addressing.
    endpoint: process.env.S3_ENDPOINT || undefined,
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
    // Optional — front the bucket with a CDN/custom domain instead of the
    // default virtual-hosted-style S3 URL for publicly-served files.
    publicUrlBase: process.env.S3_PUBLIC_URL_BASE || undefined,
  },
};
