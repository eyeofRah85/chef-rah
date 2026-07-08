import type { ReactElement } from "react";
import { CateringDepositPaidEmail } from "@/emails/CateringDepositPaidEmail";
import { CateringRequestEmail } from "@/emails/CateringRequestEmail";
import { CateringStatusEmail } from "@/emails/CateringStatusEmail";
import { OrderApprovalEmail } from "@/emails/OrderApprovalEmail";
import { OrderConfirmationEmail } from "@/emails/OrderConfirmationEmail";
import { PaymentReceivedEmail } from "@/emails/PaymentReceivedEmail";

export type DevEmailPreviewDefinition = {
  slug: string;
  title: string;
  description: string;
  email: ReactElement;
};

const orderUrl = "http://localhost:3000/orders/dev-order-preview";
const requestUrl = "http://localhost:3000/account/catering/dev-request-preview";

const orderItems = [
  {
    name: "Weekly Meal Plan - Jerk Chicken Bowl",
    quantity: 1,
    unitPrice: 95,
    lineTotal: 110,
    notes:
      "Please keep sauces on the side. Customer acknowledged wheat and sesame allergen warnings.",
    weeklyMealPlanSelection: {
      periodLabel: "Launch Week Menu",
      packageName: "5-Day / 1 Meal Package",
      packageDays: 5,
      packageMealsPerDay: 1,
      packagePrice: 95,
      offeringName: "Jerk Chicken Bowl with Coconut Rice",
      spiceLevel: "Medium",
      proteinSubstitution: "Lamb",
      requestOnly: true,
      requiresApproval: true,
      priceDelta: 15,
    },
  },
  {
    name: "A La Carte Salmon Plate",
    quantity: 2,
    unitPrice: 24,
    lineTotal: 48,
    notes: "One plate no onions.",
  },
];

const orderSubmittedEmail = (
  <OrderConfirmationEmail
    customerName="Jordan Sample"
    orderId="dev-order-1001"
    total={175}
    subtotal={158}
    deliveryFee={10}
    lateFee={0}
    tipAmount={7}
    orderType="DELIVERY"
    paymentStatus="PAY_BY_DATE"
    approvalStatus="PENDING"
    orderUrl={orderUrl}
    items={orderItems}
    allergenAcknowledged
    allergenAcknowledgedAt="2026-06-28T14:30:00.000Z"
    deliveryName="Jordan Sample"
    deliveryPhone="404-555-0148"
    deliveryAddressLine1="123 Preview Lane"
    deliveryAddressLine2="Apt 4B"
    deliveryCity="Atlanta"
    deliveryState="GA"
    deliveryPostalCode="30303"
    deliveryNotes="Leave at the front desk and text when delivered."
  />
);

const cateringRequestEmail = (
  <CateringRequestEmail
    customerName="Taylor Preview"
    requestId="dev-catering-2001"
    requestType="CATERING"
    eventType="Birthday Dinner"
    guestCount={36}
    eventDate="Saturday, July 18, 2026 at 6:00 PM"
    location="Atlanta, GA"
    requestedMenu="Twisted soul food buffet with salmon, jerk chicken, sides, and dessert."
    specialRequests="Please include dairy-free labels and a mild sauce option."
    requestUrl={requestUrl}
  />
);

const personalChefRequestEmail = (
  <CateringRequestEmail
    customerName="Morgan Preview"
    requestId="dev-personal-chef-3001"
    requestType="PERSONAL_CHEF"
    eventType="Anniversary Dinner"
    guestCount={8}
    eventDate="Friday, August 7, 2026 at 7:30 PM"
    location="Private residence in Decatur, GA"
    requestedMenu="Four-course dinner with seafood, seasonal vegetables, and dessert."
    specialRequests="One guest avoids shellfish. Two guests prefer low spice."
    requestUrl={requestUrl}
  />
);

