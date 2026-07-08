import {
  Hr,
  Section,
  Text,
  Button
} from "react-email";
import { BrandedEmailLayout } from "@/emails/BrandedEmailLayout";
import { emailStyles } from "@/emails/styles";
import { formatServiceRequestType } from "@/lib/format-labels";

type Props = {
  customerName: string;
  requestType?: string | null;
  eventType: string;
  depositAmount: number;
  paidAt: string;
  requestUrl: string;
};

export function CateringDepositPaidEmail({
  customerName,
  requestType,
  eventType,
  depositAmount,
  paidAt,
  requestUrl,
}: Props) {
  const requestLabel = formatServiceRequestType(requestType);
  const requestLabelLower = requestLabel.toLowerCase();

  return (
    <BrandedEmailLayout
      preview={`Your ${requestLabelLower} deposit has been received.`}
      title={`${requestLabel} Deposit Received`}
    >
      <Text style={emailStyles.text}>Hello {customerName},</Text>

      <Text style={emailStyles.text}>
        Your {requestLabelLower} deposit has been marked as received.
      </Text>

      <Section style={emailStyles.card}>
        <Text style={emailStyles.detailText}>
          <strong>Event:</strong> {eventType}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Deposit:</strong> ${depositAmount.toFixed(2)}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Paid At:</strong> {paidAt}
        </Text>

        <Button
          href={requestUrl}
          style={emailStyles.button}
        >
          View {requestLabel} Request
        </Button>
      </Section>

      <Hr style={emailStyles.divider} />

      <Text style={emailStyles.text}>
        Thank you. Your {requestLabelLower} request can now continue through the
        planning process.
      </Text>
    </BrandedEmailLayout>
  );
}
