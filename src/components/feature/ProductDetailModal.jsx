import { useState } from 'react';
import {
  Star,
  ShoppingCart,
  Phone,
  MessageSquare,
  MapPin,
  PackageCheck,
  Plus,
  Minus,
  UserCheck
} from 'lucide-react';

import Modal from '../ui/Modal';
import PillButton from '../ui/PillButton';
import Badge from '../ui/Badge';
import CategoryIcon from '../ui/CategoryIcon';

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);
  const [demoNotice, setDemoNotice] = useState('');

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const maxQty = Math.max(1, product.stock);

  const handleSimulateContact = (type) => {
    setDemoNotice(
      `Demo Mode: In production, this opens ${type} for seller ${product.sellerName} (${product.sellerPhone || '9823012345'}).`
    );
    setTimeout(() => setDemoNotice(''), 4500);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Top Product Hero & Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
          {/* Visual */}
          <div className="sm:col-span-5 w-full h-48 sm:h-56 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center relative">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                <CategoryIcon category={product.category} className="w-14 h-14" />
                <span className="text-sm font-medium text-gray-500">{product.category}</span>
              </div>
            )}
            <div className="absolute top-2.5 left-2.5">
              <Badge variant="primary" size="sm">
                {product.category}
              </Badge>
            </div>
          </div>

          {/* Pricing & Stock Details */}
          <div className="sm:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" aria-hidden="true" />
                <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
                <span className="text-gray-400 font-normal text-xs">
                  ({product.reviewsCount || product.reviews?.length || 0} reviews)
                </span>
              </div>

              {isOutOfStock ? (
                <span className="text-xs font-bold text-danger bg-red-50 px-2.5 py-1 rounded-pill">
                  Out of Stock
                </span>
              ) : (
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-pill flex items-center gap-1">
                  <PackageCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                  <span>{product.stock} units available</span>
                </span>
              )}
            </div>

            <div>
              <span className="text-xs text-gray-500">Market Price:</span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-primary">
                ₹{product.price.toLocaleString('en-IN')}{' '}
                <span className="text-sm font-normal text-gray-500">/{product.unit}</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed pt-1">
              {product.description}
            </p>

            {/* Quantity Selector + Add to Cart */}
            {!isOutOfStock && (
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-pill bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-40 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-l-pill"
                  >
                    <Minus className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <span className="px-3 text-sm font-bold text-gray-900 select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    disabled={quantity >= maxQty}
                    aria-label="Increase quantity"
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-40 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-r-pill"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <PillButton
                  variant="primary"
                  icon={ShoppingCart}
                  onClick={handleAdd}
                  className="flex-1 shadow-sm"
                >
                  Add {quantity} to Cart (₹{(product.price * quantity).toLocaleString('en-IN')})
                </PillButton>
              </div>
            )}
          </div>
        </div>

        {/* Seller Card */}
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/90 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">
                  Agri Seller Details
                </span>
                <span className="font-heading font-semibold text-gray-900 text-sm sm:text-base">
                  {product.sellerName || 'Verified Farm Producer'}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{product.sellerLocation || 'Baramati, Pune, Maharashtra'}</span>
                </span>
              </div>
            </div>

            {/* Call / WhatsApp Demo Buttons */}
            <div className="flex items-center gap-2">
              <PillButton
                variant="white"
                size="sm"
                icon={Phone}
                onClick={() => handleSimulateContact('Phone Call')}
                ariaLabel="Call seller (Demo)"
              >
                Call (Demo)
              </PillButton>
              <PillButton
                variant="secondary"
                size="sm"
                icon={MessageSquare}
                onClick={() => handleSimulateContact('WhatsApp')}
                ariaLabel="WhatsApp seller (Demo)"
              >
                WhatsApp (Demo)
              </PillButton>
            </div>
          </div>

          {demoNotice && (
            <div role="status" className="p-2.5 rounded-lg bg-blue-50 text-blue-900 text-xs border border-blue-200 font-medium">
              {demoNotice}
            </div>
          )}
        </div>

        {/* Customer Reviews Previews */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <h4 className="font-heading font-semibold text-sm text-gray-900">
            Farmer Reviews & Verification
          </h4>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-2">
              {product.reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded-lg bg-gray-50/60 border border-gray-100 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-semibold text-gray-800">
                    <span>{r.author}</span>
                    <div className="flex items-center text-amber-600">
                      {'★'.repeat(r.rating || 5)}
                    </div>
                  </div>
                  <p className="text-gray-600">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic">
              No written reviews yet. Be the first farmer to review after purchasing!
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
