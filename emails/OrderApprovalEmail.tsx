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
  orderId: string;
  approved: boolean;
  approvalNote?: string | null;
};

export function OrderApprovalEmail({
  customerName,
  orderId,
  approved,
  approvalNote,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>
        Your order has been {approved ? "approved" : "not approved"}.
      </Preview>

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
          <Heading>
            Order {approved ? "Approved" : "Not Approved"}
          </Heading>

          <Text>Hello {customerName},</Text>

          <Text>
            Your order has been {approved ? "approved" : "not approved"}.
          </Text>

          <Text>
            <strong>Order ID:</strong> {orderId}
          </Text>

          {approvalNote && (
            <Text>
              <strong>Note:</strong> {approvalNote}
            </Text>
          )}

          <Hr />

          <Text>
            You can log into your account to view order details and updates.
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