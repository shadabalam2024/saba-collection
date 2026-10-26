export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">Let’s talk style</h1>
          <p className="mt-4 text-slate-600">
            For custom sizing, bulk orders, and collaborations, our team is ready to help.
          </p>
        </div>

        <div className="space-y-4 text-sm text-slate-600">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-900">Email</p>
            <p>hello@sabacollection.ae</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-900">Phone</p>
            <p>+971 50 123 4567</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-900">Location</p>
            <p>Dubai Design District, UAE</p>
          </div>
        </div>
      </div>
    </div>
  )
}
