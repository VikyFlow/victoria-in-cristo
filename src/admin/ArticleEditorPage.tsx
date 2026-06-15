import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Save } from "lucide-react";
import { categories, tags } from "../data/mockData";
import { useContent } from "../hooks/useContent";
import type { Article, ContentStatus } from "../types/content";

const emptyArticle: Article = {
  id: "",
  title: "",
  slug: "",
  seoDescription: "",
  category: "Identita",
  tags: [],
  coverImage: "",
  content: "",
  keyVerse: "",
  practicalApplication: "",
  prayer: "",
  status: "draft",
  publishedAt: new Date().toISOString().slice(0, 10),
  readingTime: "4 min",
};

export function ArticleEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles, saveArticle } = useContent();
  const existing = articles.find((article) => article.id === id);
  const [article, setArticle] = useState<Article>(() => id === "nuovo" || !id ? { ...emptyArticle, id: crypto.randomUUID() } : existing ?? emptyArticle);
  const [slugTouched, setSlugTouched] = useState(Boolean(existing?.slug));

  useEffect(() => {
    if (!slugTouched) setArticle((current) => ({ ...current, slug: slugify(current.title) }));
  }, [article.title, slugTouched]);

  const tagValue = useMemo(() => article.tags.join(", "), [article.tags]);

  if (id !== "nuovo" && !existing) return <Navigate to="/admin" replace />;

  function update<K extends keyof Article>(key: K, value: Article[K]) {
    setArticle((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveArticle(article);
    navigate("/admin");
  }

  async function saveWithStatus(status: ContentStatus) {
    await saveArticle({ ...article, status });
    navigate("/admin");
  }

  return (
    <section className="px-4 py-8 sm:px-6">
      <form onSubmit={submit} className="mx-auto grid max-w-4xl gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Editor mobile-first</p>
          <h1 className="mt-2 font-display text-4xl font-black text-white">{existing ? "Modifica articolo" : "Nuovo articolo"}</h1>
        </div>

        <Field label="Titolo articolo"><input required value={article.title} onChange={(event) => update("title", event.target.value)} className="input" /></Field>
        <Field label="Slug automatico modificabile"><input required value={article.slug} onChange={(event) => { setSlugTouched(true); update("slug", event.target.value); }} className="input" /></Field>
        <Field label="Descrizione SEO"><textarea required value={article.seoDescription} onChange={(event) => update("seoDescription", event.target.value)} className="input min-h-28" /></Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Categoria">
            <select value={article.category} onChange={(event) => update("category", event.target.value)} className="input">
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </Field>
          <Field label="Tempo di lettura"><input value={article.readingTime} onChange={(event) => update("readingTime", event.target.value)} className="input" /></Field>
        </div>

        <Field label="Tag">
          <input value={tagValue} onChange={(event) => update("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} list="tags" className="input" />
          <datalist id="tags">{tags.map((tag) => <option key={tag} value={tag} />)}</datalist>
        </Field>
        <Field label="Immagine copertina"><input required value={article.coverImage} onChange={(event) => update("coverImage", event.target.value)} className="input" placeholder="https://..." /></Field>
        <Field label="Contenuto articolo">
          <textarea required value={article.content} onChange={(event) => update("content", event.target.value)} className="input min-h-64 font-mono text-sm" placeholder="<p>Testo...</p><h2>Titolo</h2>" />
        </Field>
        <Field label="Versetto chiave"><textarea required value={article.keyVerse} onChange={(event) => update("keyVerse", event.target.value)} className="input min-h-24" /></Field>
        <Field label="Box applicazione pratica"><textarea required value={article.practicalApplication} onChange={(event) => update("practicalApplication", event.target.value)} className="input min-h-24" /></Field>
        <Field label="Box preghiera"><textarea required value={article.prayer} onChange={(event) => update("prayer", event.target.value)} className="input min-h-24" /></Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Stato">
            <select value={article.status} onChange={(event) => update("status", event.target.value as ContentStatus)} className="input">
              <option value="draft">Bozza</option>
              <option value="published">Pubblicato</option>
            </select>
          </Field>
          <Field label="Data pubblicazione"><input type="date" value={article.publishedAt} onChange={(event) => update("publishedAt", event.target.value)} className="input" /></Field>
        </div>

        <div className="sticky bottom-3 z-20 flex gap-3 rounded-full border border-white/10 bg-deepblack/90 p-2 backdrop-blur">
          <button type="button" onClick={() => saveWithStatus("draft")} className="flex-1 rounded-full border border-white/10 px-4 py-3 text-sm font-black text-warm/75">Salva come bozza</button>
          <button type="button" onClick={() => saveWithStatus("published")} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-black text-deepblack hover:bg-warm"><Save size={17} /> Pubblica</button>
        </div>
      </form>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-warm/80">
      {label}
      {children}
    </label>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
