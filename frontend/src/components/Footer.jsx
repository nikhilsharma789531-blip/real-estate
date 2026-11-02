import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Footer = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Thank you for subscribing to HOMORA Private Listings Gazette.', 'success');
    setEmailInput('');
  };

  return (
    <footer className="bg-[#151D18] text-sand-100 pt-16 pb-12 border-t border-forest-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-forest-600 flex items-center justify-center text-warmWhite">
                <span className="font-serif text-xl font-bold">H</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-warmWhite">
                HOMORA
              </span>
            </Link>
            <p className="text-sand-300 text-sm leading-relaxed max-w-sm">
              A curated real estate destination for architectural masterpieces, luxury penthouses,
              and private estates across India's premier urban landscapes.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sand-300 block mb-2">
                Subscribe to Private Releases
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-warmWhite placeholder:text-sand-400 focus:outline-none focus:border-forest-400 flex-1"
                />
                <button
                  type="submit"
                  className="bg-forest-600 hover:bg-forest-500 text-warmWhite px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sand-300">
              Explore Homes
            </h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li>
                <Link to="/properties?propertyType=Apartment" className="hover:text-warmWhite transition-colors">
                  Sky Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?propertyType=Villa" className="hover:text-warmWhite transition-colors">
                  Private Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?propertyType=Penthouse" className="hover:text-warmWhite transition-colors">
                  Signature Penthouses
                </Link>
              </li>
              <li>
                <Link to="/properties?propertyType=Independent+House" className="hover:text-warmWhite transition-colors">
                  Independent Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?featured=true" className="hover:text-warmWhite transition-colors">
                  Featured Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sand-300">
              Prime Metros
            </h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li>
                <Link to="/properties?location=Lucknow" className="hover:text-warmWhite transition-colors">
                  Lucknow (Gomti Nagar)
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Noida" className="hover:text-warmWhite transition-colors">
                  Noida & Expressway
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Gurgaon" className="hover:text-warmWhite transition-colors">
                  Gurgaon (Golf Course Rd)
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Delhi" className="hover:text-warmWhite transition-colors">
                  South Delhi (Vasant Vihar)
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Greater+Noida" className="hover:text-warmWhite transition-colors">
                  Greater Noida West
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Kanpur" className="hover:text-warmWhite transition-colors">
                  Kanpur (Civil Lines)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sand-300">
              Advisory Desk
            </h4>
            <div className="space-y-2.5 text-sm text-sand-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-forest-400 mt-1 flex-shrink-0" />
                <span className="leading-snug">
                  Vipin Khand, Gomti Nagar, Lucknow, UP 226010
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-forest-400 flex-shrink-0" />
                <span>+91 (0522) 400-HOMORA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-forest-400 flex-shrink-0" />
                <span>concierge@homora.com</span>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-forest-300">
                <ShieldCheck className="w-4 h-4 text-forest-400" />
                <span>RERA & Title Verified Listings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-sand-400 gap-4">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} HOMORA Real Estate Inc.</span>
            <span>&bull;</span>
            <span className="text-sand-300 font-medium">College Minor Project Submission</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-warmWhite transition-colors">
              About Project
            </Link>
            <Link to="/contact" className="hover:text-warmWhite transition-colors">
              Contact Advisory
            </Link>
            <Link to="/properties" className="hover:text-warmWhite transition-colors">
              All Properties
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
