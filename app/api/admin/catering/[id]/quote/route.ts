import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guards";
import { calculateServerCateringDeposit } from "@/lib/server-business-rules";
import { resend, emailFromAddress, appUrl } from "@/lib/email";
import { CateringStatusEmail } from "@/emails/CateringStatusEmail";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const body = await request.json();

    const estimatedTotal =
      body.estimatedTotal === null || body.estimatedTotal === undefined
        ? null
        : Number(body.estimatedTotal);

    const depositAmount =
      body.depositAmount === null || body.depositAmount === undefined
        ? estimatedTotal !== null
          ? await calculateServerCateringDeposit(estimatedTotal)
          : null
        : Number(body.depositAmount);

    if (
      estimatedTotal !== null &&
      (Number.isNaN(estimatedTotal) || estimatedTotal < 0)
    ) {
      return NextResponse.json(
        { error: "Invalid estimated total." },
        { status: 400 },
      );
    }

    if (
      depositAmount !== null &&
      (Number.isNaN(depositAmount) || depositAmount < 0)
    ) {
      return NextResponse.json(
        { error: "Invalid deposit amount." },
        { status: 400 },
      );
    }

    const updated = await prisma.cateringRequest.update({
      where: { id },
      data: {
        estimatedTotal,
        depositAmount,
        status: estimatedTotal ? "QUOTED" : undefined,
      },
    });
try {
  if (!resend) {
    console.warn("Email skipped: RESEND_API_KEY is not configured.");
  } else {
    await resend.emails.send({
        from: emailFromAddress,
        to: updated.email,
        subject: "Your catering quote has been updated",
        react: CateringStatusEmail({
          customerName: updated.name,
          eventType: updated.eventType ?? "Catering Request",
          status: updated.status,
          approvalStatus: updated.approvalStatus,
          approvalNote: updated.approvalNote,
          estimatedTotal: updated.estimatedTotal
            ? Number(updated.estimatedTotal)
            : null,
          depositAmount: updated.depositAmount
            ? Number(updated.depositAmount)
            : null,
            requestUrl: `${appUrl}/account/catering/${updated.id}`,
        }),
      });
    }
    } catch (emailError) {
      console.error("Failed to send catering quote email", emailError);
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save quote." },
      { status: 500 },
    );
  }
}