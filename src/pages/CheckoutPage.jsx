import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckoutForm from '../components/Checkout/CheckoutForm'
import { saveCustomerOrder } from '../lib/supabase'
import { formatCurrency, generateWhatsAppLink } from '../lib/utils'

export default function CheckoutPage({ cartItems, onClearCart }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  })

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )

  const shipping = subtotal > 500 ? 0 : 25
  const total = subtotal + shipping

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    const cartProduct = cartItems[0]
    if (!cartProduct) {
      return
    }

    try {
      await saveCustomerOrder({
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          notes: formData.notes,
        },
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor,
          price: item.price,
          offerPercent: item.offerPercent ?? 0,
        })),
        total,
      })
    } catch (error) {
      console.error('Unable to save order to Supabase:', error)
    }

    const link = generateWhatsAppLink({
      product: cartProduct,
      quantity: cartProduct.quantity,
      selectedSize: cartProduct.selectedSize,
      selectedColor: cartProduct.selectedColor,
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      },
    })

    window.open(link, '_blank', 'noopener,noreferrer')
    onClearCart()
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Checkout</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Complete your order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <CheckoutForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Your order</h2>
          <div className="mt-6 space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-600">
                    {item.selectedColor} / {item.selectedSize} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-slate-900">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
