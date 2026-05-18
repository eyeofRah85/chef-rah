import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guards";
import Link from "next/link";

export default async function AdminNotificationsPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/");
  }

  const [pendingOrders, unpaidOrders, cateringRequests] = await Promise.all([
    prisma.order.count({
      where: { status: "PENDING" },
    }),

    prisma.order.count({
      where: {
        paymentStatus: {
          in: ["PAY_BY_DATE", "OFFLINE_PAYMENT_DUE"],
        },
      },
    }),

    prisma.cateringRequest.count({
      where: {
        status: {
          in: ["NEW", "REVIEWING", "QUOTED", "DEPOSIT_DUE"],
        },
      },
    }),
  ]);

  const notificationGroups = [
    {
      title: "Order Confirmations",
      status: "Planned",
      description:
        "Send customers an email after an order is submitted.",
    },
    {
      title: "Kitchen Status Updates",
      status: "Planned",
      description:
        "Notify customers when an order is accepted, preparing, ready, or completed.",
    },
    {
      title: "Payment Reminders",
      status: "Planned",
      description:
        "Send reminders for manual invoices, offline payments, and pay-by-date orders.",
    },
    {
      title: "Catering Follow-ups",
      status: "Planned",
      description:
        "Notify customers when catering requests are reviewed, quoted, approved, or require deposit.",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link className="text-sm font-medium underline" href="/admin">
            &larr;  Back to Dashboard
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Admin
          </p>

          <h1 className="mt-3 text-4xl font-bold">Notifications</h1>

          <p className="mt-3 text-neutral-700">
            Track notification needs for customer orders, payment reminders,
            kitchen status updates, and catering follow-ups.
          </p>
        </div>

        <section className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">Pending Order Notices</p>
            <p className="mt-3 text-4xl font-bold">{pendingOrders}</p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">Payment Reminders</p>
            <p className="mt-3 text-4xl font-bold">{unpaidOrders}</p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">Catering Follow-ups</p>
            <p className="mt-3 text-4xl font-bold">{cateringRequests}</p>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Notification Roadmap</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {notificationGroups.map((group) => (
              <div key={group.title} className="rounded-xl border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{group.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">
                      {group.description}
                    </p>
                  </div>

                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                    {group.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Recommended Providers</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-neutral-100 p-5">
              <p className="font-semibold">Email</p>
              <p className="mt-2 text-sm text-neutral-600">
                Use Resend, SendGrid, or Postmark for order confirmations and
                payment reminders.
              </p>
            </div>

            <div className="rounded-xl bg-neutral-100 p-5">
              <p className="font-semibold">SMS</p>
              <p className="mt-2 text-sm text-neutral-600">
                Use Twilio later for delivery alerts, pickup reminders, and
                kitchen status updates.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}