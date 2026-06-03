import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { VideoCard } from "../components/VideoCard";
import { videos } from "../data/mockData";

const videoCategories = ["Tutte", "Identita", "Scopo della Vita", "Pace e Ansia", "Fede", "Preghiera", "Crescita Spirituale", "Testimonianze", "Vangelo"];
const videosPerPage = 20;

export function VideosPage() {
  const [category, setCategory] = useState("Tutte");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory = category === "Tutte" || video.category === category;
      const searchable = `${video.title} ${video.category} ${video.description} ${video.topics.join(" ")}`.toLowerCase();
      return matchesCategory && searchable.includes(normalizedQuery);
    });
  }, [category, normalizedQuery]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / videosPerPage));
  const paginated = filtered.slice((page - 1) * videosPerPage, page * videosPerPage);

  useEffect(() => {
    setPage(1);
  }, [category, normalizedQuery]);

  return (
    <section className="min-h-screen bg-[#0B1020] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C9A96E]">Video</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight sm:text-6xl">Video che possono cambiare la tua prospettiva</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
            Insegnamenti biblici, testimonianze e contenuti di crescita spirituale scelti per rispondere a domande vere.
          </p>
        </div>

        <label className="mb-4 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3">
          <Search size={19} className="text-[#C9A96E]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cerca un video..."
            className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
          />
        </label>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {videoCategories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition ${
                category === item ? "bg-[#C9A96E] text-[#0B1020]" : "border border-white/10 text-white/70 hover:border-[#C9A96E] hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {paginated.map((video) => <VideoCard key={video.id} video={video} />)}
        </div>

        {!filtered.length ? (
          <p className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-white/65">Nessun video trovato.</p>
        ) : null}

        {filtered.length ? (
          <div className="mt-8 flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-white/60">
              Mostrando {Math.min((page - 1) * videosPerPage + 1, filtered.length)}-{Math.min(page * videosPerPage, filtered.length)} di {filtered.length} video
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-black text-white/75 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft size={16} /> Indietro
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                    page === item ? "bg-[#C9A96E] text-[#0B1020]" : "border border-white/10 text-white/70"
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-black text-white/75 disabled:cursor-not-allowed disabled:opacity-35"
              >
                Avanti <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
