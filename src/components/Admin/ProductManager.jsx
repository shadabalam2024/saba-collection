import { Pencil, Plus, Trash2 } from 'lucide-react'

export default function ProductManager({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onApplyOffer,
  onToggleStock,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Catalog</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Manage Products</h2>
        </div>
        <button
          type="button"
          onClick={onAddProduct}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          New product
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center">
            <img src={product.image} alt={product.name} className="h-20 w-20 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
              <p className="text-sm text-slate-600">{product.category}</p>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={product.offerPercent ?? 0}
                  onChange={(event) => onApplyOffer(product.id, event.target.value)}
                  className="w-20 rounded-full border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
                />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">%</span>
                <button
                  type="button"
                  onClick={() => onApplyOffer(product.id, product.offerPercent ?? 0)}
                  className="rounded-full bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-700"
                >
                  Offer
                </button>
              </div>

              <button
                type="button"
                onClick={() => onToggleStock(product.id)}
                className={`rounded-full px-3 py-2 text-xs font-semibold ${
                  product.isOutOfStock
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {product.isOutOfStock ? 'Set in stock' : 'Out of stock'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEditProduct(product)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDeleteProduct(product.id)}
                className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
