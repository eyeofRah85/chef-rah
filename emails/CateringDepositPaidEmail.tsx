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
  depositAmount: number;
  paidAt: string;
  requestUrl: string;
};

export function CateringDepositPaidEmail({
  customerName,
  eventType,
  depositAmount,
  paidAt,
  requestUrl,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Your catering deposit has been received.</Preview>

      <Body
        style={emailStyles.body}
      >
        <Container
          style={emailStyles.container}
        >
          <Heading>Catering Deposit Received</Heading>

          <Text>Hello {customerName},</Text>

          <Text>Your catering deposit has been marked as received.</Text>

          <Text>
            <strong>Event:</strong> {eventType}
          </Text>

          <Text>
            <strong>Deposit:</strong> ${depositAmount.toFixed(2)}
          </Text>

          <Text>
            <strong>Paid At:</strong> {paidAt}
          </Text>

          <Hr />

          <Text>
            Thank you. Your catering request can now continue through the
            planning process.
          </Text>
            <Button
              href={requestUrl}
              style={emailStyles.button}
            >
              View Catering Request
            </Button>
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