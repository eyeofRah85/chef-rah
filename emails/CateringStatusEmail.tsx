import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "react-email";

type Props = {
  customerName: string;
  eventType: string;
  status: string;
  approvalStatus: string;
  approvalNote?: string | null;
  estimatedTotal?: number | null;
  depositAmount?: number | null;
};

export function CateringStatusEmail({
  customerName,
  eventType,
  status,
  approvalStatus,
  approvalNote,
  estimatedTotal,
  depositAmount,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Your catering request has been updated.</Preview>

      <Body
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily: "Arial, sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "600px",
          }}
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

          <Text>
            You can log into your account to review catering request details,
            quote information, and deposit status.
          </Text>

          <Text
            style={{
              fontSize: "12px",
              color: "#666666",
            }}
          >
            Chef Rah&apos;s Twisted Kitchen
          </Text>
        </Container>
      </Body>
    </Html>
  );
}