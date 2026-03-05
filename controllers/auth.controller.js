import authService from "../services/auth.service.js";

class AuthController {

  // Register a new user
  async register(req, res) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Login an existing user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.json({ success: true, ...data });
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  }
}

export default new AuthController();