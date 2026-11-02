import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { useWishlist } from '../context/WishlistContext';

const PropertyCard = ({ property }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isSaved = isInWishlist(property._id);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(property);
  };

  const primaryImage =
    property.images && property.images.length > 0
      ? property.images[0]
      : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
        <img
          src={primaryImage}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-warmWhite/90 backdrop-blur-md text-charcoal-800 rounded-full shadow-sm">
            {property.propertyType}
          </span>

          <button
            onClick={handleHeartClick}
            aria-label={isSaved ? 'Remove from saved' : 'Save property'}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm ${
              isSaved
                ? 'bg-rose-50 text-rose-600 scale-110 shadow-md'
                : 'bg-warmWhite/80 text-charcoal-700 hover:bg-white hover:text-rose-600'
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                isSaved ? 'fill-rose-600 text-rose-600' : ''
              }`}
            />
          </button>
        </div>

        {/* Bottom Image Overlay: Price Tag */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-sand-200 block font-medium">
              Offered At
            </span>
            <span className="font-serif text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              {formatINR(property.price)}
            </span>
          </div>

          {property.city && (
            <span className="text-xs bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-sand-100 font-medium border border-white/20">
              {property.city}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-charcoal-400 font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-forest-600 flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property._id}`}>
            <h3 className="font-serif text-lg font-bold text-charcoal-800 group-hover:text-forest-700 transition-colors line-clamp-1 mb-2">
              {property.title}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed mb-4">
            {property.description}
          </p>
        </div>

        {/* Specs & Action */}
        <div>
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-sand-100 text-charcoal-700 mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-forest-600" />
              <span className="text-xs font-semibold">
                {property.bedrooms} <span className="text-charcoal-400 font-normal">Beds</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-forest-600" />
              <span className="text-xs font-semibold">
                {property.bathrooms} <span className="text-charcoal-400 font-normal">Baths</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="w-4 h-4 text-forest-600" />
              <span className="text-xs font-semibold">
                {property.area} <span className="text-charcoal-400 font-normal">sq ft</span>
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Link
            to={`/properties/${property._id}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-forest-50 hover:bg-forest-700 text-forest-800 hover:text-white font-medium text-xs tracking-wider transition-all duration-200 group/btn"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
