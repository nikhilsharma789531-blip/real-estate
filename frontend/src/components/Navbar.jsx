import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Heart,
  User,
  PlusCircle,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Building2,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Subtle header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout(true);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors tracking-wide py-1 border-b-2 ${
      isActive
        ? 'text-forest-700 border-forest-700 font-semibold'
        : 'text-charcoal-700 border-transparent hover:text-forest-700 hover:border-forest-200'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-warmWhite/90 backdrop-blur-md shadow-sm border-b border-sand-200'
          : 'bg-warmWhite border-b border-sand-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center text-warmWhite shadow-md group-hover:bg-forest-800 transition-colors">
              <span className="font-serif text-2xl font-bold tracking-tighter">H</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider text-charcoal-900 group-hover:text-forest-700 transition-colors">
                HOMORA
              </span>
              <span className="text-[10px] uppercase tracking-widest text-forest-600 font-semibold -mt-1">
                Luxury Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/properties" className={navLinkClass}>
              Explore Properties
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Wishlist Link */}
            <Link
              to="/dashboard?tab=wishlist"
              className="relative p-2 text-charcoal-700 hover:text-forest-700 hover:bg-forest-50 rounded-full transition-all"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-forest-700 text-warmWhite text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* List Property Button */}
            <Link
              to="/properties/add"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-forest-600/30 text-forest-700 hover:bg-forest-50 text-sm font-medium transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Property</span>
            </Link>

            {/* Auth section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 pr-2.5 rounded-full bg-sand-100 hover:bg-sand-200 border border-sand-200 transition-all text-charcoal-800"
                >
                  <div className="w-7 h-7 rounded-full bg-forest-700 text-warmWhite font-semibold text-xs flex items-center justify-center">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-charcoal-600" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-sand-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-sand-100">
                      <p className="text-xs text-charcoal-400">Signed in as</p>
                      <p className="text-sm font-semibold text-charcoal-800 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-forest-50 hover:text-forest-700 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>

                    <Link
                      to="/dashboard?tab=my-properties"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-forest-50 hover:text-forest-700 transition-colors"
                    >
                      <Building2 className="w-4 h-4" />
                      My Listings
                    </Link>

                    <Link
                      to="/dashboard?tab=wishlist"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-forest-50 hover:text-forest-700 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      Saved Properties ({wishlistCount})
                    </Link>

                    <div className="border-t border-sand-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-charcoal-700 hover:text-forest-700 px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-full bg-forest-700 hover:bg-forest-800 text-warmWhite text-sm font-medium shadow-sm transition-all hover:shadow"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/dashboard?tab=wishlist"
              className="relative p-2 text-charcoal-700 hover:text-forest-700"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-forest-700 text-warmWhite text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal-800 hover:text-forest-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sand-200 bg-warmWhite px-5 pt-3 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 pt-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-base font-medium py-2 px-3 rounded-lg ${
                  isActive ? 'bg-forest-100 text-forest-800 font-semibold' : 'text-charcoal-700'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/properties"
              className={({ isActive }) =>
                `text-base font-medium py-2 px-3 rounded-lg ${
                  isActive ? 'bg-forest-100 text-forest-800 font-semibold' : 'text-charcoal-700'
                }`
              }
            >
              Explore Properties
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-base font-medium py-2 px-3 rounded-lg ${
                  isActive ? 'bg-forest-100 text-forest-800 font-semibold' : 'text-charcoal-700'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-base font-medium py-2 px-3 rounded-lg ${
                  isActive ? 'bg-forest-100 text-forest-800 font-semibold' : 'text-charcoal-700'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          <div className="border-t border-sand-200 pt-4 space-y-3">
            <Link
              to="/properties/add"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-forest-600 text-forest-700 font-medium text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              List New Property
            </Link>

            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-sand-200 text-charcoal-800 font-medium text-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard ({user?.name})
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-rose-600 font-medium text-sm hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="flex-1 text-center py-2.5 rounded-full border border-sand-300 text-charcoal-800 font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center py-2.5 rounded-full bg-forest-700 text-warmWhite font-medium text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
