import { Menu, Search, ShoppingBag, UserRound } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'New Arrivals', to: '/shop?category=all' },
  { label: 'Contact', to: '/contact' },
]

export default function Header({ cartCount = 0 }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full border border-slate-200 p-2 text-slate-700 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="text-2xl font-black tracking-[0.18em] text-slate-900">
            SABA
          </Link>
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-slate-200 p-2 text-slate-700 sm:inline-flex"
            aria-label="Search products"
          >
            <Search className="h-4 w-4" />
          </button>

          <Link
            to="/admin"
            className="hidden items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 md:inline-flex"
          >
            <UserRound className="h-4 w-4" />
            Admin
          </Link>

          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            <span className="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-semibold text-slate-900">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
