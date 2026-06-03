import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useBibleDataset } from "../hooks/useBibleDataset";
import { bibleService } from "../services/bibleService";

interface LastReading {
  bookSlug: string;
  bookName: string;
  chapterNumber: number;
}

const lastReadingKey = "nsqpc_last_bible_reading";

export function BiblePage() {
  const { loading, error, version } = useBibleDataset();
  const [query, setQuery] = useState("");
  const [lastReading] = useState<LastReading | null>(() => readStorage(lastReadingKey, null));
  const normalizedQuery = query.trim().toLowerCase();
  const oldBooks = useMemo(() => bibleService.getBooks("old").filter((book) => book.name.toLowerCase().includes(normalizedQuery)), [normalizedQuery, version]);
  const newBooks = useMemo(() => bibleService.getBooks("new").filter((book) => book.name.toLowerCase().includes(normalizedQuery)), [normalizedQuery, version]);

  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Bibbia</p>
          <h1 className="mt-2 font-display text-4xl font-black text-white sm:text-6xl">Scegli un libro</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-warm/65">
            Cerca un libro oppure scorri Antico e Nuovo Testamento. Dopo il click scegli il capitolo da leggere.
          </p>
        </div>

        <label className="mb-4 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3">
          <Search size={19} className="text-gold" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cerca libro..."
            className="w-full bg-transparent text-white outline-none placeholder:text-warm/35"
          />
        </label>

        {loading ? <p className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-warm/70">Caricamento Bibbia completa...</p> : null}
        {error ? <p className="rounded-lg border border-red-300/20 bg-red-400/10 p-4 text-sm font-bold text-red-200">{error}</p> : null}

        {lastReading ? (
          <Link
            to={`/bibbia/${lastReading.bookSlug}/${lastReading.chapterNumber}`}
            className="mt-5 block rounded-lg border border-gold/30 bg-gold/10 p-4 transition hover:bg-gold/15"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Continua da dove avevi lasciato</p>
            <p className="mt-1 text-xl font-black text-white">Continua a leggere: {lastReading.bookName} {lastReading.chapterNumber}</p>
          </Link>
        ) : null}

        <BookSection title="Antico Testamento" books={oldBooks} />
        <BookSection title="Nuovo Testamento" books={newBooks} />
      </div>
    </section>
  );
}

function readStorage<T>(key: string, fallback: T): T {
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function BookSection({ title, books }: { title: string; books: ReturnType<typeof bibleService.getBooks> }) {
  if (!books.length) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-black text-gold">{title}</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/bibbia/${book.slug}/1`}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-lg font-black text-white transition hover:border-gold hover:bg-white/[0.07]"
          >
            {book.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
