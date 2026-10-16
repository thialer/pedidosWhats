import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Clock, MapPin, ShoppingBag, Flame, Star } from 'lucide-react';
import { categories, products, storeConfig, type Product } from '../data/catalog';
import { ProductCard } from './ProductCard';
import { useCart, formatBRL } from '../cart/CartContext';

interface Props {
  onAddProduct: (p: Product) => void;
  onOpenCart: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export function MenuScreen({ onAddProduct, onOpenCart, favorites, onToggleFavorite }: Props) {
  const { count, subtotal } = useCart();
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('pizzas');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const updateActiveCategory = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const activationLine = (headerRef.current?.getBoundingClientRect().bottom ?? 180) + 12;
        const visibleSections = categories
          .map((category) => ({
            id: category.id,
            element: sectionRefs.current[category.id],
          }))
          .filter((section): section is { id: string; element: HTMLElement } => Boolean(section.element));

        if (visibleSections.length === 0) return;

        const current = visibleSections.reduce((active, section) => {
          return section.element.getBoundingClientRect().top <= activationLine
            ? section
            : active;
        }, visibleSections[0]);

        setActiveCat(current.id);
      });
    };

    window.addEventListener('scroll', updateActiveCategory, { passive: true });
    window.addEventListener('resize', updateActiveCategory);
    updateActiveCategory();

    return () => {
      window.removeEventListener('scroll', updateActiveCategory);
      window.removeEventListener('resize', updateActiveCategory);
      cancelAnimationFrame(frame);
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.customizations?.some((group) =>
          group.options.some((option) =>
            `${option.name} ${option.description ?? ''}`.toLowerCase().includes(q),
          ),
        ),
    );
  }, [query]);

  const byCategory = (catId: string) =>
    filtered.filter((p) => p.categoryId === catId);

  const popular = products.filter((p) => p.popular);
  const promos = products.filter((p) => p.badges?.includes('promocao'));

  const scrollToCat = (catId: string) => {
    setActiveCat(catId);
    const section = sectionRefs.current[catId];
    if (!section) return;
    const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
    const top = window.scrollY + section.getBoundingClientRect().top - headerHeight - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const open = true; // store open status — could be time-based

  return (
    <div className="pb-28">
      {/* Header */}
      <header className="shadow-soft">
        <div className="relative overflow-hidden">
          <img
            src="/plano.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-900/55 backdrop-blur-[3px]" />
          <div className="relative mx-auto max-w-3xl px-4 pt-4 pb-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="GLADIADORES DOG BURGUER"
                className="h-12 w-12 rounded-2xl object-cover bg-white/90 shadow-float"
              />
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-lg font-extrabold leading-tight text-white">
                  {storeConfig.name}
                </h1>
                <p className="truncate text-xs text-white/70">{storeConfig.tagline}</p>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                  open ? 'bg-brand-500/90 text-white' : 'bg-red-500/90 text-white'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${open ? 'bg-white animate-pulse' : 'bg-white'}`} />
                {open ? 'Aberto' : 'Fechado'}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/80">
              <span className="inline-flex items-center gap-1">
                <Clock size={13} /> {storeConfig.hours}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} /> {storeConfig.address}
              </span>
            </div>

          {/* Search */}
          <div className="relative mt-3">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar produto..."
              className="w-full rounded-2xl border border-white/30 bg-white/90 py-3.5 pl-11 pr-4 text-sm text-ink-900 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>
        </div>
      </header>

      {/* Category chips */}
      {!query && (
        <div ref={headerRef} className="sticky top-0 z-30 bg-white/95 shadow-soft backdrop-blur-md">
            <div className="mx-auto max-w-3xl px-4 py-2.5">
              <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5 sm:gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => scrollToCat(c.id)}
                    className={`flex min-h-9 items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-center text-[11px] font-semibold leading-tight transition active:scale-[0.98] sm:rounded-full sm:px-2.5 sm:text-xs ${
                      activeCat === c.id
                        ? 'bg-ink-900 text-white shadow-soft'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span aria-hidden="true">{c.emoji}</span>
                  <span className="line-clamp-2">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4">
        {/* Popular section */}
        {!query && popular.length > 0 && (
          <section className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <Star size={18} className="fill-accent-500 text-accent-500" />
              <h2 className="text-lg font-extrabold text-ink-900">Mais populares</h2>
            </div>
            <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
              {popular.map((p) => (
                <div key={p.id} className="w-44 shrink-0">
                  <ProductCard
                    product={p}
                    onAdd={onAddProduct}
                    isFavorite={favorites.includes(p.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Promos */}
        {!query && promos.length > 0 && (
          <section className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <Flame size={18} className="text-accent-500" />
              <h2 className="text-lg font-extrabold text-ink-900">Promoções</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {promos.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAdd={onAddProduct}
                  isFavorite={favorites.includes(p.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          </section>
        )}

        {/* Category sections */}
        {query ? (
          <section className="mt-6">
            <h2 className="mb-3 text-lg font-extrabold text-ink-900">
              Resultados ({filtered.length})
            </h2>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <Search size={40} className="text-gray-300" />
                <p className="mt-3 font-bold text-ink-900">Nada encontrado</p>
                <p className="text-sm text-gray-500">Tente outro termo.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAdd={onAddProduct}
                    isFavorite={favorites.includes(p.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          categories.map((cat) => {
            const list = byCategory(cat.id);
            if (list.length === 0) return null;
            return (
              <section
                key={cat.id}
                ref={(el) => {
                  sectionRefs.current[cat.id] = el;
                }}
                className="mt-8"
              >
                <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-ink-900">
                  <span>{cat.emoji}</span>
                  {cat.name}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {list.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onAdd={onAddProduct}
                      isFavorite={favorites.includes(p.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>

      {/* Floating cart */}
      {count > 0 && (
        <button
          onClick={onOpenCart}
          className="fixed inset-x-4 bottom-4 z-30 mx-auto flex max-w-3xl items-center justify-between rounded-2xl bg-brand-600 px-5 py-4 text-white shadow-float transition active:scale-[0.98] hover:bg-brand-700 animate-pop"
        >
          <span className="flex items-center gap-2">
            <span className="relative">
              <ShoppingBag size={22} />
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-accent-500 text-[11px] font-bold animate-badge-bounce">
                {count}
              </span>
            </span>
            <span className="font-bold">{count} {count === 1 ? 'item' : 'itens'}</span>
          </span>
          <span className="flex items-center gap-1 font-extrabold">
            {formatBRL(subtotal)}
          </span>
        </button>
      )}
    </div>
  );
}
