import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Compass,
  ArrowRight,
  Code2,
  Database,
  Layers,
  Sparkles,
} from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-24 py-12 pb-24">
      {/* Hero Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs uppercase tracking-widest font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-forest-700" />
          <span>The HOMORA Vision</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal-900 tracking-tight leading-tight">
          Elevating the Art of <br />
          <span className="italic font-normal text-forest-700">Modern Property Acquisition.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-charcoal-600 font-light leading-relaxed">
          HOMORA was envisioned as a departure from cluttered, unvetted real estate classifieds.
          We curate India's most distinguished residential sanctuaries, architect-designed villas,
          and signature penthouses across premier urban corridors.
        </p>
      </section>

      {/* Editorial Image with Accent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-elevated border border-sand-200">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=80"
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-sand-300 font-semibold block mb-1">
                Architectural Integrity
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-white max-w-xl">
                "A home is not simply square footage; it is the stage for generational legacy."
              </p>
            </div>
            <span className="text-xs text-sand-200">Lucknow &bull; NCR &bull; Kanpur</span>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">
            Core Principles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            The Three Foundations of HOMORA
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Curation Over Volume
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              We reject mass low-grade listings. Every property published on HOMORA passes strict
              criteria regarding natural lighting, floor-to-ceiling heights, spatial proportions,
              and craftsmanship quality.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Total Title Transparency
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              No hidden caveats or disputed deeds. Listings are verified against official RERA
              registries, municipal sanctions, and ownership titles prior to entering our collection.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Zero Unsolicited Brokerage
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Connect directly with authorized sellers and verified property owners. Experience
              private, scheduled walkthroughs without high-pressure sales calls.
            </p>
          </div>
        </div>
      </section>

      {/* College Minor Project Tech Specification Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sand-100/70 rounded-3xl p-8 sm:p-12 border border-sand-200 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">
              Academic & Technical Context
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900">
              College Minor Project Architecture
            </h2>
            <p className="text-xs text-charcoal-600">
              HOMORA was engineered as a production-grade full-stack web application adhering to
              modern software engineering standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-forest-700 font-bold text-sm">
                <Code2 className="w-4 h-4" />
                <span>Frontend Engine</span>
              </div>
              <p className="text-xs text-charcoal-600">
                React.js with Vite 6, Tailwind CSS, React Router v6, Lucide Icons, and Axios client.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-forest-700 font-bold text-sm">
                <Layers className="w-4 h-4" />
                <span>Backend Core</span>
              </div>
              <p className="text-xs text-charcoal-600">
                Node.js & Express RESTful APIs, JWT Authorization, Bcrypt Password Hashing.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-forest-700 font-bold text-sm">
                <Database className="w-4 h-4" />
                <span>Data Tier</span>
              </div>
              <p className="text-xs text-charcoal-600">
                MongoDB with Mongoose schemas (User, Property, Wishlist, Contact) + Resilient In-Memory fallback.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-forest-700 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Security & Design</span>
              </div>
              <p className="text-xs text-charcoal-600">
                Stateless Bearer JWT tokens, input validation, role checks, and luxury editorial UX.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-700 text-white text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
            >
              <span>Explore The Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
