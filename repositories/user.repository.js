import { User } from "../models/index.js" 

class UserRepository {
  // Create a new user
  async create(userData) {
    return await User.create(userData);
  }

  // Find user by email
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  // Find user by ID
  async findById(id) {
    return await User.findByPk(id);
  }
}

export default new UserRepository();