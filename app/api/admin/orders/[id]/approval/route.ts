import { NextResponse } from "next/server";
import { ApprovalStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guards";
import { resend, emailFromAddress } from "@/lib/email";
import { OrderApprovalEmail } from "@/emails/OrderApprovalEmail";


type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const body = await request.json();

    const approvalStatus = body.approvalStatus as ApprovalStatus;
    const approvalNote = String(body.approvalNote ?? "").trim();

    if (!Object.values(ApprovalStatus).includes(approvalStatus)) {
      return NextResponse.json({ error: "Invalid approval status." }, { status: 400 });
    }

  const updated = await prisma.order.update({
    where: { id },
    data: {
      approvalStatus,
      approvalNote: approvalNote || null,

      approvedAt: approvalStatus === "APPROVED" ? new Date() : null,
      deniedAt: approvalStatus === "DENIED" ? new Date() : null,

      status:
        approvalStatus === "APPROVED"
          ? "ACCEPTED"
          : approvalStatus === "DENIED"
            ? "CANCELLED"
            : "PENDING",

      paymentStatus:
        approvalStatus === "DENIED"
          ? "CANCELLED"
          : undefined,

      statusHistory: {
        create: {
          status:
            approvalStatus === "APPROVED"
              ? "ACCEPTED"
              : approvalStatus === "DENIED"
                ? "CANCELLED"
                : "PENDING",
          note:
            approvalStatus === "APPROVED"
              ? approvalNote || "Order approved."
              : approvalStatus === "DENIED"
                ? approvalNote || "Order denied."
                : approvalNote || "Approval reset to pending.",
        },
      },
    },
  });
  try {
    if (!resend) {
      console.warn("Email skipped: RESEND_API_KEY is not configured.");
      } else {
      if (approvalStatus === "APPROVED" || approvalStatus === "DENIED") {
        await resend.emails.send({
          from: emailFromAddress,
          to: updated.customerEmail,
          subject:
            approvalStatus === "APPROVED"
              ? "Your order has been approved"
              : "Your order was not approved",
          react: OrderApprovalEmail({
            customerName: updated.customerName,
            orderId: updated.id,
            approved: approvalStatus === "APPROVED",
            approvalNote,
          }),
        });
      }
    }
  } catch (emailError) {
    console.error("Failed to send order approval email", emailError);
  }
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update approval." }, { status: 500 });
  }
}