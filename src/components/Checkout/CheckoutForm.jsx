export default function CheckoutForm({ formData, onChange, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Customer Details</h2>
        <p className="mt-1 text-sm text-slate-600">Your order will be shared with our team on WhatsApp.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Full name
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
            placeholder="Your name"
            required
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Phone
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
            placeholder="+971 50 123 4567"
            required
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        Email address
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
          placeholder="you@example.com"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Notes
        <textarea
          value={formData.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          rows="4"
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
          placeholder="Any specific requests?"
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
      >
        Place order via WhatsApp
      </button>
    </form>
  )
}
