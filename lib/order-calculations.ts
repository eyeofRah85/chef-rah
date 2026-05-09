export function calculateTip(
  subtotal: number,
  tipType: string,
  customTipAmount?: number,
) {
  switch (tipType) {
    case "10":
      return subtotal * 0.1;

    case "15":
      return subtotal * 0.15;

    case "20":
      return subtotal * 0.2;

    case "custom":
      return customTipAmount ?? 0;

    default:
      return 0;
  }
}