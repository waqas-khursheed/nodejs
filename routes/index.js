const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use('/auth', authRoutes);

router.get('/admin/dashboard',
  authMiddleware,
  roleMiddleware('ADMIN'),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

router.get('/user/profile',
  authMiddleware,
  (req, res) => {
    res.json({ message: "Welcome User" });
  }
);

module.exports = router;