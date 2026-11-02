import React from 'react';
import { RotateCcw, Filter, MapPin, Home, IndianRupee, Bed } from 'lucide-react';

const CITIES = ['All Locations', 'Lucknow', 'Noida', 'Gurgaon', 'Delhi', 'Greater Noida', 'Kanpur'];

const PROPERTY_TYPES = [
  'All Types',
  'Apartment',
  'Villa',
  'Penthouse',
  'Independent House',
  'Studio',
];

const BEDROOM_OPTIONS = [
  { label: 'Any', value: 'all' },
  { label: '2 BHK', value: '2' },
  { label: '3 BHK', value: '3' },
  { label: '4+ BHK', value: '4' },
];

const FilterSidebar = ({ filters, setFilters, onReset, totalCount = 0 }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-soft sticky top-28 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-sand-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-forest-700" />
          <h3 className="font-serif font-bold text-charcoal-800 text-lg">Filters</h3>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-charcoal-600 hover:text-forest-700 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-700">
          <MapPin className="w-3.5 h-3.5 text-forest-700" />
          <span>Location</span>
        </label>
        <select
          value={filters.location || 'All Locations'}
          onChange={(e) => handleChange('location', e.target.value === 'All Locations' ? '' : e.target.value)}
          className="w-full bg-sand-50 border border-sand-200 rounded-xl px-3 py-2 text-sm text-charcoal-800 focus:outline-none focus:border-forest-600"
        >
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-700">
          <Home className="w-3.5 h-3.5 text-forest-700" />
          <span>Property Type</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PROPERTY_TYPES.map((type) => {
            const isSelected =
              (!filters.propertyType && type === 'All Types') ||
              filters.propertyType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleChange('propertyType', type === 'All Types' ? '' : type)}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium text-left truncate transition-all ${
                  isSelected
                    ? 'bg-forest-700 text-warmWhite font-semibold shadow-sm'
                    : 'bg-sand-50 hover:bg-sand-100 text-charcoal-700 border border-sand-200'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bedroom Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-700">
          <Bed className="w-3.5 h-3.5 text-forest-700" />
          <span>Bedrooms</span>
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {BEDROOM_OPTIONS.map((opt) => {
            const isSelected =
              (!filters.bedrooms && opt.value === 'all') ||
              filters.bedrooms === opt.value;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleChange('bedrooms', opt.value === 'all' ? '' : opt.value)}
                className={`py-2 rounded-xl text-xs font-medium text-center transition-all ${
                  isSelected
                    ? 'bg-forest-700 text-warmWhite font-semibold shadow-sm'
                    : 'bg-sand-50 hover:bg-sand-100 text-charcoal-700 border border-sand-200'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-700">
          <IndianRupee className="w-3.5 h-3.5 text-forest-700" />
          <span>Price Range (INR)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-charcoal-400 block mb-1">Min Price (₹)</span>
            <input
              type="number"
              placeholder="e.g. 5000000"
              value={filters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              className="w-full bg-sand-50 border border-sand-200 rounded-xl px-3 py-2 text-xs text-charcoal-800 focus:outline-none focus:border-forest-600"
            />
          </div>
          <div>
            <span className="text-[10px] text-charcoal-400 block mb-1">Max Price (₹)</span>
            <input
              type="number"
              placeholder="e.g. 80000000"
              value={filters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              className="w-full bg-sand-50 border border-sand-200 rounded-xl px-3 py-2 text-xs text-charcoal-800 focus:outline-none focus:border-forest-600"
            />
          </div>
        </div>
        <p className="text-[11px] text-charcoal-400 italic pt-1">
          Tip: ₹1 Crore = 10000000, ₹50 Lakhs = 5000000
        </p>
      </div>

      {/* Quick Summary Pill */}
      <div className="pt-2 border-t border-sand-100">
        <div className="text-center py-2 px-3 bg-forest-50 rounded-xl text-forest-800 text-xs font-semibold">
          Matching Properties: {totalCount}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
