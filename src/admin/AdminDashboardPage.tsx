import { Edit, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { backendAdapters } from "../services/backendAdapters";

const manageSections = [
  "Gestione Bibbia",
  "Gestione categorie",
  "Gestione tag",
  "Gestione versetti",
  "Gestione video YouTube",
  "Gestione newsletter",
];

export function AdminDashboardPage() {
  const { articles, subscribers, deleteArticle } = useContent();

  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Admin</p>
            <h1 className="mt-2 font-display text-4xl font-black text-white">Dashboard contenuti</h1>
          </div>
          <Link to="/admin/articoli/nuovo" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-deepblack hover:bg-warm"><Plus size={18} /> Nuovo articolo</Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Stat label="Articoli" value={articles.length} />
          <Stat label="Pubblicati" value={articles.filter((article) => article.status === "published").length} />
          <Stat label="Bozze" value={articles.filter((article) => article.status === "draft").length} />
          <Stat label="Iscritti newsletter" value={subscribers.length} />
        </div>

        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04]">
          <div className="border-b border-white/10 p-4">
            <h2 className="text-xl font-black text-white">Lista articoli</h2>
          </div>
          <div className="grid gap-3 p-4">
            {articles.map((article) => (
              <div key={article.id} className="grid gap-3 rounded-lg bg-deepblack/55 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black text-white">{article.title}</h3>
                    <span className={`rounded-full px-2 py-1 text-xs font-bold ${article.status === "published" ? "bg-emerald-400/15 text-emerald-200" : "bg-gold/15 text-gold"}`}>{article.status === "published" ? "pubblicato" : "bozza"}</span>
                  </div>
                  <p className="mt-1 text-sm text-warm/55">/{article.slug} · {article.category}</p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/admin/articoli/${article.id}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-warm/70 hover:text-gold"><Edit size={16} /> Modifica</Link>
                  <button onClick={async () => { await deleteArticle(article.id); }} className="inline-flex items-center gap-2 rounded-full border border-red-300/20 px-4 py-2 text-sm font-bold text-red-200 hover:bg-red-400/10"><Trash2 size={16} /> Elimina</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {manageSections.map((section) => (
            <article key={section} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-lg font-black text-white">{section}</h3>
              <p className="mt-2 text-sm leading-6 text-warm/60">Struttura pronta per CRUD completo con Supabase, Firebase o CMS headless.</p>
              {section === "Gestione Bibbia" ? <Link to="/admin/bibbia" className="mt-4 inline-flex rounded-full bg-gold px-4 py-2 text-sm font-black text-deepblack">Apri Bibbia</Link> : null}
              {section === "Gestione video YouTube" ? <Link to="/admin/video-sync" className="mt-4 inline-flex rounded-full bg-gold px-4 py-2 text-sm font-black text-deepblack">Apri sync</Link> : null}
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-black text-white">Backend futuro</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {backendAdapters.map((adapter) => (
              <div key={adapter.name} className="rounded-lg bg-deepblack/55 p-4">
                <p className="font-black uppercase text-gold">{adapter.name}</p>
                <p className="mt-2 text-sm leading-6 text-warm/65">{adapter.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="text-sm text-warm/55">{label}</p>
    </div>
  );
}
