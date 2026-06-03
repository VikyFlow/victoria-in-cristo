import { ArrowLeft, ArrowRight, Bookmark, ChevronDown, Copy, Download, Highlighter, Search, Share2, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useBibleDataset } from "../hooks/useBibleDataset";
import { bibleService } from "../services/bibleService";

type ReadingTheme = "light" | "cream" | "night" | "oled";
type ReadingFontSize = 16 | 18 | 22 | 26;
type ReadingFontFamily = "Inter" | "Lora" | "Merriweather" | "EB Garamond";

interface ReadingPreferences {
  theme: ReadingTheme;
  fontSize: ReadingFontSize;
  fontFamily: ReadingFontFamily;
}

interface HighlightedVerse {
  verseId: string;
  color: string;
}

const preferencesKey = "nsqpc_reading_preferences";
const highlightsKey = "nsqpc_bible_highlights";
const savedVersesKey = "nsqpc_bible_saved_verses";
const lastReadingKey = "nsqpc_last_bible_reading";

const defaultPreferences: ReadingPreferences = {
  theme: "cream",
  fontSize: 18,
  fontFamily: "Lora",
};

const themes: Record<ReadingTheme, { label: string; background: string; text: string; panel: string; border: string; muted: string }> = {
  light: { label: "Chiaro", background: "#FFFFFF", text: "#1A1A1A", panel: "#FFFFFF", border: "rgba(26,26,26,0.12)", muted: "rgba(26,26,26,0.62)" },
  cream: { label: "Crema", background: "#F7F3E8", text: "#2C2C2C", panel: "#FFFFFF", border: "rgba(44,44,44,0.12)", muted: "rgba(44,44,44,0.62)" },
  night: { label: "Notte", background: "#0B1020", text: "#F5F5F5", panel: "#11182b", border: "rgba(245,245,245,0.14)", muted: "rgba(245,245,245,0.62)" },
  oled: { label: "OLED", background: "#000000", text: "#FFFFFF", panel: "#050505", border: "rgba(255,255,255,0.14)", muted: "rgba(255,255,255,0.62)" },
};

const fontSizes: ReadingFontSize[] = [16, 18, 22, 26];
const fontFamilies: ReadingFontFamily[] = ["Inter", "Lora", "Merriweather", "EB Garamond"];
const highlightColors = ["#FDE68A", "#BBF7D0", "#BFDBFE", "#DDD6FE", "#FED7AA"];

