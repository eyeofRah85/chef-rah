import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "react-email";

type Props = {
  customerName: string;
  orderId: string;
  total: number;
  orderType: string;
};

export function OrderConfirmationEmail({
  customerName,
  orderId,
  total,
  orderType,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>
        Your Chef Rah&apos;s Twisted Kitchen order has been received.
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
          <Heading>Order Confirmation</Heading>

          <Text>Hello {customerName},</Text>

          <Text>
            Thank you for your order with Chef Rah&apos;s Twisted Kitchen.
          </Text>

          <Section>
            <Text>
              <strong>Order ID:</strong> {orderId}
            </Text>

            <Text>
              <strong>Order Type:</strong> {orderType}
            </Text>

            <Text>
              <strong>Total:</strong> ${total.toFixed(2)}
            </Text>
          </Section>

          <Hr />

          <Text>
            Your order has been received and is now being processed.
          </Text>

          <Text>
            You can log into your account to track status updates and payment
            information.
          </Text>

          <Hr />

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