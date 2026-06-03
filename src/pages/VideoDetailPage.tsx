import { ArrowLeft, Heart, Share2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { VideoCard } from "../components/VideoCard";
import { videos } from "../data/mockData";

export function VideoDetailPage() {
  const { id } = useParams();
  const video = videos.find((item) => item.id === id);
  const { user, updateUser } = useAuth();

  if (!video) return <Navigate to="/video" replace />;

  const videoId = video.id;
  const videoTitle = video.title;
  const youtubeId = video.youtubeId;
  const favoriteVideoIds = user?.favoriteVideoIds ?? [];
  const saved = favoriteVideoIds.includes(videoId);
  const related = videos.filter((item) => item.id !== video.id && item.category === video.category).slice(0, 3);

  function toggleFavorite() {
    if (!user) return;
    updateUser({
      ...user,
      favoriteVideoIds: saved ? favoriteVideoIds.filter((item) => item !== videoId) : [...favoriteVideoIds, videoId],
    });
  }

  async function shareVideo() {
    const url = `https://www.youtube.com/watch?v=${youtubeId}`;
    const text = `${videoTitle}\n${url}`;
    if (navigator.share) {
      await navigator.share({ title: videoTitle, text, url });
      return;
    }
    await navigator.clipboard.writeText(text);
  }

  return (
    <section className="min-h-screen bg-[#0B1020] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link to="/video" className="inline-flex items-center gap-2 text-sm font-black text-[#C9A96E]"><ArrowLeft size={17} /> Torna ai video</Link>

        <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-white/[0.045]">
          <div className="aspect-video bg-black">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C9A96E]">{video.category} · {video.duration}</p>
                <h1 className="mt-3 font-display text-3xl font-black leading-tight sm:text-5xl">{video.title}</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/68">{video.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={toggleFavorite} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-black text-white/75 hover:text-[#C9A96E]">
                  <Heart size={17} fill={saved ? "currentColor" : "none"} /> Salva
                </button>
                <button onClick={shareVideo} className="inline-flex items-center gap-2 rounded-full bg-[#C9A96E] px-4 py-3 text-sm font-black text-[#0B1020]">
                  <Share2 size={17} /> Condividi
                </button>
              </div>
            </div>
            {!user ? <p className="mt-4 text-sm text-white/45">Accedi per salvare questo video nei preferiti.</p> : null}
          </div>
        </div>

        {related.length ? (
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-black">Altri video su questo tema</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((item) => <VideoCard key={item.id} video={item} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
