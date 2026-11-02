import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  IndianRupee,
  Bed,
  Bath,
  Square,
  Sparkles,
  ArrowRight,
  Image as ImageIcon,
  Check,
  ChevronLeft,
} from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';

const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Penthouse',
  'Independent House',
  'Studio',
  'Plot',
];

const AMENITY_OPTIONS = [
  '24/7 Concierge & Security',
  'Infinity Swimming Pool',
  'Designer Clubhouse & Banquet',
  'Covered EV Car Parking',
  'Smart Home Automation',
  'Modern Gymnasium & Spa',
  'Italian Marble Flooring',
  'Private Terrace Garden',
  'High-speed Elevators',
  '100% Power Backup',
  'Landscaped Central Park',
  'Tennis & Squash Court',
];

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    city: 'Lucknow',
    propertyType: 'Apartment',
    bedrooms: '3',
    bathrooms: '3',
    area: '',
    amenities: [],
    imageUrl: '',
    images: [],
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        if (res.data.success) {
          const prop = res.data.data;
          setFormData({
            title: prop.title || '',
            description: prop.description || '',
            price: prop.price || '',
            location: prop.location || '',
            city: prop.city || 'Lucknow',
            propertyType: prop.propertyType || 'Apartment',
            bedrooms: prop.bedrooms?.toString() || '3',
            bathrooms: prop.bathrooms?.toString() || '3',
            area: prop.area?.toString() || '',
            amenities: prop.amenities || [],
            imageUrl: '',
            images: prop.images || [],
          });
        }
      } catch (err) {
        addToast('Unable to fetch property listing details.', 'error');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate, addToast]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleAddImage = () => {
    if (!formData.imageUrl || !formData.imageUrl.startsWith('http')) {
      addToast('Please provide a valid image URL', 'error');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, formData.imageUrl],
      imageUrl: '',
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.price) {
      addToast('Please fill all mandatory fields', 'error');
      return;
    }

    if (formData.images.length === 0) {
      addToast('At least one property image is required', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        location: formData.location,
        city: formData.city,
        propertyType: formData.propertyType,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        amenities: formData.amenities,
        images: formData.images,
      };

      const res = await api.put(`/properties/${id}`, payload);
      if (res.data.success) {
        addToast('Property listing updated successfully!', 'success');
        navigate(`/properties/${id}`);
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update listing', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Loading property for editing..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-sand-200 pb-6">
        <div>
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest block mb-1">
            Listing Management
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Edit Property Listing
          </h1>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-sand-300 text-xs font-semibold text-charcoal-700 hover:bg-sand-100"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6">
          <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-forest-700" />
            <span>Listing Details</span>
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Property Title *
            </label>
            <input
              type="text"
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Description *
            </label>
            <textarea
              rows={4}
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Price in INR (₹) *
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="number"
                  required
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Property Type *
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Metro / City *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600"
              >
                <option value="Lucknow">Lucknow</option>
                <option value="Noida">Noida</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Delhi">Delhi</option>
                <option value="Greater Noida">Greater Noida</option>
                <option value="Kanpur">Kanpur</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Address / Neighborhood *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
              <input
                type="text"
                required
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Spatial Specifications */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6">
          <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <Square className="w-5 h-5 text-forest-700" />
            <span>Specifications</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Bedrooms *
              </label>
              <input
                type="number"
                min="0"
                required
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Bathrooms *
              </label>
              <input
                type="number"
                min="0"
                required
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Area (Sq. Ft.) *
              </label>
              <input
                type="number"
                min="50"
                required
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6">
          <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-forest-700" />
            <span>Amenities</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {AMENITY_OPTIONS.map((amenity) => {
              const isChecked = formData.amenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`p-3 rounded-2xl border text-xs font-semibold text-left flex items-center justify-between transition-all ${
                    isChecked
                      ? 'bg-forest-50 border-forest-600 text-forest-900 shadow-sm'
                      : 'bg-sand-50/50 border-sand-200 text-charcoal-700 hover:bg-sand-100'
                  }`}
                >
                  <span className="truncate mr-2">{amenity}</span>
                  {isChecked && <Check className="w-4 h-4 text-forest-700 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6">
          <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-forest-700" />
            <span>Photos</span>
          </h2>

          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Paste image URL to add (https://...)"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="flex-1 px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-5 py-3 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold"
            >
              Add Photo
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {formData.images.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-2xl overflow-hidden border border-sand-200"
              >
                <img src={img} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-rose-600"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-forest-700 hover:bg-forest-800 text-warmWhite font-semibold text-base tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span>Updating Listing...</span>
            ) : (
              <>
                <span>Save & Update Listing</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;
