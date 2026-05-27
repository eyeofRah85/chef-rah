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
  orderId: string;
  total: number;
  paidAt: string;
  orderUrl: string;
};

export function PaymentReceivedEmail({
  customerName,
  orderId,
  total,
  paidAt,
  orderUrl
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Your payment has been marked as received.</Preview>

      <Body
        style={emailStyles.body}
      >
        <Container
          style={emailStyles.container}
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
          <Button
            href={orderUrl}
            style={emailStyles.button}
          >
            View Order Details
          </Button>
          <Text>
            Thank you for your order with Chef Rah&apos;s Twisted Kitchen.
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