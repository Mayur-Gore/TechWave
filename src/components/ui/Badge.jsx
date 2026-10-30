export default function Badge({
  children,
  variant = 'default',
  icon: Icon,
  size = 'md',
  className = '',
}) {
  const variants = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    primary: 'bg-primary-light text-primary-dark border-green-200',
    success: 'bg-success-light text-success-dark border-green-200',
    warning: 'bg-warning-light text-warning-dark border-amber-300 font-medium',
    danger: 'bg-danger-light text-danger-dark border-red-200',
    amber: 'bg-amber-light text-amber-dark border-amber-300 font-medium',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-1.5 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-pill border ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}
