import WebSetting from "../../../database/models/WebSetting.js";
import { scheduleImageReplacement } from "../../../shared/utils/fileUtils.js";

const UPLOAD_FOLDER = "settings";
const IMAGE_FIELDS = ["main_logo", "fav_icon"];

// web_settings is a singleton config table — always operate on the first row.
export const getWebSettingService = async () => {
  const setting = await WebSetting.findOne({ order: [["id", "ASC"]] });
  if (!setting) throw new Error("NOT_CONFIGURED");
  return setting;
};

export const upsertWebSettingService = async (data) => {
  const existing = await WebSetting.findOne({ order: [["id", "ASC"]] });

  if (!existing) {
    const required = ["delivery_start_time", "delivery_end_time", "delivery_days_time_mod"];
    for (const field of required) {
      if (data[field] === undefined || data[field] === null) {
        throw new Error("REQUIRED_FIELDS_MISSING");
      }
    }
    return await WebSetting.create(data);
  }

  for (const field of IMAGE_FIELDS) {
    scheduleImageReplacement(UPLOAD_FOLDER, existing[field], data[field]);
  }

  await WebSetting.update(data, { where: { id: existing.id } });
  return await WebSetting.findByPk(existing.id);
};