export function BibleBookPage() {
  const { loading, error, version } = useBibleDataset();
  const { bookSlug, chapterNumber } = useParams();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<ReadingPreferences>(() => readStorage(preferencesKey, defaultPreferences));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bookSelectOpen, setBookSelectOpen] = useState(false);
  const [bookQuery, setBookQuery] = useState("");
  const [selectedVerseIds, setSelectedVerseIds] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<HighlightedVerse[]>(() => readStorage(highlightsKey, []));
  const [savedVerseIds, setSavedVerseIds] = useState<string[]>(() => readStorage(savedVersesKey, []));
  const [message, setMessage] = useState("");

  const book = bibleService.getBook(bookSlug ?? "");
  const books = useMemo(() => bibleService.getBooks(), [version]);
  const filteredBooks = useMemo(() => books.filter((item) => item.name.toLowerCase().includes(bookQuery.trim().toLowerCase())), [books, bookQuery]);
  const chapters = book ? bibleService.getChapters(book.id) : [];
  const activeChapterNumber = Number(chapterNumber);
  const choosingChapter = !chapterNumber;
  const activeChapter = book ? bibleService.getChapter(book.id, activeChapterNumber) : undefined;
  const verses = book ? bibleService.getVerses(book.id, activeChapterNumber) : [];
  const chapterIsComplete = activeChapter ? isChapterComplete(activeChapter.verseCount, verses.length) : false;
  const previousChapter = chapters.find((chapter) => chapter.chapterNumber === activeChapterNumber - 1);
  const nextChapter = chapters.find((chapter) => chapter.chapterNumber === activeChapterNumber + 1);
  const theme = themes[preferences.theme];
  const selectedVerses = verses.filter((verse) => selectedVerseIds.includes(verse.id));

  useEffect(() => {
    writeStorage(preferencesKey, preferences);
  }, [preferences]);

  useEffect(() => {
    writeStorage(highlightsKey, highlights);
  }, [highlights]);

  useEffect(() => {
    writeStorage(savedVersesKey, savedVerseIds);
  }, [savedVerseIds]);

  useEffect(() => {
    if (!book || !chapterNumber) return;
    writeStorage(lastReadingKey, { bookSlug: book.slug, bookName: book.name, chapterNumber: activeChapterNumber });
    setSelectedVerseIds([]);
  }, [book?.slug, book?.name, chapterNumber, activeChapterNumber]);

  if (loading) {
    return <section className="px-4 py-10 sm:px-6"><div className="mx-auto max-w-3xl rounded-lg border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-warm/70">Caricamento Bibbia completa...</div></section>;
  }
  if (error) {
    return <section className="px-4 py-10 sm:px-6"><div className="mx-auto max-w-3xl rounded-lg border border-red-300/20 bg-red-400/10 p-5 text-sm font-bold text-red-200">{error}</div></section>;
  }
  if (!book) return <Navigate to="/bibbia" replace />;
  const activeBookName = book.name;
  const activeBookSlug = book.slug;
  if (chapterNumber && !activeChapter) return <Navigate to={`/bibbia/${book.slug}`} replace />;
  if (choosingChapter) return <Navigate to={`/bibbia/${book.slug}/1`} replace />;

  function updatePreferences(next: Partial<ReadingPreferences>) {
    setPreferences((current) => ({ ...current, ...next }));
  }

  function toggleVerse(verseId: string) {
    setSelectedVerseIds((current) => current.includes(verseId) ? current.filter((id) => id !== verseId) : [...current, verseId]);
  }

  function applyHighlight(color: string) {
    setHighlights((current) => {
      const remaining = current.filter((item) => !selectedVerseIds.includes(item.verseId));
      return [...remaining, ...selectedVerseIds.map((verseId) => ({ verseId, color }))];
    });
  }

  async function copySelection(targetVerses = selectedVerses) {
    await copyText(formatVerses(activeBookName, targetVerses));
    setMessage("Copiato negli appunti");
  }

  async function shareSelection(targetVerses = selectedVerses) {
    const text = formatVerses(activeBookName, targetVerses);
    if (navigator.share) {
      await navigator.share({ text });
      return;
    }
    await copyText(text);
    setMessage("Condivisione non disponibile: testo copiato");
  }

  function saveSelection() {
    setSavedVerseIds((current) => Array.from(new Set([...current, ...selectedVerseIds])));
    setMessage("Versetti salvati");
  }

  function exportSelection(targetVerses = selectedVerses, filename = `${activeBookSlug}-${activeChapterNumber}.txt`) {
    exportTextFile(formatVerses(activeBookName, targetVerses), filename);
  }

  function exportChapter() {
    exportSelection(verses, `${activeBookSlug}-${activeChapterNumber}.txt`);
  }

  return (
    <section className="min-h-screen px-4 py-4 sm:px-6 sm:py-6" style={{ background: theme.background, color: theme.text }}>
      <div className="mx-auto max-w-3xl">
        <div className="sticky top-16 z-20 -mx-4 mb-4 border-b px-4 py-3 backdrop-blur sm:top-20 sm:mx-0 sm:rounded-lg sm:border" style={{ borderColor: theme.border, background: `${theme.panel}E6` }}>
          <div className="flex items-center justify-between gap-3">
            <Link to="/bibbia" className="text-sm font-black" style={{ color: theme.muted }}>← Libri</Link>
            <button onClick={() => setDrawerOpen(true)} className="rounded-full border px-3 py-2 text-sm font-black" style={{ borderColor: theme.border, color: theme.text }} aria-label="Impostazioni lettura">
              Aa
            </button>
          </div>

          <div className="mt-3">
            <button onClick={() => setBookSelectOpen(true)} className="inline-flex max-w-full items-center gap-2 text-left font-display text-3xl font-black leading-tight sm:text-4xl" style={{ color: theme.text }} aria-label="Cambia libro">
              <span>{book.name}</span>
              <ChevronDown className="shrink-0" size={24} />
            </button>
            <p className="mt-1 text-sm font-black" style={{ color: theme.muted }}>Capitolo {activeChapterNumber}</p>
          </div>
        </div>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/bibbia/${book.slug}/${chapter.chapterNumber}`}
              className="shrink-0 rounded-full border px-4 py-2 text-sm font-black"
              style={{
                borderColor: chapter.chapterNumber === activeChapterNumber ? theme.text : theme.border,
                background: chapter.chapterNumber === activeChapterNumber ? theme.text : theme.panel,
                color: chapter.chapterNumber === activeChapterNumber ? theme.background : theme.muted,
              }}
            >
              {chapter.chapterNumber}
            </Link>
          ))}
        </div>

        <article className="rounded-lg px-3 py-5 sm:px-8 sm:py-8" style={{ background: theme.panel, border: `1px solid ${theme.border}` }}>
          {verses.length && chapterIsComplete ? (
            <div className="space-y-5" style={{ fontFamily: `${preferences.fontFamily}, serif`, fontSize: preferences.fontSize, lineHeight: 1.9 }}>
              {verses.map((verse) => {
                const highlight = highlights.find((item) => item.verseId === verse.id);
                const selected = selectedVerseIds.includes(verse.id);
                return (
                  <button
                    key={verse.id}
                    onClick={() => toggleVerse(verse.id)}
                    className="block w-full rounded-lg px-2 py-1 text-left transition"
                    style={{
                      background: selected ? `${theme.text}14` : highlight?.color ?? "transparent",
                      color: highlight && !selected ? "#1A1A1A" : theme.text,
                      outline: selected ? `2px solid ${theme.border}` : "none",
                    }}
                  >
                    <sup className="mr-2 font-sans text-sm font-black text-gold">{verse.verseNumber}</sup>
                    {verse.text}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border p-5" style={{ borderColor: theme.border, background: theme.background }}>
              <p className="text-lg font-black">Testo del capitolo non disponibile.</p>
            </div>
          )}
        </article>

        <div className="mt-5 flex items-center justify-between gap-3">
          {previousChapter ? (
            <Link className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-black" style={{ background: theme.panel, color: theme.text, border: `1px solid ${theme.border}` }} to={`/bibbia/${book.slug}/${previousChapter.chapterNumber}`}>
              <ArrowLeft size={17} /> Precedente
            </Link>
          ) : <span />}
          <button onClick={exportChapter} className="hidden rounded-full px-4 py-3 text-sm font-black sm:inline-flex" style={{ background: theme.panel, color: theme.text, border: `1px solid ${theme.border}` }}>
            Capitolo .txt
          </button>
          {nextChapter ? (
            <Link className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-black" style={{ background: theme.text, color: theme.background }} to={`/bibbia/${book.slug}/${nextChapter.chapterNumber}`}>
              Successivo <ArrowRight size={17} />
            </Link>
          ) : null}
        </div>
      </div>

      {selectedVerseIds.length ? (
        <div className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-3xl rounded-lg border p-3 shadow-2xl" style={{ borderColor: theme.border, background: theme.panel, color: theme.text }}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-black">{selectedVerseIds.length} versetto/i selezionato/i</p>
            <button onClick={() => setSelectedVerseIds([])} className="rounded-full p-2" aria-label="Chiudi toolbar"><X size={18} /></button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border px-3 py-2 text-sm font-bold" style={{ borderColor: theme.border }}><Highlighter size={16} /> Evidenzia</span>
            {highlightColors.map((color) => <button key={color} onClick={() => applyHighlight(color)} className="size-9 rounded-full border" style={{ background: color, borderColor: theme.border }} aria-label={`Evidenzia ${color}`} />)}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <ActionButton icon={<Copy size={16} />} label="Copia" onClick={() => copySelection()} theme={theme} />
            <ActionButton icon={<Share2 size={16} />} label="Condividi" onClick={() => shareSelection()} theme={theme} />
            <ActionButton icon={<Download size={16} />} label="Esporta" onClick={() => exportSelection()} theme={theme} />
            <ActionButton icon={<Bookmark size={16} />} label="Salva" onClick={saveSelection} theme={theme} />
          </div>
          {message ? <p className="mt-2 text-xs font-bold" style={{ color: theme.muted }}>{message}</p> : null}
        </div>
      ) : null}

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 bg-black/45" onClick={() => setDrawerOpen(false)}>
          <aside className="absolute inset-x-0 bottom-0 rounded-t-2xl border p-5 shadow-2xl sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-24 sm:w-96 sm:rounded-lg" onClick={(event) => event.stopPropagation()} style={{ background: theme.panel, color: theme.text, borderColor: theme.border }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Lettura</h2>
              <button onClick={() => setDrawerOpen(false)} className="rounded-full p-2" aria-label="Chiudi impostazioni"><X size={20} /></button>
            </div>

            <SettingBlock title="Tema">
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(themes) as ReadingTheme[]).map((key) => (
                  <button key={key} onClick={() => updatePreferences({ theme: key })} className="rounded-lg border px-3 py-3 text-left text-sm font-black" style={{ background: themes[key].background, color: themes[key].text, borderColor: preferences.theme === key ? "#d9b56f" : theme.border }}>
                    {themes[key].label}
                  </button>
                ))}
              </div>
            </SettingBlock>

            <SettingBlock title="Grandezza carattere">
              <div className="grid grid-cols-4 gap-2">
                {fontSizes.map((size) => (
                  <button key={size} onClick={() => updatePreferences({ fontSize: size })} className="rounded-lg border px-2 py-3 text-sm font-black" style={{ borderColor: preferences.fontSize === size ? "#d9b56f" : theme.border, color: theme.text }}>
                    {size}px
                  </button>
                ))}
              </div>
            </SettingBlock>

            <SettingBlock title="Font">
              <select value={preferences.fontFamily} onChange={(event) => updatePreferences({ fontFamily: event.target.value as ReadingFontFamily })} className="w-full rounded-lg border px-4 py-3 font-bold outline-none" style={{ background: theme.background, color: theme.text, borderColor: theme.border }}>
                {fontFamilies.map((font) => <option key={font} value={font}>{font}</option>)}
              </select>
            </SettingBlock>

          </aside>
        </div>
      ) : null}

      {bookSelectOpen ? (
        <div className="fixed inset-0 z-50 bg-black/45 p-3 sm:p-6" onClick={() => setBookSelectOpen(false)}>
          <section className="mx-auto mt-12 max-h-[82vh] max-w-2xl overflow-hidden rounded-2xl border shadow-2xl" onClick={(event) => event.stopPropagation()} style={{ background: theme.panel, color: theme.text, borderColor: theme.border }}>
            <div className="border-b p-4" style={{ borderColor: theme.border }}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: theme.muted }}>Cambia libro</p>
                  <h2 className="text-2xl font-black">{book.name}</h2>
                </div>
                <button onClick={() => setBookSelectOpen(false)} className="rounded-full p-2" aria-label="Chiudi scelta libro"><X size={20} /></button>
              </div>
              <label className="mt-4 flex items-center gap-3 rounded-lg border px-4 py-3" style={{ borderColor: theme.border, background: theme.background }}>
                <Search size={18} style={{ color: theme.muted }} />
                <input value={bookQuery} onChange={(event) => setBookQuery(event.target.value)} placeholder="Cerca libro..." className="w-full bg-transparent outline-none" style={{ color: theme.text }} autoFocus />
              </label>
            </div>
            <div className="max-h-[58vh] overflow-y-auto p-3">
              <BookPickerSection title="Antico Testamento" books={filteredBooks.filter((item) => item.testament === "old")} activeSlug={book.slug} theme={theme} onPick={(slug) => { setBookSelectOpen(false); setBookQuery(""); navigate(`/bibbia/${slug}/1`); }} />
              <BookPickerSection title="Nuovo Testamento" books={filteredBooks.filter((item) => item.testament === "new")} activeSlug={book.slug} theme={theme} onPick={(slug) => { setBookSelectOpen(false); setBookQuery(""); navigate(`/bibbia/${slug}/1`); }} />
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}

function BookPickerSection({ title, books, activeSlug, theme, onPick }: { title: string; books: Array<{ id: string; name: string; slug: string }>; activeSlug: string; theme: { border: string; text: string; muted: string; background: string }; onPick: (slug: string) => void }) {
  if (!books.length) return null;
  return (
    <div className="mb-4">
      <p className="mb-2 px-2 text-xs font-black uppercase tracking-[0.18em]" style={{ color: theme.muted }}>{title}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {books.map((item) => (
          <button
            key={item.id}
            onClick={() => onPick(item.slug)}
            className="rounded-lg border px-4 py-3 text-left text-sm font-black transition"
            style={{
              borderColor: item.slug === activeSlug ? "#d9b56f" : theme.border,
              background: item.slug === activeSlug ? "rgba(217, 181, 111, 0.18)" : theme.background,
              color: theme.text,
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick, theme }: { icon: ReactNode; label: string; onClick: () => void; theme: { border: string; text: string } }) {
  return (
    <button onClick={onClick} className="inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm font-black" style={{ borderColor: theme.border, color: theme.text }}>
      {icon} {label}
    </button>
  );
}

function SettingBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-black">{title}</p>
      {children}
    </div>
  );
}

function isChapterComplete(expectedVerseCount: number | undefined, loadedVerseCount: number) {
  if (!loadedVerseCount) return false;
  return expectedVerseCount ? loadedVerseCount >= expectedVerseCount : true;
}

function formatVerses(bookName: string, verses: Array<{ chapterNumber: number; verseNumber: number; text: string }>) {
  return verses
    .map((verse) => `${bookName} ${verse.chapterNumber}:${verse.verseNumber}\n“${verse.text}”\n\nVictoria in Cristo`)
    .join("\n\n");
}

async function copyText(text: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function exportTextFile(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
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

function writeStorage<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
