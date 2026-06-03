import { Heart, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { SectionHeader } from "../components/SectionHeader";
import { contentService } from "../services/contentService";

const topics = ["ansia", "paura", "amore", "perdono", "identita", "pace", "forza", "speranza", "fede", "guarigione"];

export function BiblePracticalPage() {
  const [query, setQuery] = useState("");
  const { user, updateUser } = useAuth();
  const verses = contentService.getVerses();
  const filtered = useMemo(() => verses.filter((verse) => `${verse.topic} ${verse.reference} ${verse.text}`.toLowerCase().includes(query.toLowerCase())), [query, verses]);

  function toggleVerse(id: string) {
    if (!user) return;
    const exists = user.favoriteVerseIds.includes(id);
    updateUser({ ...user, favoriteVerseIds: exists ? user.favoriteVerseIds.filter((item) => item !== id) : [...user.favoriteVerseIds, id] });
  }

  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Bibbia pratica" title="Cerca una parola, trova una direzione." description="Versetti con spiegazione, contesto e applicazione pratica." />
        <label className="mb-5 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3">
          <Search size={20} className="text-gold" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ansia, paura, amore, perdono..." className="w-full bg-transparent text-white outline-none placeholder:text-warm/35" />
        </label>
        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {topics.map((topic) => <button key={topic} onClick={() => setQuery(topic)} className="whitespace-nowrap rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-warm/70 hover:border-gold hover:text-gold">{topic}</button>)}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((verse) => {
            const saved = Boolean(user?.favoriteVerseIds.includes(verse.id));
            return (
              <article key={verse.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{verse.topic}</p>
                    <h3 className="mt-2 text-xl font-black text-white">{verse.reference}</h3>
                  </div>
                  <button onClick={() => toggleVerse(verse.id)} className="rounded-full border border-white/10 p-2 text-warm/60 hover:text-gold" aria-label="Salva versetto">
                    <Heart size={18} fill={saved ? "currentColor" : "none"} />
                  </button>
                </div>
                <p className="mt-4 text-lg font-bold leading-8 text-white">{verse.text}</p>
                <p className="mt-4 text-sm leading-6 text-warm/70"><strong className="text-warm">Spiegazione:</strong> {verse.explanation}</p>
                <p className="mt-2 text-sm leading-6 text-warm/70"><strong className="text-warm">Contesto:</strong> {verse.context}</p>
                <p className="mt-2 text-sm leading-6 text-warm/70"><strong className="text-warm">Applicazione:</strong> {verse.application}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
