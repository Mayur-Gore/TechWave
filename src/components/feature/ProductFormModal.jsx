import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import FormField from '../ui/FormField';
import PillButton from '../ui/PillButton';
import { Upload, X, AlertCircle } from 'lucide-react';
import { compressImage } from '../../utils/imageCompressor';
import { CATEGORIES } from '../../data/seedProducts';

export default function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialProduct = null,
}) {
  const isEdit = Boolean(initialProduct);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Seeds',
    price: '',
    unit: 'packet',
    stock: '10',
    description: '',
    image: '',
  });

  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        name: initialProduct.name || '',
        category: initialProduct.category || 'Seeds',
        price: initialProduct.price ? String(initialProduct.price) : '',
        unit: initialProduct.unit || 'packet',
        stock: initialProduct.stock !== undefined ? String(initialProduct.stock) : '10',
        description: initialProduct.description || '',
        image: initialProduct.image || '',
      });
    } else {
      setFormData({
        name: '',
        category: 'Seeds',
        price: '',
        unit: 'packet',
        stock: '10',
        description: '',
        image: '',
      });
    }
    setErrors({});
    setImageError('');
  }, [initialProduct, isOpen]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Product name is required.';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Product name must be at least 3 characters.';
    }

    if (!formData.category) {
      errs.category = 'Please choose a category.';
    }

    const priceNum = Number(formData.price);
    if (!formData.price || isNaN(priceNum) || priceNum <= 0) {
      errs.price = 'Please enter a valid positive price (₹).';
    } else if (priceNum > 500000) {
      errs.price = 'Price cannot exceed ₹5,00,000.';
    }

    const stockNum = Number(formData.stock);
    if (formData.stock === '' || isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
      errs.stock = 'Please enter a valid non-negative integer for stock.';
    }

    if (!formData.description.trim()) {
      errs.description = 'Product description is required.';
    } else if (formData.description.trim().length < 10) {
      errs.description = 'Description should be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleImageChange = async (e) => {
    setImageError('');
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    const result = await compressImage(file);
    setIsCompressing(false);

    if (result.success) {
      setFormData((prev) => ({ ...prev, image: result.data }));
    } else {
      setImageError(result.error || 'Failed to process image.');
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
    setImageError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...(initialProduct || {}),
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      unit: formData.unit.trim() || 'unit',
      stock: Number(formData.stock),
      description: formData.description.trim(),
      image: formData.image,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Product Listing' : 'List Product on Marketplace'}
      description="Connect directly with fellow farmers across Maharashtra. Verified quality inputs and tools."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1" noValidate>
        {/* Name */}
        <FormField
          id="product-name"
          label="Product / Item Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          placeholder="e.g. Certified Bt Cotton Seeds or Bio-NPK Consortium"
        />

        {/* Category & Unit in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="product-category"
            label="Category"
            as="select"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            error={errors.category}
          >
            {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </FormField>

          <FormField
            id="product-unit"
            label="Pricing Unit"
            required
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            placeholder="e.g. packet (450g), 50 kg bag, piece"
          />
        </div>

        {/* Price & Stock in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="product-price"
            label="Price in ₹"
            type="number"
            min="1"
            step="1"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            error={errors.price}
            placeholder="e.g. 850"
          />

          <FormField
            id="product-stock"
            label="Available Stock Quantity"
            type="number"
            min="0"
            step="1"
            required
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            error={errors.stock}
            placeholder="e.g. 25"
          />
        </div>

        {/* Description */}
        <FormField
          id="product-description"
          label="Detailed Description"
          as="textarea"
          rows={3}
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
          placeholder="Mention variety grade, germination percentage, batch certification, or usage directions..."
        />

        {/* Image Upload with Compression */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Product Photo (Optional, Max 1MB)
          </label>
          <div className="flex items-center gap-4">
            {formData.image ? (
              <div className="relative w-24 h-24 rounded-xl border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                <img
                  src={formData.image}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-danger transition-colors"
                  aria-label="Remove photo"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full sm:w-64 h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors p-2 text-center">
                <Upload className="w-6 h-6 text-gray-400 mb-1" aria-hidden="true" />
                <span className="text-xs text-gray-600 font-medium">
                  {isCompressing ? 'Compressing under 200KB...' : 'Upload Image (Max 1MB)'}
                </span>
                <span className="text-[10px] text-gray-400">JPEG, PNG, WebP</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  disabled={isCompressing}
                  className="sr-only"
                />
              </label>
            )}
          </div>

          {imageError && (
            <p role="alert" className="text-xs text-danger font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{imageError}</span>
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <PillButton variant="ghost" onClick={onClose} disabled={isCompressing}>
            Cancel
          </PillButton>
          <PillButton type="submit" variant="primary" loading={isCompressing}>
            {isEdit ? 'Save Changes' : 'Publish Listing'}
          </PillButton>
        </div>
      </form>
    </Modal>
  );
}
