import { getBusinessSettings } from "@/lib/business-settings";

export function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export async function calculateServerDeliveryFee(orderType: string) {
  const settings = await getBusinessSettings();

  return orderType === "delivery" ? settings.deliveryFee : 0;
}

export async function calculateServerLateFee() {
  const settings = await getBusinessSettings();
  const now = new Date();

  const cutoff = getCurrentWeekCutoff({
    cutoffDay: settings.orderCutoffDay,
    cutoffHour: settings.orderCutoffHour,
    cutoffMinute: settings.orderCutoffMinute,
  });

  return now > cutoff ? settings.lateFee : 0;
}

export async function validateServerRequestedDate(requestedDate: Date) {
  const settings = await getBusinessSettings();

  if (settings.noWeekendOrdering && isWeekend(requestedDate)) {
    return {
      valid: false,
      error: "Weekend ordering is unavailable.",
    };
  }

  return {
    valid: true,
  };
}

export async function calculateServerCateringDeposit(total: number) {
  const settings = await getBusinessSettings();

  return total * (settings.cateringDepositPercent / 100);
}

function getCurrentWeekCutoff({
  cutoffDay,
  cutoffHour,
  cutoffMinute,
}: {
  cutoffDay: number;
  cutoffHour: number;
  cutoffMinute: number;
}) {
  const now = new Date();

  const cutoff = new Date(now);
  cutoff.setHours(cutoffHour, cutoffMinute, 0, 0);

  const currentDay = cutoff.getDay();
  const diff = cutoffDay - currentDay;

  cutoff.setDate(cutoff.getDate() + diff);

  return cutoff;
}