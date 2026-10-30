import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import FormField from '../ui/FormField';
import PillButton from '../ui/PillButton';

export default function CropFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialCrop = null,
}) {
  const isEdit = Boolean(initialCrop);

  const [formData, setFormData] = useState({
    name: '',
    area: '',
    sowingDate: '',
    health: 'Healthy',
    stage: 'Vegetative Growth',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialCrop) {
      setFormData({
        name: initialCrop.name || '',
        area: initialCrop.area || '',
        sowingDate: initialCrop.sowingDate || '',
        health: initialCrop.health || 'Healthy',
        stage: initialCrop.stage || 'Vegetative Growth',
        notes: initialCrop.notes || '',
      });
    } else {
      setFormData({
        name: '',
        area: '',
        sowingDate: new Date().toISOString().slice(0, 10),
        health: 'Healthy',
        stage: 'Sowing & Germination',
        notes: '',
      });
    }
    setErrors({});
  }, [initialCrop, isOpen]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Crop name and variety are required.';
    }
    if (!formData.area.trim()) {
      errs.area = 'Acreage or field area is required.';
    }
    if (!formData.sowingDate) {
      errs.sowingDate = 'Sowing date is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let healthScore = 90;
    if (formData.health === 'Needs Attention') healthScore = 65;
    if (formData.health === 'Critical') healthScore = 35;

    onSubmit({
      ...(initialCrop || {}),
      name: formData.name.trim(),
      area: formData.area.trim(),
      sowingDate: formData.sowingDate,
      health: formData.health,
      healthScore,
      stage: formData.stage,
      notes: formData.notes.trim(),
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Farm Crop' : 'Register New Crop'}
      description="Track sowing cycles, acreage, and biological health status in your farm dashboard."
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-1">
        <FormField
          id="crop-name"
          label="Crop & Variety Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          placeholder="e.g. Cotton (Bt 7007) or Soybean (JS-335)"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="crop-area"
            label="Cultivated Area"
            required
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            error={errors.area}
            placeholder="e.g. 2.5 Acres"
          />

          <FormField
            id="crop-sowing-date"
            label="Sowing Date"
            type="date"
            required
            value={formData.sowingDate}
            onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
            error={errors.sowingDate}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="crop-health"
            label="Health Status"
            as="select"
            required
            value={formData.health}
            onChange={(e) => setFormData({ ...formData, health: e.target.value })}
          >
            <option value="Healthy">Healthy (निरोगी)</option>
            <option value="Needs Attention">Needs Attention (लक्ष देणे गरजेचे)</option>
            <option value="Critical">Critical (गंभीर)</option>
          </FormField>

          <FormField
            id="crop-stage"
            label="Current Growth Stage"
            value={formData.stage}
            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            placeholder="e.g. Flowering / Boll formation"
          />
        </div>

        <FormField
          id="crop-notes"
          label="Field Observations & Notes"
          as="textarea"
          rows={2}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Mention soil moisture, pest traps check, or drip fertigation schedule..."
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <PillButton variant="ghost" onClick={onClose}>
            Cancel
          </PillButton>
          <PillButton type="submit" variant="primary">
            {isEdit ? 'Save Changes' : 'Register Crop'}
          </PillButton>
        </div>
      </form>
    </Modal>
  );
}
