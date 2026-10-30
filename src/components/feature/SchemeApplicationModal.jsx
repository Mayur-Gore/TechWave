import { useState } from 'react';
import Modal from '../ui/Modal';
import FormField from '../ui/FormField';
import PillButton from '../ui/PillButton';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';


export default function SchemeApplicationModal({
  scheme,
  isOpen,
  onClose,
  onSubmit,
  defaultName = 'Ramesh Patil',
  defaultLandSize = '4.5 Acres',
}) {
  const [step, setStep] = useState(1); // 1, 2, 3
  const [formData, setFormData] = useState({
    applicantName: defaultName,
    aadhaarLast4: '',
    landSize: defaultLandSize,
    gatNumber: '142/2',
    village: 'Baramati',
    bankName: 'Bank of Maharashtra (Rural Branch)',
    declarationAgreed: true,
  });

  const [errors, setErrors] = useState({});

  if (!scheme) return null;

  const validateStep = () => {
    const errs = {};
    if (step === 1) {
      if (!formData.applicantName.trim()) {
        errs.applicantName = 'Applicant name is required.';
      }
      if (!formData.aadhaarLast4 || !/^\d{4}$/.test(formData.aadhaarLast4)) {
        errs.aadhaarLast4 = 'Please enter exactly the last 4 digits of your Aadhaar.';
      }
    } else if (step === 2) {
      if (!formData.landSize.trim()) {
        errs.landSize = 'Landholding size is required.';
      }
      if (!formData.gatNumber.trim()) {
        errs.gatNumber = 'Gat / Survey number is required.';
      }
    } else if (step === 3) {
      if (!formData.declarationAgreed) {
        errs.declarationAgreed = 'You must confirm the farmer declaration.';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    onSubmit({
      schemeId: scheme.id,
      schemeName: scheme.name,
      applicantName: formData.applicantName.trim(),
      aadhaarLast4: formData.aadhaarLast4,
      landSize: formData.landSize,
      gatNumber: formData.gatNumber,
      bankAccountMasked: `${formData.bankName} (A/C **** 4921)`,
    });

    onClose();
    setStep(1);
    setFormData((prev) => ({ ...prev, aadhaarLast4: '' }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Apply for ${scheme.name}`}
      description="Simulated 3-Step Scheme Application (Zero Sensitive Data Collected)"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4 pt-1">
        {/* Step indicator */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs">
          {[
            { n: 1, label: 'Identity' },
            { n: 2, label: 'Land Parcel' },
            { n: 3, label: 'Verification' },
          ].map((s) => (
            <div
              key={s.n}
              className={`flex items-center gap-1.5 font-medium ${
                step === s.n
                  ? 'text-primary font-bold'
                  : step > s.n
                  ? 'text-success'
                  : 'text-gray-400'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step === s.n
                    ? 'bg-primary text-white font-bold'
                    : step > s.n
                    ? 'bg-success text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {step > s.n ? '✓' : s.n}
              </div>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Privacy Shield Notice */}
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong>Farmer Privacy Protected:</strong> We collect only the last 4 digits of Aadhaar for identification. Full Aadhaar numbers, PINs, passwords, and banking passwords are never requested or stored.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* STEP 1: Identity */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <FormField
                id="applicant-name"
                label="Full Name of Farmer (As on 7/12)"
                required
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                error={errors.applicantName}
              />

              <FormField
                id="aadhaar-last4"
                label="Aadhaar Last 4 Digits Only"
                required
                type="text"
                maxLength={4}
                value={formData.aadhaarLast4}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setFormData({ ...formData, aadhaarLast4: val });
                }}
                error={errors.aadhaarLast4}
                hint="Enter only the last 4 digits (e.g. 4821). Full 12 digits are prohibited."
                placeholder="4821"
              />
            </div>
          )}

          {/* STEP 2: Land parcel */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <FormField
                id="land-size"
                label="Cultivable Land Size"
                required
                value={formData.landSize}
                onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                error={errors.landSize}
                placeholder="e.g. 4.5 Acres or 1.8 Hectares"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="gat-no"
                  label="Survey / Gat Number"
                  required
                  value={formData.gatNumber}
                  onChange={(e) => setFormData({ ...formData, gatNumber: e.target.value })}
                  error={errors.gatNumber}
                  placeholder="e.g. 142/2"
                />
                <FormField
                  id="village-name"
                  label="Village / Taluka"
                  required
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="e.g. Baramati"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Bank & Review */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <FormField
                id="bank-name"
                label="Select DBT-Linked Bank (Demo)"
                as="select"
                required
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              >
                <option value="Bank of Maharashtra (Rural Branch)">Bank of Maharashtra (Rural Branch)</option>
                <option value="State Bank of India (Agri Division)">State Bank of India (Agri Division)</option>
                <option value="Pune District Central Co-op Bank (PDCC)">Pune District Central Co-op Bank (PDCC)</option>
              </FormField>

              {/* Review card */}
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1.5 text-gray-700">
                <p className="font-semibold text-gray-900">Application Summary:</p>
                <p>• Scheme: <strong>{scheme.name}</strong></p>
                <p>• Applicant: <strong>{formData.applicantName}</strong> (Aadhaar: **** **** {formData.aadhaarLast4})</p>
                <p>• Land: <strong>{formData.landSize}</strong> (Gat No: {formData.gatNumber})</p>
                <p>• Bank: <strong>{formData.bankName}</strong></p>
              </div>

              {/* Checkbox declaration */}
              <div className="space-y-1">
                <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.declarationAgreed}
                    onChange={(e) => setFormData({ ...formData, declarationAgreed: e.target.checked })}
                    className="mt-0.5 rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>
                    I hereby declare that I cultivate agricultural land in Maharashtra and verify that the provided information is accurate for demo portal tracking.
                  </span>
                </label>
                {errors.declarationAgreed && (
                  <p role="alert" className="text-xs text-danger font-medium">
                    {errors.declarationAgreed}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {step > 1 ? (
              <PillButton
                type="button"
                variant="ghost"
                icon={ArrowLeft}
                onClick={handleBack}
              >
                Back
              </PillButton>
            ) : (
              <PillButton
                type="button"
                variant="ghost"
                onClick={onClose}
              >
                Cancel
              </PillButton>
            )}

            {step < 3 ? (
              <PillButton
                type="button"
                variant="primary"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleNext}
              >
                Continue
              </PillButton>
            ) : (
              <PillButton
                type="submit"
                variant="primary"
                icon={CheckCircle2}
              >
                Submit Demo Application
              </PillButton>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
