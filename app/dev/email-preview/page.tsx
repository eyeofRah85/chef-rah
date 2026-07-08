import Link from "next/link";
import { notFound } from "next/navigation";
import { devEmailPreviews } from "@/lib/dev-email-preview-data";

export default function DevEmailPreviewIndexPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fff7d6] px-6 py-10 text-[#1f2937]">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2563eb]">
          Development Only
        </p>

        <h1 className="mt-3 text-4xl font-black text-[#dc2626]">
          Email Preview Harness
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7">
          Preview transactional email templates with mock data. These pages do
          not send email, read from the database, or modify orders and service
          requests.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {devEmailPreviews.map((preview) => (
            <Link
              key={preview.slug}
              href={`/dev/email-preview/${preview.slug}`}
              className="rounded-xl border border-[#fdba74] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2563eb] hover:shadow-md"
            >
              <p className="text-lg font-black text-[#db2777]">
                {preview.title}
              </p>

              <p className="mt-2 text-sm leading-6 text-[#475569]">
                {preview.description}
              </p>

              <p className="mt-4 text-sm font-bold text-[#2563eb]">
                Open preview
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
