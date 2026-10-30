import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import TechwaveLogo from '../common/TechwaveLogo';
import { COMPANY_INFO } from '../../data/companyData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services & Products', path: '/products' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const primaryContact = COMPANY_INFO.contacts[0];

  return (
    <>
      {/* Top micro-announcement bar */}
      <header className="w-full">
        <div className="bg-navy-900 border-b border-white/10 text-xs py-1.5 px-4 sm:px-8 text-ice flex justify-between items-center transition-all">
          <div className="hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-steel" />
              Industrial Electrical Equipment & Engineered Solutions
            </span>
            <span className="text-white/30">•</span>
            <span className="text-ice/80">Authentic Industrial Supplies</span>
          </div>
          <div className="flex items-center gap-4 ml-auto text-xs">
            <a
              href={`tel:+91${primaryContact.phone}`}
              className="flex items-center gap-1.5 text-ice hover:text-white transition-colors"
              title={`Call ${primaryContact.name}`}
            >
              <Phone className="w-3.5 h-3.5 text-steel" />
              <span className="hidden md:inline font-medium">{primaryContact.name}:</span>
              <span className="font-semibold tracking-wider">{primaryContact.displayPhone}</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href={`https://wa.me/${primaryContact.whatsapp}?text=Hello%20Techwave%20Enterprises,%20I%20have%20an%20inquiry%20regarding%20electrical%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            isScrolled
              ? 'glass-nav-scrolled py-3 mt-0'
              : 'glass-nav-transparent py-5 mt-7'
          }`}
          aria-label="Main Navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group transition-transform duration-200 active:scale-95"
              aria-label="Techwave Enterprises Home"
            >
              <TechwaveLogo variant="light" size="default" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-ice/90 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-steel to-amber-500 rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Right CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-corporate to-steel hover:from-corporate-light hover:to-steel-light shadow-md hover:shadow-glow transition-all duration-300 active:scale-95 border border-ice/20"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/contact"
                className="sm:hidden px-3 py-1.5 text-xs font-semibold rounded-md bg-steel text-white hover:bg-steel-hover"
              >
                Inquire
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-ice hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-steel transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 animate-in fade-in" />
                ) : (
                  <Menu className="w-6 h-6 animate-in fade-in" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              mobileMenuOpen ? 'max-h-[480px] opacity-100 border-b border-ice/20 bg-navy/95 backdrop-blur-xl' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >
            <div className="px-4 pt-3 pb-6 space-y-2 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-corporate text-white font-semibold border-l-4 border-steel'
                        : 'text-ice hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </NavLink>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-steel hover:bg-steel-hover text-white font-semibold shadow-md"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <a
                    href={`tel:+91${primaryContact.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-white/5 text-ice hover:text-white"
                  >
                    <Phone className="w-3.5 h-3.5 text-steel" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href={`https://wa.me/${primaryContact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
