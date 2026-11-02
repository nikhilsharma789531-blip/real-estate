import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, IndianRupee } from 'lucide-react';

const CITIES = [
  'All Locations',
  'Lucknow',
  'Noida',
  'Gurgaon',
  'Delhi',
  'Greater Noida',
  'Kanpur',
];

const PROPERTY_TYPES = [
  'All Types',
  'Apartment',
  'Villa',
  'Penthouse',
  'Independent House',
  'Studio',
];

const PRICE_RANGES = [
  { label: 'Any Price', min: '', max: '' },
  { label: 'Under ₹1 Crore', min: '', max: '10000000' },
  { label: '₹1 Cr - ₹3 Cr', min: '10000000', max: '30000000' },
  { label: '₹3 Cr - ₹5 Cr', min: '30000000', max: '50000000' },
  { label: '₹5 Cr & Above', min: '50000000', max: '' },
];

const SearchBar = ({ initialValues = {}, onSearch = null, className = '' }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(initialValues.location || 'All Locations');
  const [propertyType, setPropertyType] = useState(initialValues.propertyType || 'All Types');
  const [priceRangeIndex, setPriceRangeIndex] = useState(() => {
    if (initialValues.minPrice === '10000000' && initialValues.maxPrice === '30000000') return 2;
    if (initialValues.minPrice === '30000000' && initialValues.maxPrice === '50000000') return 3;
    if (initialValues.minPrice === '50000000') return 4;
    if (initialValues.maxPrice === '10000000') return 1;
    return 0;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedRange = PRICE_RANGES[priceRangeIndex];
    const params = new URLSearchParams();

    if (location && location !== 'All Locations') {
      params.append('location', location);
    }
    if (propertyType && propertyType !== 'All Types') {
      params.append('propertyType', propertyType);
    }
    if (selectedRange.min) {
      params.append('minPrice', selectedRange.min);
    }
    if (selectedRange.max) {
      params.append('maxPrice', selectedRange.max);
    }

    if (onSearch) {
      onSearch({
        location: location === 'All Locations' ? '' : location,
        propertyType: propertyType === 'All Types' ? '' : propertyType,
        minPrice: selectedRange.min,
        maxPrice: selectedRange.max,
      });
    } else {
      navigate(`/properties?${params.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl shadow-card border border-sand-200 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Location Selector */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-sand-50/80 border border-sand-200/80 hover:border-forest-400 transition-colors">
          <MapPin className="w-5 h-5 text-forest-700 flex-shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold tracking-wider text-charcoal-400">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-charcoal-800 focus:outline-none cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-sand-50/80 border border-sand-200/80 hover:border-forest-400 transition-colors">
          <Home className="w-5 h-5 text-forest-700 flex-shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold tracking-wider text-charcoal-400">
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-charcoal-800 focus:outline-none cursor-pointer"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-sand-50/80 border border-sand-200/80 hover:border-forest-400 transition-colors">
          <IndianRupee className="w-5 h-5 text-forest-700 flex-shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold tracking-wider text-charcoal-400">
              Budget Range
            </label>
            <select
              value={priceRangeIndex}
              onChange={(e) => setPriceRangeIndex(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-semibold text-charcoal-800 focus:outline-none cursor-pointer"
            >
              {PRICE_RANGES.map((r, i) => (
                <option key={r.label} value={i}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="h-full min-h-[52px] bg-forest-700 hover:bg-forest-800 text-warmWhite rounded-2xl font-semibold text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
        >
          <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Find Properties</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
