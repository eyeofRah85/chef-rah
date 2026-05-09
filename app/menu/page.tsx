import { menuItems } from "@/data/menu";
import { MenuCard } from "@/components/menu/MenuCard";

export default function MenuPage() {
  const categories = Array.from(new Set(menuItems.map((item) => item.category)));

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Seasonal Menu
          </p>
          <h1 className="mt-3 text-4xl font-bold">Order Menu</h1>
          <p className="mt-3 max-w-2xl text-neutral-700">
            Choose from seasonal plates, a la carte items, desserts, and
            catering options. Allergy notes and substitutions will be collected
            during checkout.
          </p>
        </div>

        <div className="space-y-10">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="mb-4 text-2xl font-semibold">{category}</h2>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}