import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import SecondaryMenuDrawer from './SecondaryMenuDrawer';
import Footer from './Footer';
import Toast from '../ui/Toast';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useApp } from '../../context/AppContext';

export default function AppLayout({ onOpenCart }) {
  const {
    unreadNotificationsCount,
    cartItemsCount,
    language,
    changeLanguage,
    resetDemoData,
    toasts,
    removeToast,
    t,
  } = useApp();

  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-bgPage text-gray-900">
      {/* Skip to main content accessibility link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Desktop & Mobile Header */}
      <Navbar
        unreadCount={unreadNotificationsCount}
        cartCount={cartItemsCount}
        language={language}
        onLanguageChange={changeLanguage}
        onOpenSecondaryMenu={() => setIsSecondaryMenuOpen(true)}
        onOpenCart={onOpenCart}
        onResetClick={() => setIsResetConfirmOpen(true)}
        t={t}
      />

      {/* Main Content Area (padding-bottom for mobile sticky bottom nav) */}
      <main
        id="main-content"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 focus:outline-none"
        tabIndex={-1}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer onResetClick={() => setIsResetConfirmOpen(true)} t={t} />

      {/* Mobile Sticky Bottom Tab Bar */}
      <BottomNav t={t} />

      {/* Mobile Secondary Menu Drawer */}
      <SecondaryMenuDrawer
        isOpen={isSecondaryMenuOpen}
        onClose={() => setIsSecondaryMenuOpen(false)}
        unreadCount={unreadNotificationsCount}
        language={language}
        onLanguageChange={changeLanguage}
        onResetClick={() => setIsResetConfirmOpen(true)}
        t={t}
      />

      {/* Central Reset Demo Data Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={() => {
          resetDemoData();
          setIsResetConfirmOpen(false);
        }}
        title="Reset Demo Data?"
        message="This will reset all crops, orders, listings, applications, posts and profile details back to the verified seed state. Are you sure you want to proceed?"
        confirmText="Yes, Reset Everything"
        cancelText="Cancel"
      />

      {/* Live accessible Toasts */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
