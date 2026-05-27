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
          <Button
            href={orderUrl}
            style={{
              display: "inline-block",
              backgroundColor: "#000000",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              marginTop: "20px",
            }}
          >
            View Order Details
          </Button>
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