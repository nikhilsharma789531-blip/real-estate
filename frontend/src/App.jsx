import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import ExploreProperties from './pages/ExploreProperties';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import About from './pages/About';
import Contact from './pages/Contact';

const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
    <div className="w-16 h-16 rounded-2xl bg-forest-50 text-forest-700 font-serif text-3xl font-bold flex items-center justify-center">
      404
    </div>
    <h1 className="font-serif text-3xl font-bold text-charcoal-900">Page Not Found</h1>
    <p className="text-sm text-charcoal-600 max-w-sm">
      The architectural residence or page you were seeking does not exist or has been relocated.
    </p>
    <Link
      to="/"
      className="px-6 py-2.5 rounded-full bg-forest-700 text-white text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
    >
      Return to Home
    </Link>
  </div>
);

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-charcoal-800">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/properties" element={<ExploreProperties />} />
                  <Route path="/explore" element={<Navigate to="/properties" replace />} />
                  <Route path="/properties/:id" element={<PropertyDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/properties/add"
                    element={
                      <ProtectedRoute>
                        <AddProperty />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/properties/edit/:id"
                    element={
                      <ProtectedRoute>
                        <EditProperty />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
