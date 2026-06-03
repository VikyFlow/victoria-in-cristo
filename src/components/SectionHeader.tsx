interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6 max-w-3xl">
      {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">{eyebrow}</p> : null}
      <h2 className="font-display text-2xl font-black text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-7 text-warm/75 sm:text-base">{description}</p> : null}
    </div>
  );
}
