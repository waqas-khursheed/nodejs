import User from "../../../database/models/User.js";
import Admin from "../../../database/models/Admin.js";
import ResetPasswordCode from "../../../database/models/ResetPasswordCode.js";
import { hashPassword, comparePassword } from "../../../shared/utils/hash.js";
import { generateToken } from "../../../shared/utils/jwt.js";

const publicUser = (user) => ({
  id: user.id,
  first_name: user.first_name,
  last_name: user.last_name,
  username: user.username,
  email: user.email,
  phone: user.phone,
  type: user.type,
  company_name: user.company_name,
  is_active: user.is_active,
});

const registerUserService = async (data) => {
  const { first_name, last_name, email, phone, password, type } = data;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    throw new Error("EMAIL_EXISTS");
  }

  const user = await User.create({
    first_name,
    last_name,
    email,
    phone,
    type,
    password: await hashPassword(password),
    is_active: 1,
  });

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return { user: publicUser(user), token };
};

const loginUserService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  if (!user.is_active) {
    throw new Error("ACCOUNT_INACTIVE");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return { user: publicUser(user), token };
};

const generateOtpCode = () => String(Math.floor(100000 + Math.random() * 900000));

// No mail service is wired up yet, so the code is returned directly in
// non-production environments for manual testing; in production it would be
// emailed/SMS'd to the user instead of appearing in the response.
const requestPasswordResetService = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  await ResetPasswordCode.update({ is_active: 0 }, { where: { user_id: user.id, is_active: 1 } });

  const code = generateOtpCode();
  await ResetPasswordCode.create({ user_id: user.id, code, is_active: 1 });

  return {
    message: "A reset code has been generated for this account",
    ...(process.env.NODE_ENV !== "production" ? { debug_code: code } : {}),
  };
};

const resetPasswordService = async ({ email, code, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("INVALID_CODE");
  }

  const resetCode = await ResetPasswordCode.findOne({
    where: { user_id: user.id, code, is_active: 1 },
  });

  if (!resetCode) {
    throw new Error("INVALID_CODE");
  }

  await User.update({ password: await hashPassword(password) }, { where: { id: user.id } });
  await ResetPasswordCode.update({ is_active: 0 }, { where: { id: resetCode.id } });

  return true;
};

const changePasswordService = async (userId, { old_password, new_password }) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const isMatch = await comparePassword(old_password, user.password);
  if (!isMatch) {
    throw new Error("INVALID_OLD_PASSWORD");
  }

  await User.update({ password: await hashPassword(new_password) }, { where: { id: userId } });
  return true;
};

const getProfileService = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }
  return publicUser(user);
};

const updateProfileService = async (userId, data) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  await User.update(data, { where: { id: userId } });
  return publicUser(await User.findByPk(userId));
};

const adminLoginService = async (data) => {
  const { email, password } = data;

  // =========================
  // FIND ADMIN
  // =========================
  const admin = await Admin.findOne({ where: { email } });

  if (!admin) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // =========================
  // CHECK PASSWORD
  // =========================
  const isMatch = await comparePassword(password, admin.password);

  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // =========================
  // GENERATE TOKEN
  // =========================
  const token = generateToken({
    id: admin.id,
    email: admin.email,
    role: "admin",
  });

  return {
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
    token,
  };
};

export {
  registerUserService,
  loginUserService,
  requestPasswordResetService,
  resetPasswordService,
  changePasswordService,
  getProfileService,
  updateProfileService,
  adminLoginService,
};
