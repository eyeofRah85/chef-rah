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
  requestId: string;
  requestType?: string | null;
  eventType: string;
  guestCount: number | null;
  eventDate: string | null;
  location?: string | null;
  requestedMenu?: string | null;
  specialRequests?: string | null;
  requestUrl: string;
};

export function CateringRequestEmail({
  customerName,
  requestType,
  eventType,
  guestCount,
  eventDate,
  requestedMenu,
  location,
  specialRequests,
  requestUrl
}: Props) {
  const requestLabel = formatServiceRequestType(requestType);
  const requestLabelLower = requestLabel.toLowerCase();

  return (
    <BrandedEmailLayout
      preview={`Your ${requestLabelLower} request has been received.`}
      title={`${requestLabel} Request Received`}
    >
      <Text style={emailStyles.text}>Hello {customerName},</Text>

      <Text style={emailStyles.text}>
        Thank you for contacting Chef Rah&apos;s Twisted Kitchen for your{" "}
        {requestLabelLower} request.
      </Text>

      <Section style={emailStyles.card}>
        <Text style={emailStyles.detailText}>
          <strong>Event Type:</strong> {eventType}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Guest Count:</strong> {guestCount ?? "Not provided"}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Event Date:</strong> {eventDate ?? "Not provided"}
        </Text>

        <Text style={emailStyles.detailText}>
          <strong>Location:</strong> {location ?? "Not provided"}
        </Text>

        {requestedMenu && (
          <Text style={emailStyles.detailText}>
            <strong>Requested Menu:</strong> {requestedMenu}
          </Text>
        )}

        {specialRequests && (
          <Text style={emailStyles.detailText}>
            <strong>Special Requests:</strong> {specialRequests}
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
        Your request has been received and will be reviewed shortly.
      </Text>

      <Text style={emailStyles.text}>
        You can log into your account to track approval status, quotes, and
        deposit information.
      </Text>

    </BrandedEmailLayout>
  );
}
