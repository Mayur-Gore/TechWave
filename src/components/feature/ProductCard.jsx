import { Star, ShoppingCart, Eye, MapPin, PackageCheck } from 'lucide-react';
import Card from '../ui/Card';
import PillButton from '../ui/PillButton';
import CategoryIcon from '../ui/CategoryIcon';


export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  isOwner = false,
  onEdit,
  onDelete,
}) {
  const isOutOfStock = product.stock <= 0;

  return (
    <Card
      hoverable
      className="flex flex-col justify-between h-full border-gray-200/80 p-4 transition-all group"
    >
      <div className="space-y-3">
        {/* Product Visual / Thumbnail Area */}
        <div
          className="relative w-full h-40 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100 cursor-pointer"
          onClick={() => onViewDetails(product)}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
              <CategoryIcon category={product.category} className="w-10 h-10" />
              <span className="text-xs font-medium text-gray-500">{product.category}</span>
            </div>
          )}

          {/* Category Chip in top-left */}
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[11px] font-semibold bg-white/95 backdrop-blur-xs text-gray-800 px-2 py-0.5 rounded-full shadow-xs border border-gray-200">
              {product.category}
            </span>
          </div>

          {/* Owner Tag in top-right if listed by user */}
          {isOwner && (
            <div className="absolute top-2.5 right-2.5">
              <span className="text-[11px] font-bold bg-primary text-white px-2 py-0.5 rounded-full shadow-xs">
                My Listing
              </span>
            </div>
          )}
        </div>

        {/* Info & Rating */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
              <span>{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
              <span className="text-gray-400 font-normal">
                ({product.reviewsCount || product.reviews?.length || 0})
              </span>
            </div>

            <span className="flex items-center gap-1 text-gray-500 truncate max-w-[130px]">
              <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{product.sellerLocation || 'Maharashtra'}</span>
            </span>
          </div>

          <h3
            onClick={() => onViewDetails(product)}
            className="font-heading font-semibold text-gray-900 text-base leading-snug line-clamp-2 hover:text-primary transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Action Buttons */}
      <div className="pt-3 mt-3 border-t border-gray-100 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs text-gray-500">Rate:</span>
            <div className="text-lg font-heading font-bold text-primary">
              ₹{product.price.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-gray-500">/{product.unit}</span>
            </div>
          </div>

          <div className="text-right">
            {isOutOfStock ? (
              <span className="text-[11px] font-semibold text-danger bg-red-50 px-2 py-0.5 rounded">
                Out of Stock
              </span>
            ) : (
              <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                <PackageCheck className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                <span>Stock: {product.stock}</span>
              </span>
            )}
          </div>
        </div>

        {/* Buttons for normal user vs owner */}
        {isOwner ? (
          <div className="flex items-center gap-2 pt-1">
            <PillButton
              variant="outline"
              size="sm"
              onClick={() => onEdit(product)}
              className="flex-1"
            >
              Edit Listing
            </PillButton>
            <PillButton
              variant="dangerOutline"
              size="sm"
              onClick={() => onDelete(product.id)}
              className="px-3"
              ariaLabel={`Delete ${product.name}`}
            >
              Delete
            </PillButton>
          </div>
        ) : (
          <div className="flex items-center gap-2 pt-1">
            <PillButton
              variant="white"
              size="sm"
              icon={Eye}
              onClick={() => onViewDetails(product)}
              className="flex-1"
            >
              Details
            </PillButton>
            <PillButton
              variant="primary"
              size="sm"
              icon={ShoppingCart}
              disabled={isOutOfStock}
              onClick={() => onAddToCart(product, 1)}
              className="flex-1"
            >
              {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
            </PillButton>
          </div>
        )}
      </div>
    </Card>
  );
}
