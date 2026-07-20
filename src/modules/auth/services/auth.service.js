import { Op } from "sequelize";
import User from "../../../database/models/User.js";
import Admin from "../../../database/models/Admin.js";
import ResetPasswordCode from "../../../database/models/ResetPasswordCode.js";
import { hashPassword, comparePassword } from "../../../shared/utils/hash.js";
import { generateToken } from "../../../shared/utils/jwt.js";
import { sendMail } from "../../../shared/utils/mailer.js";
import { scheduleImageReplacement } from "../../../shared/utils/fileUtils.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

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

const publicAdmin = (admin) => ({
  id: admin.id,
  name: admin.name,
  email: admin.email,
  image: admin.image,
  is_admin: admin.is_admin,
  is_active: admin.is_active,
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

// Sends the OTP by email via shared/utils/mailer.js. When no SMTP provider
// is configured (the default in a fresh .env), the mailer logs the email
// to the console instead of sending it — so `debug_code` is also included
// outside production purely so the flow is testable without setting up
// SMTP first. Once SMTP_HOST etc. are set, mail actually goes out; remove
// debug_code once that's confirmed to be working end-to-end.
const requestPasswordResetService = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  await ResetPasswordCode.update({ is_active: 0 }, { where: { user_id: user.id, is_active: 1 } });

  const code = generateOtpCode();
  await ResetPasswordCode.create({ user_id: user.id, code, is_active: 1 });

  await sendMail({
    to: user.email,
    subject: "Your password reset code",
    html: `<p>Your password reset code is <strong>${code}</strong>. It will expire shortly — if you didn't request this, you can ignore this email.</p>`,
  });

  return {
    message: "A reset code has been sent to your email",
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
    admin: publicAdmin(admin),
    token,
  };
};

// =========================
// ADMIN SELF-SERVICE PROFILE
// =========================
// Distinct from the customer-facing getProfileService/updateProfileService/
// changePasswordService above — those operate on the `users` table for
// storefront accounts, these operate on `admins` for the admin panel's own
// logged-in account.
const getAdminProfileService = async (adminId) => {
  const admin = await Admin.findByPk(adminId);
  if (!admin) throw new Error("ADMIN_NOT_FOUND");
  return publicAdmin(admin);
};

const updateAdminProfileService = async (adminId, data) => {
  const admin = await Admin.findByPk(adminId);
  if (!admin) throw new Error("ADMIN_NOT_FOUND");

  if (data.email && data.email !== admin.email) {
    const emailTaken = await Admin.findOne({ where: { email: data.email } });
    if (emailTaken) throw new Error("EMAIL_EXISTS");
  }

  scheduleImageReplacement("admins", admin.image, data.image);

  await Admin.update(data, { where: { id: adminId } });
  return publicAdmin(await Admin.findByPk(adminId));
};

const changeAdminPasswordService = async (adminId, { old_password, new_password }) => {
  const admin = await Admin.findByPk(adminId);
  if (!admin) throw new Error("ADMIN_NOT_FOUND");

  const isMatch = await comparePassword(old_password, admin.password);
  if (!isMatch) throw new Error("INVALID_OLD_PASSWORD");

  await Admin.update({ password: await hashPassword(new_password) }, { where: { id: adminId } });
  return true;
};

// =========================
// ADMIN ACCOUNT MANAGEMENT (super admin only — enforced at the route layer)
// =========================
const getAdminsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${query.search}%` } },
      { email: { [Op.like]: `%${query.search}%` } },
    ];
  }

  const { count, rows } = await Admin.findAndCountAll({
    where,
    limit,
    offset,
    order: [["id", "DESC"]],
  });

  return { admins: rows.map(publicAdmin), meta: buildPaginationMeta({ count, page, limit }) };
};

const createAdminService = async ({ name, email, password, is_admin }) => {
  const existing = await Admin.findOne({ where: { email } });
  if (existing) throw new Error("EMAIL_EXISTS");

  const admin = await Admin.create({
    name,
    email,
    password: await hashPassword(password),
    is_admin: is_admin ? 1 : 0,
    is_active: 1,
  });

  return publicAdmin(admin);
};

const toggleAdminStatusService = async (adminId) => {
  const admin = await Admin.findByPk(adminId);
  if (!admin) throw new Error("ADMIN_NOT_FOUND");

  const newStatus = Number(admin.is_active) === 1 ? 0 : 1;
  await Admin.update({ is_active: newStatus }, { where: { id: adminId } });
  return publicAdmin(await Admin.findByPk(adminId));
};

const deleteAdminService = async (requestingAdminId, targetAdminId) => {
  if (Number(requestingAdminId) === Number(targetAdminId)) {
    throw new Error("CANNOT_DELETE_SELF");
  }

  const admin = await Admin.findByPk(targetAdminId);
  if (!admin) throw new Error("ADMIN_NOT_FOUND");

  await Admin.destroy({ where: { id: targetAdminId } });
  return true;
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
  getAdminProfileService,
  updateAdminProfileService,
  changeAdminPasswordService,
  getAdminsService,
  createAdminService,
  toggleAdminStatusService,
  deleteAdminService,
};
