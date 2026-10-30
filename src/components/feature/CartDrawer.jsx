import { useEffect } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, CheckCircle2 } from 'lucide-react';
import PillButton from '../ui/PillButton';

import EmptyState from '../ui/EmptyState';
import { useApp } from '../../context/AppContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateCartQty, removeFromCart, checkout, currentUser } = useApp();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    checkout({
      deliveryAddress: currentUser.savedAddresses[0]?.addressLine || 'Baramati, Pune',
      paymentMethod: currentUser.demoPaymentMethods[0]?.label || 'Google Pay UPI (Demo)',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="presentation">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
          className="w-screen max-w-md bg-white shadow-xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 id="cart-drawer-title" className="font-heading font-bold text-gray-900 text-lg">
                Agri Shopping Cart
              </h2>
              <span className="text-xs font-semibold bg-primary-light text-primary-dark px-2 py-0.5 rounded-full">
                {cart.length} items
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close cart drawer"
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {cart.length === 0 ? (
              <EmptyState
                icon={ShoppingBag}
                title="Your cart is empty"
                description="Explore seeds, organic fertilizers, tools, and farming equipment in our farmer marketplace."
                actionText="Browse Marketplace"
                onAction={onClose}
              />
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="p-3.5 bg-gray-50/80 rounded-card border border-gray-200/80 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-heading font-semibold text-sm text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          ₹{item.price} / {item.unit} • Seller: {item.sellerName || 'Verified Seller'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="p-1.5 text-gray-400 hover:text-danger rounded-md transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-pill bg-white">
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-gray-600 hover:text-gray-900 disabled:opacity-40 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-l-pill"
                        >
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-900 select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          aria-label="Increase quantity"
                          className="p-1.5 text-gray-600 hover:text-gray-900 disabled:opacity-40 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-r-pill"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">Subtotal</span>
                        <span className="font-heading font-bold text-sm text-primary">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {item.quantity >= item.stock && (
                      <p className="text-[11px] text-amber-700 font-medium">
                        Max available stock ({item.stock} units) reached.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/80 space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Items Total</span>
                  <span className="font-medium text-gray-900">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Farm Delivery (Demo)</span>
                  <span className="text-success font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-heading font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Grand Total</span>
                  <span className="text-primary font-bold">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-1">
                <PillButton
                  variant="primary"
                  size="lg"
                  icon={CheckCircle2}
                  className="w-full shadow-md"
                  onClick={handleCheckout}
                >
                  Place Demo Order (₹{total.toLocaleString('en-IN')})
                </PillButton>
              </div>

              <p className="text-[11px] text-center text-gray-400">
                Simulated checkout creates an Order record and updates stock.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
