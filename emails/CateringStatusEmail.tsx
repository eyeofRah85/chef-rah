import {
  Hr,
  Section,
  Text,
  Button
} from "react-email";
import { BrandedEmailLayout } from "@/emails/BrandedEmailLayout";
import { emailStyles } from "@/emails/styles";
import {
  formatApprovalStatus,
  formatServiceRequestType,
  formatServiceRequestStatus,
} from "@/lib/format-labels";

type Props = {
  customerName: string;
  requestType?: string | null;
  eventType: string;
  status: string;
  approvalStatus: string;
  approvalNote?: string | null;
  estimatedTotal?: number | null;
  depositAmount?: number | null;
  requestUrl: string;
};

export function CateringStatusEmail({
  customerName,
  requestType,
  eventType,
  status,
  approvalStatus,
  approvalNote,
  estimatedTotal,
  depositAmount,
  requestUrl,
}: Props) {
  const requestLabel = formatServiceRequestType(requestType);
  const requestLabelLower = requestLabel.toLowerCase();

  return (
    <BrandedEmailLayout
      preview={`Your ${requestLabelLower} request has been updated.`}
      title={`${requestLabel} Request Update`}
    >
      <Text style={emailStyles.text}>Hello {customerName},</Text>

      <Text style={emailStyles.text}>
        Your {requestLabelLower} request has been updated.
      </Text>

      <Section style={emailStyles.card}>
        <Text style={emailStyles.detailText}>
          <strong>Event:</strong> {eventType}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Status:</strong> {formatServiceRequestStatus(status)}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Approval:</strong> {formatApprovalStatus(approvalStatus)}
        </Text>

        {approvalNote && (
          <Text style={emailStyles.detailText}>
            <strong>Note:</strong> {approvalNote}
          </Text>
        )}

        {estimatedTotal !== null && estimatedTotal !== undefined && (
          <Text style={emailStyles.detailText}>
            <strong>Estimated Total:</strong> ${estimatedTotal.toFixed(2)}
          </Text>
        )}

        {depositAmount !== null && depositAmount !== undefined && (
          <Text style={emailStyles.detailText}>
            <strong>Deposit:</strong> ${depositAmount.toFixed(2)}
          </Text>
        )}

        <Button
          href={requestUrl}
          style={emailStyles.button}
        >
          View {requestLabel} Request
        </Button>
      </Section>

      <Hr style={emailStyles.divider} />

      <Text style={emailStyles.text}>
        You can log into your account to review request details, quote
        information, and deposit status.
      </Text>
    </BrandedEmailLayout>
  );
}
