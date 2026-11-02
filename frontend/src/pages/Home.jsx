import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  KeyRound,
  Building,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import api from '../services/api';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';

const POPULAR_LOCATIONS = [
  {
    city: 'Lucknow',
    subtext: 'Gomti Nagar & Shaheed Path',
    count: '3+ Luxury Residences',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    link: '/properties?location=Lucknow',
  },
  {
    city: 'Noida',
    subtext: 'Expressway & Sector 128',
    count: '2+ Master Estates',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    link: '/properties?location=Noida',
  },
  {
    city: 'Gurgaon',
    subtext: 'Golf Course Road & DLF Phase 5',
    count: '2+ Signature Penthouses',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    link: '/properties?location=Gurgaon',
  },
  {
    city: 'Delhi',
    subtext: 'Vasant Vihar & South Delhi',
    count: '1+ Sovereign Mansions',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    link: '/properties?location=Delhi',
  },
  {
    city: 'Greater Noida',
    subtext: 'Tech Zone & Sector 1 West',
    count: '1+ Contemporary Lofts',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80',
    link: '/properties?location=Greater+Noida',
  },
  {
    city: 'Kanpur',
    subtext: 'Civil Lines & Ganga Barrage',
    count: '1+ Heritage Bungalows',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    link: '/properties?location=Kanpur',
  },
];

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/properties?featured=true');
        if (res.data.success && res.data.data.length > 0) {
          setFeaturedProperties(res.data.data.slice(0, 3));
        } else {
          // Fallback to general list if no featured flags
          const fallbackRes = await api.get('/properties');
          if (fallbackRes.data.success) {
            setFeaturedProperties(fallbackRes.data.data.slice(0, 3));
          }
        }
      } catch (err) {
        console.error('Failed to fetch featured properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Photo with warm editorial overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
            alt="Luxury Architecture"
            className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-subtle-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/85 via-charcoal-900/70 to-charcoal-900/40 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-warmWhite via-transparent to-transparent opacity-90 h-32 bottom-0 top-auto" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 pt-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-700/80 backdrop-blur-md border border-forest-400/40 text-warmWhite text-xs uppercase tracking-widest font-semibold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-sand-300" />
            <span>Refined Real Estate Destination</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
            Find a Place You'll <br className="hidden sm:block" />
            <span className="italic font-normal text-sand-200">Love to Call Home.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-sand-100 font-light leading-relaxed drop-shadow">
            HOMORA curates India’s most distinguished residential sanctuaries, architect-designed
            villas, and sky penthouses across premier urban corridors.
          </p>

          {/* Search Box on Hero */}
          <div className="pt-4 max-w-4xl mx-auto text-left">
            <SearchBar />
          </div>

          {/* Micro Proof Stats */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sand-200 text-left">
            <div className="border-l border-white/20 pl-3">
              <span className="block font-serif text-2xl font-bold text-white">₹450+ Cr</span>
              <span className="text-xs text-sand-300 font-medium">Curated Assets</span>
            </div>
            <div className="border-l border-white/20 pl-3">
              <span className="block font-serif text-2xl font-bold text-white">100%</span>
              <span className="text-xs text-sand-300 font-medium">Title & RERA Vetted</span>
            </div>
            <div className="border-l border-white/20 pl-3">
              <span className="block font-serif text-2xl font-bold text-white">6 Metros</span>
              <span className="text-xs text-sand-300 font-medium">Delhi NCR & UP</span>
            </div>
            <div className="border-l border-white/20 pl-3">
              <span className="block font-serif text-2xl font-bold text-white">0%</span>
              <span className="text-xs text-sand-300 font-medium">Hidden Brokerage</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-forest-700 text-xs font-bold uppercase tracking-widest mb-2">
              <Compass className="w-4 h-4" />
              <span>Curated Residences</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              Featured Properties
            </h2>
            <p className="text-charcoal-600 text-sm mt-1 max-w-lg">
              Hand-picked properties characterized by exceptional architecture, bespoke finishes,
              and iconic addresses.
            </p>
          </div>

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-forest-800 transition-colors group"
          >
            <span>Explore All Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner text="Fetching architectural highlights..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* POPULAR LOCATIONS SECTION */}
      <section className="bg-sand-100/60 py-20 border-y border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">
              Geographic Exclusivity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              Popular Locations
            </h2>
            <p className="text-charcoal-600 text-sm">
              Discover prime residential sectors across Uttar Pradesh and the National Capital Region.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_LOCATIONS.map((loc) => (
              <Link
                key={loc.city}
                to={loc.link}
                className="group relative h-64 rounded-3xl overflow-hidden border border-sand-200 shadow-soft hover:shadow-card transition-all duration-300 block"
              >
                <img
                  src={loc.image}
                  alt={loc.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-sand-200 transition-colors">
                      {loc.city}
                    </h3>
                    <p className="text-xs text-sand-300 font-light mt-0.5">{loc.subtext}</p>
                    <span className="inline-block mt-2 text-[11px] font-semibold text-forest-300 bg-forest-950/60 px-2.5 py-1 rounded-full border border-forest-500/30">
                      {loc.count}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-forest-700 group-hover:scale-105 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE HOMORA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">
            The HOMORA Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Why Discerning Buyers Choose HOMORA
          </h2>
          <p className="text-charcoal-600 text-sm">
            We operate with the confidentiality, elegance, and rigor of a private family office.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft space-y-4 hover:border-forest-300 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Verified Legal Title & RERA Compliance
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Every property listed undergoes rigorous title deed examination, municipal registry
              checks, and RERA authenticity verification before publication.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft space-y-4 hover:border-forest-300 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Architectural Distinction Only
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              We reject 80% of applicant homes. We curate only residences exhibiting exemplary
              spatial planning, natural daylighting, and bespoke finishes.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft space-y-4 hover:border-forest-300 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
              <KeyRound className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Private Concierge & Direct Seller Access
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Engage directly with vetted property owners and certified developers. Enjoy private
              chaperoned viewings with zero unsolicited broker spam.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-forest-900 text-warmWhite p-8 sm:p-14 lg:p-16 shadow-elevated">
          {/* Subtle architectural backdrop */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
              alt="Luxury Estate"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-forest-800 text-forest-200 text-xs font-semibold uppercase tracking-wider border border-forest-700">
              Property Owners & Developers
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Present Your Estate to High-Net-Worth Buyers.
            </h2>

            <p className="text-sand-200 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              Join Lucknow and Delhi NCR's premier community of property sellers. Gain direct
              visibility among qualified buyers seeking architectural excellence and immediate
              acquisition.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/properties/add"
                className="px-7 py-3.5 rounded-full bg-warmWhite hover:bg-sand-100 text-forest-900 font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Building className="w-4 h-4 text-forest-800" />
                <span>List Your Property</span>
              </Link>

              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-full border border-sand-300/40 text-warmWhite hover:bg-white/10 font-medium text-sm transition-all"
              >
                Schedule Valuation
              </Link>
            </div>

            {/* Verification checklist pills */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-sand-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-400" />
                <span>Zero Broker Interference</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-400" />
                <span>Confidential Seller Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-400" />
                <span>Dedicated Relationship Advisor</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
