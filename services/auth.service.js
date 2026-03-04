const userRepository = require('../repositories/user.repository');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

class AuthService {

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

module.exports = new AuthService();