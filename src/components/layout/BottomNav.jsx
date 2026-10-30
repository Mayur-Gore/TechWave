import { NavLink } from 'react-router-dom';
import { Sprout, Store, Sparkles, CloudSun, User } from 'lucide-react';

export default function BottomNav({ t }) {
  const navItems = [
    { to: '/', label: t.nav.home, icon: Sprout },
    { to: '/marketplace', label: t.nav.marketplace, icon: Store },
    { to: '/ai-advisor', label: t.nav.aiAdvisor, icon: Sparkles },
    { to: '/weather', label: t.nav.weather, icon: CloudSun },
    { to: '/profile', label: t.nav.profile, icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg px-2 pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full min-h-[44px] transition-colors ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-1 rounded-full transition-transform ${
                    isActive ? 'bg-primary-light scale-110' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-[11px] mt-0.5 tracking-tight truncate max-w-[68px]">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
