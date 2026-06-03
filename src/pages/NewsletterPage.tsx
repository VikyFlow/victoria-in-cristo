import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { contentService } from "../services/contentService";

export function NewsletterPage() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    contentService.subscribe(String(form.get("name")), String(form.get("email")), form.get("privacy") === "on");
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeader eyebrow="Newsletter" title="Ricevi parole pratiche, non rumore." description="Un invio leggero per fede, Bibbia, pace e domande vere." />
        <form onSubmit={submit} className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.05] p-5">
          <label className="grid gap-2 text-sm font-bold text-warm/80">Nome<input required name="name" className="rounded-lg border border-white/10 bg-deepblack px-4 py-3 text-white outline-none focus:border-gold" /></label>
          <label className="grid gap-2 text-sm font-bold text-warm/80">Email<input required type="email" name="email" className="rounded-lg border border-white/10 bg-deepblack px-4 py-3 text-white outline-none focus:border-gold" /></label>
          <label className="flex items-start gap-3 text-sm leading-6 text-warm/70"><input required name="privacy" type="checkbox" className="mt-1 size-4 accent-gold" /> Acconsento al trattamento dei dati per ricevere la newsletter.</label>
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-deepblack hover:bg-warm"><Mail size={17} /> Iscrivimi</button>
          {sent ? <p className="text-sm font-bold text-gold">Iscrizione salvata nel mock backend.</p> : null}
        </form>
      </div>
    </section>
  );
}
