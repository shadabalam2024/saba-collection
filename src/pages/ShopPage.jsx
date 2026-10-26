import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import ProductGrid from '../components/Product/ProductGrid'
import { categories, products } from '../data/products'

export default function ShopPage({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceFilter, setPriceFilter] = useState('all')

  const filteredProducts = useMemo(() => {
    let result = products

    if (selectedCategory !== 'All') {
      result = result.filter((product) => product.category === selectedCategory)
    }

    if (priceFilter === 'under-150') {
      result = result.filter((product) => product.price < 150)
    }
    if (priceFilter === '150-250') {
      result = result.filter((product) => product.price >= 150 && product.price <= 250)
    }
    if (priceFilter === '250-plus') {
      result = result.filter((product) => product.price > 250)
    }

    return result
  }, [selectedCategory, priceFilter])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Collection</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Shop all styles</h1>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <SlidersHorizontal className="h-4 w-4 text-slate-600" />
          <select
            value={priceFilter}
            onChange={(event) => setPriceFilter(event.target.value)}
            className="border-none bg-transparent text-sm text-slate-700 outline-none"
          >
            <option value="all">All prices</option>
            <option value="under-150">Under AED 150</option>
            <option value="150-250">AED 150 - 250</option>
            <option value="250-plus">AED 250+</option>
          </select>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedCategory === category
                ? 'bg-slate-900 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-900'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} />
    </div>
  )
}
