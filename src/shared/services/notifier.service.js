import Notification from "../../database/models/Notification.js";

// Creates a row in the admin notification feed. Previously nothing in the
// codebase ever called `Notification.create` — the admin notifications
// module could only list/mark-seen/delete rows that never got created in
// the first place. This is intentionally best-effort: a notification
// failing to write should never break the action that triggered it, so
// callers should treat this as fire-and-forget (`.catch(() => {})`) rather
// than awaiting it inline with the rest of a transaction.
export const notifyAdmins = async ({ title, description, tableName, rowId }) => {
  await Notification.create({
    n_title: title.slice(0, 99),
    n_desc: description,
    table_name: tableName.slice(0, 99),
    row_id: rowId,
    seen: 0,
  });
};
