require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Property = require('./models/Property');
const Wishlist = require('./models/Wishlist');
const { seedProperties, seedUsers } = require('./data/seedProperties');

const seedDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/homora';

  try {
    console.log(`Connecting to MongoDB at: ${uri}`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB Connected for Seeding.');

    // Clear existing collections
    await User.deleteMany({});
    await Property.deleteMany({});
    await Wishlist.deleteMany({});
    console.log('Cleared existing User, Property, and Wishlist collections.');

    // Create demo users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password123', salt);

    const createdUsers = [];
    for (const u of seedUsers) {
      const newUser = await User.create({
        name: u.name,
        email: u.email,
        phone: u.phone,
        password: hashedPassword,
      });
      createdUsers.push(newUser);
    }
    console.log(`Seeded ${createdUsers.length} users successfully (password: Password123).`);

    // Assign seller to properties
    const propertiesToInsert = seedProperties.map((p, index) => {
      const sellerUser = createdUsers[index % createdUsers.length];
      return {
        title: p.title,
        description: p.description,
        price: p.price,
        location: p.location,
        city: p.city,
        propertyType: p.propertyType,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        area: p.area,
        amenities: p.amenities,
        images: p.images,
        seller: sellerUser._id,
        featured: p.featured,
        createdAt: p.createdAt || new Date(),
      };
    });

    const insertedProperties = await Property.insertMany(propertiesToInsert);
    console.log(`Seeded ${insertedProperties.length} luxury Indian properties successfully.`);

    console.log('\n--- HOMORA Database Seeding Complete ---');
    console.log('Demo Credentials:');
    console.log('Email: aarav@homora.com | Password: Password123');
    console.log('Email: demo@homora.com  | Password: Password123');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
