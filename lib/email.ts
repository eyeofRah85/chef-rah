import { Resend } from "resend";
import type { ReactNode } from "react";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

  export function canSendEmail() {
  return Boolean(process.env.RESEND_API_KEY);
}

export const emailFromAddress =
  process.env.EMAIL_FROM_ADDRESS ??
  "Chef Rah's Twisted Kitchen <orders@example.com>";

export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

type SendAppEmailInput = {
  to: string;
  subject: string;
  react: ReactNode;
};

export async function sendAppEmail({
  to,
  subject,
  react,
}: SendAppEmailInput) {
  try {
    if (!resend) {
      console.warn("Email skipped: RESEND_API_KEY is not configured.");
      return;
    }

    await resend.emails.send({
      from: emailFromAddress,
      to,
      subject,
      react,
    });
  } catch (emailError) {
    console.error(`Failed to send email: ${subject}`, emailError);
  }
}


