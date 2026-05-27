import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guards";
import { sendAppEmail, appUrl } from "@/lib/email";
import { PaymentReceivedEmail } from "@/emails/PaymentReceivedEmail";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        paymentStatus: "PAID",
        paidAt: new Date(),
        statusHistory: {
          create: {
            status: "ACCEPTED",
            note: "Payment manually marked as paid.",
          },
        },
      },
    });
    await sendAppEmail({        
        to: updatedOrder.customerEmail,
        subject: "Payment Received",
        react: PaymentReceivedEmail({
          customerName: updatedOrder.customerName,
          orderId: updatedOrder.id,
          total: Number(updatedOrder.total),
          paidAt: updatedOrder.paidAt
            ? updatedOrder.paidAt.toLocaleString()
            : new Date().toLocaleString(),
            orderUrl: `${appUrl}/orders/${updatedOrder.id}`,
        }),
      });
       
    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to mark order as paid." },
      { status: 500 },
    );
  }
}