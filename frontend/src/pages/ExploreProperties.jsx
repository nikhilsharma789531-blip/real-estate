import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  Search,
  ArrowUpDown,
  Home,
  RefreshCw,
  X,
} from 'lucide-react';
import api from '../services/api';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import LoadingSpinner from '../components/LoadingSpinner';

const ExploreProperties = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filters from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    propertyType: searchParams.get('propertyType') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest',
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state when URL params change externally (e.g. from navbar or home)
  useEffect(() => {
    setFilters({
      search: searchParams.get('search') || '',
      location: searchParams.get('location') || '',
      propertyType: searchParams.get('propertyType') || '',
      bedrooms: searchParams.get('bedrooms') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sort: searchParams.get('sort') || 'newest',
    });
  }, [searchParams]);

  // Fetch properties from backend with current filters
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.location) params.append('location', filters.location);
      if (filters.propertyType) params.append('propertyType', filters.propertyType);
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sort) params.append('sort', filters.sort);

      const res = await api.get(`/properties?${params.toString()}`);
      if (res.data.success) {
        setProperties(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Update URL search parameters when filters change
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });
    setSearchParams(params, { replace: true });
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      search: '',
      location: '',
      propertyType: '',
      bedrooms: '',
      minPrice: '',
      maxPrice: '',
      sort: 'newest',
    };
    updateFilters(defaultFilters);
  };

  const handleSortChange = (e) => {
    updateFilters({
      ...filters,
      sort: e.target.value,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sand-200 pb-8">
        <div>
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest block mb-1">
            Exclusive Marketplace
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-900 tracking-tight">
            Explore Properties
          </h1>
          <p className="text-charcoal-600 text-sm mt-2 max-w-xl">
            Browse through luxury residences, penthouses, and private estates across prime Indian metros.
          </p>
        </div>

        {/* Mobile Filter Toggle & Sort Dropdown */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-sand-200 text-charcoal-800 text-xs font-semibold shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-forest-700" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white border border-sand-200 shadow-sm">
            <ArrowUpDown className="w-4 h-4 text-forest-700" />
            <label className="text-xs text-charcoal-400 font-medium hidden sm:inline">
              Sort By:
            </label>
            <select
              value={filters.sort}
              onChange={handleSortChange}
              className="bg-transparent text-xs font-semibold text-charcoal-800 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest Listings</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Keyword Search & Active Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search by building name, area, or keywords (e.g. 'Gomti Nagar', 'Penthouse', 'Pool')..."
            value={filters.search}
            onChange={(e) => updateFilters({ ...filters, search: e.target.value })}
            className="w-full pl-11 pr-4 py-3 bg-white border border-sand-200 rounded-2xl text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-forest-600 shadow-soft"
          />
        </form>

        {(filters.location ||
          filters.propertyType ||
          filters.bedrooms ||
          filters.minPrice ||
          filters.maxPrice ||
          filters.search) && (
          <button
            onClick={handleResetFilters}
            className="whitespace-nowrap flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-sand-100 hover:bg-sand-200 text-charcoal-700 text-xs font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Main Content: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar (1 Col) */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar
            filters={filters}
            setFilters={updateFilters}
            onReset={handleResetFilters}
            totalCount={properties.length}
          />
        </div>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-xs bg-warmWhite h-full p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-sand-200">
                <span className="font-serif font-bold text-lg text-charcoal-800">
                  Filter Properties
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-charcoal-600 hover:bg-sand-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterSidebar
                filters={filters}
                setFilters={updateFilters}
                onReset={handleResetFilters}
                totalCount={properties.length}
              />

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-forest-700 text-white rounded-2xl text-sm font-semibold"
              >
                Apply & View ({properties.length})
              </button>
            </div>
          </div>
        )}

        {/* Property Grid (3 Cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header count indicator */}
          <div className="flex items-center justify-between text-xs text-charcoal-500 font-medium px-1">
            <span>
              Showing <strong className="text-charcoal-900">{properties.length}</strong> available residences
            </span>
          </div>

          {loading ? (
            <LoadingSpinner text="Searching through architectural portfolio..." />
          ) : properties.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-sand-200 shadow-soft space-y-4">
              <div className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center text-charcoal-400 mx-auto">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-800">
                No matching properties found
              </h3>
              <p className="text-sm text-charcoal-600 max-w-md mx-auto">
                We couldn't find any residences matching your specific filters. Try relaxing your
                price boundaries or clearing location constraints.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-full bg-forest-700 text-warmWhite text-xs font-semibold hover:bg-forest-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreProperties;
