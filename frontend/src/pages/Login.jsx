import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination after login
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      navigate(redirectPath, { replace: true });
    }
  };

  // Demo auto-fill convenience
  const fillDemoCredentials = (userType = 'seller') => {
    if (userType === 'seller') {
      setEmail('aarav@homora.com');
      setPassword('Password123');
    } else {
      setEmail('demo@homora.com');
      setPassword('Password123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-sand-200 shadow-card">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-forest-700 text-warmWhite font-serif text-2xl font-bold flex items-center justify-center mx-auto shadow-md">
            H
          </div>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900">
            Welcome to HOMORA
          </h2>
          <p className="text-xs text-charcoal-500">
            Sign in to access your private collection and listed properties
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 bg-sand-50/60 border border-sand-200 rounded-2xl text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-forest-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-sand-50/60 border border-sand-200 rounded-2xl text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-forest-600 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-warmWhite font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
          >
            {submitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Helper Pill for Evaluator */}
        <div className="pt-2 border-t border-sand-100">
          <div className="p-3 bg-sand-50 rounded-2xl border border-sand-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-forest-800 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-forest-600" />
              <span>Evaluator Demo Credentials</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials('seller')}
                className="flex-1 py-1.5 px-2 bg-white hover:bg-forest-50 border border-sand-200 rounded-xl text-[11px] font-medium text-charcoal-700 hover:text-forest-800 transition-colors"
              >
                Fill Verified Seller
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('buyer')}
                className="flex-1 py-1.5 px-2 bg-white hover:bg-forest-50 border border-sand-200 rounded-xl text-[11px] font-medium text-charcoal-700 hover:text-forest-800 transition-colors"
              >
                Fill Demo Buyer
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center pt-2">
          <p className="text-xs text-charcoal-600">
            Do not have an account yet?{' '}
            <Link
              to="/register"
              className="font-semibold text-forest-700 hover:text-forest-800 underline underline-offset-2"
            >
              Sign Up with HOMORA
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
