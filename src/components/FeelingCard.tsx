import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Feeling } from "../types/content";

export function FeelingCard({ feeling }: { feeling: Feeling }) {
  return (
    <Link to={`/come-ti-senti/${feeling.slug}`} className="group flex min-h-36 flex-col justify-between rounded-lg border border-white/10 bg-white/[0.045] p-4 transition hover:border-gold/60 hover:bg-gold/10">
      <div>
        <h3 className="text-lg font-black text-white">{feeling.label}</h3>
        <p className="mt-2 text-sm leading-6 text-warm/65">{feeling.summary}</p>
      </div>
      <ArrowUpRight className="mt-4 text-gold transition group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
    </Link>
  );
}
