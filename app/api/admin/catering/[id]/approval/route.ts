import { NextResponse } from "next/server";
import { ApprovalStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guards";
import { resend, emailFromAddress } from "@/lib/email";
import { CateringStatusEmail } from "@/emails/CateringStatusEmail";

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

    const updated = await prisma.cateringRequest.update({
      where: { id },
      data: {
        approvalStatus,
        approvalNote: approvalNote || null,
        approvedAt: approvalStatus === "APPROVED" ? new Date() : null,
        deniedAt: approvalStatus === "DENIED" ? new Date() : null,
        status:
          approvalStatus === "APPROVED"
            ? "APPROVED"
            : approvalStatus === "DENIED"
              ? "CANCELLED"
              : undefined,
      },
    });

    try {
  if (!resend) {
    console.warn("Email skipped: RESEND_API_KEY is not configured.");
  } else {
        await resend.emails.send({
          from: emailFromAddress,
          to: updated.email,
          subject:
            approvalStatus === "APPROVED"
              ? "Your catering request has been approved"
              : "Your catering request was not approved",
          react: CateringStatusEmail({
            customerName: updated.name,
            eventType: updated.eventType ?? "Catering Request",
            status: updated.status,
            approvalStatus: updated.approvalStatus,
            approvalNote,
            estimatedTotal: updated.estimatedTotal
              ? Number(updated.estimatedTotal)
              : null,
            depositAmount: updated.depositAmount
              ? Number(updated.depositAmount)
              : null,
          }),
        });
      }
    } catch (emailError) {
      console.error("Failed to send catering status email", emailError);
    }
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update catering approval." }, { status: 500 });
  }
}