import { useRef } from 'react';

export default function Tabs({
  tabs,
  activeTab,
  onChange,
  className = '',
  ariaLabel = 'Content tabs',
}) {
  const tabsRef = useRef([]);

  const handleKeyDown = (e, index) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    onChange(tabs[newIndex].id);
    if (tabsRef.current[newIndex]) {
      tabsRef.current[newIndex].focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`flex items-center gap-1 sm:gap-2 border-b border-gray-200 overflow-x-auto no-scrollbar py-1 ${className}`}
    >
      {tabs.map((tab, idx) => {
        const isSelected = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            ref={(el) => (tabsRef.current[idx] = el)}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isSelected}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors duration-150 rounded-t-lg focus-visible:outline-primary ${
              isSelected
                ? 'border-primary text-primary font-semibold bg-primary-light/40'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
