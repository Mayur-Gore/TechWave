import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({
  title,
  subtitle,
  badge,
  action,
  backTo,
  backLabel = 'Back',
  className = '',
}) {
  const navigate = useNavigate();

  return (
    <div className={`mb-6 sm:mb-8 ${className}`}>
      {backTo && (
        <button
          type="button"
          onClick={() => (backTo === -1 ? navigate(-1) : navigate(backTo))}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary transition-colors mb-2 min-h-[36px] -ml-1 px-1 rounded focus-visible:outline-primary"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{backLabel}</span>
        </button>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 tracking-tight">
              {title}
            </h1>
            {badge}
          </div>
          {subtitle && (
            <p className="text-sm sm:text-base text-gray-600 mt-1 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
