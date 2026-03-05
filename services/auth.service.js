import userRepository from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

class AuthService {

  // Register new user
  async register(data) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashed = await hashPassword(data.password);

    const user = await userRepository.create({
      ...data,
      password: hashed
    });

    return user;
  }

  // Login existing user
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
      id: user.id,
      role: user.role
    });

    return { user, token };
  }
}

export default new AuthService();