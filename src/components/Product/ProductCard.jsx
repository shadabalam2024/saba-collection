import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { calculateDiscountedPrice, formatCurrency, getOfferLabel, getProductAvailability } from '../../lib/utils'

export default function ProductCard({ product, onAddToCart }) {
  const offerPercent = Number(product.offerPercent ?? 0)
  const hasOffer = offerPercent > 0
  const discountedPrice = calculateDiscountedPrice(product.price, offerPercent)
  const availability = getProductAvailability(product)

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {hasOffer && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            {getOfferLabel(offerPercent)}
          </span>
        )}
        <button
          type="button"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:text-rose-500"
          aria-label={`Save ${product.name}`}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            {product.category}
          </span>
          <span className={`text-sm font-medium ${availability.isAvailable ? 'text-emerald-600' : 'text-rose-600'}`}>
            {availability.status}
          </span>
        </div>

        <div>
          <Link to={`/product/${product.id}`} className="text-xl font-semibold text-slate-900 hover:text-slate-600">
            {product.name}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(discountedPrice)}</p>
            {hasOffer && <p className="text-sm text-slate-400 line-through">{formatCurrency(product.price)}</p>}
          </div>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={!availability.isAvailable}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <ShoppingBag className="h-4 w-4" />
            {availability.isAvailable ? 'Add to cart' : 'Sold out'}
          </button>
        </div>
      </div>
    </article>
  )
}
