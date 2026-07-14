import { useState } from 'react';
import { CartProvider, useCart, type CartItem, type CartSelection } from './cart/CartContext';
import { ToastProvider, useToast } from './components/Toast';
import { MenuScreen } from './components/MenuScreen';
import { ProductSheet } from './components/ProductSheet';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutScreen } from './components/CheckoutScreen';
import type { Product } from './data/catalog';

type Screen = 'menu' | 'checkout';

function Shell() {
  const { addItem, items, updateQty } = useCart();
  const toast = useToast();

  const [screen, setScreen] = useState<Screen>('menu');
  const [sheetProduct, setSheetProduct] = useState<Product | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetDefaults, setSheetDefaults] = useState<{
    quantity: number;
    selections: CartSelection;
    notes: string;
  }>({ quantity: 1, selections: {}, notes: '' });
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const openProduct = (p: Product) => {
    if (!p.customizations?.length) {
      const item: CartItem = {
        uid: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        product: p,
        quantity: 1,
        selections: {},
        notes: '',
        unitPrice: p.price,
      };
      addItem(item);
      toast.show(`${p.name} adicionado!`);
      return;
    }

    setSheetProduct(p);
    setSheetDefaults({ quantity: 1, selections: {}, notes: '' });
    setSheetOpen(true);
  };

  const handleConfirm = (
    quantity: number,
    selections: CartSelection,
    notes: string,
    unitPrice: number,
  ) => {
    if (!sheetProduct) return;
    const item: CartItem = {
      uid: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      product: sheetProduct,
      quantity,
      selections,
      notes,
      unitPrice,
    };
    addItem(item);
    setSheetOpen(false);
    setSheetProduct(null);
    setSheetDefaults({ quantity: 1, selections: {}, notes: '' });
    toast.show(`${sheetProduct.name} adicionado!`);
  };

  const toggleFavorite = (id: string) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const handleEdit = (uid: string) => {
    const item = items.find((i) => i.uid === uid);
    if (!item) return;
    setSheetProduct(item.product);
    setSheetDefaults({
      quantity: item.quantity,
      selections: item.selections,
      notes: item.notes,
    });
    setSheetOpen(true);
    // remove current so re-add replaces cleanly
    updateQty(uid, -item.quantity);
  };

  if (screen === 'checkout') {
    return <CheckoutScreen onBack={() => setScreen('menu')} />;
  }

  return (
    <>
      <MenuScreen
        onAddProduct={openProduct}
        onOpenCart={() => setCartOpen(true)}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
      <ProductSheet
        product={sheetProduct}
        open={sheetOpen}
        defaultQuantity={sheetDefaults.quantity}
        defaultSelections={sheetDefaults.selections}
        defaultNotes={sheetDefaults.notes}
        onClose={() => {
          setSheetOpen(false);
          setSheetProduct(null);
          setSheetDefaults({ quantity: 1, selections: {}, notes: '' });
        }}
        onConfirm={handleConfirm}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onContinue={() => {
          setCartOpen(false);
          setScreen('checkout');
        }}
        onEdit={(uid) => {
          setCartOpen(false);
          handleEdit(uid);
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Shell />
      </CartProvider>
    </ToastProvider>
  );
}
