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

  return errorResponse(
    res,
    process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
    500
  );
};
