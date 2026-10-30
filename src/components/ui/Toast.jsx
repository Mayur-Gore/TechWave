import { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-2 sm:px-0"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const duration = toast.duration || 4500;
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const typeConfig = {
    success: {
      bg: 'bg-green-50 border-success text-green-900',
      icon: CheckCircle2,
      iconColor: 'text-success',
      live: 'polite',
    },
    error: {
      bg: 'bg-red-50 border-danger text-red-900',
      icon: AlertCircle,
      iconColor: 'text-danger',
      live: 'assertive',
    },
    warning: {
      bg: 'bg-amber-50 border-amber text-amber-900',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      live: 'polite',
    },
    info: {
      bg: 'bg-blue-50 border-blue-400 text-blue-900',
      icon: Info,
      iconColor: 'text-blue-600',
      live: 'polite',
    },
  };

  const current = typeConfig[toast.type] || typeConfig.info;
  const Icon = current.icon;

  return (
    <div
      role="status"
      aria-live={current.live}
      className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-card border shadow-card transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${current.bg}`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${current.iconColor}`} aria-hidden="true" />
      <div className="flex-1 text-sm font-medium pr-1">
        {toast.title && <p className="font-semibold">{toast.title}</p>}
        <p className="text-xs sm:text-sm text-gray-800 break-words">{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="p-1 -mr-1 -mt-1 rounded-full text-gray-500 hover:text-gray-900 hover:bg-black/5 min-w-[32px] min-h-[32px] flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
