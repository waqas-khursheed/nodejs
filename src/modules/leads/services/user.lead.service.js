import Subscribe from "../../../database/models/Subscribe.js";
import QueryForm from "../../../database/models/QueryForm.js";
import { notifyAdmins } from "../../../shared/services/notifier.service.js";

export const subscribeService = async (email) => {
  const existing = await Subscribe.findOne({ where: { email } });

  if (existing) {
    if (!existing.status) {
      await Subscribe.update({ status: 1 }, { where: { id: existing.id } });
    }
    return await Subscribe.findByPk(existing.id);
  }

  const created = await Subscribe.create({ email, status: 1 });
  return await Subscribe.findByPk(created.id);
};

export const submitContactFormService = async (data) => {
  const created = await QueryForm.create(data);

  notifyAdmins({
    title: "New contact form message",
    description: `${data.name} (${data.email}) sent a message`,
    tableName: "query_forms",
    rowId: created.id,
  }).catch(() => {});

  return created;
};
