import { Star, Plus } from 'lucide-react';
import type { Product } from '../data/catalog';
import { formatBRL } from '../cart/CartContext';
import { Badge } from './Badge';

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function ProductCard({ product, onAdd, isFavorite, onToggleFavorite }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-soft transition hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.badges?.map((b) => (
            <Badge key={b} type={b} />
          ))}
        </div>
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gray-600 shadow-soft backdrop-blur transition active:scale-90 hover:text-accent-500"
          aria-label="Favoritar"
        >
          <Star
            size={18}
            className={isFavorite ? 'fill-accent-500 text-accent-500' : ''}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold leading-tight text-ink-900">{product.name}</h3>
          {product.rating && (
            <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-gray-500">
              <Star size={12} className="fill-accent-500 text-accent-500" />
              {product.rating.toFixed(1)}
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
          <span className="text-lg font-extrabold text-ink-900">
            {formatBRL(product.price)}
          </span>
          <button
            onClick={() => onAdd(product)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-600 px-3 py-2 text-xs font-bold text-white shadow-soft transition active:scale-95 hover:bg-brand-700 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <Plus size={16} />
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
