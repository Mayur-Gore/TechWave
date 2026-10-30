import { forwardRef } from 'react';

const Card = forwardRef(function Card(
  {
    children,
    as: Component = 'div',
    className = '',
    hoverable = false,
    padded = true,
    ...props
  },
  ref
) {
  return (
    <Component
      ref={ref}
      className={`bg-white rounded-card shadow-card border border-gray-100 ${
        hoverable ? 'transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5' : ''
      } ${padded ? 'p-4 sm:p-6' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Card;
