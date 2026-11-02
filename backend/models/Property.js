const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price in INR is required'],
    min: [0, 'Price must be positive'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['Apartment', 'Villa', 'Penthouse', 'Independent House', 'Studio', 'Plot'],
    default: 'Apartment',
  },
  bedrooms: {
    type: Number,
    required: [true, 'Number of bedrooms is required'],
    min: [0, 'Bedrooms cannot be negative'],
  },
  bathrooms: {
    type: Number,
    required: [true, 'Number of bathrooms is required'],
    min: [0, 'Bathrooms cannot be negative'],
  },
  area: {
    type: Number,
    required: [true, 'Area in sq ft is required'],
    min: [50, 'Area must be at least 50 sq ft'],
  },
  amenities: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    required: [true, 'At least one property image is required'],
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length > 0,
      message: 'At least one image URL must be provided',
    },
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Property', propertySchema);
