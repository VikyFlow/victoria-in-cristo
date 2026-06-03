import { RefreshCw, Youtube } from "lucide-react";
import { channelVideos, channelVideosSource, channelVideosSyncedAt } from "../data/channelVideos";

export function VideoSyncAdminPage() {
  const syncedAt = new Date(channelVideosSyncedAt);

  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Admin Video</p>
        <h1 className="mt-2 font-display text-4xl font-black text-white">Sync YouTube automatico</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-warm/65">
          Questa sezione usa uno script server-side per leggere gli ultimi 50 video pubblici del canale e aggiornare i dati della libreria.
          Nel browser non facciamo scraping diretto di YouTube.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Stat label="Video importati" value={channelVideos.length} />
          <Stat label="Ultimo sync" value={Number.isNaN(syncedAt.getTime()) ? "n/d" : syncedAt.toLocaleString("it-IT")} />
          <Stat label="Frequenza" value="Ogni 12 ore" />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <h2 className="inline-flex items-center gap-2 text-xl font-black text-white"><Youtube className="text-gold" /> Canale sorgente</h2>
            <a href={channelVideosSource} target="_blank" rel="noreferrer" className="mt-3 block break-all text-sm font-bold text-gold">{channelVideosSource}</a>
            <p className="mt-3 text-sm leading-6 text-warm/60">Lo script prende i video più recenti, titolo reale, durata e YouTube ID.</p>
          </article>

          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <h2 className="inline-flex items-center gap-2 text-xl font-black text-white"><RefreshCw className="text-gold" /> Come aggiorna</h2>
            <p className="mt-3 text-sm leading-6 text-warm/60">Comando locale o server:</p>
            <code className="mt-3 block rounded-lg bg-deepblack p-3 text-sm font-bold text-warm/80">npm run sync:videos</code>
            <p className="mt-3 text-sm leading-6 text-warm/60">Workflow pronto: <span className="font-bold text-warm">.github/workflows/sync-youtube-videos.yml</span></p>
          </article>
        </div>

        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-black text-white">Ultimi video importati</h2>
          <div className="mt-4 grid gap-3">
            {channelVideos.slice(0, 10).map((video) => (
              <div key={video.id} className="rounded-lg bg-deepblack/55 p-4">
                <p className="font-black text-white">{video.title}</p>
                <p className="mt-1 text-sm text-warm/50">{video.category} · {video.duration} · {video.youtubeId}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-sm text-warm/55">{label}</p>
    </div>
  );
}
