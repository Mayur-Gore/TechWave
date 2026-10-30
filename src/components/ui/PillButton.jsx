import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const PillButton = forwardRef(function PillButton(
  {
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className = '',
    type = 'button',
    icon: Icon,
    iconPosition = 'left',
    ariaLabel,
    ...props
  },
  ref
) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 select-none disabled:opacity-50 disabled:pointer-events-none rounded-pill active:scale-[0.98] duration-150';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-hover focus-visible:outline-primary shadow-sm',
    secondary:
      'bg-primary-light text-primary-dark hover:bg-green-100 focus-visible:outline-primary',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:outline-primary',
    amber:
      'bg-amber text-gray-900 hover:bg-amber-hover focus-visible:outline-amber-dark font-semibold shadow-sm',
    danger:
      'bg-danger text-white hover:bg-red-700 focus-visible:outline-danger shadow-sm',
    dangerOutline:
      'border-2 border-danger text-danger hover:bg-danger hover:text-white focus-visible:outline-danger',
    ghost:
      'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-gray-400',
    white:
      'bg-white text-primary hover:bg-gray-50 border border-gray-200 shadow-sm focus-visible:outline-primary',
  };

  const sizes = {
    sm: 'min-h-[38px] px-3.5 py-1.5 text-xs gap-1.5',
    md: 'min-h-[44px] px-5 py-2.5 text-sm gap-2',
    lg: 'min-h-[48px] px-6 py-3 text-base gap-2.5',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading ? 'true' : undefined}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
        </>
      )}
    </button>
  );
});

export default PillButton;
