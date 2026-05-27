import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
  Button
} from "react-email";
import { emailStyles } from "@/emails/styles";

type Props = {
  customerName: string;
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
  eventType,
  status,
  approvalStatus,
  approvalNote,
  estimatedTotal,
  depositAmount,
  requestUrl,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Your catering request has been updated.</Preview>

      <Body
        style={emailStyles.body}
      >
        <Container
          style={emailStyles.container}
        >
          <Heading>Catering Request Update</Heading>

          <Text>Hello {customerName},</Text>

          <Text>Your catering request has been updated.</Text>

          <Text>
            <strong>Event:</strong> {eventType}
          </Text>

          <Text>
            <strong>Status:</strong> {status}
          </Text>

          <Text>
            <strong>Approval:</strong> {approvalStatus}
          </Text>

          {approvalNote && (
            <Text>
              <strong>Note:</strong> {approvalNote}
            </Text>
          )}

          {estimatedTotal !== null && estimatedTotal !== undefined && (
            <Text>
              <strong>Estimated Total:</strong> ${estimatedTotal.toFixed(2)}
            </Text>
          )}

          {depositAmount !== null && depositAmount !== undefined && (
            <Text>
              <strong>Deposit:</strong> ${depositAmount.toFixed(2)}
            </Text>
          )}

          <Hr />
            <Button
              href={requestUrl}
              style={emailStyles.button}
            >
              View Catering Request
            </Button>
          <Text>
            You can log into your account to review catering request details,
            quote information, and deposit status.
          </Text>

          <Text
            style={emailStyles.footerText}
          >
            Chef Rah&apos;s Twisted Kitchen
          </Text>
        </Container>
      </Body>
    </Html>
  );
}