import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const FAQS = [
  {
    q: 'How does HOMORA verify property titles and legal status?',
    a: 'Every property listed on our platform undergoes rigorous title verification by our in-house legal advisory desk. We cross-verify municipal records, RERA registration numbers, and encumbrance certificates prior to public listing.',
  },
  {
    q: 'Can individual property owners list directly on HOMORA?',
    a: 'Yes. Verified property owners can create an account, upload their property photographs, specifications, and pricing via the "List Property" dashboard. Our review team verifies the listing within 24 hours.',
  },
  {
    q: 'Are there hidden brokerage charges for buyers?',
    a: 'HOMORA does not charge buyer brokerage on verified developer direct inventory. Private seller listings carry fully transparent, capped transaction advisory fees with zero surprise markups.',
  },
  {
    q: 'How do I arrange a private physical walkthrough?',
    a: 'You can submit a viewing inquiry directly from any property detail page using the "Contact Seller" modal, or contact our Concierge Desk through this form with the Property ID and your preferred date.',
  },
];

const Contact = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      addToast('Please complete all fields before sending.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/contact', formData);
      if (res.data.success) {
        setSubmitted(true);
        addToast('Your inquiry has been successfully sent to HOMORA Advisory Desk.', 'success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (err) {
      addToast('Unable to send message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-forest-700 text-xs font-bold uppercase tracking-widest block">
          Private Client Advisory Desk
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-900 tracking-tight">
          Connect With HOMORA
        </h1>
        <p className="text-sm text-charcoal-600 leading-relaxed max-w-xl">
          Whether you are acquiring an iconic residence, listing a generational estate, or seeking
          confidential portfolio advisory, our team is at your disposal.
        </p>
      </div>

      {/* Main Grid: Form + Office Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left 2 Cols: Interactive Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-sand-200 shadow-soft space-y-6">
          <div className="border-b border-sand-100 pb-4">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">
              Send an Advisory Inquiry
            </h2>
            <p className="text-xs text-charcoal-500 mt-1">
              All correspondence is treated with strict fiduciary confidentiality.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-forest-50 border border-forest-200 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-forest-700 text-warmWhite flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-950">
                Inquiry Successfully Logged
              </h3>
              <p className="text-xs text-forest-800 max-w-md mx-auto leading-relaxed">
                Thank you. A dedicated HOMORA Property Advisor will review your inquiry and initiate
                contact via phone or email within 24 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-5 py-2 rounded-full bg-forest-700 text-white text-xs font-semibold hover:bg-forest-800 transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vikram@rathore-estates.com"
                    className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Inquiry regarding Lucknow Penthouse portfolio / Private Viewing"
                  className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  Message Details *
                </label>
                <textarea
                  rows={5}
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your property acquisition requirements, budget boundaries, target locations, or listing queries..."
                  className="w-full px-4 py-3 bg-sand-50/70 border border-sand-200 rounded-2xl text-sm focus:outline-none focus:border-forest-600 focus:bg-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-forest-700 hover:bg-forest-800 text-warmWhite font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Transmitting message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Inquiry to Advisory Desk</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right 1 Col: Office Info & Hours */}
        <div className="space-y-6">
          {/* Lucknow Headquarters Card */}
          <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-soft space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700 block">
              Headquarters & Client Salon
            </span>
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Lucknow Office
            </h3>
            <div className="space-y-3 text-xs text-charcoal-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-forest-700 mt-0.5 flex-shrink-0" />
                <span>Level 7, Summit One, Vipin Khand, Gomti Nagar, Lucknow, UP 226010</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-forest-700 flex-shrink-0" />
                <span>+91 (0522) 400-HOMORA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-forest-700 flex-shrink-0" />
                <span>lucknow@homora.com</span>
              </div>
            </div>
          </div>

          {/* NCR Office Card */}
          <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-soft space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700 block">
              NCR Metropolitan Office
            </span>
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Gurgaon & Noida Liaison
            </h3>
            <div className="space-y-3 text-xs text-charcoal-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-forest-700 mt-0.5 flex-shrink-0" />
                <span>Horizon Center, Golf Course Road, DLF Phase 5, Gurgaon, HR 122002</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-forest-700 flex-shrink-0" />
                <span>+91 (0124) 480-HOMORA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-forest-700 flex-shrink-0" />
                <span>ncr@homora.com</span>
              </div>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-sand-100 rounded-3xl p-6 border border-sand-200 space-y-2 text-xs text-charcoal-700">
            <div className="flex items-center gap-2 font-bold text-charcoal-900">
              <Clock className="w-4 h-4 text-forest-700" />
              <span>Desk Availability</span>
            </div>
            <p>Monday – Saturday: 9:30 AM – 7:30 PM IST</p>
            <p className="text-charcoal-500">Private Sunday walkthroughs available by prior appointment.</p>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="pt-8 border-t border-sand-200 space-y-6">
        <div className="space-y-1">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest block">
            Common Questions
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
            Frequently Asked Inquiries
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-soft transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-serif font-bold text-charcoal-900 hover:text-forest-700"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-forest-700 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-charcoal-600 leading-relaxed border-t border-sand-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Contact;
