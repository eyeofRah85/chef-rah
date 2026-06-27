import {
  Hr,
  Section,
  Text,
  Button
} from "react-email";
import { BrandedEmailLayout } from "@/emails/BrandedEmailLayout";
import { emailStyles } from "@/emails/styles";

type Props = {
  customerName: string;
  orderId: string;
  total: number;
  paidAt: string;
  orderUrl: string;
};

export function PaymentReceivedEmail({
  customerName,
  orderId,
  total,
  paidAt,
  orderUrl
}: Props) {
  return (
    <BrandedEmailLayout
      preview="Your payment has been marked as received."
      title="Payment Received"
    >
      <Text style={emailStyles.text}>Hello {customerName},</Text>

      <Text style={emailStyles.text}>
        Your payment has been marked as received.
      </Text>

      <Section style={emailStyles.card}>
        <Text style={emailStyles.detailText}>
          <strong>Order ID:</strong> {orderId}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Total Paid:</strong> ${total.toFixed(2)}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Paid At:</strong> {paidAt}
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
        Thank you for your order with Chef Rah&apos;s Twisted Kitchen.
      </Text>
    </BrandedEmailLayout>
  );
}
