import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Heart,
  Share2,
  Phone,
  Mail,
  UserCheck,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Send,
  Building2,
} from 'lucide-react';
import api from '../services/api';
import { formatINR, formatFullINR, formatDate } from '../utils/formatters';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import PropertyCard from '../components/PropertyCard';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Contact Seller Form State
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: '',
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const res = await api.get(`/properties/${id}`);
        if (res.data.success) {
          setProperty(res.data.data);
          setActiveImageIndex(0);

          // Fetch similar properties by city or propertyType
          const similarRes = await api.get(
            `/properties?city=${res.data.data.city || ''}&propertyType=${
              res.data.data.propertyType
            }`
          );
          if (similarRes.data.success) {
            const filtered = similarRes.data.data
              .filter((p) => p._id.toString() !== id.toString())
              .slice(0, 3);
            setSimilarProperties(filtered);
          }
        }
      } catch (err) {
        console.error('Error loading property details:', err);
        addToast('Unable to load property details', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  useEffect(() => {
    if (property) {
      setContactForm((prev) => ({
        ...prev,
        message: `Hello, I am interested in inquiring about "${property.title}" (Ref #${property._id.slice(-6)}). Please share the brochure and schedule a private viewing.`,
      }));
    }
  }, [property]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Property link copied to clipboard!', 'info');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      addToast('Please fill in your name, email, and message.', 'error');
      return;
    }

    setContactSubmitting(true);
    try {
      await api.post('/contact', {
        name: contactForm.name,
        email: contactForm.email,
        subject: `Inquiry for ${property.title}`,
        message: `${contactForm.message}\nPhone: ${contactForm.phone || 'N/A'}\nProperty ID: ${property._id}`,
      });

      addToast(
        `Inquiry sent to ${property.seller?.name || 'the seller'}! An advisor will reach out shortly.`,
        'success'
      );
      setContactModalOpen(false);
    } catch (err) {
      addToast('Failed to deliver message. Please try again.', 'error');
    } finally {
      setContactSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner text="Retrieving architectural portfolio..." size="lg" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-charcoal-800">
          Property Not Found
        </h2>
        <p className="text-charcoal-600 text-sm">
          The requested listing may have been acquired, unlisted, or does not exist.
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest-700 text-white font-medium text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(property._id);
  const images = property.images && property.images.length > 0 ? property.images : [];
  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-medium text-charcoal-500">
          <Link to="/" className="hover:text-forest-700">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-forest-700">Properties</Link>
          <span>/</span>
          <span className="text-charcoal-800 truncate max-w-xs sm:max-w-md font-semibold">
            {property.title}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-sand-200 text-charcoal-700 hover:text-forest-700 text-xs font-medium transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={() => toggleWishlist(property)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-medium transition-all shadow-sm ${
              isSaved
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-sand-200 text-charcoal-700 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-600' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save Property'}</span>
          </button>
        </div>
      </div>

      {/* GALLERY SECTION */}
      <section className="space-y-4">
        {/* Main Large Image */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-sand-200 shadow-elevated">
          <img
            src={currentImage}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-500"
          />

          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-forest-800/90 text-warmWhite text-xs uppercase tracking-wider font-semibold backdrop-blur-md">
              {property.propertyType}
            </span>
            {property.featured && (
              <span className="px-3.5 py-1.5 rounded-full bg-amber-600/90 text-warmWhite text-xs font-semibold backdrop-blur-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail Selector */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-16 sm:w-32 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-forest-700 ring-2 ring-forest-600/20 scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* MAIN TWO-COLUMN CONTENT */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Details, Specs, Amenities, Description (2 Cols) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Header & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-charcoal-500">
              <MapPin className="w-4 h-4 text-forest-700" />
              <span className="font-medium text-sm text-charcoal-700">
                {property.location}{property.city ? `, ${property.city}` : ''}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 leading-tight">
              {property.title}
            </h1>

            <div className="flex flex-wrap items-baseline gap-3 pt-2">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-forest-800">
                {formatINR(property.price)}
              </span>
              <span className="text-xs text-charcoal-400 font-medium">
                ({formatFullINR(property.price)})
              </span>
            </div>
          </div>

          {/* Quick Specs Grid Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-3xl bg-white border border-sand-200 shadow-soft">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-charcoal-400 font-medium">
                <Bed className="w-4 h-4 text-forest-700" />
                <span>Bedrooms</span>
              </div>
              <p className="font-serif text-xl font-bold text-charcoal-900">
                {property.bedrooms} BHK
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-charcoal-400 font-medium">
                <Bath className="w-4 h-4 text-forest-700" />
                <span>Bathrooms</span>
              </div>
              <p className="font-serif text-xl font-bold text-charcoal-900">
                {property.bathrooms} Baths
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-charcoal-400 font-medium">
                <Square className="w-4 h-4 text-forest-700" />
                <span>Super Built-up</span>
              </div>
              <p className="font-serif text-xl font-bold text-charcoal-900">
                {property.area} <span className="text-xs font-normal text-charcoal-500">sq ft</span>
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-charcoal-400 font-medium">
                <Building2 className="w-4 h-4 text-forest-700" />
                <span>Category</span>
              </div>
              <p className="font-serif text-xl font-bold text-charcoal-900">
                {property.propertyType}
              </p>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">
              Architectural Overview
            </h2>
            <div className="prose text-charcoal-700 text-sm leading-relaxed whitespace-pre-line bg-white rounded-3xl p-6 border border-sand-200 shadow-soft">
              {property.description}
            </div>
          </div>

          {/* Amenities Section */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">
              Amenities & Residence Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities && property.amenities.length > 0 ? (
                property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-sand-200 shadow-soft text-xs font-semibold text-charcoal-800"
                  >
                    <div className="w-7 h-7 rounded-full bg-forest-50 flex items-center justify-center text-forest-700 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-charcoal-500 italic">
                  Standard luxury amenities included.
                </p>
              )}
            </div>
          </div>

          {/* Location & Title Verification Note */}
          <div className="bg-sand-100 rounded-3xl p-6 border border-sand-200 space-y-3">
            <div className="flex items-center gap-2 text-forest-800 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-forest-700" />
              <span>HOMORA Title & Verification Guarantee</span>
            </div>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              This residence has been verified against municipal zoning laws and encumbrance registers.
              Our legal desk provides complete escrow and documentation advisory free of charge for
              buyers on this platform.
            </p>
          </div>
        </div>

        {/* Right Column: Seller Profile & Inquiry Card (Sticky 1 Col) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-28">
          {/* Seller Card */}
          <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-card space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-sand-100">
              <div className="w-14 h-14 rounded-2xl bg-forest-700 text-warmWhite font-serif text-xl font-bold flex items-center justify-center shadow-md">
                {property.seller?.name ? property.seller.name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-charcoal-900 text-lg">
                    {property.seller?.name || 'Authorized Seller'}
                  </h3>
                  <UserCheck className="w-4 h-4 text-forest-600" title="Verified Seller" />
                </div>
                <span className="text-xs text-forest-700 font-semibold bg-forest-50 px-2 py-0.5 rounded-full">
                  Verified Property Owner
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-charcoal-700">
              {property.seller?.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-forest-700 flex-shrink-0" />
                  <span className="font-medium">{property.seller.phone}</span>
                </div>
              )}
              {property.seller?.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-forest-700 flex-shrink-0" />
                  <span className="font-medium truncate">{property.seller.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5 text-charcoal-400">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Listed on {formatDate(property.createdAt)}</span>
              </div>
            </div>

            <button
              onClick={() => setContactModalOpen(true)}
              className="w-full py-3.5 px-4 rounded-2xl bg-forest-700 hover:bg-forest-800 text-warmWhite font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Contact Seller / Request Viewing</span>
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT SELLER MODAL */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-sand-200 shadow-elevated space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-sand-100 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-forest-700 block mb-1">
                  Private Inquiry
                </span>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  Contact Property Advisor
                </h3>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Direct message for: <strong className="text-charcoal-800">{property.title}</strong>
                </p>
              </div>
              <button
                onClick={() => setContactModalOpen(false)}
                className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Rathore"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-sm focus:outline-none focus:border-forest-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-sm focus:outline-none focus:border-forest-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-sm focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Message / Viewing Request
                </label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-sm focus:outline-none focus:border-forest-600 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-charcoal-600 hover:bg-sand-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold shadow-md flex items-center gap-2"
                >
                  {contactSubmitting ? (
                    <span>Delivering...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SIMILAR PROPERTIES SECTION */}
      {similarProperties.length > 0 && (
        <section className="pt-12 border-t border-sand-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-forest-700 text-xs font-bold uppercase tracking-widest block mb-1">
                Recommendations
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                Similar Properties You May Appreciate
              </h2>
            </div>
            <Link
              to="/properties"
              className="text-xs font-semibold text-forest-700 hover:text-forest-800"
            >
              View All Properties &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PropertyDetails;
