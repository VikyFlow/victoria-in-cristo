import { Navigate, useParams } from "react-router-dom";
import { ArticleCard } from "../components/ArticleCard";
import { VideoCard } from "../components/VideoCard";
import { feelings } from "../data/mockData";
import { contentService } from "../services/contentService";

export function FeelingPage() {
  const { slug } = useParams();
  const feeling = feelings.find((item) => item.slug === slug);
  if (!feeling) return <Navigate to="/" replace />;

  const verses = contentService.getVerses().filter((verse) => feeling.verses.includes(verse.id));
  const articles = contentService.getPublishedArticles().filter((article) => feeling.recommendedArticleIds.includes(article.id));
  const videos = contentService.getVideos().filter((video) => feeling.recommendedVideoIds.includes(video.id));

  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Come ti senti oggi?</p>
        <h1 className="mt-3 font-display text-4xl font-black text-white sm:text-6xl">{feeling.label}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-warm/75">{feeling.explanation}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {verses.map((verse) => (
            <div key={verse.id} className="rounded-lg border border-gold/20 bg-gold/10 p-5">
              <p className="text-sm font-bold text-gold">{verse.reference}</p>
              <p className="mt-3 text-lg font-bold leading-8 text-white">{verse.text}</p>
              <p className="mt-3 text-sm leading-6 text-warm/70">{verse.explanation}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Preghiera</p>
            <p className="mt-3 leading-7 text-warm/80">{feeling.prayer}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Azione pratica</p>
            <p className="mt-3 leading-7 text-warm/80">{feeling.action}</p>
          </div>
        </div>

        <h2 className="mb-4 mt-10 text-2xl font-black text-white">Articoli consigliati</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {articles.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>

        <h2 className="mb-4 mt-10 text-2xl font-black text-white">Video consigliati</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {videos.map((video) => <VideoCard key={video.id} video={video} />)}
        </div>
      </div>
    </section>
  );
}
