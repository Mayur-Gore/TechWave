import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Landmark,
  TrendingUp,
  LayoutDashboard,
  Users,
  Bell,
  RotateCcw,
  Sprout
} from 'lucide-react';


export default function SecondaryMenuDrawer({
  isOpen,
  onClose,
  unreadCount = 0,
  language = 'en',
  onLanguageChange,
  onResetClick,
  t,
}) {
  const drawerRef = useRef(null);

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

  const navigate = useNavigate();

  if (!isOpen) return null;

  const menuItems = [
    { to: '/schemes', label: t.nav.schemes, icon: Landmark, desc: 'Central & State subsidies' },
    { to: '/mandi-prices', label: t.nav.mandiPrices, icon: TrendingUp, desc: 'Daily market rates' },
    { to: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard, desc: 'Farmer farm overview' },
    { to: '/community', label: t.nav.community, icon: Users, desc: 'Farmer peer network' },
    {
      to: '/notifications',
      label: t.common.notifications,
      icon: Bell,
      desc: 'Alerts and updates',
      badge: unreadCount > 0 ? unreadCount : null,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="presentation">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Farmer Services Menu"
          className="w-screen max-w-xs sm:max-w-sm bg-white shadow-xl flex flex-col justify-between overflow-y-auto"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                <Sprout className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-heading font-bold text-gray-900">
                {t.appName}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 sm:p-5 space-y-2 flex-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {t.home.quickServices}
            </p>
            {menuItems.map((item) => (
              <button
                key={item.to}
                type="button"
                onClick={() => {
                  onClose();
                  navigate(item.to);
                }}
                className="w-full flex items-center justify-between p-3 rounded-card hover:bg-primary-light/40 transition-colors text-left border border-gray-100 min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-light text-primary shrink-0">
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-900 block">
                      {item.label}
                    </span>
                    <span className="text-xs text-gray-500 block">
                      {item.desc}
                    </span>
                  </div>
                </div>
                {item.badge && (
                  <span className="bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            {/* Language Switcher in Drawer */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Language / भाषा
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'mr', label: 'मराठी' },
                  { code: 'hi', label: 'हिन्दी' },
                ].map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => onLanguageChange(l.code)}
                    className={`min-h-[44px] px-2 py-2 text-xs font-medium rounded-lg border text-center transition-colors ${
                      language === l.code
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Reset & Demo notice */}
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onResetClick) onResetClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 min-h-[44px] text-xs font-semibold text-danger border border-red-200 rounded-pill hover:bg-red-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.common.resetData}</span>
            </button>
            <p className="text-[11px] text-center text-gray-400">
              {t.tagline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
