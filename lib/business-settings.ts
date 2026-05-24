import { prisma } from "@/lib/prisma";

export async function getBusinessSettings() {
  let settings = await prisma.businessSettings.findFirst();

  if (!settings) {
    settings = await prisma.businessSettings.create({
      data: {},
    });
  }

  return {
    deliveryFee: Number(settings.deliveryFee),
    lateFee: Number(settings.lateFee),
    cateringDepositPercent: settings.cateringDepositPercent,
    orderCutoffDay: settings.orderCutoffDay,
    orderCutoffHour: settings.orderCutoffHour,
    orderCutoffMinute: settings.orderCutoffMinute,
    noWeekendOrdering: settings.noWeekendOrdering,
    deliveryArea: settings.deliveryArea,
  };
}