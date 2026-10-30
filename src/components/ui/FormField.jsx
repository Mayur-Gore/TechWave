import { forwardRef } from 'react';

const FormField = forwardRef(function FormField(
  {
    id,
    label,
    error,
    hint,
    required = false,
    as = 'input',
    type = 'text',
    children,
    className = '',
    inputClassName = '',
    ...props
  },
  ref
) {
  const inputId = id || `field-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substring(2, 9)}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const Component = as;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-danger" aria-hidden="true">*</span>}
          {required && <span className="sr-only">(required)</span>}
        </label>
      )}

      <Component
        ref={ref}
        id={inputId}
        type={as === 'input' ? type : undefined}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          [error ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
        required={required}
        className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 bg-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:text-gray-400 ${
          error ? 'border-danger focus:ring-danger focus:border-danger' : 'border-gray-300'
        } ${inputClassName}`}
        {...props}
      >
        {children}
      </Component>

      {hint && !error && (
        <p id={hintId} className="text-xs text-gray-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs text-danger font-medium flex items-center gap-1">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

export default FormField;
