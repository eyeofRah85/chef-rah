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
        style={emailStyles.body}
      >
        <Container
          style={emailStyles.container}
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
            style={emailStyles.button}
          >
            View Order Details
          </Button>
          <Hr />

          <Text>
            You can log into your account to view order details and updates.
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