import { Button, Hr, Section, Text } from "react-email";
import { BrandedEmailLayout } from "@/emails/BrandedEmailLayout";
import { emailStyles } from "@/emails/styles";
import {
  formatApprovalStatus,
  formatOrderType,
  formatPaymentStatus,
} from "@/lib/format-labels";
import {
  getWeeklyMealPlanSelectionDetails,
  type WeeklyOrderSelectionDisplay,
} from "@/lib/weekly-order-display";

type OrderEmailItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  notes?: string | null;
  weeklyMealPlanSelection?: WeeklyOrderSelectionDisplay | null;
};

type Props = {
  customerName: string;
  orderId: string;
  total: number;
  subtotal: number;
  deliveryFee: number;
  lateFee: number;
  tipAmount: number;
  orderType: string;
  paymentStatus?: string | null;
  approvalStatus?: string | null;
  orderUrl: string;
  items: OrderEmailItem[];
  allergenAcknowledged?: boolean;
  allergenAcknowledgedAt?: Date | string | null;

  deliveryName?: string | null;
  deliveryPhone?: string | null;
  deliveryAddressLine1?: string | null;
  deliveryAddressLine2?: string | null;
  deliveryCity?: string | null;
  deliveryState?: string | null;
  deliveryPostalCode?: string | null;
  deliveryNotes?: string | null;
};

export function OrderConfirmationEmail({
  customerName,
  orderId,
  total,
  orderType,
  paymentStatus,
  approvalStatus,
  subtotal,
  deliveryFee,
  lateFee,
  tipAmount,
  orderUrl,
  items,
  deliveryName,
  deliveryPhone,
  deliveryAddressLine1,
  deliveryAddressLine2,
  deliveryCity,
  deliveryState,
  deliveryPostalCode,
  deliveryNotes,
  allergenAcknowledged,
  allergenAcknowledgedAt,
}: Props) {
  const isDelivery = orderType === "DELIVERY";

  return (
    <BrandedEmailLayout
      preview="Your Chef Rah's Twisted Kitchen order has been received."
      title="Order Confirmation"
    >
      <Text style={emailStyles.text}>Hello {customerName},</Text>

      <Text style={emailStyles.text}>
        Thank you for your order with Chef Rah&apos;s Twisted Kitchen.
      </Text>

      <Section style={emailStyles.card}>
        <Text style={emailStyles.sectionTitle}>Order Details</Text>

        <Text style={emailStyles.detailText}>
          <strong>Order ID:</strong> {orderId}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Order Type:</strong> {formatOrderType(orderType)}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Payment:</strong> {formatPaymentStatus(paymentStatus)}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Approval:</strong> {formatApprovalStatus(approvalStatus)}
        </Text>
      </Section>

      <Section style={emailStyles.card}>
        <Text style={emailStyles.sectionTitle}>
          Contact / Delivery Information
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Name:</strong> {deliveryName ?? customerName}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Phone:</strong> {deliveryPhone ?? "Not provided"}
        </Text>

        {isDelivery && (
          <>
            <Text style={emailStyles.detailText}>
              <strong>Address:</strong>{" "}
              {deliveryAddressLine1
                ? `${deliveryAddressLine1}${
                    deliveryAddressLine2 ? `, ${deliveryAddressLine2}` : ""
                  }`
                : "Not provided"}
            </Text>

            <Text style={emailStyles.detailText}>
              <strong>City/State/ZIP:</strong>{" "}
              {[deliveryCity, deliveryState, deliveryPostalCode]
                .filter(Boolean)
                .join(", ") || "Not provided"}
            </Text>

            {deliveryNotes && (
              <Text style={emailStyles.detailText}>
                <strong>Delivery Notes:</strong> {deliveryNotes}
              </Text>
            )}
          </>
        )}
      </Section>

      {allergenAcknowledged && (
        <Section style={emailStyles.alertBox}>
          <Text style={emailStyles.sectionTitle}>
            Allergen Warning Acknowledged
          </Text>

          <Text style={emailStyles.detailText}>
            You acknowledged that this order may contain allergen tags matching
            your account preferences before submitting.
          </Text>

          {allergenAcknowledgedAt && (
            <Text style={emailStyles.detailText}>
              <strong>Acknowledged:</strong>{" "}
              {new Date(allergenAcknowledgedAt).toLocaleString()}
            </Text>
          )}
        </Section>
      )}

      <Section style={emailStyles.card}>
        <Text style={emailStyles.sectionTitle}>Order Summary</Text>

        {items.map((item, index) => {
          const weeklyDetails = item.weeklyMealPlanSelection
            ? getWeeklyMealPlanSelectionDetails(item.weeklyMealPlanSelection)
            : [];

          return (
            <Section key={`${item.name}-${index}`} style={emailStyles.itemCard}>
              <Text style={emailStyles.detailText}>
                <strong>
                  {item.quantity} x {item.name}
                </strong>
              </Text>

              <Text style={emailStyles.detailText}>
                ${item.unitPrice.toFixed(2)} each - $
                {item.lineTotal.toFixed(2)}
              </Text>

              {weeklyDetails.length > 0 && (
                <>
                  <Text style={emailStyles.detailText}>
                    <strong>Weekly Meal Plan Snapshot</strong>
                  </Text>

                  {weeklyDetails.map((detail) => (
                    <Text key={detail.label} style={emailStyles.detailText}>
                      <strong>{detail.label}:</strong> {detail.value}
                    </Text>
                  ))}
                </>
              )}

              {item.notes && (
                <Text
                  style={{
                    ...emailStyles.detailText,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {item.notes}
                </Text>
              )}
            </Section>
          );
        })}

        <Hr style={emailStyles.divider} />

        <Text style={emailStyles.detailText}>
          <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Delivery Fee:</strong> ${deliveryFee.toFixed(2)}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Late Fee:</strong> ${lateFee.toFixed(2)}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Tip:</strong> ${tipAmount.toFixed(2)}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Total:</strong> ${total.toFixed(2)}
        </Text>

        <Button
          href={orderUrl}
          style={emailStyles.button}
        >
          View Order Details
        </Button>
      </Section>

      <Hr style={emailStyles.divider} />

      <Text style={emailStyles.text}>
        Your order has been received and is now being processed.
      </Text>

      <Text style={emailStyles.text}>
        You can log into your account to track status updates and payment
        information.
      </Text>
    </BrandedEmailLayout>
  );
}
