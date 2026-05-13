import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guards";

export default async function AdminCustomersPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/");
  }

  const customers = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orders: {
        include: {
          items: true,
        },
      },
    },
  });

  const customerRows = customers.map((customer) => {
    const totalSpent = customer.orders
      .filter((order) => order.status !== "CANCELLED" && order.status !== "REFUNDED")
      .reduce((sum, order) => sum + Number(order.total), 0);

    const paymentDueCount = customer.orders.filter((order) =>
      ["PAY_BY_DATE", "OFFLINE_PAYMENT_DUE"].includes(order.paymentStatus ?? ""),
    ).length;

    const lastOrder = customer.orders.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )[0];

    return {
      id: customer.id,
      name: customer.name ?? "Customer",
      email: customer.email,
      orderCount: customer.orders.length,
      totalSpent,
      paymentDueCount,
      lastOrderDate: lastOrder?.createdAt ?? null,
    };
  });

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Admin
          </p>

          <h1 className="mt-3 text-4xl font-bold">Customers</h1>

          <p className="mt-3 text-neutral-700">
            Review customer accounts, order activity, and payment status.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-100">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Payments Due</th>
                <th className="p-4">Last Order</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            <tbody>
              {customerRows.map((customer) => (
                <tr key={customer.id} className="border-t">
                  <td className="p-4">
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-xs text-neutral-500">{customer.email}</div>
                  </td>

                  <td className="p-4">{customer.orderCount}</td>

                  <td className="p-4 font-medium">
                    ${customer.totalSpent.toFixed(2)}
                  </td>

                  <td className="p-4">
                    {customer.paymentDueCount > 0 ? (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                        {customer.paymentDueCount} due
                      </span>
                    ) : (
                      <span className="text-neutral-500">None</span>
                    )}
                  </td>

                  <td className="p-4 text-neutral-600">
                    {customer.lastOrderDate
                      ? customer.lastOrderDate.toLocaleDateString()
                      : "No orders"}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="font-medium underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {customerRows.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-neutral-500" colSpan={6}>
                    No customers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}