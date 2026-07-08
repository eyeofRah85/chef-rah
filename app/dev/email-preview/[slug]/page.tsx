import Link from "next/link";
import { notFound } from "next/navigation";
import { render } from "react-email";
import { getDevEmailPreview } from "@/lib/dev-email-preview-data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DevEmailPreviewPage({ params }: Props) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { slug } = await params;
  const preview = getDevEmailPreview(slug);

  if (!preview) {
    notFound();
  }

  const html = await render(preview.email);

  return (
    <main className="min-h-screen bg-[#fff7d6] px-4 py-6 text-[#1f2937] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 rounded-xl border border-[#fdba74] bg-white p-5 shadow-sm">
          <Link
            href="/dev/email-preview"
            className="text-sm font-bold text-[#2563eb]"
          >
            Back to email previews
          </Link>

          <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#2563eb]">
            Development Only
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#dc2626]">
            {preview.title}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#475569]">
            {preview.description}
          </p>
        </div>

        <iframe
          title={`${preview.title} email preview`}
          srcDoc={html}
          className="h-[900px] w-full rounded-xl border border-[#bfdbfe] bg-white shadow-sm"
        />
      </div>
    </main>
  );
}
