import { useState } from 'react';
import Modal from '../ui/Modal';
import FormField from '../ui/FormField';
import PillButton from '../ui/PillButton';

export default function AddressModal({ isOpen, onClose, onAddAddress }) {
  const [formData, setFormData] = useState({
    label: 'Farm Delivery Point',
    recipientName: 'Ramesh Patil',
    phone: '9823012345',
    addressLine: '',
    village: 'Baramati',
    district: 'Pune',
    pincode: '413102',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.addressLine.trim()) {
      errs.addressLine = 'Street address or Gat number is required.';
    }
    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number (starts with 6-9).';
    }
    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) {
      errs.pincode = 'Please enter a valid 6-digit postal PIN code.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAddAddress(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Farm Delivery Address"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-1">
        <FormField
          id="addr-label"
          label="Address Tag / Label"
          required
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          placeholder="e.g. Farm House, Main Gate, Town Residence"
        />

        <FormField
          id="addr-line"
          label="Address Line / Gat Number"
          required
          value={formData.addressLine}
          onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
          error={errors.addressLine}
          placeholder="e.g. Gat No. 88, Near Nira Canal"
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            id="addr-village"
            label="Village / Taluka"
            required
            value={formData.village}
            onChange={(e) => setFormData({ ...formData, village: e.target.value })}
          />
          <FormField
            id="addr-district"
            label="District"
            required
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField
            id="addr-phone"
            label="Contact Mobile"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
            placeholder="9823012345"
          />
          <FormField
            id="addr-pincode"
            label="PIN Code"
            required
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            error={errors.pincode}
            placeholder="413102"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
          <PillButton variant="ghost" onClick={onClose}>
            Cancel
          </PillButton>
          <PillButton type="submit" variant="primary">
            Save Address
          </PillButton>
        </div>
      </form>
    </Modal>
  );
}
