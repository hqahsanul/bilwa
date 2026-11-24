"use client";

import { useState } from "react";
import { X, CheckCircle2, ShieldCheck, PhoneCall } from "lucide-react";

interface BilvaCorporateQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig?: {
    quantity?: string;
    finish?: string;
    personalization?: string;
    region?: string;
    setName?: string;
  };
}

export function BilvaCorporateQuoteModal({
  isOpen,
  onClose,
  initialConfig,
}: BilvaCorporateQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-[16px] bg-[#FAF8F5] border border-[#E0D5C3] p-6 sm:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.2)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute right-5 top-5 p-1.5 text-[#556961] hover:text-[#0A2D23] transition-colors rounded-full hover:bg-black/5 cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-[#E8F3EE] text-[#0E7A67] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-serif text-[24px] font-semibold text-[#0A2D23]">
              Enquiry Submitted Successfully
            </h3>
            <p className="font-sans text-[14px] text-[#4A5D55] max-w-sm mx-auto leading-relaxed">
              Thank you for considering Bilwa for your organization. A dedicated corporate gifting advisor will connect with you within 24 business hours.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full bg-[#0E3D36] hover:bg-[#092B25] text-white font-sans text-[14.5px] font-medium py-3 px-6 rounded-[8px] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5 pr-8">
              <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8B6F3E]">
                B2B PROPOSAL REQUEST
              </span>
              <h3 className="font-serif text-[24px] sm:text-[26px] font-medium text-[#0A2D23] mt-1">
                Request a Custom Quote
              </h3>
              <p className="font-sans text-[13px] text-[#556961] mt-1">
                Receive customized pricing and presentation mockups tailored to your organization.
              </p>
            </div>

            {/* Selected Config Summary */}
            {initialConfig && (
              <div className="mb-5 rounded-[8px] bg-[#EAF0E7] border border-[#CCD8CC] p-3 text-[12px] text-[#2C4A3E] flex flex-wrap gap-x-4 gap-y-1">
                {initialConfig.setName && (
                  <span><strong>Collection:</strong> {initialConfig.setName}</span>
                )}
                {initialConfig.quantity && (
                  <span><strong>Units:</strong> {initialConfig.quantity}</span>
                )}
                {initialConfig.finish && (
                  <span><strong>Finish:</strong> {initialConfig.finish}</span>
                )}
                {initialConfig.personalization && (
                  <span><strong>Personalization:</strong> {initialConfig.personalization}</span>
                )}
                {initialConfig.region && initialConfig.region !== "Select region" && (
                  <span><strong>Region:</strong> {initialConfig.region}</span>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[12.5px] font-medium text-[#2C3E38] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-[6px] border border-[#D5CDBD] bg-white px-3.5 py-2.5 text-[13.5px] text-[#1E3B30] placeholder:text-[#99A8A0] focus:border-[#0E3D36] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[12.5px] font-medium text-[#2C3E38] mb-1">
                    Organization / Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Tech Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-[6px] border border-[#D5CDBD] bg-white px-3.5 py-2.5 text-[13.5px] text-[#1E3B30] placeholder:text-[#99A8A0] focus:border-[#0E3D36] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-[#2C3E38] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-[6px] border border-[#D5CDBD] bg-white px-3.5 py-2.5 text-[13.5px] text-[#1E3B30] placeholder:text-[#99A8A0] focus:border-[#0E3D36] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-[#2C3E38] mb-1">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-[6px] border border-[#D5CDBD] bg-white px-3.5 py-2.5 text-[13.5px] text-[#1E3B30] placeholder:text-[#99A8A0] focus:border-[#0E3D36] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-[#2C3E38] mb-1">
                  Specific Requirements or Deadline
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Annual leadership conclave on 15th Dec, custom logo foil printing needed."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-[6px] border border-[#D5CDBD] bg-white px-3.5 py-2 text-[13px] text-[#1E3B30] placeholder:text-[#99A8A0] focus:border-[#0E3D36] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0E3D36] hover:bg-[#092B25] text-white font-sans text-[14.5px] font-medium py-3 px-6 rounded-[8px] transition-colors cursor-pointer shadow-xs"
                >
                  Submit Proposal Request →
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11.5px] text-[#6B7F76] pt-1">
                <ShieldCheck size={14} className="text-[#0E3D36]" />
                <span>Confidential corporate pricing. Direct artisan fulfilment.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
