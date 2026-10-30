import { getInitialState } from '../data';

export function appReducer(state, action) {
  const now = new Date().toISOString();
  const actorId = action.actorId || action.payload?.actorId || state.currentUser?.id;

  switch (action.type) {
    // ==========================================
    // 1. PRODUCTS & MARKETPLACE CRUD (OWNERSHIP ENFORCED)
    // ==========================================
    case 'PRODUCT_CREATE': {
      const { product } = action.payload;
      const newProduct = {
        ...product,
        id: product.id || `prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        ownerId: actorId,
        sellerName: state.currentUser.name,
        sellerLocation: `${state.currentUser.village}, ${state.currentUser.district}`,
        sellerPhone: state.currentUser.phone,
        rating: 5.0,
        reviewsCount: 0,
        reviews: [],
        createdAt: now,
        updatedAt: now,
      };

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'listing',
        title: 'Listed New Agri Product',
        description: `Listed "${newProduct.name}" in ${newProduct.category} for ₹${newProduct.price}.`,
        timestamp: 'Just now',
      };

      return {
        ...state,
        products: [newProduct, ...state.products],
        activity: [newActivity, ...state.activity],
      };
    }

    case 'PRODUCT_UPDATE': {
      const { product } = action.payload;
      const existing = state.products.find((p) => p.id === product.id);

      // Ownership guard inside reducer
      if (!existing || existing.ownerId !== actorId) {
        console.warn(`Unauthorized PRODUCT_UPDATE attempt by actor ${actorId} on product ${product.id}`);
        return state;
      }

      const updatedProducts = state.products.map((p) =>
        p.id === product.id ? { ...p, ...product, updatedAt: now } : p
      );

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'listing',
        title: 'Updated Product Listing',
        description: `Updated details for "${product.name}".`,
        timestamp: 'Just now',
      };

      return {
        ...state,
        products: updatedProducts,
        activity: [newActivity, ...state.activity],
      };
    }

    case 'PRODUCT_DELETE': {
      const { productId } = action.payload;
      const existing = state.products.find((p) => p.id === productId);

      // Ownership guard inside reducer
      if (!existing || existing.ownerId !== actorId) {
        console.warn(`Unauthorized PRODUCT_DELETE attempt by actor ${actorId} on product ${productId}`);
        return state;
      }

      // Cross-module sync: remove product from listings AND remove from cart
      const remainingProducts = state.products.filter((p) => p.id !== productId);
      const remainingCart = state.cart.filter((item) => item.productId !== productId);

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'listing',
        title: 'Removed Product Listing',
        description: `Deleted listing for "${existing.name}".`,
        timestamp: 'Just now',
      };

      return {
        ...state,
        products: remainingProducts,
        cart: remainingCart,
        activity: [newActivity, ...state.activity],
      };
    }

    // ==========================================
    // 2. CART & STOCK SYNC
    // ==========================================
    case 'CART_ADD': {
      const { product, quantity = 1 } = action.payload;
      const liveProduct = state.products.find((p) => p.id === product.id);
      if (!liveProduct || liveProduct.stock <= 0) return state;

      const existingIndex = state.cart.findIndex((item) => item.productId === product.id);
      let updatedCart = [...state.cart];

      if (existingIndex >= 0) {
        const currentQty = updatedCart[existingIndex].quantity;
        const newQty = Math.min(liveProduct.stock, currentQty + quantity);
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: newQty,
        };
      } else {
        const safeQty = Math.min(liveProduct.stock, Math.max(1, quantity));
        updatedCart.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          category: product.category,
          stock: liveProduct.stock,
          sellerName: liveProduct.sellerName,
          quantity: safeQty,
        });
      }

      return { ...state, cart: updatedCart };
    }

    case 'CART_UPDATE_QTY': {
      const { productId, quantity } = action.payload;
      const liveProduct = state.products.find((p) => p.id === productId);
      if (!liveProduct) return state;

      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.productId !== productId),
        };
      }

      const safeQty = Math.min(liveProduct.stock, quantity);
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === productId ? { ...item, quantity: safeQty, stock: liveProduct.stock } : item
        ),
      };
    }

    case 'CART_REMOVE': {
      const { productId } = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => item.productId !== productId),
      };
    }

    case 'CART_CLEAR': {
      return { ...state, cart: [] };
    }

    // ==========================================
    // 3. CHECKOUT & ORDERS (STOCK REDUCTION, NOTIF, ACTIVITY)
    // ==========================================
    case 'CHECKOUT': {
      const { deliveryAddress, paymentMethod } = action.payload;
      if (state.cart.length === 0) return state;

      const orderId = `ORD-${Date.now().toString().slice(-4)}`;
      const orderItems = state.cart.map((item) => ({ ...item }));
      const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // Reduce stock of purchased products
      const updatedProducts = state.products.map((p) => {
        const inCart = orderItems.find((item) => item.productId === p.id);
        if (inCart) {
          return { ...p, stock: Math.max(0, p.stock - inCart.quantity), updatedAt: now };
        }
        return p;
      });

      const newOrder = {
        id: orderId,
        buyerId: actorId,
        items: orderItems,
        total,
        status: 'Placed',
        deliveryAddress: deliveryAddress || state.currentUser.savedAddresses[0]?.addressLine || 'Farm Residence, Pune',
        paymentMethod: paymentMethod || 'Google Pay UPI (Demo)',
        createdAt: now,
        updatedAt: now,
      };

      const newNotification = {
        id: `notif-${Date.now()}`,
        category: 'Orders',
        title: `Order Placed Successfully #${orderId}`,
        message: `Your agri purchase of ${orderItems.length} item(s) worth ₹${total.toLocaleString('en-IN')} has been placed.`,
        timestamp: 'Just now',
        unread: true,
        link: '/dashboard',
      };

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'purchase',
        title: 'Placed Marketplace Order',
        description: `Order #${orderId} confirmed for ₹${total.toLocaleString('en-IN')}. Stock updated.`,
        timestamp: 'Just now',
      };

      return {
        ...state,
        products: updatedProducts,
        orders: [newOrder, ...state.orders],
        cart: [],
        notifications: [newNotification, ...state.notifications],
        activity: [newActivity, ...state.activity],
      };
    }

    // ==========================================
    // 4. COMMUNITY HUB POSTS (OWNERSHIP ENFORCED)
    // ==========================================
    case 'POST_CREATE': {
      const { post } = action.payload;
      const newPost = {
        ...post,
        id: post.id || `post-${Date.now()}`,
        authorId: actorId,
        authorName: state.currentUser.name,
        authorVillage: `${state.currentUser.village}, ${state.currentUser.district}`,
        authorRole: 'Shetkari Member',
        likesCount: 0,
        likedBy: [],
        comments: [],
        createdAt: now,
        updatedAt: now,
      };

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'community',
        title: 'Published Farmer Post',
        description: `Shared post in "${newPost.tag}" forum.`,
        timestamp: 'Just now',
      };

      return {
        ...state,
        posts: [newPost, ...state.posts],
        activity: [newActivity, ...state.activity],
      };
    }

    case 'POST_UPDATE': {
      const { post } = action.payload;
      const existing = state.posts.find((p) => p.id === post.id);

      // Ownership guard inside reducer
      if (!existing || existing.authorId !== actorId) {
        console.warn(`Unauthorized POST_UPDATE attempt by actor ${actorId} on post ${post.id}`);
        return state;
      }

      const updatedPosts = state.posts.map((p) =>
        p.id === post.id ? { ...p, ...post, updatedAt: now } : p
      );

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'community',
        title: 'Edited Community Post',
        description: `Updated post: "${post.content.slice(0, 40)}..."`,
        timestamp: 'Just now',
      };

      return {
        ...state,
        posts: updatedPosts,
        activity: [newActivity, ...state.activity],
      };
    }

    case 'POST_DELETE': {
      const { postId } = action.payload;
      const existing = state.posts.find((p) => p.id === postId);

      // Ownership guard inside reducer
      if (!existing || existing.authorId !== actorId) {
        console.warn(`Unauthorized POST_DELETE attempt by actor ${actorId} on post ${postId}`);
        return state;
      }

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'community',
        title: 'Deleted Community Post',
        description: 'Post removed from farmer feed.',
        timestamp: 'Just now',
      };

      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== postId),
        activity: [newActivity, ...state.activity],
      };
    }

    case 'POST_TOGGLE_LIKE': {
      const { postId } = action.payload;
      const updatedPosts = state.posts.map((p) => {
        if (p.id !== postId) return p;
        const alreadyLiked = p.likedBy?.includes(actorId);
        const newLikedBy = alreadyLiked
          ? p.likedBy.filter((id) => id !== actorId)
          : [...(p.likedBy || []), actorId];
        return {
          ...p,
          likedBy: newLikedBy,
          likesCount: Math.max(0, (p.likesCount || 0) + (alreadyLiked ? -1 : 1)),
        };
      });
      return { ...state, posts: updatedPosts };
    }


    case 'POST_ADD_COMMENT': {
      const { postId, content } = action.payload;
      if (!content || !content.trim()) return state;

      const newComment = {
        id: `c-${Date.now()}`,
        authorId: actorId,
        authorName: state.currentUser.name,
        content: content.trim(),
        createdAt: now,
      };

      const updatedPosts = state.posts.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comments: [...(p.comments || []), newComment],
        };
      });

      return { ...state, posts: updatedPosts };
    }

    // ==========================================
    // 5. CROPS MANAGER (CRUD FOR DASHBOARD)
    // ==========================================
    case 'CROP_CREATE': {
      const { crop } = action.payload;
      const newCrop = {
        ...crop,
        id: crop.id || `crop-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      };

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'crop',
        title: 'Added New Farm Crop',
        description: `Registered ${newCrop.area} of ${newCrop.name} into farm manager.`,
        timestamp: 'Just now',
      };

      return {
        ...state,
        crops: [newCrop, ...state.crops],
        activity: [newActivity, ...state.activity],
      };
    }

    case 'CROP_UPDATE': {
      const { crop } = action.payload;
      const updatedCrops = state.crops.map((c) =>
        c.id === crop.id ? { ...c, ...crop, updatedAt: now } : c
      );

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'crop',
        title: 'Updated Crop Health Record',
        description: `Updated status for ${crop.name} (${crop.health}).`,
        timestamp: 'Just now',
      };

      return {
        ...state,
        crops: updatedCrops,
        activity: [newActivity, ...state.activity],
      };
    }

    case 'CROP_DELETE': {
      const { cropId } = action.payload;
      const existing = state.crops.find((c) => c.id === cropId);

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'crop',
        title: 'Removed Crop Record',
        description: `Removed ${existing?.name || 'crop'} from farm monitoring.`,
        timestamp: 'Just now',
      };

      return {
        ...state,
        crops: state.crops.filter((c) => c.id !== cropId),
        activity: [newActivity, ...state.activity],
      };
    }

    // ==========================================
    // 6. SCHEME APPLICATIONS & STATUS PROGRESSION
    // ==========================================
    case 'SCHEME_APPLY': {
      const { application } = action.payload;
      const newApp = {
        ...application,
        id: application.id || `APP-${Date.now().toString().slice(-4)}`,
        status: 'Submitted',
        applicantName: state.currentUser.name,
        statusHistory: [
          { status: 'Submitted', timestamp: now, note: 'Online application submitted.' },
        ],
        submittedAt: now,
        updatedAt: now,
      };

      const newNotification = {
        id: `notif-${Date.now()}`,
        category: 'Schemes',
        title: `Scheme Application Filed`,
        message: `Application #${newApp.id} for "${newApp.schemeName}" successfully recorded.`,
        timestamp: 'Just now',
        unread: true,
        link: '/schemes',
      };

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'scheme',
        title: 'Applied for Govt Scheme',
        description: `Submitted application for ${newApp.schemeName}.`,
        timestamp: 'Just now',
      };

      return {
        ...state,
        applications: [newApp, ...state.applications],
        notifications: [newNotification, ...state.notifications],
        activity: [newActivity, ...state.activity],
      };
    }

    case 'SCHEME_REFRESH_STATUS': {
      const { applicationId } = action.payload;
      const app = state.applications.find((a) => a.id === applicationId);
      if (!app) return state;

      // Status progression: Submitted -> Under Review -> Approved/Rejected (deterministic)
      let nextStatus = app.status;
      let note = '';

      if (app.status === 'Submitted') {
        nextStatus = 'Under Review';
        note = 'Documents received and preliminary scrutiny initiated by Taluka office.';
      } else if (app.status === 'Under Review') {
        // Derive outcome deterministically from character code sum of ID
        const sum = applicationId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        nextStatus = sum % 3 === 0 ? 'Approved' : 'Approved'; // Default to Approved or Approved/Rejected
        note = nextStatus === 'Approved'
          ? 'Approved! Pre-sanction subsidy order issued. (Illustrative)'
          : 'Verification required. (Illustrative)';
      } else {
        return state; // Already terminal
      }

      const updatedApps = state.applications.map((a) => {
        if (a.id !== applicationId) return a;
        return {
          ...a,
          status: nextStatus,
          updatedAt: now,
          statusHistory: [
            ...(a.statusHistory || []),
            { status: nextStatus, timestamp: now, note },
          ],
        };
      });

      const newNotification = {
        id: `notif-${Date.now()}`,
        category: 'Schemes',
        title: `Scheme Status: ${nextStatus}`,
        message: `Application #${applicationId} status updated to ${nextStatus}.`,
        timestamp: 'Just now',
        unread: true,
        link: '/schemes',
      };

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'scheme',
        title: `Refreshed Application #${applicationId}`,
        description: `Status advanced to "${nextStatus}".`,
        timestamp: 'Just now',
      };

      return {
        ...state,
        applications: updatedApps,
        notifications: [newNotification, ...state.notifications],
        activity: [newActivity, ...state.activity],
      };
    }

    // ==========================================
    // 7. NOTIFICATIONS & WATCHLIST
    // ==========================================
    case 'NOTIFICATION_MARK_READ': {
      const { notificationId } = action.payload;
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === notificationId ? { ...n, unread: false } : n
        ),
      };
    }

    case 'NOTIFICATION_MARK_ALL_READ': {
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, unread: false })),
      };
    }

    case 'NOTIFICATION_DELETE': {
      const { notificationId } = action.payload;
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== notificationId),
      };
    }

    case 'WATCHLIST_TOGGLE': {
      const { commodityId } = action.payload;
      const isWatchlisted = state.watchlist.includes(commodityId);
      const newWatchlist = isWatchlisted
        ? state.watchlist.filter((id) => id !== commodityId)
        : [...state.watchlist, commodityId];

      return { ...state, watchlist: newWatchlist };
    }

    case 'WEATHER_ALERT_TRIGGER': {
      const { alert } = action.payload;
      if (state.viewedAlertIds?.includes(alert.id)) return state;

      const newNotification = {
        id: `notif-${alert.id}`,
        category: 'Weather',
        title: alert.title,
        message: alert.message,
        timestamp: 'Just now',
        unread: true,
        link: '/weather',
      };

      return {
        ...state,
        viewedAlertIds: [...(state.viewedAlertIds || []), alert.id],
        notifications: [newNotification, ...state.notifications],
      };
    }

    case 'PRICE_ALERT_TRIGGER': {
      const { commodity } = action.payload;
      const today = new Date().toISOString().slice(0, 10);
      const alertKey = `${commodity.id}_${today}`;
      if (state.priceAlertsIssued?.[alertKey]) return state;

      const newNotification = {
        id: `notif-${Date.now()}`,
        category: 'Prices',
        title: `Price Alert: ${commodity.commodity}`,
        message: `Watchlisted crop ${commodity.commodity} rate moved ${commodity.changePct > 0 ? '+' : ''}${commodity.changePct}% to ₹${commodity.modal.toLocaleString('en-IN')}/Qtl at ${commodity.mandi}.`,
        timestamp: 'Just now',
        unread: true,
        link: '/mandi-prices',
      };

      return {
        ...state,
        priceAlertsIssued: { ...state.priceAlertsIssued, [alertKey]: true },
        notifications: [newNotification, ...state.notifications],
      };
    }

    // ==========================================
    // 8. PROFILE & SETTINGS CRUD
    // ==========================================
    case 'PROFILE_UPDATE': {
      const { user } = action.payload;
      const updatedUser = { ...state.currentUser, ...user, updatedAt: now };

      const updatedUsers = state.users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'profile',
        title: 'Updated Farmer Profile',
        description: 'Personal details and farm specs updated.',
        timestamp: 'Just now',
      };

      return {
        ...state,
        currentUser: updatedUser,
        users: updatedUsers,
        activity: [newActivity, ...state.activity],
      };
    }

    case 'ADDRESS_ADD': {
      const { address } = action.payload;
      const newAddr = {
        ...address,
        id: `addr-${Date.now()}`,
      };
      const addresses = [...(state.currentUser.savedAddresses || []), newAddr];
      return {
        ...state,
        currentUser: { ...state.currentUser, savedAddresses: addresses },
      };
    }

    case 'ADDRESS_DELETE': {
      const { addressId } = action.payload;
      const addresses = state.currentUser.savedAddresses.filter((a) => a.id !== addressId);
      return {
        ...state,
        currentUser: { ...state.currentUser, savedAddresses: addresses },
      };
    }

    case 'PAYMENT_METHOD_ADD': {
      const { paymentMethod } = action.payload;
      const newPm = {
        ...paymentMethod,
        id: `pm-${Date.now()}`,
      };
      const methods = [...(state.currentUser.demoPaymentMethods || []), newPm];
      return {
        ...state,
        currentUser: { ...state.currentUser, demoPaymentMethods: methods },
      };
    }

    case 'PAYMENT_METHOD_DELETE': {
      const { paymentMethodId } = action.payload;
      const methods = state.currentUser.demoPaymentMethods.filter((p) => p.id !== paymentMethodId);
      return {
        ...state,
        currentUser: { ...state.currentUser, demoPaymentMethods: methods },
      };
    }

    // ==========================================
    // 9. CENTRAL RESET ACTION
    // ==========================================
    case 'RESET_DEMO_DATA': {
      return getInitialState();
    }

    default:
      return state;
  }
}
