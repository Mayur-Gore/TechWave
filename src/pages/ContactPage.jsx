import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Instagram, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  AlertCircle, 
  ShieldCheck, 
  Building 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialProduct = searchParams.get('product') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    productInterest: initialProduct || COMPANY_INFO.categories[0].title,
    message: '',
  });

  const [submittedState, setSubmittedState] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your contact phone number';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Please provide details about your inquiry or requirements';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    // Mark as prepared for sending via email or WhatsApp
    setSubmittedState(true);
  };

  const constructWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Techwave Enterprises,\n\nInquiry Details:\nName: ${formData.fullName}\nCompany: ${formData.companyName || 'Not specified'}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'Not specified'}\nProduct: ${formData.productInterest}\nMessage: ${formData.message}`
    );
    return `https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${text}`;
  };

  const constructMailtoLink = () => {
    const subject = encodeURIComponent(`Product Inquiry from ${formData.fullName} - ${formData.productInterest}`);
    const body = encodeURIComponent(
      `Name: ${formData.fullName}\nCompany: ${formData.companyName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nProduct of Interest: ${formData.productInterest}\n\nRequirements / Message:\n${formData.message}`
    );
    return `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
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
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct Sourcing & Client Support</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Contact Techwave Enterprises
          </h1>

          <p className="mt-4 text-base sm:text-lg text-ice/90 leading-relaxed">
            Reach out to discuss your electrical product requirements, request price quotations, or explore ongoing industrial supply partnerships.
          </p>
        </div>
      </section>

      {/* ========================================================
          MAIN CONTENT: TWO-COLUMN LAYOUT
         ======================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ====================================================
              COLUMN 1: CONTACT INFORMATION CARDS & ADDRESS
             ==================================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-steel uppercase tracking-wider">Direct Contacts</span>
              <h2 className="text-2xl font-bold font-heading text-navy">
                We're Here to Help Your Business
              </h2>
              <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
                Connect with our dedicated partners directly through WhatsApp, telephone, or email for prompt assistance.
              </p>
            </div>

            {/* Contact Cards Grid */}
            <div className="space-y-4">
              {/* Phone Card (Both Contacts) */}
              <div className="p-5 rounded-2xl bg-white border border-ice/70 shadow-sm hover:border-steel/60 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-corporate/10 text-corporate flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-sm font-bold text-navy uppercase tracking-wider">Phone Inquiries</h3>
                    
                    <div className="border-b border-ice/40 pb-2">
                      <p className="text-xs font-semibold text-navy">
                        {COMPANY_INFO.contacts[0].name} <span className="text-[10px] text-steel font-normal">(Primary)</span>
                      </p>
                      <a
                        href={`tel:+91${COMPANY_INFO.contacts[0].phone}`}
                        className="text-sm font-bold text-corporate hover:text-steel tracking-wide flex items-center gap-1 mt-0.5"
                      >
                        {COMPANY_INFO.contacts[0].displayPhone}
                      </a>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-navy">
                        {COMPANY_INFO.contacts[1].name}
                      </p>
                      <a
                        href={`tel:+91${COMPANY_INFO.contacts[1].phone}`}
                        className="text-sm font-bold text-corporate hover:text-steel tracking-wide flex items-center gap-1 mt-0.5"
                      >
                        {COMPANY_INFO.contacts[1].displayPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="p-5 rounded-2xl bg-white border border-ice/70 shadow-sm hover:border-emerald-500/60 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                    <MessageSquare className="w-6 h-6 fill-emerald-600" />
                  </div>
                  <div className="space-y-2.5 flex-1">
                    <h3 className="text-sm font-bold text-navy uppercase tracking-wider">WhatsApp Support</h3>
                    <p className="text-xs text-navy/70 leading-relaxed">
                      Instant chat for quick product checks, images, and catalog requests.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={COMPANY_INFO.socials.whatsappPrimary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-white" />
                        <span>Chat with Pramod Yamgar</span>
                      </a>
                      <a
                        href={COMPANY_INFO.socials.whatsappSecondary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-900/10 hover:bg-emerald-900/20 text-emerald-800 text-xs font-bold border border-emerald-500/30 transition-colors"
                      >
                        <span>Chat with Ganesh Jamdade</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white border border-ice/70 shadow-sm hover:border-steel/60 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-corporate/10 text-corporate flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-sm font-bold text-navy uppercase tracking-wider">Official Email</h3>
                    <p className="text-xs text-navy/70">
                      Send purchase orders, RFQs, technical sheets, or tender documents.
                    </p>
                    <p className="text-sm font-bold text-navy font-mono">
                      {COMPANY_INFO.email}
                    </p>
                    <div className="pt-1">
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-corporate hover:bg-corporate-hover text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="p-5 rounded-2xl bg-white border border-ice/70 shadow-sm hover:border-pink-500/60 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-200">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-sm font-bold text-navy uppercase tracking-wider">Instagram Profile</h3>
                    <p className="text-xs text-navy/70">
                      Follow our product updates and visual highlights on social media.
                    </p>
                    <p className="text-xs font-mono text-corporate font-semibold">
                      {COMPANY_INFO.socials.instagram.handle}
                    </p>
                    <div className="pt-1">
                      <a
                        href={COMPANY_INFO.socials.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span>Visit Instagram</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Address Card */}
              <div className="p-5 rounded-2xl bg-white border border-ice/70 shadow-sm hover:border-steel/60 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-navy uppercase tracking-wider">Company Address</h3>
                      <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        Verification Notice
                      </span>
                    </div>

                    {/* Readable text format */}
                    <div className="p-3 rounded-xl bg-offwhite border border-ice text-xs text-navy/80 space-y-1">
                      <p className="font-semibold text-navy">Techwave Enterprises</p>
                      <p>{COMPANY_INFO.address.street}</p>
                      <p>{COMPANY_INFO.address.cityState}</p>
                      <p className="text-[11px] text-navy/60 italic pt-1 border-t border-ice/50">
                        * Exact plot/unit coordinates to be updated upon final registry verification before publishing.
                      </p>
                    </div>

                    <div className="pt-1">
                      <a
                        href={COMPANY_INFO.address.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-steel hover:bg-steel-hover text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Get Directions (Google Maps)</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================
              COLUMN 2: CONTACT INQUIRY FORM
             ==================================================== */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-ice shadow-card space-y-6">
              <div className="space-y-2 border-b border-ice/50 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-steel/15 text-steel text-xs font-bold uppercase tracking-wider">
                  <span>Send an Inquiry</span>
                </div>
                <h2 className="text-2xl font-bold font-heading text-navy">
                  Product & Business Inquiry Form
                </h2>
                <p className="text-xs sm:text-sm text-navy/70">
                  Please fill out the form below. Once reviewed, our business leads will get in touch with you directly.
                </p>
              </div>

              {submittedState ? (
                <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-navy">Your Inquiry is Ready to Send!</h3>
                    <p className="text-xs sm:text-sm text-navy/70 max-w-md mx-auto leading-relaxed">
                      As this is a static marketing website without a private backend server configured, please click below to send this completed inquiry directly to our team via WhatsApp or your email client:
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-offwhite border border-ice text-left text-xs space-y-1.5 max-w-md mx-auto">
                    <p><span className="font-semibold text-navy">Name:</span> {formData.fullName}</p>
                    {formData.companyName && <p><span className="font-semibold text-navy">Company:</span> {formData.companyName}</p>}
                    <p><span className="font-semibold text-navy">Phone:</span> {formData.phone}</p>
                    {formData.email && <p><span className="font-semibold text-navy">Email:</span> {formData.email}</p>}
                    <p><span className="font-semibold text-navy">Product:</span> {formData.productInterest}</p>
                    <p><span className="font-semibold text-navy">Message:</span> {formData.message}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={constructWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Send to Techwave on WhatsApp</span>
                    </a>

                    <a
                      href={constructMailtoLink()}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-corporate hover:bg-corporate-hover text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send via Email Client</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmittedState(false)}
                      className="text-xs text-steel hover:text-navy underline"
                    >
                      Edit or submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Static notice disclaimer */}
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Static Website Notice:</strong> Submissions are processed directly via verified WhatsApp or official email to ensure guaranteed delivery without third-party server exposure.
                    </span>
                  </div>

                  {/* Full Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Your full name"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                            : 'border-ice bg-offwhite focus:bg-white focus:ring-steel'
                        }`}
                        required
                      />
                      {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">
                        Company Name <span className="text-navy/40 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Acme Industries Ltd."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-ice bg-offwhite focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-steel transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                            : 'border-ice bg-offwhite focus:bg-white focus:ring-steel'
                        }`}
                        required
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">
                        Email Address <span className="text-navy/40 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                            : 'border-ice bg-offwhite focus:bg-white focus:ring-steel'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Product or Service of Interest */}
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">
                      Product or Service of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.productInterest}
                      onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ice bg-offwhite focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-steel transition-all"
                    >
                      {COMPANY_INFO.categories.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                      <option value="General Industrial Electrical Sourcing">
                        General Industrial Electrical Sourcing
                      </option>
                      <option value="Custom Project Bill of Materials (BOM)">
                        Custom Project Bill of Materials (BOM)
                      </option>
                    </select>
                  </div>

                  {/* Message or Requirements */}
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">
                      Message or Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify product types, voltages, current ratings, estimated quantities, or project details..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.message
                          ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                          : 'border-ice bg-offwhite focus:bg-white focus:ring-steel'
                      }`}
                      required
                    />
                    {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-corporate hover:bg-corporate-hover text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
