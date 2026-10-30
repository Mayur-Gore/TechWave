export default function Skeleton({
  className = '',
  variant = 'text',
  count = 1,
}) {
  const base = 'animate-pulse bg-gray-200 rounded';

  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'w-12 h-12 rounded-full',
    card: 'h-48 w-full rounded-card',
    button: 'h-10 w-28 rounded-pill',
    chip: 'h-7 w-20 rounded-pill',
  };

  const items = Array.from({ length: count });

  return (
    <div role="status" aria-label="Loading..." className="space-y-2 w-full">
      {items.map((_, i) => (
        <div
          key={i}
          className={`${base} ${variants[variant] || variants.text} ${className}`}
        />
      ))}
      <span className="sr-only">Loading content...</span>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-card shadow-card border border-gray-100 p-4 space-y-3 animate-pulse">
      <div className="w-full h-36 bg-gray-200 rounded-lg" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-5 bg-gray-200 rounded w-4/5" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="flex items-center justify-between pt-2">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-9 bg-gray-200 rounded-pill w-24" />
      </div>
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-card shadow-card border border-gray-100 p-5 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="space-y-1.5 flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-3 bg-gray-200 rounded w-1/6" />
        </div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-8 bg-gray-200 rounded w-20" />
    </div>
  );
}
