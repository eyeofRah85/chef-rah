import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type OrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage({
  params,
}: OrderPageProps) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },

    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Order Confirmation
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Order Submitted
        </h1>

        <p className="mt-4 text-neutral-700">
          Thank you for your order.
        </p>

        <div className="mt-8 rounded-xl bg-neutral-100 p-5">
          <p className="font-medium">
            Order ID
          </p>

          <p className="mt-2 text-sm">
            {order.id}
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border bg-white p-4"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-sm text-neutral-600">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  ${Number(item.lineTotal).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between font-bold">
            <span>Total</span>

            <span>
              ${Number(order.total).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}