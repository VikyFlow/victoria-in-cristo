import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../auth/AuthProvider";
import { videos } from "../data/mockData";
import { bibleService } from "../services/bibleService";
import { contentService } from "../services/contentService";

export function UserDashboardPage() {
  const { user, updateUser } = useAuth();
  if (!user) return null;

  const articles = contentService.getArticles().filter((article) => user.favoriteArticleIds.includes(article.id));
  const savedVideos = videos.filter((video) => (user.favoriteVideoIds ?? []).includes(video.id));
  const verses = contentService.getVerses().filter((verse) => user.favoriteVerseIds.includes(verse.id));
  const bibleState = bibleService.getUserState(user.id);
  const bibleDataset = bibleService.getDataset();
  const savedBibleVerses = bibleDataset.verses.filter((verse) => bibleState.savedVerseIds.includes(verse.id));
  const highlightedBibleVerses = bibleDataset.verses.filter((verse) => bibleState.highlightedVerseIds.includes(verse.id));

  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Area utente</p>
        <h1 className="mt-3 font-display text-4xl font-black text-white">Ciao, {user.name}.</h1>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Panel title="Articoli salvati">
            {articles.length ? articles.map((article) => <Link className="block rounded-lg bg-deepblack/50 p-3 font-bold text-warm/80 hover:text-gold" key={article.id} to={`/articoli/${article.slug}`}>{article.title}</Link>) : <Empty text="Nessun articolo salvato." />}
          </Panel>
          <Panel title="Video salvati">
            {savedVideos.length ? savedVideos.map((video) => <Link className="block rounded-lg bg-deepblack/50 p-3 font-bold text-warm/80 hover:text-gold" key={video.id} to={`/video/${video.id}`}><p>{video.title}</p><p className="mt-1 text-xs text-warm/45">{video.category} · {video.duration}</p></Link>) : <Empty text="Nessun video salvato." />}
          </Panel>
          <Panel title="Versetti salvati">
            {verses.length ? verses.map((verse) => <div className="rounded-lg bg-deepblack/50 p-3" key={verse.id}><p className="font-bold text-white">{verse.reference}</p><p className="text-sm text-warm/65">{verse.text}</p></div>) : <Empty text="Nessun versetto salvato." />}
          </Panel>
          <Panel title="Bibbia salvata">
            {savedBibleVerses.length ? savedBibleVerses.map((verse) => {
              const book = bibleDataset.books.find((item) => item.id === verse.bookId);
              return <Link className="block rounded-lg bg-deepblack/50 p-3 hover:text-gold" key={verse.id} to={`/bibbia/${book?.slug}/${verse.chapterNumber}/${verse.verseNumber}`}><p className="font-bold text-white">{book?.name} {verse.chapterNumber}:{verse.verseNumber}</p><p className="text-sm text-warm/65">{verse.text}</p></Link>;
            }) : <Empty text="Nessun versetto biblico salvato." />}
          </Panel>
          <Panel title="Evidenziazioni">
            {highlightedBibleVerses.length ? highlightedBibleVerses.map((verse) => {
              const book = bibleDataset.books.find((item) => item.id === verse.bookId);
              return <div className="rounded-lg bg-gold/10 p-3" key={verse.id}><p className="font-bold text-gold">{book?.name} {verse.chapterNumber}:{verse.verseNumber}</p><p className="text-sm text-warm/70">{verse.text}</p></div>;
            }) : <Empty text="Nessuna evidenziazione." />}
          </Panel>
          <Panel title="Preferenze newsletter">
            <label className="flex items-center justify-between gap-4 rounded-lg bg-deepblack/50 p-4 text-sm font-bold text-warm/80">
              Ricevi newsletter
              <input type="checkbox" checked={user.newsletter} onChange={(event) => updateUser({ ...user, newsletter: event.target.checked })} className="size-5 accent-gold" />
            </label>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="mb-4 text-xl font-black text-white">{title}</h2>
      <div className="grid gap-3">{children}</div>
    </article>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="rounded-lg border border-white/10 p-4 text-sm text-warm/55">{text}</p>;
}
