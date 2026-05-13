"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses = [
  "NEW",
  "REVIEWING",
  "QUOTED",
  "APPROVED",
  "DEPOSIT_DUE",
  "DEPOSIT_PAID",
  "COMPLETED",
  "CANCELLED",
];

type Props = {
  requestId: string;
  currentStatus: string;
};

export function UpdateCateringStatusForm({ requestId, currentStatus }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  async function updateStatus() {
    setSaving(true);

    const response = await fetch(`/api/admin/catering/${requestId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    setSaving(false);

    if (!response.ok) {
      alert("Failed to update catering status.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="space-y-4">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full rounded-xl border px-4 py-3"
      >
        {statuses.map((statusOption) => (
          <option key={statusOption} value={statusOption}>
            {statusOption}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={updateStatus}
        disabled={saving}
        className="w-full rounded-xl bg-black px-5 py-3 font-medium text-white disabled:bg-neutral-400"
      >
        {saving ? "Saving..." : "Update Status"}
      </button>
    </div>
  );
}