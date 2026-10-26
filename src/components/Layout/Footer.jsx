export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Saba Collection</h3>
          <p className="text-sm text-slate-600">
            Modern essentials for everyday wear, curated for comfort and confidence.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
            Shop
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Accessories</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
            Support
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Privacy</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
            Visit
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Dubai, UAE</li>
            <li>hello@sabacollection.ae</li>
            <li>+971 50 123 4567</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
