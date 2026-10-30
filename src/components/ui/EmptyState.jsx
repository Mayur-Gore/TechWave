import PillButton from './PillButton';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-card border border-dashed border-gray-200 ${className}`}>
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-primary mb-4">
          <Icon className="w-8 h-8" aria-hidden="true" />
        </div>
      )}
      <h3 className="text-lg font-heading font-semibold text-gray-900 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {actionText && onAction && (
        <PillButton onClick={onAction} variant="primary">
          {actionText}
        </PillButton>
      )}
    </div>
  );
}
