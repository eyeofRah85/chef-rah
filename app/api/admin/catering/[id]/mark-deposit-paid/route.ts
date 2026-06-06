import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guards";
import { sendAppEmail, appUrl } from "@/lib/email";
import { CateringDepositPaidEmail } from "@/emails/CateringDepositPaidEmail";
import { formatServiceRequestType } from "@/lib/format-labels";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const updated = await prisma.cateringRequest.update({
      where: { id },
      data: {
        status: "DEPOSIT_PAID",
        depositPaidAt: new Date(),
      },
    });

        const requestLabel = formatServiceRequestType(updated.requestType);
        const requestLabelLower = requestLabel.toLowerCase();

        await sendAppEmail({
          to: updated.email,
          subject: `Your ${requestLabelLower} deposit has been received`,
          react: CateringDepositPaidEmail({
            customerName: updated.name,
            requestType: updated.requestType,
            eventType: updated.eventType ?? `${requestLabel} Request`,
            depositAmount: updated.depositAmount
              ? Number(updated.depositAmount)
              : 0,
            paidAt: updated.depositPaidAt
              ? updated.depositPaidAt.toLocaleString()
              : new Date().toLocaleString(),
              requestUrl: `${appUrl}/account/catering/${updated.id}`,
          }),
        });
     return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to mark deposit as paid." },
      { status: 500 },
    );
  }
}
