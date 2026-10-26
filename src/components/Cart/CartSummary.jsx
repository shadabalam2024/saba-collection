import { formatCurrency } from '../../lib/utils'

export default function CartSummary({ subtotal, shipping, total, onCheckout }) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Order Summary</h2>

      <div className="mt-6 space-y-4 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Proceed to Checkout
      </button>
    </aside>
  )
}
