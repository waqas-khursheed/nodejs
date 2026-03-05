import bcrypt from "bcryptjs";

// Hash a password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Compare plain password with hashed password
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};