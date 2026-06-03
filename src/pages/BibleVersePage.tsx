import { Heart, Highlighter, StickyNote } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { ArticleCard } from "../components/ArticleCard";
import { VideoCard } from "../components/VideoCard";
import { videos } from "../data/mockData";
import { bibleService } from "../services/bibleService";
import { contentService } from "../services/contentService";

export function BibleVersePage() {
  const { bookSlug, chapterNumber, verseNumber } = useParams();
  const book = bibleService.getBook(bookSlug ?? "");
  const verse = bibleService.getVerse(bookSlug ?? "", Number(chapterNumber), Number(verseNumber));
  const { user } = useAuth();
  const [version, setVersion] = useState(0);
  if (!book || !verse) return <Navigate to="/bibbia" replace />;

  const verseId = verse.id;
  const note = bibleService.getNote(verse.id);
  const chapter = bibleService.getChapter(book.id, verse.chapterNumber);
  const userState = user ? bibleService.getUserState(user.id) : null;
  const saved = Boolean(userState?.savedVerseIds.includes(verse.id));
  const highlighted = Boolean(userState?.highlightedVerseIds.includes(verse.id));
  const relatedArticles = contentService.getPublishedArticles().filter((article) => note?.relatedArticles.includes(article.id)).slice(0, 3);
  const relatedVideos = videos.filter((video) => note?.relatedVideos.includes(video.id));

  function updateUserBibleState(next: typeof userState) {
    if (!user || !next) return;
    bibleService.saveUserState(user.id, next);
    setVersion(version + 1);
  }

  function toggleSaved() {
    if (!userState) return;
    updateUserBibleState({ ...userState, savedVerseIds: saved ? userState.savedVerseIds.filter((id) => id !== verseId) : [...userState.savedVerseIds, verseId] });
  }

  function toggleHighlight() {
    if (!userState) return;
    updateUserBibleState({ ...userState, highlightedVerseIds: highlighted ? userState.highlightedVerseIds.filter((id) => id !== verseId) : [...userState.highlightedVerseIds, verseId] });
  }

  function savePersonalNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userState) return;
    const form = new FormData(event.currentTarget);
    updateUserBibleState({ ...userState, personalNotes: { ...userState.personalNotes, [verseId]: String(form.get("note")) } });
  }

  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link to={`/bibbia/${book.slug}/${verse.chapterNumber}`} className="text-sm font-bold text-gold">← Torna a {book.name} {verse.chapterNumber}</Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-gold">Pagina versetto</p>
        <h1 className="mt-2 font-display text-4xl font-black text-white">{book.name} {verse.chapterNumber}:{verse.verseNumber}</h1>
        <div className={`mt-6 rounded-lg border p-6 ${highlighted ? "border-gold bg-gold/15" : "border-white/10 bg-white/[0.05]"}`}>
          <p className="text-2xl font-black leading-10 text-white">{verse.text}</p>
          <p className="mt-4 text-sm text-warm/50">{verse.translation}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {verse.themes.map((theme) => <span key={theme} className="rounded-full bg-gold/15 px-2 py-1 text-xs font-bold text-gold">{theme}</span>)}
          </div>
        </div>

        {user ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={toggleSaved} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-warm/70 hover:text-gold"><Heart size={17} fill={saved ? "currentColor" : "none"} /> Salva</button>
            <button onClick={toggleHighlight} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-warm/70 hover:text-gold"><Highlighter size={17} /> Evidenzia</button>
          </div>
        ) : <p className="mt-4 text-sm text-warm/55">Accedi per salvare, evidenziare e aggiungere note personali.</p>}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Box title="Contesto del capitolo" text={chapter?.summary ?? "Contesto in preparazione."} />
          <Box title="Spiegazione semplice" text={note?.explanation ?? "Nota di studio in preparazione per questo versetto."} />
          <Box title="Applicazione pratica" text={note?.practicalApplication ?? "Chiediti come questo testo parla alla tua giornata."} />
          <Box title="Preghiera collegata" text={note?.prayer ?? "Dio, guidami a capire e vivere la tua Parola."} />
        </div>

        {user ? (
          <form onSubmit={savePersonalNote} className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <label className="grid gap-2 text-sm font-bold text-warm/80">
              <span className="inline-flex items-center gap-2"><StickyNote size={17} className="text-gold" /> Nota personale</span>
              <textarea name="note" defaultValue={userState?.personalNotes[verse.id] ?? ""} className="input min-h-28" placeholder="Cosa ti colpisce? Cosa vuoi ricordare?" />
            </label>
            <button className="mt-3 rounded-full bg-gold px-5 py-3 text-sm font-black text-deepblack">Salva nota</button>
          </form>
        ) : null}

        {relatedArticles.length ? <h2 className="mb-4 mt-10 text-2xl font-black text-white">Articoli correlati</h2> : null}
        <div className="grid gap-5 md:grid-cols-3">{relatedArticles.map((article) => <ArticleCard key={article.id} article={article} />)}</div>

        {relatedVideos.length ? <h2 className="mb-4 mt-10 text-2xl font-black text-white">Video collegati</h2> : null}
        <div className="grid gap-5 md:grid-cols-2">{relatedVideos.map((video) => <VideoCard key={video.id} video={video} />)}</div>
      </div>
    </section>
  );
}

function Box({ title, text }: { title: string; text: string }) {
  return <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5"><p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{title}</p><p className="mt-3 leading-7 text-warm/75">{text}</p></article>;
}
