import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useMemo } from 'react'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'
import { useLocalStorage } from './hooks/useLocalStorage'
import { calculateDiscountedPrice } from './lib/utils'

function App() {
  const [cartItems, setCartItems] = useLocalStorage('saba-cart', [])

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const addToCart = (product) => {
    const discountedPrice = calculateDiscountedPrice(product.price, product.offerPercent ?? 0)
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
      quantity: product.quantity || 1,
      selectedSize: product.selectedSize || product.sizes?.[0] || 'M',
      selectedColor: product.selectedColor || product.colors?.[0] || 'Black',
      offerPercent: product.offerPercent ?? 0,
    }

    setCartItems((current) => {
      const existingItem = current.find(
        (item) =>
          item.id === itemToAdd.id &&
          item.selectedSize === itemToAdd.selectedSize &&
          item.selectedColor === itemToAdd.selectedColor,
      )

      if (existingItem) {
        return current.map((item) =>
          item.id === itemToAdd.id &&
          item.selectedSize === itemToAdd.selectedSize &&
          item.selectedColor === itemToAdd.selectedColor
            ? { ...item, quantity: item.quantity + itemToAdd.quantity }
            : item,
        )
      }

      return [...current, itemToAdd]
    })
  }

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems((current) => current.filter((item) => item.id !== productId))
      return
    }

    setCartItems((current) =>
      current.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const removeCartItem = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header cartCount={cartCount} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
            <Route path="/shop" element={<ShopPage onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductPage onAddToCart={addToCart} />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  onUpdateQuantity={updateCartQuantity}
                  onRemove={removeCartItem}
                  onCheckout={() => {}}
                />
              }
            />
            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} onClearCart={clearCart} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
