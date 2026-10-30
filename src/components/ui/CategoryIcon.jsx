import { Sprout, ShieldAlert, Wrench, Tractor, Sparkles } from 'lucide-react';

export default function CategoryIcon({
  category,
  className = 'w-5 h-5',
  containerClassName = '',
}) {
  const normalized = (category || '').toLowerCase().trim();

  let Icon = Sprout;
  let bg = 'bg-green-100 text-green-700';

  if (normalized.includes('seed')) {
    Icon = Sprout;
    bg = 'bg-emerald-100 text-emerald-800';
  } else if (normalized.includes('fertiliz')) {
    Icon = Sparkles;
    bg = 'bg-amber-100 text-amber-800';
  } else if (normalized.includes('pesticid')) {
    Icon = ShieldAlert;
    bg = 'bg-rose-100 text-rose-800';
  } else if (normalized.includes('equip')) {
    Icon = Tractor;
    bg = 'bg-blue-100 text-blue-800';
  } else if (normalized.includes('tool')) {
    Icon = Wrench;
    bg = 'bg-amber-100 text-amber-900';
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg p-2 shrink-0 ${bg} ${containerClassName}`}
      aria-hidden="true"
    >
      <Icon className={className} />
    </div>
  );
}
