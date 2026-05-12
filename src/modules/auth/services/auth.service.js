import User from "../../../database/models/User.js";
import { hashPassword, comparePassword } from "../../../shared/utils/hash.js";
import { generateToken } from "../../../shared/utils/jwt.js";

export const registerUserService = async (data) => {
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

  return {
    user: {
      id: user.id,
      first_name: user.first_name,
      email: user.email,
    },
    token,
  };
};


export const loginUserService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      first_name: user.first_name,
      email: user.email,
    },
    token,
  };
};