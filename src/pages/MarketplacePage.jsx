import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Plus,
  SlidersHorizontal,
  Package,
  Layers,
  Store
} from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import PillButton from '../components/ui/PillButton';
import Tabs from '../components/ui/Tabs';
import EmptyState from '../components/ui/EmptyState';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import ProductCard from '../components/feature/ProductCard';

import ProductDetailModal from '../components/feature/ProductDetailModal';
import ProductFormModal from '../components/feature/ProductFormModal';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/seedProducts';

export default function MarketplacePage() {
  const {
    products,
    currentUser,
    addToCart,
    createProduct,
    updateProduct,
    deleteProduct,
    t,
  } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  // Filters & Tabs
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'my-listings'
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating-desc'); // 'price-asc', 'price-desc', 'rating-desc', 'newest'

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // Simulated ~400ms layout loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [activeTab, selectedCategory]);

  // Update query param when category changes
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category: cat }, { replace: true });
    }
  };

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Tab filter
      if (activeTab === 'my-listings' && product.ownerId !== currentUser.id) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(query);
        const descMatch = product.description.toLowerCase().includes(query);
        const catMatch = product.category.toLowerCase().includes(query);
        const locMatch = product.sellerLocation?.toLowerCase().includes(query);
        if (!nameMatch && !descMatch && !catMatch && !locMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
  }, [products, activeTab, selectedCategory, searchQuery, sortBy, currentUser.id]);

  const myListingsCount = useMemo(() => {
    return products.filter((p) => p.ownerId === currentUser.id).length;
  }, [products, currentUser.id]);

  const tabsConfig = [
    { id: 'all', label: 'All Agri Products', icon: Store, count: products.length },
    { id: 'my-listings', label: t.common.myListings, icon: Layers, count: myListingsCount },
  ];

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      updateProduct(productData);
    } else {
      createProduct(productData);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteProductId) {
      deleteProduct(deleteProductId);
      setDeleteProductId(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.nav.marketplace}
        subtitle="Trade seeds, fertilizers, pesticides, farm equipment, and implements with transparent pricing."
        action={
          <PillButton
            variant="primary"
            icon={Plus}
            onClick={handleOpenCreate}
            size="md"
          >
            List Product / विक्री करा
          </PillButton>
        }
      />

      {/* Tabs: All vs My Listings */}
      <Tabs
        tabs={tabsConfig}
        activeTab={activeTab}
        onChange={setActiveTab}
        ariaLabel="Marketplace listings tabs"
      />

      {/* Search, Filter Chips & Sort Controls */}
      <div className="space-y-3 bg-white rounded-card p-4 sm:p-5 border border-gray-200/80 shadow-xs">
        {/* Search Bar + Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by seed name, equipment, chemical, or seller village..."
              aria-label="Search marketplace products"
              className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm bg-gray-50 rounded-pill border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-gray-500 hidden sm:inline" aria-hidden="true" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort marketplace products"
              className="w-full sm:w-auto min-h-[44px] px-3.5 py-2 text-xs sm:text-sm font-medium bg-gray-50 border border-gray-200 rounded-pill text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            >
              <option value="rating-desc">Sort: Highest Rated</option>
              <option value="price-asc">Sort: Price (Low to High)</option>
              <option value="price-desc">Sort: Price (High to Low)</option>
              <option value="newest">Sort: Newly Listed</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className={`min-h-[38px] px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-pill whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-xs font-semibold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Result Count Bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>
            Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                searchParams.delete('category');
                setSearchParams(searchParams, { replace: true });
              }}
              className="text-primary hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Product Grid / Loading / Empty States */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          icon={Package}
          title={
            activeTab === 'my-listings'
              ? 'You have not listed any products yet'
              : 'No agricultural products match your filters'
          }
          description={
            activeTab === 'my-listings'
              ? 'List your certified seeds, organic compost, farm produce or equipment to sell directly to local farmers.'
              : 'Try searching with different terms or select another category above.'
          }
          actionText={activeTab === 'my-listings' ? 'List Product Now' : 'Show All Products'}
          onAction={
            activeTab === 'my-listings'
              ? handleOpenCreate
              : () => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  searchParams.delete('category');
                  setSearchParams(searchParams, { replace: true });
                }
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isOwner={product.ownerId === currentUser.id}
              onViewDetails={setSelectedProduct}
              onAddToCart={addToCart}
              onEdit={handleOpenEdit}
              onDelete={setDeleteProductId}
            />
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Create / Edit Form Modal */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleFormSubmit}
        initialProduct={editingProduct}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteProductId)}
        onClose={() => setDeleteProductId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Product Listing?"
        message="Are you sure you want to remove this product listing? It will also be removed from any active buyer carts."
        confirmText="Yes, Delete Listing"
        cancelText="Cancel"
      />
    </div>
  );
}
