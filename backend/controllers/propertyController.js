const Property = require('../models/Property');
const { getIsConnected, memoryStore } = require('../config/db');

// @desc    Get all properties with filtering, search, and sorting
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res, next) => {
  try {
    const {
      search,
      location,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      featured,
      sort,
    } = req.query;

    if (getIsConnected()) {
      let query = {};

      // Search term in title, description, location, or city
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } },
        ];
      }

      // Location filter (e.g. Lucknow, Noida, Delhi, etc.)
      if (location && location !== 'all') {
        query.$or = [
          { location: { $regex: location, $options: 'i' } },
          { city: { $regex: location, $options: 'i' } },
        ];
      }

      // Property type filter
      if (propertyType && propertyType !== 'all') {
        query.propertyType = propertyType;
      }

      // Price range
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      // Bedrooms
      if (bedrooms && bedrooms !== 'all') {
        const beds = Number(bedrooms);
        if (beds >= 4) {
          query.bedrooms = { $gte: 4 };
        } else {
          query.bedrooms = beds;
        }
      }

      // Featured filter
      if (featured === 'true') {
        query.featured = true;
      }

      // Sorting
      let sortOption = { createdAt: -1 }; // default newest
      if (sort === 'price_asc') {
        sortOption = { price: 1 };
      } else if (sort === 'price_desc') {
        sortOption = { price: -1 };
      } else if (sort === 'newest') {
        sortOption = { createdAt: -1 };
      }

      const properties = await Property.find(query)
        .populate('seller', 'name email phone')
        .sort(sortOption);

      return res.json({
        success: true,
        count: properties.length,
        data: properties,
      });
    } else {
      // Memory Store implementation with matching query filtering
      let results = [...memoryStore.properties];

      if (search) {
        const s = search.toLowerCase();
        results = results.filter(
          (p) =>
            p.title.toLowerCase().includes(s) ||
            p.description.toLowerCase().includes(s) ||
            p.location.toLowerCase().includes(s) ||
            (p.city && p.city.toLowerCase().includes(s))
        );
      }

      if (location && location !== 'all') {
        const loc = location.toLowerCase();
        results = results.filter(
          (p) =>
            p.location.toLowerCase().includes(loc) ||
            (p.city && p.city.toLowerCase().includes(loc))
        );
      }

      if (propertyType && propertyType !== 'all') {
        results = results.filter((p) => p.propertyType === propertyType);
      }

      if (minPrice) {
        results = results.filter((p) => p.price >= Number(minPrice));
      }

      if (maxPrice) {
        results = results.filter((p) => p.price <= Number(maxPrice));
      }

      if (bedrooms && bedrooms !== 'all') {
        const beds = Number(bedrooms);
        if (beds >= 4) {
          results = results.filter((p) => p.bedrooms >= 4);
        } else {
          results = results.filter((p) => p.bedrooms === beds);
        }
      }

      if (featured === 'true') {
        results = results.filter((p) => p.featured === true);
      }

      // Sorting
      if (sort === 'price_asc') {
        results.sort((a, b) => a.price - b.price);
      } else if (sort === 'price_desc') {
        results.sort((a, b) => b.price - a.price);
      } else {
        // default newest
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return res.json({
        success: true,
        count: results.length,
        data: results,
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const property = await Property.findById(id).populate(
        'seller',
        'name email phone'
      );
      if (!property) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }
      return res.json({
        success: true,
        data: property,
      });
    } else {
      const property = memoryStore.properties.find(
        (p) => p._id.toString() === id.toString()
      );
      if (!property) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }
      return res.json({
        success: true,
        data: property,
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Create new property listing
// @route   POST /api/properties
// @access  Private
const createProperty = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      location,
      city,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      amenities,
      images,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !propertyType ||
      bedrooms === undefined ||
      bathrooms === undefined ||
      !area ||
      !images ||
      images.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields including at least one image URL',
      });
    }

    const sellerInfo = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
    };

    if (getIsConnected()) {
      const property = await Property.create({
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        location: location.trim(),
        city: city ? city.trim() : location.split(',').pop().trim(),
        propertyType,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        amenities: Array.isArray(amenities) ? amenities : [],
        images: Array.isArray(images) ? images : [images],
        seller: req.user._id,
      });

      const populated = await Property.findById(property._id).populate(
        'seller',
        'name email phone'
      );

      return res.status(201).json({
        success: true,
        message: 'Property listed successfully',
        data: populated,
      });
    } else {
      const newProperty = {
        _id: 'prop_' + Date.now(),
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        location: location.trim(),
        city: city ? city.trim() : location.split(',').pop().trim(),
        propertyType,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        amenities: Array.isArray(amenities) ? amenities : [],
        images: Array.isArray(images) ? images : [images],
        seller: sellerInfo,
        featured: false,
        createdAt: new Date(),
      };

      memoryStore.properties.unshift(newProperty);

      return res.status(201).json({
        success: true,
        message: 'Property listed successfully',
        data: newProperty,
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Owner only)
const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      let property = await Property.findById(id);
      if (!property) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }

      // Check ownership
      if (property.seller.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to edit this property',
        });
      }

      const {
        title,
        description,
        price,
        location,
        city,
        propertyType,
        bedrooms,
        bathrooms,
        area,
        amenities,
        images,
      } = req.body;

      if (title) property.title = title.trim();
      if (description) property.description = description.trim();
      if (price !== undefined) property.price = Number(price);
      if (location) property.location = location.trim();
      if (city) property.city = city.trim();
      if (propertyType) property.propertyType = propertyType;
      if (bedrooms !== undefined) property.bedrooms = Number(bedrooms);
      if (bathrooms !== undefined) property.bathrooms = Number(bathrooms);
      if (area !== undefined) property.area = Number(area);
      if (amenities) property.amenities = Array.isArray(amenities) ? amenities : [];
      if (images && images.length > 0) property.images = Array.isArray(images) ? images : [images];

      const updated = await property.save();
      const populated = await Property.findById(updated._id).populate(
        'seller',
        'name email phone'
      );

      return res.json({
        success: true,
        message: 'Property updated successfully',
        data: populated,
      });
    } else {
      const index = memoryStore.properties.findIndex(
        (p) => p._id.toString() === id.toString()
      );
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }

      const prop = memoryStore.properties[index];
      const sellerId =
        prop.seller && (prop.seller._id || prop.seller.toString());

      if (sellerId && sellerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to edit this property',
        });
      }

      const {
        title,
        description,
        price,
        location,
        city,
        propertyType,
        bedrooms,
        bathrooms,
        area,
        amenities,
        images,
      } = req.body;

      memoryStore.properties[index] = {
        ...prop,
        title: title ? title.trim() : prop.title,
        description: description ? description.trim() : prop.description,
        price: price !== undefined ? Number(price) : prop.price,
        location: location ? location.trim() : prop.location,
        city: city ? city.trim() : prop.city,
        propertyType: propertyType || prop.propertyType,
        bedrooms: bedrooms !== undefined ? Number(bedrooms) : prop.bedrooms,
        bathrooms: bathrooms !== undefined ? Number(bathrooms) : prop.bathrooms,
        area: area !== undefined ? Number(area) : prop.area,
        amenities: amenities !== undefined ? (Array.isArray(amenities) ? amenities : []) : prop.amenities,
        images: images && images.length > 0 ? (Array.isArray(images) ? images : [images]) : prop.images,
      };

      return res.json({
        success: true,
        message: 'Property updated successfully',
        data: memoryStore.properties[index],
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Owner only)
const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const property = await Property.findById(id);
      if (!property) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }

      // Check ownership
      if (property.seller.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this property',
        });
      }

      await Property.findByIdAndDelete(id);

      return res.json({
        success: true,
        message: 'Property deleted successfully',
      });
    } else {
      const index = memoryStore.properties.findIndex(
        (p) => p._id.toString() === id.toString()
      );
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }

      const prop = memoryStore.properties[index];
      const sellerId =
        prop.seller && (prop.seller._id || prop.seller.toString());

      if (sellerId && sellerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this property',
        });
      }

      memoryStore.properties.splice(index, 1);

      return res.json({
        success: true,
        message: 'Property deleted successfully',
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get properties listed by current user
// @route   GET /api/properties/user/my-listings
// @access  Private
const getMyProperties = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();

    if (getIsConnected()) {
      const properties = await Property.find({ seller: req.user._id }).sort({
        createdAt: -1,
      });
      return res.json({
        success: true,
        count: properties.length,
        data: properties,
      });
    } else {
      const userProps = memoryStore.properties.filter((p) => {
        const sId = p.seller && (p.seller._id || p.seller.toString());
        return sId && sId.toString() === userId;
      });
      return res.json({
        success: true,
        count: userProps.length,
        data: userProps,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
};
