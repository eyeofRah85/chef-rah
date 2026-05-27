import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export function canSendEmail() {
  return Boolean(process.env.RESEND_API_KEY);
}
export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  
export const emailFromAddress =
  process.env.EMAIL_FROM_ADDRESS ??
  "Chef Rah's Twisted Kitchen <orders@example.com>";