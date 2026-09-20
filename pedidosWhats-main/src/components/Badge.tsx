import type { Badge as BadgeType } from '../data/catalog';

const config: Record<BadgeType, { label: string; className: string }> = {
  novo: {
    label: 'Novo',
    className: 'bg-brand-500 text-white',
  },
  promocao: {
    label: 'Promoção',
    className: 'bg-accent-500 text-white',
  },
  'mais-vendido': {
    label: 'Mais vendido',
    className: 'bg-ink-900 text-white',
  },
};

export function Badge({ type }: { type: BadgeType }) {
  const c = config[type];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide shadow-soft ${c.className}`}
    >
      {c.label}
    </span>
  );
}
