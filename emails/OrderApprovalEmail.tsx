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
  approved: boolean;
  approvalNote?: string | null;
  orderUrl: string;
};

export function OrderApprovalEmail({
  customerName,
  orderId,
  approved,
  approvalNote,
  orderUrl
}: Props) {
  const title = `Order ${approved ? "Approved" : "Not Approved"}`;

  return (
    <BrandedEmailLayout
      preview={`Your order has been ${approved ? "approved" : "not approved"}.`}
      title={title}
    >
      <Text style={emailStyles.text}>Hello {customerName},</Text>

      <Text style={emailStyles.text}>
        Your order has been {approved ? "approved" : "not approved"}.
      </Text>

      <Section style={emailStyles.card}>
        <Text style={emailStyles.detailText}>
          <strong>Order ID:</strong> {orderId}
        </Text>

        {approvalNote && (
          <Text style={emailStyles.detailText}>
            <strong>Note:</strong> {approvalNote}
          </Text>
        )}

        <Button
          href={orderUrl}
          style={emailStyles.button}
        >
          View Order Details
        </Button>
      </Section>

      <Hr style={emailStyles.divider} />

      <Text style={emailStyles.text}>
        You can log into your account to view order details and updates.
      </Text>
    </BrandedEmailLayout>
  );
}
