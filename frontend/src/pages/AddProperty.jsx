import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

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

const PRESET_SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
];

const AddProperty = () => {
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
    amenities: ['24/7 Concierge & Security', 'Covered EV Car Parking', '100% Power Backup'],
    imageUrl: '',
    images: [],
  });

  const [submitting, setSubmitting] = useState(false);

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

  const handleAddImage = (urlToAdd) => {
    const url = urlToAdd || formData.imageUrl;
    if (!url || !url.startsWith('http')) {
      addToast('Please provide a valid image URL starting with http:// or https://', 'error');
      return;
    }
    if (formData.images.includes(url)) {
      addToast('Image already added', 'info');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, url],
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

    // Validation
    if (!formData.title.trim()) {
      addToast('Property title is required', 'error');
      return;
    }
    if (!formData.description.trim()) {
      addToast('Property description is required', 'error');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      addToast('Please enter a valid price in INR', 'error');
      return;
    }
    if (!formData.location.trim()) {
      addToast('Location is required', 'error');
      return;
    }
    if (!formData.area || Number(formData.area) <= 0) {
      addToast('Please enter valid area in sq ft', 'error');
      return;
    }

    // Ensure at least one image
    let finalImages = [...formData.images];
    if (finalImages.length === 0) {
      if (formData.imageUrl && formData.imageUrl.startsWith('http')) {
        finalImages.push(formData.imageUrl);
      } else {
        // Fallback default high-end photo if none supplied
        finalImages.push(PRESET_SAMPLE_IMAGES[0]);
      }
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
        images: finalImages,
      };

      const res = await api.post('/properties', payload);
      if (res.data.success) {
        addToast('Property published successfully to HOMORA Marketplace!', 'success');
        navigate(`/properties/${res.data.data._id}`);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to publish property';
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="border-b border-sand-200 pb-6">
        <span className="text-forest-700 text-xs font-bold uppercase tracking-widest block mb-1">
          Property Submission
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
          List a New Property
        </h1>
        <p className="text-xs text-charcoal-500 mt-1">
          Publish your estate or residence to HOMORA's curated collection of luxury buyers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6">
          <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-forest-700" />
            <span>Basic Listing Details</span>
          </h2>

          {/* Title */}
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
              placeholder="e.g. The Camellias Signature Penthouse"
              className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Detailed Description *
            </label>
            <textarea
              rows={4}
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Highlight architectural specifications, high ceilings, natural daylighting, flooring, orientation, and neighborhood prestige..."
              className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white transition-colors resize-none"
            />
          </div>

          {/* Price, Category, and City */}
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
                  placeholder="e.g. 18500000"
                  className="w-full pl-10 pr-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white"
                />
              </div>
              <span className="text-[10px] text-charcoal-400 mt-1 block">
                ₹1 Cr = 10000000 &bull; ₹50 L = 5000000
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Property Type *
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 cursor-pointer"
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
                className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 cursor-pointer"
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

          {/* Full Address / Location */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Specific Address / Neighborhood *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
              <input
                type="text"
                required
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Vipin Khand, Gomti Nagar"
                className="w-full pl-10 pr-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Spatial Specifications */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6">
          <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <Square className="w-5 h-5 text-forest-700" />
            <span>Spatial Specifications</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Bedrooms *
              </label>
              <div className="relative">
                <Bed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="number"
                  min="0"
                  required
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Bathrooms *
              </label>
              <div className="relative">
                <Bath className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="number"
                  min="0"
                  required
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Super Built-up Area (Sq. Ft.) *
              </label>
              <div className="relative">
                <Square className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="number"
                  min="50"
                  required
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. 3250"
                  className="w-full pl-10 pr-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Checklist */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6">
          <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-forest-700" />
            <span>Select Amenities & Features</span>
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

        {/* Property Imagery */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6">
          <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-sand-100 pb-3 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-forest-700" />
            <span>Property Photography</span>
          </h2>

          {/* Preset Samples Helper */}
          <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 block">
              Quick Test: Click a luxury architectural photo to add:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_SAMPLE_IMAGES.map((sampleUrl, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleAddImage(sampleUrl)}
                  className="relative aspect-video rounded-xl overflow-hidden border border-sand-300 hover:border-forest-600 transition-colors group"
                >
                  <img src={sampleUrl} alt="Preset sample" className="w-full h-full object-cover" />
                  <span className="absolute inset-0 bg-black/40 text-white text-[10px] font-semibold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    + Add Photo
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom URL Input */}
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Or paste custom image URL (https://...)"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="flex-1 px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600"
            />
            <button
              type="button"
              onClick={() => handleAddImage()}
              className="px-5 py-3 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold"
            >
              Add URL
            </button>
          </div>

          {/* Added Images Preview */}
          {formData.images.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-600">
                Added Photos ({formData.images.length}):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {formData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-2xl overflow-hidden border border-sand-200 group"
                  >
                    <img src={img} alt={`Added ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-rose-600 transition-colors"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-forest-700 hover:bg-forest-800 text-warmWhite font-semibold text-base tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span>Publishing Listing to Marketplace...</span>
            ) : (
              <>
                <span>Publish Property Listing</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
