import { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import type { Product, CustomizationGroup } from '../data/catalog';
import { BottomSheet } from './BottomSheet';
import { QuantityStepper } from './QuantityStepper';
import { formatBRL, computeUnitPrice, type CartSelection } from '../cart/CartContext';

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (quantity: number, selections: CartSelection, notes: string, unitPrice: number) => void;
  defaultQuantity?: number;
  defaultSelections?: CartSelection;
  defaultNotes?: string;
}

export function ProductSheet({
  product,
  open,
  onClose,
  onConfirm,
  defaultQuantity = 1,
  defaultSelections = {},
  defaultNotes = '',
}: Props) {
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [selections, setSelections] = useState<CartSelection>(defaultSelections);
  const [notes, setNotes] = useState(defaultNotes);

  useEffect(() => {
    if (!open) return;
    setQuantity(defaultQuantity);
    setSelections(defaultSelections);
    setNotes(defaultNotes);
  }, [product?.id, open, defaultQuantity, defaultSelections, defaultNotes]);

  const groups = product?.customizations ?? [];

  const toggle = (groupId: string, optionId: string, type: 'single' | 'multi', max?: number) => {
    setSelections((prev) => {
      const current = prev[groupId] || [];
      if (type === 'single') {
        return { ...prev, [groupId]: [optionId] };
      }
      if (current.includes(optionId)) {
        return { ...prev, [groupId]: current.filter((x) => x !== optionId) };
      }
      if (max && current.length >= max) return prev;
      return { ...prev, [groupId]: [...current, optionId] };
    });
  };

  const unitPrice = useMemo(
    () => (product ? computeUnitPrice(product, selections, groups) : 0),
    [product, selections, groups],
  );

  const canConfirm = useMemo(() => {
    if (!product) return false;
    for (const g of groups) {
      if (g.required && (selections[g.id] || []).length === 0) return false;
    }
    return true;
  }, [product, groups, selections]);

  const handleConfirm = () => {
    if (!product || !canConfirm) return;
    onConfirm(quantity, selections, notes, unitPrice);
    setQuantity(1);
    setSelections({});
    setNotes('');
  };

  const close = () => {
    setQuantity(1);
    setSelections({});
    setNotes('');
    onClose();
  };

  if (!product) return null;

  return (
    <BottomSheet open={open} onClose={close}>
      <div className="-mx-5 -mt-1">
        <div className="relative h-44 w-full overflow-hidden sm:rounded-t-3xl">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-5 right-5 text-white">
            <h2 className="text-2xl font-extrabold leading-tight">{product.name}</h2>
            <p className="text-sm text-white/90">{product.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-extrabold text-ink-900">
          {formatBRL(product.price)}
        </span>
        <QuantityStepper
          value={quantity}
          onChange={(delta) => setQuantity((current) => Math.max(1, current + delta))}
        />
      </div>

      <div className="mt-5 space-y-5">
        {groups.map((group) => (
          <GroupBlock
            key={group.id}
            group={group}
            selected={selections[group.id] || []}
            onToggle={(optId) => toggle(group.id, optId, group.type, group.max)}
            isNotes={group.id === 'notes'}
            notes={notes}
            onNotes={setNotes}
          />
        ))}
      </div>

      <div className="sticky bottom-0 mt-6 -mx-5 -mb-6 bg-white/95 px-5 py-4 pb-safe backdrop-blur border-t border-gray-100">
        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="flex w-full items-center justify-between rounded-2xl bg-brand-600 px-5 py-4 text-white shadow-float transition active:scale-[0.98] hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          <span className="text-base font-bold">
            {canConfirm ? 'Adicionar ao pedido' : 'Preencha os obrigatórios'}
          </span>
          <span className="text-base font-extrabold">
            {formatBRL(unitPrice * quantity)}
          </span>
        </button>
      </div>
    </BottomSheet>
  );
}

function GroupBlock({
  group,
  selected,
  onToggle,
  isNotes,
  notes,
  onNotes,
}: {
  group: CustomizationGroup;
  selected: string[];
  onToggle: (id: string) => void;
  isNotes: boolean;
  notes: string;
  onNotes: (v: string) => void;
}) {
  if (isNotes) {
    return (
      <div>
        <div className="mb-2 flex items-center gap-2">
          <h4 className="font-bold text-ink-900">{group.title}</h4>
        </div>
        <textarea
          value={notes}
          onChange={(e) => onNotes(e.target.value)}
          placeholder="Ex.: Sem molho, ponto da carne, etc."
          rows={2}
          className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <h4 className="font-bold text-ink-900">{group.title}</h4>
        {group.required ? (
          <span className="rounded-full bg-accent-100 px-2 py-0.5 text-[11px] font-bold text-accent-700">
            Obrigatório
          </span>
        ) : (
          <span className="text-xs text-gray-400">Opcional</span>
        )}
      </div>
      <div className="space-y-2">
        {group.options.map((opt) => {
          const active = selected.includes(opt.id);
          const isSingle = group.type === 'single';
          return (
            <button
              key={opt.id}
              onClick={() => onToggle(opt.id)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition active:scale-[0.99] ${
                active
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-5 w-5 place-items-center border-2 transition ${
                    active
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-gray-300'
                  } ${isSingle ? 'rounded-full' : 'rounded-md'}`}
                >
                  {active && <Check size={12} strokeWidth={3} />}
                </span>
                <span className="text-sm font-semibold text-ink-900">{opt.name}</span>
              </div>
              {opt.price ? (
                <span className="text-sm font-bold text-brand-700">
                  + {formatBRL(opt.price)}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
