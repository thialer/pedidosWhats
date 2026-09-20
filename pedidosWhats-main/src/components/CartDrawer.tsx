import { Trash2, Pencil, ShoppingBag, ArrowRight } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { useCart, formatBRL, summarizeSelections } from '../cart/CartContext';
import { QuantityStepper } from './QuantityStepper';
import { storeConfig } from '../data/catalog';

interface Props {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  onEdit: (uid: string) => void;
}

export function CartDrawer({ open, onClose, onContinue, onEdit }: Props) {
  const { items, updateQty, removeItem, subtotal, count } = useCart();

  return (
    <BottomSheet open={open} onClose={onClose} title={`Seu carrinho (${count})`}>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-gray-100">
            <ShoppingBag size={36} className="text-gray-300" />
          </div>
          <p className="mt-4 text-lg font-bold text-ink-900">Carrinho vazio</p>
          <p className="mt-1 text-sm text-gray-500">
            Adicione produtos do cardápio para começar seu pedido.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item) => {
              const sum = summarizeSelections(
                item.selections,
                item.product.customizations,
              );
              return (
                <div
                  key={item.uid}
                  className="flex gap-3 rounded-2xl bg-gray-50 p-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="truncate font-bold text-ink-900">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.uid)}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500 active:scale-90"
                        aria-label="Remover"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    {sum.length > 0 && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                        {sum.join(' · ')}
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-xs italic text-gray-400">"{item.notes}"</p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(d) => updateQty(item.uid, d)}
                        size="sm"
                      />
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onEdit(item.uid)}
                          className="grid h-7 w-7 place-items-center rounded-full text-gray-400 transition hover:bg-gray-200 active:scale-90"
                          aria-label="Editar"
                        >
                          <Pencil size={14} />
                        </button>
                        <span className="font-extrabold text-ink-900">
                          {formatBRL(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
            <Row label="Subtotal" value={formatBRL(subtotal)} />
            <Row
              label="Taxa de entrega"
              value={formatBRL(storeConfig.deliveryFee)}
              hint="estimada"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-base font-bold text-ink-900">Total</span>
              <span className="text-xl font-extrabold text-brand-700">
                {formatBRL(subtotal + storeConfig.deliveryFee)}
              </span>
            </div>
          </div>

          <button
            onClick={onContinue}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-4 text-base font-bold text-white shadow-float transition active:scale-[0.98] hover:bg-brand-700"
          >
            Continuar
            <ArrowRight size={18} />
          </button>
        </>
      )}
    </BottomSheet>
  );
}

function Row({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">
        {label}
        {hint && <span className="ml-1 text-xs text-gray-400">({hint})</span>}
      </span>
      <span className="font-semibold text-ink-900">{value}</span>
    </div>
  );
}
