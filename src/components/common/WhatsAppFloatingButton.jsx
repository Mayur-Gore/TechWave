import { useState } from 'react';
import { MessageSquare, X, Phone, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

export default function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      {/* Contact modal popover */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-white shadow-2xl border border-ice/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-navy p-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4 fill-white" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">Chat on WhatsApp</p>
                <p className="text-[10px] text-ice/80">Techwave Enterprises</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-ice hover:text-white hover:bg-white/10"
              aria-label="Close WhatsApp options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-2 bg-offwhite text-xs">
            <p className="text-[11px] text-navy/70 pb-1">
              Connect directly with our team for quick product inquiries, stock availability, and quotations:
            </p>

            {COMPANY_INFO.contacts.map((contact, idx) => (
              <a
                key={idx}
                href={`https://wa.me/${contact.whatsapp}?text=Hello%20${encodeURIComponent(contact.name)},%20I%20would%20like%20to%20inquire%20about%20electrical%20products%20from%20Techwave%20Enterprises.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-ice hover:border-emerald-500 hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="font-semibold text-navy group-hover:text-emerald-700">
                    {contact.name} {contact.isPrimary && <span className="text-[10px] text-steel font-normal">(Primary)</span>}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-steel" />
                    {contact.displayPhone}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 border-2 border-white/60"
        aria-label="Contact via WhatsApp"
        aria-expanded={isOpen}
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">WhatsApp Inquiries</span>
      </button>
    </div>
  );
}
