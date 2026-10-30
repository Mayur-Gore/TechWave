import { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import { appReducer } from './appReducer';
import { getInitialState } from '../data';
import { loadSavedState, saveState, clearAllAppData, STORAGE_KEYS } from '../utils/storage';
import { translations } from '../i18n/translations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Load initial state safely (falls back to seeds on missing or corrupt schema)
  const [state, dispatch] = useReducer(appReducer, null, () => {
    const saved = loadSavedState();
    return saved || getInitialState();
  });

  // Language state
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en';
    } catch {
      return 'en';
    }
  });

  // Toast notification state
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Set language with persistence
  const changeLanguage = useCallback((langCode) => {
    if (translations[langCode]) {
      setLanguageState(langCode);
      try {
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, langCode);
      } catch (err) {
        console.warn('Could not persist language choice', err);
      }
    }
  }, []);

  // Save application state whenever it changes
  useEffect(() => {
    const result = saveState(state);
    if (!result.success && result.quotaError) {
      addToast({
        type: 'error',
        title: 'Storage Warning',
        message: 'Browser storage quota is full. Some recent changes may not persist.',
      });
    }
  }, [state, addToast]);

  // Derived metrics for live UI
  const unreadNotificationsCount = state.notifications.filter((n) => n.unread).length;
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  // Dispatch helpers with actorId injection
  const actorId = state.currentUser?.id;

  const createProduct = useCallback((product) => {
    dispatch({ type: 'PRODUCT_CREATE', payload: { product, actorId } });
    addToast({
      type: 'success',
      title: 'Product Listed',
      message: `"${product.name}" has been published to the marketplace.`,
    });
  }, [actorId, addToast]);

  const updateProduct = useCallback((product) => {
    dispatch({ type: 'PRODUCT_UPDATE', payload: { product, actorId } });
    addToast({
      type: 'success',
      title: 'Product Updated',
      message: `Changes saved for "${product.name}".`,
    });
  }, [actorId, addToast]);

  const deleteProduct = useCallback((productId) => {
    dispatch({ type: 'PRODUCT_DELETE', payload: { productId, actorId } });
    addToast({
      type: 'info',
      title: 'Product Deleted',
      message: 'Product removed from your listings.',
    });
  }, [actorId, addToast]);

  const addToCart = useCallback((product, quantity = 1) => {
    dispatch({ type: 'CART_ADD', payload: { product, quantity } });
    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${quantity}x ${product.name} added to your farm cart.`,
    });
  }, [addToast]);

  const updateCartQty = useCallback((productId, quantity) => {
    dispatch({ type: 'CART_UPDATE_QTY', payload: { productId, quantity } });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: 'CART_REMOVE', payload: { productId } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CART_CLEAR' });
  }, []);

  const checkout = useCallback((details) => {
    dispatch({ type: 'CHECKOUT', payload: { ...details, actorId } });
    addToast({
      type: 'success',
      title: 'Order Confirmed',
      message: 'Your order was successfully recorded. Stock has been reserved.',
      duration: 6000,
    });
  }, [actorId, addToast]);

  const createPost = useCallback((post) => {
    dispatch({ type: 'POST_CREATE', payload: { post, actorId } });
    addToast({
      type: 'success',
      title: 'Post Published',
      message: 'Your post is now live in the Shetkari Community.',
    });
  }, [actorId, addToast]);

  const updatePost = useCallback((post) => {
    dispatch({ type: 'POST_UPDATE', payload: { post, actorId } });
    addToast({
      type: 'success',
      title: 'Post Updated',
      message: 'Your changes have been saved.',
    });
  }, [actorId, addToast]);

  const deletePost = useCallback((postId) => {
    dispatch({ type: 'POST_DELETE', payload: { postId, actorId } });
    addToast({
      type: 'info',
      title: 'Post Deleted',
      message: 'The post was removed from the community feed.',
    });
  }, [actorId, addToast]);

  const togglePostLike = useCallback((postId) => {
    dispatch({ type: 'POST_TOGGLE_LIKE', payload: { postId, actorId } });
  }, [actorId]);

  const addPostComment = useCallback((postId, content) => {
    dispatch({ type: 'POST_ADD_COMMENT', payload: { postId, content, actorId } });
    addToast({
      type: 'success',
      title: 'Comment Added',
      message: 'Your reply has been posted.',
    });
  }, [actorId, addToast]);

  const createCrop = useCallback((crop) => {
    dispatch({ type: 'CROP_CREATE', payload: { crop, actorId } });
    addToast({
      type: 'success',
      title: 'Crop Registered',
      message: `${crop.name} added to your active farm monitoring.`,
    });
  }, [actorId, addToast]);

  const updateCrop = useCallback((crop) => {
    dispatch({ type: 'CROP_UPDATE', payload: { crop, actorId } });
    addToast({
      type: 'success',
      title: 'Crop Updated',
      message: `Updated health status for ${crop.name}.`,
    });
  }, [actorId, addToast]);

  const deleteCrop = useCallback((cropId) => {
    dispatch({ type: 'CROP_DELETE', payload: { cropId, actorId } });
    addToast({
      type: 'info',
      title: 'Crop Removed',
      message: 'Crop record removed from farm manager.',
    });
  }, [actorId, addToast]);

  const applyForScheme = useCallback((application) => {
    dispatch({ type: 'SCHEME_APPLY', payload: { application, actorId } });
    addToast({
      type: 'success',
      title: 'Application Submitted',
      message: `Your application for "${application.schemeName}" is under review.`,
      duration: 5000,
    });
  }, [actorId, addToast]);

  const refreshSchemeStatus = useCallback((applicationId) => {
    dispatch({ type: 'SCHEME_REFRESH_STATUS', payload: { applicationId, actorId } });
    addToast({
      type: 'info',
      title: 'Status Refreshed',
      message: 'Updated latest scrutiny status from government database.',
    });
  }, [actorId, addToast]);

  const markNotificationRead = useCallback((notificationId) => {
    dispatch({ type: 'NOTIFICATION_MARK_READ', payload: { notificationId } });
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    dispatch({ type: 'NOTIFICATION_MARK_ALL_READ' });
    addToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notifications marked as read.',
    });
  }, [addToast]);

  const deleteNotification = useCallback((notificationId) => {
    dispatch({ type: 'NOTIFICATION_DELETE', payload: { notificationId } });
  }, []);

  const toggleWatchlist = useCallback((commodityId) => {
    dispatch({ type: 'WATCHLIST_TOGGLE', payload: { commodityId } });
  }, []);

  const triggerWeatherAlert = useCallback((alert) => {
    dispatch({ type: 'WEATHER_ALERT_TRIGGER', payload: { alert } });
  }, []);

  const triggerPriceAlert = useCallback((commodity) => {
    dispatch({ type: 'PRICE_ALERT_TRIGGER', payload: { commodity } });
  }, []);

  const updateProfile = useCallback((user) => {
    dispatch({ type: 'PROFILE_UPDATE', payload: { user, actorId } });
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your farmer details and preferences have been updated.',
    });
  }, [actorId, addToast]);

  const addAddress = useCallback((address) => {
    dispatch({ type: 'ADDRESS_ADD', payload: { address, actorId } });
    addToast({
      type: 'success',
      title: 'Address Saved',
      message: 'New farm delivery address added.',
    });
  }, [actorId, addToast]);

  const deleteAddress = useCallback((addressId) => {
    dispatch({ type: 'ADDRESS_DELETE', payload: { addressId, actorId } });
    addToast({
      type: 'info',
      title: 'Address Removed',
      message: 'Delivery address removed.',
    });
  }, [actorId, addToast]);

  const addPaymentMethod = useCallback((paymentMethod) => {
    dispatch({ type: 'PAYMENT_METHOD_ADD', payload: { paymentMethod, actorId } });
    addToast({
      type: 'success',
      title: 'Payment Method Saved',
      message: 'Demo payment method added.',
    });
  }, [actorId, addToast]);

  const deletePaymentMethod = useCallback((paymentMethodId) => {
    dispatch({ type: 'PAYMENT_METHOD_DELETE', payload: { paymentMethodId, actorId } });
    addToast({
      type: 'info',
      title: 'Payment Method Removed',
      message: 'Payment method removed.',
    });
  }, [actorId, addToast]);

  const resetDemoData = useCallback(() => {
    clearAllAppData();
    dispatch({ type: 'RESET_DEMO_DATA' });
    addToast({
      type: 'info',
      title: 'Demo Data Reset',
      message: 'All records have been reset to verified initial state.',
      duration: 5000,
    });
  }, [addToast]);

  const currentTranslations = translations[language] || translations.en;

  const value = {
    state,
    currentUser: state.currentUser,
    products: state.products,
    crops: state.crops,
    orders: state.orders,
    applications: state.applications,
    posts: state.posts,
    notifications: state.notifications,
    activity: state.activity,
    watchlist: state.watchlist,
    cart: state.cart,
    unreadNotificationsCount,
    cartItemsCount,
    language,
    t: currentTranslations,
    toasts,
    changeLanguage,
    addToast,
    removeToast,
    createProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    checkout,
    createPost,
    updatePost,
    deletePost,
    togglePostLike,
    addPostComment,
    createCrop,
    updateCrop,
    deleteCrop,
    applyForScheme,
    refreshSchemeStatus,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    toggleWatchlist,
    triggerWeatherAlert,
    triggerPriceAlert,
    updateProfile,
    addAddress,
    deleteAddress,
    addPaymentMethod,
    deletePaymentMethod,
    resetDemoData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
