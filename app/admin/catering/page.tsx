import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guards";

export default async function AdminCateringPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/");
  }

  const requests = await prisma.cateringRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Admin
          </p>

          <h1 className="mt-3 text-4xl font-bold">Catering Requests</h1>

          <p className="mt-3 text-neutral-700">
            Review catering inquiries, quote requests, deposits, and event details.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-100">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Event</th>
                <th className="p-4">Guests</th>
                <th className="p-4">Status</th>
                <th className="p-4">Submitted</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-t">
                  <td className="p-4">
                    <div className="font-medium">{request.name}</div>
                    <div className="text-xs text-neutral-500">{request.email}</div>
                  </td>

                  <td className="p-4">
                    <div>{request.eventType ?? "Event"}</div>
                    <div className="text-xs text-neutral-500">
                      {request.eventDate
                        ? request.eventDate.toLocaleString()
                        : "Date not provided"}
                    </div>
                  </td>

                  <td className="p-4">{request.guestCount ?? "-"}</td>

                  <td className="p-4">
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                      {request.status}
                    </span>
                  </td>

                  <td className="p-4 text-neutral-600">
                    {request.createdAt.toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/admin/catering/${request.id}`}
                      className="font-medium underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-neutral-500" colSpan={6}>
                    No catering requests yet.
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