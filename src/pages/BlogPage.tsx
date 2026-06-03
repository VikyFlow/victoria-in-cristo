import { useMemo, useState } from "react";
import { ArticleCard } from "../components/ArticleCard";
import { SectionHeader } from "../components/SectionHeader";
import { categories } from "../data/mockData";
import { contentService } from "../services/contentService";

export function BlogPage() {
  const [category, setCategory] = useState("Tutte");
  const articles = contentService.getPublishedArticles();
  const filtered = useMemo(() => category === "Tutte" ? articles : articles.filter((article) => article.category === category), [articles, category]);

  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Blog" title="Domande profonde, parole semplici." description="Identita, ansia, relazioni, preghiera, Bibbia e testimonianze." />
        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {["Tutte", ...categories].map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${category === item ? "bg-gold text-deepblack" : "border border-white/10 text-warm/70 hover:text-white"}`}>{item}</button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </div>
    </section>
  );
}
