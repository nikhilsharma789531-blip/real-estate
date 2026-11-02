const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getIsConnected, memoryStore } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'homora_luxury_real_estate_secret_key_2026';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      if (getIsConnected()) {
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
          return res.status(401).json({ success: false, message: 'User not found' });
        }
        req.user = user;
      } else {
        const user = memoryStore.users.find(
          (u) => u._id.toString() === decoded.id.toString()
        );
        if (!user) {
          return res.status(401).json({ success: false, message: 'User not found' });
        }
        const { password, ...safeUser } = user;
        req.user = safeUser;
      }

      next();
    } catch (error) {
      console.error('[Auth Middleware Error]:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

module.exports = {
  protect,
};
