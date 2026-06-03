import { Link } from "react-router-dom";

interface BrandLogoProps {
  compact?: boolean;
}

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <Link to="/" className="group inline-flex items-center" aria-label="Victoria in Cristo home">
      {!compact ? (
        <span className="relative inline-flex flex-col leading-none">
          <span className="bg-gradient-to-r from-white via-warm to-gold bg-clip-text font-display text-[1.7rem] font-black lowercase text-transparent sm:text-[2rem]">
            victoria
          </span>
          <span className="-mt-0.5 ml-auto text-[0.58rem] font-black uppercase tracking-[0.26em] text-gold/90">
            in cristo
          </span>
          <span className="pointer-events-none absolute -bottom-1 left-1 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent opacity-70 transition group-hover:w-24" />
        </span>
      ) : (
        <span className="relative inline-flex items-center rounded-full border border-gold/25 bg-white/8 px-3 py-2 shadow-[0_0_28px_rgba(217,181,111,0.16)]">
          <span className="bg-gradient-to-r from-white to-gold bg-clip-text font-display text-lg font-black lowercase text-transparent">
            vic
          </span>
        </span>
      )}
    </Link>
  );
}
