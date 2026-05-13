"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  orderId: string;
  currentApprovalStatus: string;
};

export function OrderApprovalForm({ orderId, currentApprovalStatus }: Props) {
  const router = useRouter();
  const [approvalNote, setApprovalNote] = useState("");
  const [saving, setSaving] = useState(false);

  async function updateApproval(approvalStatus: "APPROVED" | "DENIED") {
    setSaving(true);

    const response = await fetch(`/api/admin/orders/${orderId}/approval`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approvalStatus, approvalNote }),
    });

    setSaving(false);

    if (!response.ok) {
      alert("Failed to update approval.");
      return;
    }

    setApprovalNote("");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <p className="rounded-full bg-neutral-100 px-3 py-2 text-center text-sm font-medium">
        {currentApprovalStatus}
      </p>

      <textarea
        rows={3}
        value={approvalNote}
        onChange={(e) => setApprovalNote(e.target.value)}
        placeholder="Optional approval/denial note."
        className="w-full rounded-xl border px-4 py-3 text-sm"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={saving}
          onClick={() => updateApproval("APPROVED")}
          className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white disabled:bg-neutral-400"
        >
          Approve
        </button>

        <button
          type="button"
          disabled={saving}
          onClick={() => updateApproval("DENIED")}
          className="rounded-xl border border-red-400 bg-red-50 px-5 py-3 text-sm font-medium text-red-700 disabled:bg-neutral-100"
        >
          Deny
        </button>
      </div>
    </div>
  );
}