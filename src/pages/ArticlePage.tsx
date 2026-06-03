import { Heart } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { ArticleCard } from "../components/ArticleCard";
import { useAuth } from "../auth/AuthProvider";
import { contentService } from "../services/contentService";

export function ArticlePage() {
  const { slug } = useParams();
  const article = contentService.getArticleBySlug(slug ?? "");
  const { user, updateUser } = useAuth();

  if (!article || article.status !== "published") return <Navigate to="/blog" replace />;

  const related = contentService.getPublishedArticles().filter((item) => item.id !== article.id && item.category === article.category).slice(0, 3);
  const saved = Boolean(user?.favoriteArticleIds.includes(article.id));
  const articleId = article.id;

  function toggleSave() {
    if (!user) return;
    updateUser({
      ...user,
      favoriteArticleIds: saved
        ? user.favoriteArticleIds.filter((id) => id !== articleId)
        : [...user.favoriteArticleIds, articleId],
    });
  }

  return (
    <article>
      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{article.category}</p>
          <h1 className="mt-3 font-display text-4xl font-black text-white sm:text-6xl">{article.title}</h1>
          <p className="mt-5 text-lg leading-8 text-warm/72">{article.seoDescription}</p>
          <div className="mt-5 flex items-center justify-between gap-4 text-sm text-warm/55">
            <span>{article.readingTime} · {new Date(article.publishedAt).toLocaleDateString("it-IT")}</span>
            <button onClick={toggleSave} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-bold text-warm/70 hover:text-gold">
              <Heart size={17} fill={saved ? "currentColor" : "none"} /> Salva
            </button>
          </div>
        </div>
      </section>
      <img src={article.coverImage} alt="" className="mx-auto aspect-[16/8] w-full max-w-6xl object-cover sm:rounded-lg" />
      <section className="px-4 py-10 sm:px-6">
        <div className="content-prose mx-auto max-w-3xl text-lg" dangerouslySetInnerHTML={{ __html: article.content }} />
        <div className="mx-auto mt-10 grid max-w-3xl gap-4">
          <aside className="rounded-lg border border-gold/25 bg-gold/10 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Versetto chiave</p>
            <p className="mt-3 text-lg font-bold leading-8 text-white">{article.keyVerse}</p>
          </aside>
          <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Applicazione pratica</p>
            <p className="mt-3 leading-7 text-warm/80">{article.practicalApplication}</p>
          </aside>
          <aside className="rounded-lg border border-white/10 bg-violetdeep/30 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Preghiera</p>
            <p className="mt-3 leading-7 text-warm/80">{article.prayer}</p>
          </aside>
        </div>
      </section>
      {related.length ? (
        <section className="px-4 pb-14 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-5 text-2xl font-black text-white">Articoli correlati</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((item) => <ArticleCard key={item.id} article={item} />)}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
