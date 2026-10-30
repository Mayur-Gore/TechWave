import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, Instagram, ArrowUpRight, ShieldCheck, ChevronRight } from 'lucide-react';
import TechwaveLogo from '../common/TechwaveLogo';
import { COMPANY_INFO } from '../../data/companyData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-offwhite border-t border-ice/15 relative overflow-hidden">
      {/* Subtle background tech pattern */}
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />

      {/* Trust Banner Bar across top of footer */}
      <div className="border-b border-white/10 bg-corporate/40 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
          {COMPANY_INFO.bannerPillars.map((pillar, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 p-2">
              <div className="w-8 h-8 rounded-lg bg-steel/20 border border-steel/40 flex items-center justify-center shrink-0 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide">{pillar.title}</h4>
                <p className="text-[11px] text-ice/70 line-clamp-1">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1: Brand & About (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block" aria-label="Techwave Enterprises Home">
              <TechwaveLogo variant="light" size="large" />
            </Link>
            <p className="text-sm text-ice/80 leading-relaxed max-w-sm">
              Your dependable sourcing partner for industrial electrical equipment, high-voltage distribution panels, standard certified cables, LED lighting solutions, and precision electronic components.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-ice/90">
                B2B Sourcing
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-ice/90">
                Industrial Supplies
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-ice/90">
                Electrical Solutions
              </span>
            </div> 
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase font-heading border-b border-steel/30 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-ice/80 hover:text-white flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3.5 h-3.5 text-steel group-hover:translate-x-1 transition-transform" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ice/80 hover:text-white flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3.5 h-3.5 text-steel group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-ice/80 hover:text-white flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3.5 h-3.5 text-steel group-hover:translate-x-1 transition-transform" />
                  Services & Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ice/80 hover:text-white flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3.5 h-3.5 text-steel group-hover:translate-x-1 transition-transform" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Highlights */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase font-heading border-b border-steel/30 pb-2 inline-block">
              Products
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/products" className="text-ice/80 hover:text-white transition-colors block truncate">
                  Electrical Panels & DBs
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-ice/80 hover:text-white transition-colors block truncate">
                  Wires & Heavy Power Cables
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-ice/80 hover:text-white transition-colors block truncate">
                  Circuit Breakers & Protection
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-ice/80 hover:text-white transition-colors block truncate">
                  Industrial LED Floodlights
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-ice/80 hover:text-white transition-colors block truncate">
                  Electronic & CPU Components
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-ice/80 hover:text-white transition-colors block truncate">
                  Cable Trays & Installation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contacts */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase font-heading border-b border-steel/30 pb-2 inline-block">
              Get in Touch
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <p className="text-[11px] text-ice/60 uppercase font-semibold">Primary Contact</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <a
                    href={`tel:+91${COMPANY_INFO.contacts[0].phone}`}
                    className="text-white hover:text-amber-400 font-medium transition-colors"
                  >
                    {COMPANY_INFO.contacts[0].name}: {COMPANY_INFO.contacts[0].displayPhone}
                  </a>
                </div>
              </div>

             

              <div>
                <p className="text-[11px] text-ice/60 uppercase font-semibold">Official Email</p>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-ice/90 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-steel" />
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div>
                <p className="text-[11px] text-ice/60 uppercase font-semibold">Location / Directions</p>
                <a
                  href={COMPANY_INFO.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ice/90 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-steel" />
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={COMPANY_INFO.socials.whatsappPrimary}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/50 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/30 flex items-center justify-center transition-colors"
                title="Chat on WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-pink-950/40 hover:bg-pink-900/60 text-pink-300 border border-pink-500/30 flex items-center justify-center transition-colors"
                title="Instagram Profile"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="w-8 h-8 rounded-lg bg-corporate hover:bg-corporate-light text-ice border border-steel/30 flex items-center justify-center transition-colors"
                title="Email Techwave"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ice/60">
          <p>© {currentYear} Techwave Enterprises. All rights reserved. Powering Your Industry.</p>
          <p className="text-center sm:text-right text-[11px] text-ice/50">
            Industrial & Commercial Electrical Equipment Marketing Showcase. Direct B2B inquiries only.
          </p>
        </div>
      </div>
    </footer>
  );
}
