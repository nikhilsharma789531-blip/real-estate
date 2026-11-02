const mongoose = require('mongoose');
const { seedProperties, seedUsers } = require('../data/seedProperties');
const bcrypt = require('bcryptjs');

let isConnected = false;

// Resilient in-memory store initialized with seed properties & demo accounts
const memoryStore = {
  users: [...seedUsers.map(u => ({ ...u, password: u.passwordHash, createdAt: new Date() }))],
  properties: [...seedProperties.map(p => ({ ...p }))],
  wishlists: {}, // userId -> Set of propertyIds
  contacts: [],
};

// Initialize default hashed password for demo users
(async () => {
  const hash = await bcrypt.hash('Password123', 10);
  memoryStore.users.forEach(u => {
    u.password = hash;
  });
})();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/homora';
  
  try {
    console.log(`[HOMORA Database] Attempting to connect to MongoDB at: ${uri}`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick check
    });
    isConnected = true;
    console.log(`[HOMORA Database] ✅ MongoDB connected successfully to ${mongoose.connection.host}`);
  } catch (err) {
    isConnected = false;
    console.warn(`[HOMORA Database] ⚠️ Local MongoDB server not reachable (${err.message}).`);
    console.log(`[HOMORA Database] 🚀 Activated Zero-Setup In-Memory Store with ${memoryStore.properties.length} curated luxury properties.`);
    console.log(`[HOMORA Database] ℹ️ All APIs (Auth, Properties, Wishlist, Contact) will operate with full CRUD support.`);
  }
};

const getIsConnected = () => isConnected;

module.exports = {
  connectDB,
  getIsConnected,
  memoryStore,
};
