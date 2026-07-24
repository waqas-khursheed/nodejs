import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { storageConfig } from "../../config/storage.config.js";
import { logger } from "../utils/logger.js";

// Lazily constructed — the credentials/bucket may not exist yet in an
// environment where STORAGE_DRIVER is still "local" (this module is only
// ever imported, not necessarily used), so nothing here should throw just
// from being loaded.
let client = null;
const getClient = () => {
  if (!client) {
    client = new S3Client({
      region: storageConfig.s3.region,
      endpoint: storageConfig.s3.endpoint,
      forcePathStyle: storageConfig.s3.forcePathStyle,
      credentials: {
        accessKeyId: storageConfig.s3.accessKeyId,
        secretAccessKey: storageConfig.s3.secretAccessKey,
      },
    });
  }
  return client;
};

const keyFor = (moduleName, filename) => `${moduleName}/${filename}`;

const publicUrl = (moduleName, filename) => {
  const key = keyFor(moduleName, filename);

  if (storageConfig.s3.publicUrlBase) {
    return `${storageConfig.s3.publicUrlBase.replace(/\/$/, "")}/${key}`;
  }

  // Default virtual-hosted-style S3 URL. Custom S3-compatible endpoints
  // (Spaces, R2, MinIO) should set S3_PUBLIC_URL_BASE instead, since their
  // public URL shape isn't the AWS one below.
  return `https://${storageConfig.s3.bucket}.s3.${storageConfig.s3.region}.amazonaws.com/${key}`;
};

// S3 driver — same shape as local.storage.js so shared/storage/index.js can
// swap between them without any caller caring which is active.
export const s3StorageDriver = {
  async save(moduleName, filename, buffer, mimetype) {
    await getClient().send(
      new PutObjectCommand({
        Bucket: storageConfig.s3.bucket,
        Key: keyFor(moduleName, filename),
        Body: buffer,
        ContentType: mimetype,
      })
    );
  },

  async delete(moduleName, filename) {
    if (!filename) return;

    try {
      await getClient().send(
        new DeleteObjectCommand({ Bucket: storageConfig.s3.bucket, Key: keyFor(moduleName, filename) })
      );
    } catch (err) {
      logger.error(`Failed to delete S3 object ${keyFor(moduleName, filename)}`, { error: err.message });
    }
  },

  // The bucket is expected to be public-read for these assets (product
  // images, banners, etc. are public storefront content) — a redirect costs
  // nothing on this server and lets the browser fetch the object directly
  // from S3/CDN instead of proxying bytes through here.
  async serve(moduleName, filename, res) {
    res.redirect(302, publicUrl(moduleName, filename));
  },
};
