import { Minus, Plus } from 'lucide-react';

interface Props {
  value: number;
  onChange: (delta: number) => void;
  size?: 'sm' | 'md';
}

export function QuantityStepper({ value, onChange, size = 'md' }: Props) {
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1">
      <button
        onClick={() => onChange(-1)}
        disabled={value <= 1}
        className={`grid ${dim} place-items-center rounded-full bg-white text-ink-900 shadow-soft transition active:scale-90 disabled:opacity-40 disabled:shadow-none`}
        aria-label="Diminuir"
      >
        <Minus size={16} />
      </button>
      <span className="min-w-[2rem] text-center text-base font-bold tabular-nums">
        {value}
      </span>
      <button
        onClick={() => onChange(1)}
        className={`grid ${dim} place-items-center rounded-full bg-brand-600 text-white shadow-soft transition active:scale-90 hover:bg-brand-700`}
        aria-label="Aumentar"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
