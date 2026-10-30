import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Users, 
  HeartHandshake, 
  Search, 
  PhoneCall, 
  ArrowRight, 
  Layers, 
  Headphones, 
  Award,
  Zap,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export default function AboutPage() {
  const chooseUsPoints = [
    {
      title: "Comprehensive Product Variety",
      desc: "From heavy-gauge power distribution cables and switchgear to miniature electronics and lighting accessories, we aggregate diverse electrical categories under one dependable roof.",
      icon: Layers,
    },
    {
      title: "Responsive Communication",
      desc: "Speak directly with knowledgeable sourcing personnel who understand electrical requirements, availability constraints, and delivery deadlines.",
      icon: Headphones,
    },
    {
      title: "Dependable Service",
      desc: "Every order is treated with strict attention to accuracy, packing safety, and prompt logistics coordination to prevent project delays.",
      icon: ShieldCheck,
    },
    {
      title: "Customer-Focused Sourcing",
      desc: "We prioritize your project specifications and budget constraints, helping you identify compatible and durable electrical components.",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="w-full bg-offwhite text-navy">
      {/* ========================================================
          HERO BANNER
         ======================================================== */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-navy-900 via-corporate to-navy text-white overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-steel/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-steel/20 border border-steel/40 text-ice text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>About Techwave Enterprises</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Dedicated to Industrial Electrical Excellence
          </h1>

          <p className="mt-4 text-base sm:text-lg text-ice/90 leading-relaxed">
            Techwave Enterprises specializes in supplying quality electrical equipment, industrial components, lighting solutions, wires, cables, electrical hardware, and electronic parts for demanding business applications.
          </p>
        </div>
      </section>

      {/* ========================================================
          COMPANY INTRODUCTION
         ======================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-ice/40 text-corporate text-xs font-bold uppercase tracking-wider">
                <span>Company Overview</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy tracking-tight">
                Supplying Critical Electrical & Electronic Sourcing
              </h2>
              <div className="space-y-4 text-navy/80 leading-relaxed text-sm sm:text-base">
                <p>
                  At Techwave Enterprises, we understand that electrical components form the backbone of modern industrial plants, construction infrastructure, commercial properties, and automated equipment. A failure in an electrical panel, an unrated cable, or an unreliable breaker can cause costly downtime and safety risks.
                </p>
                <p>
                  That is why our product portfolio focuses exclusively on dependable, industrial-grade electrical equipment, certified wires and cables, modern LED lighting, precision protection devices, and core electronic parts.
                </p>
                <p>
                  We collaborate closely with electrical contractors, facility engineers, plant maintenance managers, and wholesalers to ensure that every inquiry is met with accurate product matching, clear availability timelines, and fair, transparent pricing.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-navy/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-steel" />
                  <span>Industrial Equipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-steel" />
                  <span>Wires & Power Cables</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-steel" />
                  <span>Distribution Switchboards</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-steel" />
                  <span>Electronic Components</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-ice/40 bg-navy">
                <img
                  src="/images/techwave-banner.png"
                  alt="Techwave Enterprises Product Range Overview"
                  className="w-full h-auto object-cover"
                />
                <div className="p-6 bg-navy-900 text-white space-y-2">
                  <p className="text-xs uppercase font-mono tracking-widest text-amber-400">Our Core Philosophy</p>
                  <p className="text-sm font-semibold text-ice">
                    "Authentic Products • Timely Delivery • Competitive Pricing • Partner For Your Growth"
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          MISSION & VISION
         ======================================================== */}
      <section className="py-20 bg-offwhite-200/60 relative tech-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Our Mission */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-ice/70 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-steel/15 text-steel flex items-center justify-center">
                  <Target className="w-7 h-7" />
                </div>
                <div className="inline-block px-3 py-1 rounded bg-corporate/10 text-corporate text-xs font-bold uppercase tracking-wider">
                  Our Mission
                </div>
                <h3 className="text-2xl font-bold font-heading text-navy">
                  “To provide dependable access to quality electrical and electronic products while building lasting relationships with our customers.”
                </h3>
                <p className="text-sm text-navy/70 leading-relaxed">
                  We strive every day to remove procurement friction for commercial and industrial clients by offering responsive product assistance, dependable inventory sourcing, and uncompromising product integrity.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-ice/70 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-corporate/15 text-corporate flex items-center justify-center">
                  <Eye className="w-7 h-7" />
                </div>
                <div className="inline-block px-3 py-1 rounded bg-steel/15 text-steel text-xs font-bold uppercase tracking-wider">
                  Our Vision
                </div>
                <h3 className="text-2xl font-bold font-heading text-navy">
                  “To become a trusted sourcing partner for industrial, commercial, and electrical product requirements.”
                </h3>
                <p className="text-sm text-navy/70 leading-relaxed">
                  We aim to be the first name engineers, project managers, and contractors turn to when they need reliable electrical supplies, prompt product clarity, and trustworthy business cooperation.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          OUR CORE VALUES
         ======================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-ice/40 text-corporate text-xs font-bold uppercase tracking-wider">
              <span>What Guides Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy tracking-tight">
              Our Core Values
            </h2>
            <p className="text-base text-navy/70">
              The fundamental principles behind every supply contract, customer interaction, and product recommendation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {COMPANY_INFO.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-offwhite border border-ice/60 hover:border-steel/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="w-8 h-8 rounded-full bg-steel text-white text-xs font-bold font-mono flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold font-heading text-navy">
                    {val.title}
                  </h3>
                  <p className="text-xs text-navy/70 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          WHAT WE OFFER
         ======================================================== */}
      <section className="py-20 bg-offwhite relative tech-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-steel/15 text-steel text-xs font-bold uppercase tracking-wider">
              <span>Our Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy">
              What We Offer
            </h2>
            <p className="text-sm sm:text-base text-navy/70">
              Techwave Enterprises provides an end-to-end product range and dedicated customer assistance for diverse business scales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-ice shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-corporate/10 text-corporate flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-navy">Extensive Product Range</h3>
              <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
                Access industrial electrical equipment, custom and standard panels, wires and cables, energy-saving LED lighting, installation hardware, circuit breakers, and electronic components.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-ice shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-corporate/10 text-corporate flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-navy">Direct Customer Support</h3>
              <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
                Connect directly with Pramod Yamgar and Ganesh Jamdade for quick answers on lead times, batch quantities, technical suitability, and delivery schedules.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-ice shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-corporate/10 text-corporate flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-navy">Identification Assistance</h3>
              <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
                Need help matching specifications or replacing hard-to-find components? We assist buyers in identifying suitable parts based on operating environment and power parameters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          WHY BUSINESSES CHOOSE US (GRID LAYOUT)
         ======================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-ice/40 text-corporate text-xs font-bold uppercase tracking-wider">
              <span>Client Advantages</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy">
              Why Businesses Choose Us
            </h2>
            <p className="text-base text-navy/70">
              A structured approach ensuring reliable electrical procurement for every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chooseUsPoints.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-offwhite border border-ice/60 hover:border-steel/60 hover:shadow-card transition-all duration-200 flex gap-5 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-corporate text-white flex items-center justify-center shrink-0 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-heading text-navy">{pt.title}</h3>
                    <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          BOTTOM CTA
         ======================================================== */}
      <section className="py-20 bg-navy text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Ready to Partner with Techwave Enterprises?
          </h2>
          <p className="text-base sm:text-lg text-ice/90 max-w-2xl mx-auto">
            Explore our extensive products catalog or reach out directly to discuss your electrical sourcing needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/products"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-steel hover:bg-steel-hover transition-colors shadow-lg"
            >
              Explore Products
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-ice hover:text-white bg-white/10 hover:bg-white/15 transition-colors border border-white/20"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
