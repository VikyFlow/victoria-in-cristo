import { Database, FileJson, Upload } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { bibleService } from "../services/bibleService";
import { parseAuthorizedBibleCsv } from "../services/bibleImporter";

export function BibleAdminPage() {
  const [message, setMessage] = useState("");
  const dataset = bibleService.getDataset();
  const plans = bibleService.getReadingPlans();

  function importJson(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const raw = String(form.get("json"));
    try {
      const next = bibleService.importAuthorizedJson(raw);
      setMessage(`Import JSON completato: ${next.books.length} libri, ${next.chapters.length} capitoli, ${next.verses.length} versetti.`);
    } catch {
      setMessage("JSON non valido. Usa un file autorizzato con books, chapters, verses e opzionalmente verseNotes.");
    }
  }

  async function importJsonFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".json")) {
      setMessage("Seleziona un file .json autorizzato.");
      return;
    }
    try {
      const raw = await file.text();
      const next = bibleService.importAuthorizedJson(raw);
      setMessage(`File importato: ${next.books.length} libri, ${next.chapters.length} capitoli, ${next.verses.length} versetti.`);
    } catch {
      setMessage("File JSON non valido o non compatibile con lo schema richiesto.");
    }
  }

  function previewCsv(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const verses = parseAuthorizedBibleCsv(String(form.get("csv")));
    setMessage(`Anteprima CSV: ${verses.length} versetti riconosciuti. In futuro potranno essere salvati nel dataset.`);
  }

  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Admin Bibbia</p>
        <h1 className="mt-2 font-display text-4xl font-black text-white">Gestione Bibbia</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-warm/65">Non scarica PDF o testi coperti da copyright. Importa solo JSON/CSV autorizzati o traduzioni libere da diritti. Il PDF, se mai usato, resta una sorgente temporanea da convertire in dati strutturati.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Stat label="Libri" value={dataset.books.length} />
          <Stat label="Capitoli" value={dataset.chapters.length} />
          <Stat label="Versetti" value={dataset.verses.length} />
          <Stat label="Piani" value={plans.length} />
        </div>

        {message ? <p className="mt-5 rounded-lg border border-gold/25 bg-gold/10 p-4 text-sm font-bold text-gold">{message}</p> : null}

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <form onSubmit={importJson} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <h2 className="inline-flex items-center gap-2 text-xl font-black text-white"><FileJson className="text-gold" /> Importa JSON autorizzato</h2>
            <p className="mt-2 text-sm leading-6 text-warm/60">Formato: books, chapters, verses, verseNotes. Ideale per Supabase/Firebase/CMS.</p>
            <label className="mt-4 grid gap-2 rounded-lg border border-white/10 bg-deepblack/55 p-4 text-sm font-bold text-warm/80">
              Carica file JSON
              <input type="file" accept="application/json,.json" onChange={importJsonFile} className="text-sm text-warm/65 file:mr-3 file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-black file:text-deepblack" />
            </label>
            <textarea name="json" className="input mt-4 min-h-64 font-mono text-xs" placeholder='{"books":[],"chapters":[],"verses":[],"verseNotes":[]}' />
            <button className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-deepblack"><Upload size={17} /> Importa dataset</button>
          </form>

          <form onSubmit={previewCsv} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <h2 className="inline-flex items-center gap-2 text-xl font-black text-white"><Database className="text-gold" /> Converti CSV</h2>
            <p className="mt-2 text-sm leading-6 text-warm/60">Anteprima importer: bookId,chapterNumber,verseNumber,text,translation,themes.</p>
            <textarea name="csv" className="input mt-4 min-h-64 font-mono text-xs" placeholder={"bookId,chapterNumber,verseNumber,text,translation,themes\ngen,1,1,Nel principio...,Diodati,creazione|inizio"} />
            <button className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-black text-warm/75">Analizza CSV</button>
          </form>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {["Importare capitoli", "Modificare spiegazioni", "Aggiungere temi ai versetti", "Collegare articoli", "Collegare video YouTube", "Aggiungere preghiere", "Creare piani di lettura"].map((item) => (
            <article key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <h3 className="font-black text-white">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-warm/60">Workflow previsto nello schema dati e pronto per CRUD completo quando colleghi il backend.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><p className="text-3xl font-black text-white">{value}</p><p className="text-sm text-warm/55">{label}</p></div>;
}
