const Wishlist = require('../models/Wishlist');
const Property = require('../models/Property');
const { getIsConnected, memoryStore } = require('../config/db');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();

    if (getIsConnected()) {
      let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
        path: 'properties',
        populate: {
          path: 'seller',
          select: 'name email phone',
        },
      });

      if (!wishlist) {
        wishlist = await Wishlist.create({ user: req.user._id, properties: [] });
      }

      return res.json({
        success: true,
        count: wishlist.properties.length,
        data: wishlist.properties,
      });
    } else {
      if (!memoryStore.wishlists[userId]) {
        memoryStore.wishlists[userId] = new Set();
      }

      const propIds = Array.from(memoryStore.wishlists[userId]);
      const savedProps = memoryStore.properties.filter((p) =>
        propIds.includes(p._id.toString())
      );

      return res.json({
        success: true,
        count: savedProps.length,
        data: savedProps,
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Add property to wishlist
// @route   POST /api/wishlist/:propertyId
// @access  Private
const addToWishlist = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user._id.toString();

    if (getIsConnected()) {
      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }

      let wishlist = await Wishlist.findOne({ user: req.user._id });
      if (!wishlist) {
        wishlist = new Wishlist({ user: req.user._id, properties: [] });
      }

      const alreadyAdded = wishlist.properties.some(
        (id) => id.toString() === propertyId.toString()
      );

      if (!alreadyAdded) {
        wishlist.properties.push(propertyId);
        wishlist.updatedAt = new Date();
        await wishlist.save();
      }

      const populated = await Wishlist.findOne({ user: req.user._id }).populate(
        'properties'
      );

      return res.json({
        success: true,
        message: 'Property added to your saved collection',
        data: populated.properties,
      });
    } else {
      const property = memoryStore.properties.find(
        (p) => p._id.toString() === propertyId.toString()
      );
      if (!property) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }

      if (!memoryStore.wishlists[userId]) {
        memoryStore.wishlists[userId] = new Set();
      }

      memoryStore.wishlists[userId].add(propertyId.toString());

      const propIds = Array.from(memoryStore.wishlists[userId]);
      const savedProps = memoryStore.properties.filter((p) =>
        propIds.includes(p._id.toString())
      );

      return res.json({
        success: true,
        message: 'Property added to your saved collection',
        data: savedProps,
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Remove property from wishlist
// @route   DELETE /api/wishlist/:propertyId
// @access  Private
const removeFromWishlist = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user._id.toString();

    if (getIsConnected()) {
      let wishlist = await Wishlist.findOne({ user: req.user._id });
      if (wishlist) {
        wishlist.properties = wishlist.properties.filter(
          (id) => id.toString() !== propertyId.toString()
        );
        wishlist.updatedAt = new Date();
        await wishlist.save();
      }

      const populated = await Wishlist.findOne({ user: req.user._id }).populate(
        'properties'
      );

      return res.json({
        success: true,
        message: 'Property removed from your saved collection',
        data: populated ? populated.properties : [],
      });
    } else {
      if (memoryStore.wishlists[userId]) {
        memoryStore.wishlists[userId].delete(propertyId.toString());
      }

      const propIds = memoryStore.wishlists[userId]
        ? Array.from(memoryStore.wishlists[userId])
        : [];
      const savedProps = memoryStore.properties.filter((p) =>
        propIds.includes(p._id.toString())
      );

      return res.json({
        success: true,
        message: 'Property removed from your saved collection',
        data: savedProps,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
