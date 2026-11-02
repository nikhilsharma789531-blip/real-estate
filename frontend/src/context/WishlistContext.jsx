import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated, token } = useAuth();
  const { addToast } = useToast();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (isAuthenticated && token) {
        try {
          setLoading(true);
          const res = await api.get('/wishlist');
          if (res.data.success) {
            setWishlist(res.data.data);
          }
        } catch (err) {
          console.error('Failed to load wishlist:', err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setWishlist([]);
      }
    };

    fetchWishlist();
  }, [isAuthenticated, token]);

  const isInWishlist = (propertyId) => {
    if (!propertyId) return false;
    const id = propertyId._id || propertyId;
    return wishlist.some((item) => {
      const itemId = item._id || item;
      return itemId.toString() === id.toString();
    });
  };

  const toggleWishlist = async (property) => {
    if (!isAuthenticated) {
      addToast('Please sign in to save properties to your collection.', 'info');
      return { success: false, requireAuth: true };
    }

    const propId = property._id || property;
    const isCurrentlySaved = isInWishlist(propId);

    try {
      if (isCurrentlySaved) {
        // Optimistic removal
        setWishlist((prev) =>
          prev.filter((item) => (item._id || item).toString() !== propId.toString())
        );
        addToast('Removed from saved properties', 'info');
        await api.delete(`/wishlist/${propId}`);
      } else {
        // Optimistic addition
        setWishlist((prev) => [...prev, property]);
        addToast('Added to saved properties', 'success');
        await api.post(`/wishlist/${propId}`);
      }
      return { success: true };
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      // Revert / re-fetch on failure
      const res = await api.get('/wishlist');
      if (res.data.success) setWishlist(res.data.data);
      addToast('Unable to update wishlist. Please try again.', 'error');
      return { success: false };
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        loading,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
