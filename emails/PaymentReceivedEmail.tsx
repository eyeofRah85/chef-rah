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
  total: number;
  paidAt: string;
};

export function PaymentReceivedEmail({
  customerName,
  orderId,
  total,
  paidAt,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Your payment has been marked as received.</Preview>

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
          <Heading>Payment Received</Heading>

          <Text>Hello {customerName},</Text>

          <Text>
            Your payment has been marked as received.
          </Text>

          <Text>
            <strong>Order ID:</strong> {orderId}
          </Text>

          <Text>
            <strong>Total Paid:</strong> ${total.toFixed(2)}
          </Text>

          <Text>
            <strong>Paid At:</strong> {paidAt}
          </Text>

          <Hr />

          <Text>
            Thank you for your order with Chef Rah&apos;s Twisted Kitchen.
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