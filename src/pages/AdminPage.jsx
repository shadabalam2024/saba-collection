import { useMemo, useState } from 'react'
import { LogOut, Package, ShoppingCart, UserCircle2 } from 'lucide-react'
import AdminLogin from '../components/Admin/AdminLogin'
import OrdersList from '../components/Admin/OrdersList'
import ProductManager from '../components/Admin/ProductManager'
import { products, sampleOrders } from '../data/products'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [allProducts, setAllProducts] = useState(products)
  const [orders, setOrders] = useState(sampleOrders)

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.total), 0),
    [orders],
  )

  const handleLogin = ({ email, password }) => {
    if (email && password) {
      setIsAuthenticated(true)
    }
  }

  const handleStatusChange = (orderId, nextStatus) => {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status: nextStatus } : order)),
    )
  }

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: 'New Collection Item',
      description: 'Freshly added product for your storefront.',
      price: 149,
      category: 'Men',
      image:
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      stock: 10,
      offerPercent: 0,
      isOutOfStock: false,
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'White'],
      featured: false,
    }

    setAllProducts((current) => [newProduct, ...current])
  }

  const handleEditProduct = (product) => {
    const updated = {
      ...product,
      price: product.price + 20,
      name: `${product.name} Updated`,
    }

    setAllProducts((current) =>
      current.map((item) => (item.id === product.id ? updated : item)),
    )
  }

  const handleApplyOffer = (productId, percent) => {
    const nextPercent = Math.max(0, Math.min(100, Number(percent) || 0))

    setAllProducts((current) =>
      current.map((product) =>
        product.id === productId ? { ...product, offerPercent: nextPercent } : product,
      ),
    )
  }

  const handleToggleStock = (productId) => {
    setAllProducts((current) =>
      current.map((product) => {
        if (product.id !== productId) {
          return product
        }

        const nextOutOfStock = !product.isOutOfStock
        return {
          ...product,
          isOutOfStock: nextOutOfStock,
          stock: nextOutOfStock ? 0 : Math.max(product.stock || 10, 1),
        }
      }),
    )
  }

  const handleDeleteProduct = (productId) => {
    setAllProducts((current) => current.filter((product) => product.id !== productId))
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <AdminLogin onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Admin overview</h1>
        </div>
        <button
          type="button"
          onClick={() => setIsAuthenticated(false)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total revenue</p>
            <ShoppingCart className="h-5 w-5 text-slate-700" />
          </div>
          <p className="mt-6 text-3xl font-bold text-slate-900">AED {totalRevenue.toFixed(2)}</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Orders</p>
            <Package className="h-5 w-5 text-slate-700" />
          </div>
          <p className="mt-6 text-3xl font-bold text-slate-900">{orders.length}</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Products</p>
            <UserCircle2 className="h-5 w-5 text-slate-700" />
          </div>
          <p className="mt-6 text-3xl font-bold text-slate-900">{allProducts.length}</p>
        </div>
      </div>

      <ProductManager
        products={allProducts}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onApplyOffer={handleApplyOffer}
        onToggleStock={handleToggleStock}
      />

      <OrdersList orders={orders} onStatusChange={handleStatusChange} />
    </div>
  )
}
