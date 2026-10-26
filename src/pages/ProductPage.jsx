import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from '../components/Product/ProductDetails'
import { products } from '../data/products'

export default function ProductPage({ onAddToCart }) {
  const { id } = useParams()

  const product = useMemo(
    () => products.find((item) => String(item.id) === String(id)),
    [id],
  )

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Product not found</h1>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <ProductDetails product={product} onAddToCart={onAddToCart} />
    </div>
  )
}
