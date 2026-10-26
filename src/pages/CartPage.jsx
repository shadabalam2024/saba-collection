import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/Cart/CartItem'
import CartSummary from '../components/Cart/CartSummary'

export default function CartPage({ cartItems, onUpdateQuantity, onRemove, onCheckout }) {
  const navigate = useNavigate()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 25
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-3 text-slate-600">Start shopping for your next daily essential.</p>
        <Link
          to="/shop"
          className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Shopping bag</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Cart overview</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))}
        </div>

        <CartSummary
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          onCheckout={() => {
            onCheckout()
            navigate('/checkout')
          }}
        />
      </div>
    </div>
  )
}
