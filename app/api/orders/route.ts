import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { calculateTip } from "@/lib/order-calculations";
import {
  calculateServerDeliveryFee,
  calculateServerLateFee,
  validateServerRequestedDate,
} from "@/lib/server-business-rules";
import { resend, emailFromAddress } from "@/lib/email";
import { OrderConfirmationEmail } from "@/emails/OrderConfirmationEmail";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();

    const { items, checkout } = body;

    if (!items?.length) {
      return NextResponse.json(
        { error: "Order contains no items." },
        { status: 400 },
      );
    }
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );

    const deliveryFee = await calculateServerDeliveryFee(checkout.orderType);
    const lateFee = await calculateServerLateFee();

    const tipAmount = calculateTip(
      subtotal,
      checkout.tipType,
      checkout.customTipAmount,
    );

    const total = subtotal + deliveryFee + lateFee + tipAmount;
    const requiresApproval = items.some((item: any) => item.requiresApproval);

    if (checkout.requestedDateTime) {
      const requestedDate = new Date(checkout.requestedDateTime);

      const validation = await validateServerRequestedDate(requestedDate);

      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.error },
          { status: 400 },
        );
      }
    }

    const order = await prisma.order.create({
      data: {
        user: {
          connect: {
            email: session.user.email,
          },
        },

        customerName: session.user.name ?? "Customer",
        customerEmail: session.user.email,

        orderType: checkout.orderType.toUpperCase(),

        status: requiresApproval ? "PENDING" : "ACCEPTED",
        approvalStatus: requiresApproval ? "PENDING" : "APPROVED",
        approvedAt: requiresApproval ? null : new Date(),

        requestedDateTime: checkout.requestedDateTime
          ? new Date(checkout.requestedDateTime)
          : null,

        allergyNotes: checkout.allergyNotes,
        substitutionPreference: checkout.substitutionPreference,

        subtotal,
        deliveryFee,
        lateFee,
        tipAmount,
        total,

        payByDate: checkout.payByDate ? new Date(checkout.payByDate) : null,
        paymentProvider: checkout.paymentMethod,
        paymentStatus:
          checkout.paymentMethod === "cash"
            ? "OFFLINE_PAYMENT_DUE"
            : "PAY_BY_DATE",

        items: {
          create: items.map((item: any) => ({
            menuItemId: item.menuItemId,
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            lineTotal: item.price * item.quantity,
            notes:
              [
                ...(item.selectedOptions?.length
                  ? item.selectedOptions.map(
                      (option: any) =>
                        `${option.groupName}: ${option.choiceName}${
                          option.priceDelta > 0
                            ? ` (+$${option.priceDelta.toFixed(2)})`
                            : ""
                        }`,
                    )
                  : []),
                item.customerInstructions
                  ? `Special Instructions: ${item.customerInstructions}`
                  : null,
              ]
                .filter(Boolean)
                .join("\n") || null,
          })),
        },

        statusHistory: {
          create: {
            status: requiresApproval ? "PENDING" : "ACCEPTED",
            note: requiresApproval
              ? "Order created and waiting for approval."
              : "Order created and auto-approved.",
          },
        },
      },

      include: {
        items: true,
      },
    });

    // email section
   try {
  if (!resend) {
    console.warn("Email skipped: RESEND_API_KEY is not configured.");
  } else {
    await resend.emails.send({
        // from: emailFromAddress,
        from: "Chef Rah's Twisted Kitchen <preston.s.butler@rcndev.com>",
        to: session.user.email,
        // cc: "preston.butler@live.com",
        subject: "Order Confirmation",
        react: OrderConfirmationEmail({
          customerName: session.user.name ?? "Customer",
          orderId: order.id,
          total: Number(order.total),
          orderType: order.orderType,
        }),
      });
    }
    } catch (emailError) {
      console.error("Failed to send order confirmation email", emailError);
    }
    // end email section
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create order." },
      { status: 500 },
    );
  }
}