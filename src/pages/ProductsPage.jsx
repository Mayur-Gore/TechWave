import { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Info, 
  Layers, 
  Check, 
  PhoneCall, 
  FileText 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export default function ProductsPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Inquiry form states
  const [formCategory, setFormCategory] = useState(COMPANY_INFO.categories[0].title);
  const [formQuantity, setFormQuantity] = useState('');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRequirements, setFormRequirements] = useState('');
  const [formStatus, setFormStatus] = useState(null); // 'submitted' | 'info'

  // Pre-select category if hash is present
  useState(() => {
    if (location.hash) {
      const catId = location.hash.replace('#', '');
      const found = COMPANY_INFO.categories.find(c => c.id === catId);
      if (found) {
        setSelectedFilter(found.id);
      }
    }
  });

  // Filter categories based on search query and category pill
  const filteredCategories = useMemo(() => {
    return COMPANY_INFO.categories.filter((cat) => {
      const matchesFilter = selectedFilter === 'all' || cat.id === selectedFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        cat.title.toLowerCase().includes(q) ||
        cat.shortDesc.toLowerCase().includes(q) ||
        cat.subItems.some(sub => sub.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, selectedFilter]);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      alert('Please provide your name and phone number so we can respond to your inquiry.');
      return;
    }
    // Static notice as required: form submissions require configured backend or direct WhatsApp
    setFormStatus('submitted');
  };

  const handleQuickWhatsAppInquiry = (categoryName) => {
    const text = encodeURIComponent(
      `Hello Techwave Enterprises, I would like to inquire about specifications and pricing for: ${categoryName}.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${text}`, '_blank');
  };

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
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Product Showcase & Technical Sourcing</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Industrial Electrical Products & Solutions
          </h1>

          <p className="mt-4 text-base sm:text-lg text-ice/90 leading-relaxed">
            Explore our curated catalog of industrial electrical equipment, panels, power cables, LED illumination, and electronic control parts.
          </p>

          {/* Sourcing Notice Banner */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-corporate/80 border border-ice/20 text-xs text-ice/90">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Product Showcase: Availability, custom ratings, and wholesale pricing are confirmed directly.</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEARCH & FILTERING CONTROLS
         ======================================================== */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-ice/50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-steel" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, cables, panels, breakers..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ice bg-offwhite text-xs sm:text-sm text-navy placeholder:text-navy/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-steel transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-navy/40 hover:text-navy"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Category Tabs scrollable */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-corporate text-white shadow-sm'
                    : 'bg-offwhite text-navy/80 hover:bg-ice/30'
                }`}
              >
                All Categories ({COMPANY_INFO.categories.length})
              </button>
              {COMPANY_INFO.categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedFilter(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors truncate max-w-[180px] ${
                    selectedFilter === c.id
                      ? 'bg-corporate text-white shadow-sm'
                      : 'bg-offwhite text-navy/80 hover:bg-ice/30'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          DETAILED CATEGORY SECTIONS
         ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-ice p-8">
            <AlertCircle className="w-12 h-12 text-steel mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy">No products match your search query</h3>
            <p className="text-xs sm:text-sm text-navy/60 mt-1 mb-4">
              Try searching with different terms or reset your filters to see all available categories.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
              className="px-5 py-2.5 rounded-xl bg-corporate text-white text-xs font-semibold hover:bg-corporate-hover"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {filteredCategories.map((category, idx) => (
              <div
                key={category.id}
                id={category.id}
                className="scroll-mt-36 rounded-2xl bg-white border border-ice/70 shadow-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Category Image Preview Column */}
                  <div className="lg:col-span-5 bg-navy-900 relative min-h-[260px] lg:min-h-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="px-2.5 py-1 rounded bg-steel/80 text-[10px] font-mono uppercase font-bold tracking-wider">
                        Category {idx + 1}
                      </span>
                      <p className="text-xs text-ice/90 mt-2 font-medium">{category.highlights}</p>
                    </div>
                  </div>

                  {/* Category Details Column */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ice/40 pb-3">
                        <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy">
                          {category.title}
                        </h2>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-offwhite border border-ice text-corporate w-fit">
                          B2B / Direct Supply
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
                        {category.shortDesc}
                      </p>

                      {/* Sub-items Grid */}
                      <div className="space-y-2 pt-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-corporate">
                          Key Supply Items & Scope:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {category.subItems.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="flex items-center gap-2 p-2.5 rounded-lg bg-offwhite border border-ice/50 text-xs text-navy font-medium"
                            >
                              <Check className="w-3.5 h-3.5 text-steel shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="pt-4 border-t border-ice/30 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setFormCategory(category.title);
                          const formEl = document.getElementById('inquiry-section');
                          if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-corporate hover:bg-corporate-hover text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Request Product Information</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickWhatsAppInquiry(category.title)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-900/10 hover:bg-emerald-900/20 text-emerald-800 border border-emerald-600/30 text-xs font-semibold transition-colors flex items-center gap-2"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Quick WhatsApp Inquiry</span>
                      </button>

                      <Link
                        to={`/contact?product=${encodeURIComponent(category.title)}`}
                        className="ml-auto text-xs font-semibold text-steel hover:text-navy flex items-center gap-1 transition-colors"
                      >
                        <span>Full Contact Form</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================
          INQUIRY FORM SECTION
         ======================================================== */}
      <section id="inquiry-section" className="py-20 bg-white border-t border-ice">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-ice/40 text-corporate text-xs font-bold uppercase tracking-wider">
              <span>Direct Quotation Assistance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy">
              Request Product Information & Availability
            </h2>
            <p className="text-xs sm:text-sm text-navy/70 max-w-xl mx-auto">
              Specify your required product category, estimated quantities, and technical requirements. Our sourcing team will respond promptly.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-offwhite border border-ice shadow-sm">
            {formStatus === 'submitted' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-navy">Inquiry Prepared!</h3>
                <p className="text-xs sm:text-sm text-navy/70 max-w-md mx-auto">
                  Because this is a static marketing website without an automatic mail server configured, you can submit your inquiry instantly to our team via WhatsApp or Email:
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${encodeURIComponent(
                      `Hello Techwave Enterprises, my name is ${formName} (Phone: ${formPhone}). I would like to inquire about: ${formCategory}. Quantity: ${formQuantity || 'Not specified'}. Requirements: ${formRequirements || 'General inquiry'}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp Now</span>
                  </a>

                  <a
                    href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
                      `Inquiry for ${formCategory} - ${formName}`
                    )}&body=${encodeURIComponent(
                      `Name: ${formName}\nPhone: ${formPhone}\nProduct Category: ${formCategory}\nQuantity: ${formQuantity}\nRequirements: ${formRequirements}`
                    )}`}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-corporate hover:bg-corporate-hover text-white font-semibold text-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via Email Client</span>
                  </a>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setFormStatus(null)}
                    className="text-xs text-navy/60 hover:text-navy underline"
                  >
                    Edit inquiry details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      Product Category of Interest *
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ice bg-white text-xs sm:text-sm text-navy focus:outline-none focus:ring-2 focus:ring-steel"
                      required
                    >
                      {COMPANY_INFO.categories.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity / Estimated Scope */}
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      Estimated Quantity / Scope
                    </label>
                    <input
                      type="text"
                      value={formQuantity}
                      onChange={(e) => setFormQuantity(e.target.value)}
                      placeholder="e.g., 500 meters, 10 units, batch order"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ice bg-white text-xs sm:text-sm text-navy focus:outline-none focus:ring-2 focus:ring-steel"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ice bg-white text-xs sm:text-sm text-navy focus:outline-none focus:ring-2 focus:ring-steel"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ice bg-white text-xs sm:text-sm text-navy focus:outline-none focus:ring-2 focus:ring-steel"
                      required
                    />
                  </div>
                </div>

                {/* Requirements / Notes */}
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">
                    Specific Requirements or Project Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formRequirements}
                    onChange={(e) => setFormRequirements(e.target.value)}
                    placeholder="Provide any technical ratings, voltages, brand preferences, or delivery timeline constraints..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ice bg-white text-xs sm:text-sm text-navy focus:outline-none focus:ring-2 focus:ring-steel"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-steel hover:bg-steel-hover text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Product Inquiry</span>
                  </button>

                  <p className="text-[11px] text-navy/60 text-center sm:text-right">
                    Direct inquiries handled by TECHWAVE ENTERPRISES TEAM.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          FINAL WHATSAPP BANNER
         ======================================================== */}
      <section className="py-14 bg-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
            Need Instant Clarification on Stock or Technical Specs?
          </h3>
          <p className="text-xs sm:text-sm text-ice/80">
            Our WhatsApp channel is directly monitored during business hours for instant inquiries.
          </p>
          <div className="pt-2">
            <a
              href={COMPANY_INFO.socials.whatsappPrimary}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Connect on WhatsApp Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
