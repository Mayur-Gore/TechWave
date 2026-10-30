import { useState } from 'react';
import Modal from '../ui/Modal';
import FormField from '../ui/FormField';
import PillButton from '../ui/PillButton';
import { ShieldCheck } from 'lucide-react';

export default function PaymentMethodModal({ isOpen, onClose, onAddPaymentMethod }) {
  const [formData, setFormData] = useState({
    type: 'UPI',
    label: 'Farmer UPI App (Demo)',
    value: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.value.trim()) {
      setError('Please enter a demo UPI handle or bank account label.');
      return;
    }

    onAddPaymentMethod({
      type: formData.type,
      label: formData.label,
      value: `${formData.value.trim()} (Demo)`,
    });

    onClose();
    setFormData({ type: 'UPI', label: 'Farmer UPI App (Demo)', value: '' });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Demo Payment Method"
      description="Simulated agricultural payment instrument. Never enter real UPI PINs or banking credentials."
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-1">
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            This is a mock sandbox payment method for demo order placing. No real financial credentials are required or accepted.
          </span>
        </div>

        <FormField
          id="pm-type"
          label="Payment Method Type"
          as="select"
          required
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="UPI">UPI (Google Pay / PhonePe / BHIM)</option>
          <option value="Bank Transfer">Bank Transfer (KCC / Savings)</option>
        </FormField>

        <FormField
          id="pm-label"
          label="Friendly Name"
          required
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          placeholder="e.g. My PhonePe or Bank of Maharashtra A/C"
        />

        <FormField
          id="pm-value"
          label={formData.type === 'UPI' ? 'Demo Virtual Payment Address (VPA)' : 'Bank & Masked Account (e.g. **** 1234)'}
          required
          value={formData.value}
          onChange={(e) => {
            setFormData({ ...formData, value: e.target.value });
            if (error) setError('');
          }}
          error={error}
          placeholder={formData.type === 'UPI' ? 'ramesh@okhdfcbank' : 'A/C Ending in 5821'}
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
          <PillButton variant="ghost" onClick={onClose}>
            Cancel
          </PillButton>
          <PillButton type="submit" variant="primary">
            Save Demo Method
          </PillButton>
        </div>
      </form>
    </Modal>
  );
}
