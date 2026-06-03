import { Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import type { Article } from "../types/content";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link to={`/articoli/${article.slug}`} className="group block overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-gold/50 hover:bg-white/[0.07]">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={article.coverImage} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-warm/65">
          <span className="rounded-full bg-gold/15 px-2.5 py-1 font-bold text-gold">{article.category}</span>
          <span className="inline-flex items-center gap-1"><Clock size={14} />{article.readingTime}</span>
        </div>
        <h3 className="line-clamp-2 text-lg font-black text-white">{article.title}</h3>
        <p className="line-clamp-3 mt-2 text-sm leading-6 text-warm/70">{article.seoDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-xs text-warm/60">
              <Tag size={12} />{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
