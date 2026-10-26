import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatCurrency } from '../../lib/utils'

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const total = item.price * item.quantity

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
      <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover" />
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
        <p className="text-sm text-slate-600">
          {item.selectedColor || 'Default'} / {item.selectedSize || 'One Size'}
        </p>
        <p className="text-sm font-medium text-slate-800">{formatCurrency(item.price)}</p>
      </div>

      <div className="flex items-center justify-between gap-4 sm:min-w-[220px]">
        <div className="flex items-center overflow-hidden rounded-full border border-slate-300 bg-slate-50">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="flex h-9 w-9 items-center justify-center text-slate-700"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-10 text-center text-sm font-medium text-slate-800">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="flex h-9 w-9 items-center justify-center text-slate-700"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-slate-900">{formatCurrency(total)}</p>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="mt-2 inline-flex items-center gap-1 text-sm text-rose-500"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
