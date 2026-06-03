import { PlayCircle } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { SectionHeader } from "../components/SectionHeader";
import { paths } from "../data/mockData";

export function PathsPage() {
  const { user, updateUser } = useAuth();

  function startPath(id: string) {
    if (!user || user.startedPathIds.includes(id)) return;
    updateUser({ ...user, startedPathIds: [...user.startedPathIds, id] });
  }

  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Percorsi" title="Playlist formative per crescere con calma." description="Layout ispirato a Netflix e Spotify: scegli una rotta, segui gli episodi, continua quando accedi." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {paths.map((path) => (
            <article key={path.id} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
              <img className="h-52 w-full object-cover" src={path.coverImage} alt="" />
              <div className="p-5">
                <h3 className="text-2xl font-black text-white">{path.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-warm/65">{path.description}</p>
                <div className="mt-4 grid gap-2">
                  {path.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between rounded-lg bg-deepblack/50 px-3 py-2 text-sm">
                      <span className="inline-flex items-center gap-2 text-warm/80"><PlayCircle size={16} className="text-gold" />{lesson.title}</span>
                      <span className="text-warm/45">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => startPath(path.id)} className="mt-5 w-full rounded-full bg-gold px-4 py-3 text-sm font-black text-deepblack hover:bg-warm">
                  {user?.startedPathIds.includes(path.id) ? "Percorso iniziato" : "Inizia percorso"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
