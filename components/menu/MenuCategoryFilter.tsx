"use client";

type Props = {
  categories: string[];
};

export function MenuCategoryFilter({ categories }: Props) {
  function scrollToCategory(category: string) {
    const id = category.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <div className="sticky top-[73px] z-40 mb-8 border-b bg-neutral-50/95 py-4 backdrop-blur">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => scrollToCategory(category)}
            className="rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-neutral-100"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}