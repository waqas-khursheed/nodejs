import { errorResponse } from "../responses/apiResponse.js";

// Every controller in this codebase previously hand-rolled the exact same
// "map a thrown Error's message to an HTTP status, otherwise 500" function
// inline (~24 near-identical copies). This factors out that mechanism —
// each module keeps its own domain-specific `errorMap` (that part is
// legitimate, not duplication), but the response-writing logic is shared.
export const createErrorHandler = (errorMap) => (res, err) => {
  const mapped = errorMap[err.message];

  if (mapped) {
    return errorResponse(res, mapped.msg, mapped.code, mapped.errors ?? null);
  }

  // Several modules do a "find by name/title/code → throw if found → create"
  // check before insert, which is race-prone under concurrent requests: two
  // admins creating the same title at once can both pass the check and both
  // hit the DB-level unique constraint. Without this, the loser saw a raw
  // 500 instead of the same clean "already exists" response the check was
  // meant to produce.
  if (err.name === "SequelizeUniqueConstraintError") {
    const field = err.errors?.[0]?.path;
    return errorResponse(
      res,
      field ? `${field} already exists` : "This record already exists",
      409,
      err.errors ?? null
    );
  }

  return errorResponse(
    res,
    process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
    500
  );
};
