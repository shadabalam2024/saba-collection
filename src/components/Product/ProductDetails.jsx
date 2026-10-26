import { useState } from 'react'
import { Minus, Plus, ShoppingBag, Truck } from 'lucide-react'
import {
  calculateDiscountedPrice,
  formatCurrency,
  generateWhatsAppLink,
  getOfferLabel,
  getProductAvailability,
} from '../../lib/utils'

export default function ProductDetails({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Black')
  const [quantity, setQuantity] = useState(1)

  const offerPercent = Number(product.offerPercent ?? 0)
  const effectivePrice = calculateDiscountedPrice(product.price, offerPercent)
  const availability = getProductAvailability(product)

  const handleAddToCart = () => {
    if (!availability.isAvailable) {
      return
    }

    onAddToCart({ ...product, selectedSize, selectedColor, quantity, offerPercent })
  }

  const whatsappLink = generateWhatsAppLink({
    product: { ...product, offerPercent },
    quantity,
    selectedSize,
    selectedColor,
    customer: {
      name: 'Customer Name',
      phone: 'Your Phone',
      email: 'you@example.com',
    },
  })

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <img src={product.image} alt={product.name} className="h-full min-h-[540px] w-full object-cover" />
      </div>

      <div className="space-y-6 py-4">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">{product.name}</h1>
          <p className="text-lg text-slate-600">{product.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-3xl font-bold text-slate-900">{formatCurrency(effectivePrice)}</p>
          {offerPercent > 0 && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-700">
              {getOfferLabel(offerPercent)}
            </span>
          )}
          <span
            className={`rounded-full px-2.5 py-1 text-sm font-medium ${
              availability.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}
          >
            {availability.status}
          </span>
        </div>

        {offerPercent > 0 && <p className="text-sm text-slate-400 line-through">{formatCurrency(product.price)}</p>}

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes?.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                  selectedSize === size
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-slate-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">Color</p>
          <div className="flex flex-wrap gap-2">
            {product.colors?.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                  selectedColor === color
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-slate-900'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">Quantity</p>
          <div className="flex items-center overflow-hidden rounded-full border border-slate-300 bg-white">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="flex h-10 w-10 items-center justify-center text-slate-700"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-12 text-center text-sm font-medium text-slate-800">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="flex h-10 w-10 items-center justify-center text-slate-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!availability.isAvailable}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <ShoppingBag className="h-4 w-4" />
            {availability.isAvailable ? 'Add to Cart' : 'Sold out'}
          </button>

          <a
            href={availability.isAvailable ? whatsappLink : '#'}
            target={availability.isAvailable ? '_blank' : undefined}
            rel={availability.isAvailable ? 'noreferrer' : undefined}
            onClick={(event) => !availability.isAvailable && event.preventDefault()}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white transition ${
              availability.isAvailable ? 'bg-emerald-500 hover:bg-emerald-600' : 'cursor-not-allowed bg-slate-300'
            }`}
          >
            Order via WhatsApp
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <div className="flex items-center gap-2 font-medium text-slate-800">
            <Truck className="h-4 w-4" />
            Free delivery in UAE for orders above AED 500.
          </div>
        </div>
      </div>
    </div>
  )
}
