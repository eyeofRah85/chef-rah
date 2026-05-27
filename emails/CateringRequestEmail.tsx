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