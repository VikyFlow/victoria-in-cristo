import { Clock, Play } from "lucide-react";
import { Link } from "react-router-dom";
import type { Video } from "../types/content";

export function VideoCard({ video }: { video: Video }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-black/30">
      <Link to={`/video/${video.id}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-black">
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-xs font-black text-white">
            <Clock size={13} /> {video.duration}
          </span>
          <span className="absolute left-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-gold text-deepblack shadow-glow">
            <Play size={18} fill="currentColor" />
          </span>
        </div>
        <div className="p-4">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gold">{video.category}</span>
          <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight text-white">{video.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-warm/65">{video.description}</p>
          <span className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-deepblack transition group-hover:bg-gold">
            <Play size={15} fill="currentColor" /> Guarda ora
          </span>
        </div>
      </Link>
    </article>
  );
}
