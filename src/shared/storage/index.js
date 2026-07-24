import { storageConfig } from "../../config/storage.config.js";
import { localStorageDriver } from "./local.storage.js";
import { s3StorageDriver } from "./s3.storage.js";

// The one switch point for file storage. Every driver implements the same
// three methods (save/delete/serve), so nothing outside this file needs to
// know or care which one is active — see upload.js, persistUploads.js,
// fileUtils.js, and the /uploads route in app.js.
export const storage = storageConfig.driver === "s3" ? s3StorageDriver : localStorageDriver;
