"use client";

type Props = {
  label?: string;
};

export function PrintButton({ label = "Print" }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-xl border px-4 py-2 text-sm font-medium print:hidden"
    >
      {label}
    </button>
  );
}