export const devEmailPreviews: DevEmailPreviewDefinition[] = [
  {
    slug: "order-submitted",
    title: "Order Submitted",
    description: "Customer order confirmation with delivery snapshot, items, totals, and allergen acknowledgement.",
    email: orderSubmittedEmail,
  },
  {
    slug: "order-approved",
    title: "Order Approved",
    description: "Order approval decision email.",
    email: (
      <OrderApprovalEmail
        customerName="Jordan Sample"
        orderId="dev-order-1001"
        approved
        approvalNote="Your lamb substitution has been approved for this order."
        orderUrl={orderUrl}
      />
    ),
  },
  {
    slug: "order-denied",
    title: "Order Denied",
    description: "Order denial decision email.",
    email: (
      <OrderApprovalEmail
        customerName="Jordan Sample"
        orderId="dev-order-1002"
        approved={false}
        approvalNote="This order cannot be fulfilled for the requested time. Please choose another date."
        orderUrl={orderUrl}
      />
    ),
  },
  {
    slug: "payment-received",
    title: "Payment Received",
    description: "Manual/offline order payment receipt email.",
    email: (
      <PaymentReceivedEmail
        customerName="Jordan Sample"
        orderId="dev-order-1001"
        total={175}
        paidAt="June 28, 2026 at 3:45 PM"
        orderUrl={orderUrl}
      />
    ),
  },
  {
    slug: "catering-request-submitted",
    title: "Catering Request Submitted",
    description: "Catering service request confirmation email.",
    email: cateringRequestEmail,
  },
  {
    slug: "personal-chef-request-submitted",
    title: "Personal Chef Request Submitted",
    description: "Personal Chef service request confirmation email.",
    email: personalChefRequestEmail,
  },
  {
    slug: "catering-request-approved",
    title: "Catering Request Approved",
    description: "Service request approval/status update email with quote details.",
    email: (
      <CateringStatusEmail
        customerName="Taylor Preview"
        requestType="CATERING"
        eventType="Birthday Dinner"
        status="APPROVED"
        approvalStatus="APPROVED"
        approvalNote="The requested buffet menu is approved for the selected date."
        estimatedTotal={1850}
        depositAmount={925}
        requestUrl={requestUrl}
      />
    ),
  },
  {
    slug: "catering-request-denied",
    title: "Catering Request Denied",
    description: "Service request denial/status update email.",
    email: (
      <CateringStatusEmail
        customerName="Taylor Preview"
        requestType="CATERING"
        eventType="Birthday Dinner"
        status="CANCELLED"
        approvalStatus="DENIED"
        approvalNote="The requested date is not available for catering."
        requestUrl={requestUrl}
      />
    ),
  },
  {
    slug: "catering-quote-updated",
    title: "Catering Quote Updated",
    description: "Service request quote update email with estimate and deposit.",
    email: (
      <CateringStatusEmail
        customerName="Taylor Preview"
        requestType="CATERING"
        eventType="Birthday Dinner"
        status="QUOTED"
        approvalStatus="PENDING"
        estimatedTotal={1850}
        depositAmount={925}
        requestUrl={requestUrl}
      />
    ),
  },
  {
    slug: "catering-deposit-paid",
    title: "Catering Deposit Paid",
    description: "Service request deposit receipt email.",
    email: (
      <CateringDepositPaidEmail
        customerName="Taylor Preview"
        requestType="CATERING"
        eventType="Birthday Dinner"
        depositAmount={925}
        paidAt="June 28, 2026 at 4:10 PM"
        requestUrl={requestUrl}
      />
    ),
  },
  {
    slug: "personal-chef-request-approved",
    title: "Personal Chef Request Approved",
    description: "Personal Chef request approval/status update email.",
    email: (
      <CateringStatusEmail
        customerName="Morgan Preview"
        requestType="PERSONAL_CHEF"
        eventType="Anniversary Dinner"
        status="APPROVED"
        approvalStatus="APPROVED"
        approvalNote="The four-course dinner request is approved."
        estimatedTotal={960}
        depositAmount={480}
        requestUrl={requestUrl}
      />
    ),
  },
  {
    slug: "personal-chef-deposit-paid",
    title: "Personal Chef Deposit Paid",
    description: "Personal Chef deposit receipt email.",
    email: (
      <CateringDepositPaidEmail
        customerName="Morgan Preview"
        requestType="PERSONAL_CHEF"
        eventType="Anniversary Dinner"
        depositAmount={480}
        paidAt="June 28, 2026 at 4:25 PM"
        requestUrl={requestUrl}
      />
    ),
  },
];

export function getDevEmailPreview(slug: string) {
  return devEmailPreviews.find((preview) => preview.slug === slug) ?? null;
}
