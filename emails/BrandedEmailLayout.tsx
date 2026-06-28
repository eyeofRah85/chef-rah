import type { ReactNode } from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "react-email";
import { appUrl } from "@/lib/email";
import { emailStyles } from "@/emails/styles";

const logoUrl = new URL(
  "/business%20logo/icon-192.png",
  appUrl,
).toString();

type BrandedEmailLayoutProps = {
  preview: string;
  title: string;
  children: ReactNode;
};

export function BrandedEmailLayout({
  preview,
  title,
  children,
}: BrandedEmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>

      <Body style={emailStyles.body}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.header}>
            <Img
              src={logoUrl}
              alt="Chef Rah's Twisted Kitchen"
              object-fit="cover"
              style={emailStyles.logo}
            />

            <Text style={emailStyles.brandLabel}>Chef Rah&apos;s</Text>
            <Text style={emailStyles.brandName}>Twisted Kitchen</Text>
          </Section>

          <Section style={emailStyles.content}>
            <Heading style={emailStyles.heading}>{title}</Heading>
            {children}
          </Section>

          <Section style={emailStyles.footer}>
            <Text style={emailStyles.footerText}>
              Chef Rah&apos;s Twisted Kitchen
            </Text>
            <Text style={emailStyles.footerText}>
              Chef-prepared weekly meals, catering, and personal chef service.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
