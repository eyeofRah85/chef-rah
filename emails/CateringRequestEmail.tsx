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
  Button
} from "react-email";
import { emailStyles } from "@/emails/styles";

type Props = {
  customerName: string;
  requestId: string;
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
  eventType,
  guestCount,
  eventDate,
  requestedMenu,
  location,
  specialRequests,
  requestUrl
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>
        Your catering request has been received.
      </Preview>

      <Body
        style={emailStyles.body}
      >
        <Container
          style={emailStyles.container}
        >
          <Heading>Catering Request Received</Heading>

          <Text>Hello {customerName},</Text>

          <Text>
            Thank you for contacting Chef Rah&apos;s Twisted Kitchen for your
            catering event.
          </Text>

          <Section>
            <Text>
              <strong>Event Type:</strong> {eventType}
            </Text>

            <Text>
              <strong>Guest Count:</strong>{" "}
              {guestCount ?? "Not provided"}
            </Text>

            <Text>
              <strong>Event Date:</strong>{" "}
              {eventDate ?? "Not provided"}
            </Text>

            <Text>
              <strong>Location:</strong> {location ?? "Not provided"}
            </Text>

            {requestedMenu && (
              <Text>
                <strong>Requested Menu:</strong> {requestedMenu}
              </Text>
            )}

            {specialRequests && (
              <Text>
                <strong>Special Requests:</strong> {specialRequests}
              </Text>
            )}

            <Button
              href={requestUrl}
              style={emailStyles.button}
            >
              View Catering Request
            </Button>
          </Section>

          <Hr />

          <Text>
            Your request has been received and will be reviewed shortly.
          </Text>

          <Text>
            You can log into your account to track approval status, quotes, and
            deposit information.
          </Text>

          <Hr />

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