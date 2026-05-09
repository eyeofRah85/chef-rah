export default function CateringPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Catering
        </p>

        <h1 className="mt-3 text-4xl font-bold">Catering Requests</h1>

        <p className="mt-4 text-neutral-700">
          Catering orders require a 50% deposit. Full catering request forms,
          payment dates, and approval workflow will be added to the dashboard.
        </p>

        <div className="mt-8 rounded-xl bg-neutral-100 p-5">
          <h2 className="font-semibold">Coming next</h2>
          <ul className="mt-3 list-inside list-disc text-neutral-700">
            <li>Event date</li>
            <li>Guest count</li>
            <li>Delivery or pickup</li>
            <li>Allergy list</li>
            <li>Deposit calculation</li>
            <li>Pay-by-date setting</li>
          </ul>
        </div>
      </div>
    </main>
  );
}