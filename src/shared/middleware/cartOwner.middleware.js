import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";
import { errorResponse } from "../responses/apiResponse.js";

// Cart routes work for both logged-in users and guests. If a Bearer token is
// present it must be valid (strict — we don't silently fall back to guest
// mode on a bad token). Otherwise an X-Device-Id header identifies the guest
// cart, so the same device can keep its cart across requests without login.
export const resolveCartOwner = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return errorResponse(res, "Unauthorized", 401, { user: "User not found" });
      }
      if (!user.is_active) {
        return errorResponse(res, "Unauthorized", 401, { user: "Account is inactive" });
      }

      req.user = user;
      req.cartOwner = { user_id: user.id };
      return next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return errorResponse(res, "Unauthorized", 401, { token: "Token expired" });
      }
      return errorResponse(res, "Unauthorized", 401, { token: "Invalid token" });
    }
  }

  const deviceId = req.headers["x-device-id"];
  if (deviceId) {
    req.cartOwner = { device_id: deviceId };
    return next();
  }

  return errorResponse(res, "Bad Request", 400, {
    identity: "Provide an Authorization bearer token or an X-Device-Id header",
  });
};
