import Country from "../../../database/models/Country.js";
import State from "../../../database/models/State.js";
import City from "../../../database/models/City.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

// Public read-only lookups for the customer-facing Address Book / checkout
// location pickers — the admin routes (/api/admin/country etc.) are paginated
// and behind adminAuthMiddleware, neither of which fits a plain "give me the
// full dropdown list" use case here.
export const listCountries = async (req, res) => {
  try {
    const countries = await Country.findAll({ order: [["country_name", "ASC"]] });
    return successDataResponse(res, "Countries fetched successfully", { countries }, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const listStates = async (req, res) => {
  try {
    const where = {};
    if (req.query.country_id) where.country_id = req.query.country_id;

    const states = await State.findAll({ where, order: [["name", "ASC"]] });
    return successDataResponse(res, "States fetched successfully", { states }, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const listCities = async (req, res) => {
  try {
    const where = {};
    if (req.query.state_id) where.state_id = req.query.state_id;

    const cities = await City.findAll({ where, order: [["name", "ASC"]] });
    return successDataResponse(res, "Cities fetched successfully", { cities }, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
