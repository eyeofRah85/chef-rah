export function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function getCurrentWeekCutoff({
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

export function isLateOrder({
  cutoffDay,
  cutoffHour,
  cutoffMinute,
}: {
  cutoffDay: number;
  cutoffHour: number;
  cutoffMinute: number;
}) {
  const now = new Date();

  return now > getCurrentWeekCutoff({
    cutoffDay,
    cutoffHour,
    cutoffMinute,
  });
}

export function calculateLateFeeFromSettings({
  lateFee,
  cutoffDay,
  cutoffHour,
  cutoffMinute,
}: {
  lateFee: number;
  cutoffDay: number;
  cutoffHour: number;
  cutoffMinute: number;
}) {
  return isLateOrder({
    cutoffDay,
    cutoffHour,
    cutoffMinute,
  })
    ? lateFee
    : 0;
}

export function validateRequestedDate(
  requestedDate: Date,
  options?: {
    noWeekendOrdering?: boolean;
  },
) {
  if (options?.noWeekendOrdering && isWeekend(requestedDate)) {
    return {
      valid: false,
      error: "Weekend ordering is unavailable.",
    };
  }

  return {
    valid: true,
  };
}