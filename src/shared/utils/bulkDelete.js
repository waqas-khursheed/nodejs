// Runs an existing single-record delete service over a batch of ids,
// best-effort — one missing/already-deleted id shouldn't fail the whole
// batch, since the caller (an admin bulk-selecting rows in a table) has no
// way to know which ids went stale between page load and the click.
export const bulkDelete = async (ids, deleteOneFn) => {
  let deleted = 0;

  for (const id of ids) {
    try {
      await deleteOneFn(id);
      deleted++;
    } catch {
      // skip — see comment above
    }
  }

  return { deleted, requested: ids.length };
};
