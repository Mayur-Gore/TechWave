import { defaultUser, seedUsers } from './seedUsers';
import { seedProducts } from './seedProducts';
import { seedCropProblems } from './seedCropProblems';
import { seedWeatherData } from './seedWeather';
import { seedSchemes } from './seedSchemes';
import { seedMandiPrices } from './seedMandiPrices';
import { seedPosts } from './seedPosts';
import { seedNotifications } from './seedNotifications';
import { seedActivity } from './seedActivity';
import { seedArticles } from './seedArticles';
import { seedCrops } from './seedCrops';
import { seedOrders } from './seedOrders';
import { seedApplications } from './seedApplications';

export function getInitialState() {
  return {
    currentUser: { ...defaultUser },
    users: [...seedUsers],
    products: [...seedProducts],
    crops: [...seedCrops],
    orders: [...seedOrders],
    applications: [...seedApplications],
    posts: [...seedPosts],
    notifications: [...seedNotifications],
    activity: [...seedActivity],
    watchlist: ['mandi-veg-1', 'mandi-pls-1'],
    cart: [],
    viewedAlertIds: ['w-alert-pune-1'],
    priceAlertsIssued: {},
  };
}

export {
  defaultUser,
  seedUsers,
  seedProducts,
  seedCropProblems,
  seedWeatherData,
  seedSchemes,
  seedMandiPrices,
  seedPosts,
  seedNotifications,
  seedActivity,
  seedArticles,
  seedCrops,
  seedOrders,
  seedApplications,
};
