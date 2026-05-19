"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  category: {
    id: string;
    name: string;
    sortOrder: number;
  };
};

export function MenuCategoryEditForm({ category }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSaving(true);

    const response = await fetch(`/api/admin/menu/categories/${category.id}`, {
      method: "PATCH",
      body: formData,
    });

    setSaving(false);

    if (!response.ok) {
      alert("Failed to update category.");
      return;
    }

    router.refresh();
  }

  return (
    <form action={handleSubmit} className="grid gap-3 md:grid-cols-[1fr_140px_auto]">
      <input
        name="name"
        defaultValue={category.name}
        className="rounded-xl border px-4 py-3 text-sm"
        required
      />

      <input
        name="sortOrder"
        type="number"
        defaultValue={category.sortOrder}
        className="rounded-xl border px-4 py-3 text-sm"
      />

      <button
        disabled={saving}
        className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white disabled:bg-neutral-400"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}