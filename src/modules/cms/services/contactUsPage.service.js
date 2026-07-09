import ContactUsPage from "../../../database/models/ContactUsPage.js";
import { slugify } from "../../../shared/helpers/helpers.js";

// contact_us_page is a singleton config table — always operate on the first row.
export const getContactUsPageService = async () => {
  const page = await ContactUsPage.findOne({ order: [["id", "ASC"]] });
  if (!page) throw new Error("NOT_CONFIGURED");
  return page;
};

export const upsertContactUsPageService = async (data) => {
  const existing = await ContactUsPage.findOne({ order: [["id", "ASC"]] });

  const updateData = { ...data };
  if (data.title) updateData.slug = slugify(data.title);

  if (!existing) {
    if (!data.title || !data.content) {
      throw new Error("TITLE_CONTENT_REQUIRED");
    }
    if (updateData.status === undefined) updateData.status = 1;
    return await ContactUsPage.create(updateData);
  }

  await ContactUsPage.update(updateData, { where: { id: existing.id } });
  return await ContactUsPage.findByPk(existing.id);
};
