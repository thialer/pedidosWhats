import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Product, CustomizationGroup } from '../data/catalog';

export interface CartSelection {
  [groupId: string]: string[];
}

export interface CartItem {
  uid: string;
  product: Product;
  quantity: number;
  selections: CartSelection;
  notes: string;
  unitPrice: number;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (uid: string, delta: number) => void;
  removeItem: (uid: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const key = (i: CartItem) =>
        `${i.product.id}|${JSON.stringify(i.selections)}|${i.notes}`;
      const incomingKey = key(item);
      const existing = prev.find((i) => key(i) === incomingKey);
      if (existing) {
        return prev.map((i) =>
          i.uid === existing.uid
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }
      return [...prev, item];
    });
  };

  const updateQty = (uid: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.uid === uid ? { ...i, quantity: i.quantity + delta } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  };

  const removeItem = (uid: string) =>
    setItems((prev) => prev.filter((i) => i.uid !== uid));

  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((s, i) => s + i.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.unitPrice * i.quantity, 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    addItem,
    updateQty,
    removeItem,
    clear,
    count,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function computeUnitPrice(
  product: Product,
  selections: CartSelection,
  groups: CustomizationGroup[] = [],
): number {
  let price = product.price;
  for (const group of groups) {
    const chosen = selections[group.id] || [];
    for (const optId of chosen) {
      const opt = group.options.find((o) => o.id === optId);
      if (opt?.price) price += opt.price;
    }
  }
  return price;
}

export function summarizeSelections(
  selections: CartSelection,
  groups: CustomizationGroup[] = [],
): string[] {
  const lines: string[] = [];
  for (const group of groups) {
    if (group.id === 'notes') continue;
    const chosen = selections[group.id] || [];
    if (chosen.length === 0) continue;
    const names = chosen
      .map((id) => group.options.find((o) => o.id === id)?.name)
      .filter(Boolean) as string[];
    if (group.id === 'remove') {
      lines.push(`Sem ${names.join(', ')}`);
    } else if (group.type === 'single') {
      lines.push(`${group.title}: ${names[0]}`);
    } else {
      lines.push(`+ ${names.join(', ')}`);
    }
  }
  return lines;
}
