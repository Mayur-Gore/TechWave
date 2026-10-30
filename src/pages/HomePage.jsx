import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  TrendingUp, 
  Users, 
  Factory, 
  Wrench, 
  Building2, 
  HardHat, 
  Cpu, 
  Boxes, 
  MessageSquare, 
  PhoneCall, 
  Zap, 
  Layers, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export default function HomePage() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const iconMap = {
    ShieldCheck: ShieldCheck,
    Truck: Truck,
    TrendingUp: TrendingUp,
    Users: Users,
    Factory: Factory,
    Wrench: Wrench,
    Building2: Building2,
    HardHat: HardHat,
    Cpu: Cpu,
    Boxes: Boxes,
  };

  return (
    <div className="w-full bg-offwhite text-navy overflow-hidden">
      {/* ========================================================
          A. HERO SECTION
         ======================================================== */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-navy-900 via-corporate to-navy text-white pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
        {/* Animated background tech patterns & floating shapes */}
        <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-steel/20 blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-ice/10 blur-2xl pointer-events-none" />

        {/* Floating geometric badges */}
        <div className="hidden xl:block absolute top-1/4 right-[48%] animate-float-slow pointer-events-none opacity-40">
          <div className="w-12 h-12 rounded-xl border border-ice/30 rotate-12 bg-white/5 backdrop-blur-sm" />
        </div>
        <div className="hidden xl:block absolute bottom-1/4 left-10 animate-float-reverse pointer-events-none opacity-30">
          <div className="w-16 h-16 rounded-full border border-steel/40 bg-corporate/30 backdrop-blur-sm" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-steel/20 border border-steel/40 text-ice text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Industrial Electrical Supplies & Solutions</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
                Powering Your Industry with{' '}
                <span className="bg-gradient-to-r from-ice via-white to-steel-light bg-clip-text text-transparent">
                  Reliable Electrical Solutions.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-ice/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Techwave Enterprises supplies quality electrical equipment, industrial components, distribution panels, heavy-duty wires & cables, lighting products, and electrical accessories to power your operations safely and continuously.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold text-white bg-steel hover:bg-steel-hover transition-all duration-300 shadow-lg hover:shadow-glow active:scale-95 border border-ice/30 group"
                >
                  <span>Explore Our Products</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-ice hover:text-white bg-white/10 hover:bg-white/15 transition-all duration-300 border border-white/20 backdrop-blur-md active:scale-95"
                >
                  <PhoneCall className="w-5 h-5 text-steel" />
                  <span>Contact Our Team</span>
                </Link>
              </div>

              {/* Key Highlights Micro-Bar */}
              <div className="pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-ice/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Authentic Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Timely Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Competitive Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Trusted Sourcing</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Composition with Banner & Real Equipment Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow backdrop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-steel/30 to-amber-500/20 rounded-2xl filter blur-2xl transform scale-95" />

                {/* Banner & Product Showcase Frame */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-ice/30 shadow-2xl bg-navy-900 group">
                  <img
                    src="/images/techwave-banner.png"
                    alt="Techwave Enterprises Industrial Electrical Equipment, Distribution Panels, Cable Reels, LED Lights, Circuit Breakers"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent pointer-events-none" />

                  {/* On-card caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-amber-400 font-bold">Industrial Sourcing</p>
                      <p className="text-sm font-semibold text-white">Full Range of Certified Components</p>
                    </div>
                    <Link
                      to="/products"
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-steel/80 hover:bg-steel text-white flex items-center gap-1 backdrop-blur-sm transition-colors"
                    >
                      <span>View All</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Floating Contact Stat Card */}
                <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 p-4 rounded-xl bg-navy/95 border border-ice/30 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3 animate-float-slow">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-ice/70 uppercase font-bold tracking-wider">Fast Response</p>
                    <p className="text-xs font-bold text-white"> +918356058098</p>
                    <p className="text-[11px] text-emerald-400 font-medium">Direct Sourcing Assistance</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          B. COMPANY INTRODUCTION
         ======================================================== */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual element */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-offwhite-200 to-ice/30 p-8 border border-ice/40 shadow-card">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-navy text-white flex items-center justify-center shadow-md">
                    <Zap className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-navy">
                    Engineered for Industrial Resilience
                  </h3>
                  <p className="text-sm text-navy/70 leading-relaxed">
                    Industrial environments demand electrical equipment that performs under heavy electrical loads, fluctuating currents, and continuous operational cycles.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-navy/80 pt-2">
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-steel/15 text-steel flex items-center justify-center shrink-0">✓</div>
                      <span>Industrial panels & distribution boards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-steel/15 text-steel flex items-center justify-center shrink-0">✓</div>
                      <span>High-conductivity copper wires & power cables</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-steel/15 text-steel flex items-center justify-center shrink-0">✓</div>
                      <span>Precision circuit breakers & motor starters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-steel/15 text-steel flex items-center justify-center shrink-0">✓</div>
                      <span>Electronic components & industrial automation parts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Content element */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-ice/40 text-corporate text-xs font-bold uppercase tracking-wider">
                <span>About Techwave Enterprises</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy tracking-tight">
                Your Trusted Partner for Industrial Electrical Solutions.
              </h2>
              <div className="space-y-4 text-base text-navy/80 leading-relaxed">
                <p>
                  Techwave Enterprises helps businesses source high-quality electrical equipment, components, and hardware for industrial plants, commercial buildings, infrastructure developments, and contracting projects.
                </p>
                <p>
                  Whether you are building custom distribution switchboards, rewiring high-demand manufacturing equipment, installing energy-efficient industrial LED lighting, or procuring electronic replacement components, our focus is delivering dependable products backed by direct, transparent service.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-corporate hover:bg-corporate-hover transition-colors shadow-md"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* ========================================================
          D. WHY CHOOSE TECHWAVE ENTERPRISES?
         ======================================================== */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-ice/40 text-corporate text-xs font-bold uppercase tracking-wider">
              <span>Our Strategic Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-navy tracking-tight">
              Why Choose Techwave Enterprises?
            </h2>
            <p className="text-base text-navy/70">
              We stand apart through focused product reliability, prompt communication, and a long-term dedication to keeping industrial projects running smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMPANY_INFO.whyChooseUs.map((advantage) => {
              const IconComponent = iconMap[advantage.icon] || ShieldCheck;
              return (
                <div
                  key={advantage.id}
                  className="p-8 rounded-2xl bg-offwhite border border-ice/50 hover:border-steel/60 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-corporate/10 border border-corporate/20 text-corporate flex items-center justify-center group-hover:bg-corporate group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-navy group-hover:text-corporate transition-colors">
                      {advantage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
                      {advantage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          E. INDUSTRIES WE SERVE
         ======================================================== */}
      <section className="py-24 bg-offwhite-200/60 relative tech-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-steel/15 text-steel text-xs font-bold uppercase tracking-wider">
              <Factory className="w-3.5 h-3.5" />
              <span>Target Sectors & Clients</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-navy tracking-tight">
              Industries We Serve
            </h2>
            <p className="text-base text-navy/70">
              Our diverse portfolio supports engineering contractors, production facilities, commercial developers, and maintenance professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_INFO.industries.map((industry, index) => {
              const IconComponent = iconMap[industry.icon] || Factory;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white border border-ice/60 shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold font-heading text-navy">
                      {industry.title}
                    </h3>
                    <p className="text-xs text-navy/70 leading-relaxed">
                      {industry.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          F. CALL-TO-ACTION SECTION (NAVY BACKGROUND)
         ======================================================== */}
      <section className="py-20 bg-navy text-white relative overflow-hidden">
        {/* Background gradient decorative shapes */}
        <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-steel/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-corporate/40 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-steel/20 border border-steel/40 text-ice text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Ready to Source Electrical Materials?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Looking for Reliable Electrical Products?
          </h2>

          <p className="text-base sm:text-lg text-ice/90 max-w-2xl mx-auto leading-relaxed">
            Connect with Techwave Enterprises for product inquiries, availability, and business requirements. Our team is ready to assist your procurement needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-steel hover:bg-steel-hover transition-all duration-300 shadow-lg hover:shadow-glow active:scale-95 border border-ice/30"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Contact Us</span>
            </Link>

            <a
              href={COMPANY_INFO.socials.whatsappPrimary}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-emerald-300 hover:text-white bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 transition-all duration-300 shadow-md active:scale-95"
            >
              <MessageSquare className="w-5 h-5 fill-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-ice/70">
            <span>Direct contact with :</span>
            <span>+918356058098</span>
          </div>
        </div>
      </section>
    </div>
  );
}
