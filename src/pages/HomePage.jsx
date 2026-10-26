import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import ProductGrid from '../components/Product/ProductGrid'
import { products } from '../data/products'

const featureList = [
  { icon: Truck, title: 'Fast delivery', description: 'Same-day dispatch for UAE orders.' },
  { icon: ShieldCheck, title: 'Secure checkout', description: 'Smooth order flow via WhatsApp.' },
  { icon: Sparkles, title: 'Premium style', description: 'Trendy essentials for every day.' },
]

export default function HomePage({ onAddToCart }) {
  const featuredProducts = products.filter((product) => product.featured)

  return (
    <div className="space-y-16 pb-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="space-y-8">
            <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
              New arrivals
            </p>
            <div className="space-y-5">
              <h1 className="text-5xl font-black tracking-tight sm:text-6xl">Minimal looks for everyday confidence.</h1>
              <p className="max-w-xl text-lg text-slate-300">
                Discover elevated essentials for men, women, kids, and accessories curated for modern lifestyles.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Shop now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Admin panel
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
              alt="Featured collection"
              className="h-72 w-full rounded-[2rem] object-cover sm:h-[420px]"
            />
            <div className="flex flex-col gap-4">
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
                alt="Fashion side"
                className="h-36 w-full rounded-[2rem] object-cover"
              />
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-300">This week</p>
                <p className="mt-2 text-3xl font-bold">Up to 30% off</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {featureList.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-2xl bg-slate-100 p-3 text-slate-900">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Curated picks</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Featured products</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            View all →
          </Link>
        </div>

        <ProductGrid products={featuredProducts} onAddToCart={onAddToCart} />
      </section>
    </div>
  )
}
