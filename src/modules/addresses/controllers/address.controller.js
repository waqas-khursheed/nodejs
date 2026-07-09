import { getAddressService, upsertAddressService } from "../services/address.service.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

const errorMap = {
  ADDRESS_NOT_FOUND: { code: 404, msg: "No saved address found" },
  PRIMARY_ADDRESS_REQUIRED: {
    code: 422,
    msg: "address1, country_id1, state_id1, city_id1 and code1 are required to save your first address",
  },
  COUNTRY_NOT_FOUND_1: { code: 422, msg: "Selected country does not exist" },
  STATE_NOT_FOUND_1: { code: 422, msg: "Selected state does not exist" },
  CITY_NOT_FOUND_1: { code: 422, msg: "Selected city does not exist" },
  COUNTRY_NOT_FOUND_2: { code: 422, msg: "Selected secondary country does not exist" },
  STATE_NOT_FOUND_2: { code: 422, msg: "Selected secondary state does not exist" },
  CITY_NOT_FOUND_2: { code: 422, msg: "Selected secondary city does not exist" },
};

const handleServiceError = (res, err) => {
  const mapped = errorMap[err.message];
  if (mapped) return errorResponse(res, mapped.msg, mapped.code);

  return errorResponse(
    res,
    process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
    500
  );
};

export const getAddress = async (req, res) => {
  try {
    const result = await getAddressService(req.user.id);
    return successDataResponse(res, "Address fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const upsertAddress = async (req, res) => {
  try {
    const result = await upsertAddressService(req.user.id, req.body);
    return successDataResponse(res, "Address saved successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
