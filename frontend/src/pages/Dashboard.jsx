import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Heart,
  User,
  PlusCircle,
  Edit3,
  Trash2,
  ExternalLink,
  MapPin,
  Calendar,
  AlertTriangle,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatINR, formatDate } from '../utils/formatters';
import LoadingSpinner from '../components/LoadingSpinner';
import PropertyCard from '../components/PropertyCard';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { wishlist, wishlistCount } = useWishlist();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active tab: 'my-properties' | 'wishlist' | 'profile'
  const initialTab = searchParams.get('tab') || 'my-properties';
  const [activeTab, setActiveTab] = useState(initialTab);

  const [myProperties, setMyProperties] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);

  // Delete Confirmation Modal State
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const fetchMyProperties = async () => {
    setLoadingListings(true);
    try {
      const res = await api.get('/properties/user/my-listings');
      if (res.data.success) {
        setMyProperties(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load user listings:', err);
    } finally {
      setLoadingListings(false);
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const confirmDelete = async () => {
    if (!propertyToDelete) return;
    setDeleting(true);
    try {
      const res = await api.delete(`/properties/${propertyToDelete._id}`);
      if (res.data.success) {
        addToast('Property listing removed successfully.', 'success');
        setMyProperties((prev) =>
          prev.filter((p) => p._id.toString() !== propertyToDelete._id.toString())
        );
        setPropertyToDelete(null);
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete listing.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Welcome Profile Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-forest-700 text-warmWhite font-serif text-2xl font-bold flex items-center justify-center shadow-md flex-shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                {user?.name}
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-forest-50 text-forest-700 px-2.5 py-0.5 rounded-full border border-forest-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Client
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-500 mt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {user?.email}
              </span>
              {user?.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {user?.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/properties/add"
            className="px-5 py-2.5 rounded-full bg-forest-700 hover:bg-forest-800 text-warmWhite text-xs font-semibold transition-all shadow-sm hover:shadow flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List New Property</span>
          </Link>
          <button
            onClick={() => {
              logout(true);
              navigate('/');
            }}
            className="p-2.5 rounded-full border border-sand-300 text-charcoal-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          onClick={() => handleTabChange('my-properties')}
          className={`p-6 rounded-3xl border transition-all cursor-pointer ${
            activeTab === 'my-properties'
              ? 'bg-forest-50/70 border-forest-300 shadow-soft'
              : 'bg-white border-sand-200 hover:border-sand-300'
          }`}
        >
          <div className="flex items-center justify-between text-charcoal-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>My Active Listings</span>
            <Building2 className="w-4 h-4 text-forest-700" />
          </div>
          <p className="font-serif text-3xl font-bold text-charcoal-900">
            {myProperties.length}
          </p>
          <span className="text-xs text-charcoal-500 mt-1 block">
            Click to manage or edit
          </span>
        </div>

        <div
          onClick={() => handleTabChange('wishlist')}
          className={`p-6 rounded-3xl border transition-all cursor-pointer ${
            activeTab === 'wishlist'
              ? 'bg-forest-50/70 border-forest-300 shadow-soft'
              : 'bg-white border-sand-200 hover:border-sand-300'
          }`}
        >
          <div className="flex items-center justify-between text-charcoal-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Saved Residences</span>
            <Heart className="w-4 h-4 text-rose-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-charcoal-900">
            {wishlistCount}
          </p>
          <span className="text-xs text-charcoal-500 mt-1 block">
            Saved to your private collection
          </span>
        </div>

        <div
          onClick={() => handleTabChange('profile')}
          className={`p-6 rounded-3xl border transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-forest-50/70 border-forest-300 shadow-soft'
              : 'bg-white border-sand-200 hover:border-sand-300'
          }`}
        >
          <div className="flex items-center justify-between text-charcoal-500 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Client Profile</span>
            <User className="w-4 h-4 text-forest-700" />
          </div>
          <p className="font-serif text-lg font-bold text-charcoal-900 truncate">
            {user?.name?.split(' ')[0]}
          </p>
          <span className="text-xs text-forest-700 font-semibold mt-1 block">
            Account Status: Active
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-sand-200 pb-2">
        <button
          onClick={() => handleTabChange('my-properties')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'my-properties'
              ? 'bg-forest-700 text-white shadow-sm'
              : 'text-charcoal-700 hover:bg-sand-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>My Listings ({myProperties.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('wishlist')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'wishlist'
              ? 'bg-forest-700 text-white shadow-sm'
              : 'text-charcoal-700 hover:bg-sand-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Properties ({wishlistCount})</span>
        </button>

        <button
          onClick={() => handleTabChange('profile')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'profile'
              ? 'bg-forest-700 text-white shadow-sm'
              : 'text-charcoal-700 hover:bg-sand-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Account Profile</span>
        </button>
      </div>

      {/* TAB CONTENT: MY LISTINGS */}
      {activeTab === 'my-properties' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">
              Manage Your Listed Properties
            </h2>
            <Link
              to="/properties/add"
              className="text-xs font-semibold text-forest-700 hover:text-forest-800 flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Another Listing</span>
            </Link>
          </div>

          {loadingListings ? (
            <LoadingSpinner text="Retrieving your property portfolio..." />
          ) : myProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-sand-200 shadow-soft space-y-4">
              <Building2 className="w-12 h-12 text-charcoal-300 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-charcoal-800">
                You haven't listed any properties yet
              </h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Present your architectural residence, villa, or penthouse to verified buyers on HOMORA.
              </p>
              <Link
                to="/properties/add"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest-700 text-white text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List Your First Property</span>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-charcoal-700">
                  <thead className="bg-sand-50/70 border-b border-sand-200 text-charcoal-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-4 px-6">Property</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Offered Price</th>
                      <th className="py-4 px-6">Location</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100">
                    {myProperties.map((prop) => (
                      <tr key={prop._id} className="hover:bg-sand-50/40 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80'}
                              alt={prop.title}
                              className="w-14 h-11 object-cover rounded-xl border border-sand-200"
                            />
                            <div>
                              <Link
                                to={`/properties/${prop._id}`}
                                className="font-serif font-bold text-charcoal-900 hover:text-forest-700 transition-colors line-clamp-1"
                              >
                                {prop.title}
                              </Link>
                              <span className="text-[11px] text-charcoal-400">
                                {prop.bedrooms} BHK &bull; {prop.area} sq ft
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-full bg-sand-100 text-charcoal-700 font-medium">
                            {prop.propertyType}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-semibold text-charcoal-900">
                          {formatINR(prop.price)}
                        </td>
                        <td className="py-4 px-6 text-charcoal-500 max-w-[180px] truncate">
                          {prop.location}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/properties/${prop._id}`}
                              className="p-2 rounded-xl text-charcoal-600 hover:text-forest-700 hover:bg-forest-50 transition-colors"
                              title="View Public Listing"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <Link
                              to={`/properties/edit/${prop._id}`}
                              className="p-2 rounded-xl text-charcoal-600 hover:text-forest-700 hover:bg-forest-50 transition-colors"
                              title="Edit Listing"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() => setPropertyToDelete(prop)}
                              className="p-2 rounded-xl text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: WISHLIST / SAVED PROPERTIES */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal-900">
                Your Saved Collection
              </h2>
              <p className="text-xs text-charcoal-500 mt-1">
                Private bookmarks of residences you are considering for purchase.
              </p>
            </div>
            <Link
              to="/properties"
              className="text-xs font-semibold text-forest-700 hover:text-forest-800"
            >
              Browse More Residences &rarr;
            </Link>
          </div>

          {wishlist.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-sand-200 shadow-soft space-y-4">
              <Heart className="w-12 h-12 text-rose-300 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-charcoal-800">
                Your collection is currently empty
              </h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Click the heart icon on any property card to save homes to this private shortlist.
              </p>
              <Link
                to="/properties"
                className="inline-block px-6 py-2.5 rounded-full bg-forest-700 text-white text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
              >
                Explore Properties
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: PROFILE DETAILS */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft max-w-2xl space-y-6">
          <h2 className="font-serif text-2xl font-bold text-charcoal-900 pb-4 border-b border-sand-100">
            Account Profile Details
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-1">
                Full Name
              </label>
              <p className="font-semibold text-charcoal-900 p-3 bg-sand-50 rounded-xl border border-sand-200">
                {user?.name}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-1">
                Email Address
              </label>
              <p className="font-semibold text-charcoal-900 p-3 bg-sand-50 rounded-xl border border-sand-200">
                {user?.email}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-1">
                Phone Number
              </label>
              <p className="font-semibold text-charcoal-900 p-3 bg-sand-50 rounded-xl border border-sand-200">
                {user?.phone || 'Not provided'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-1">
                Membership Level
              </label>
              <p className="text-xs font-semibold text-forest-700 p-3 bg-forest-50 rounded-xl border border-forest-200">
                Verified HOMORA Private Client
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {propertyToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-sand-200 shadow-elevated space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-charcoal-900">
              Delete Property Listing?
            </h3>

            <p className="text-xs text-charcoal-600 leading-relaxed">
              Are you certain you wish to delete <strong className="text-charcoal-900">"{propertyToDelete.title}"</strong>?
              This action permanently removes the listing from the marketplace.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPropertyToDelete(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-charcoal-600 hover:bg-sand-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md"
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
