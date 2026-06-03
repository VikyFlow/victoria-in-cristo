import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const timeline = [
  {
    title: "Domande che non se ne andavano",
    text: "C'erano giorni in cui tutto sembrava normale fuori, ma dentro avevo domande enormi: chi sono, perche esisto, dove sto andando.",
  },
  {
    title: "Errori e momenti difficili",
    text: "Ho attraversato stagioni in cui non mi sentivo abbastanza, cercavo approvazione e provavo a riempire vuoti con cose che non potevano davvero guarirmi.",
  },
  {
    title: "La ricerca di significato",
    text: "A un certo punto ho smesso di accontentarmi di risposte veloci. Volevo qualcosa di vero, qualcosa che reggesse anche quando tutto tremava.",
  },
  {
    title: "L'incontro con Cristo",
    text: "Non e stato incontrare una religione pesante. E stato scoprire un amore che mi vedeva davvero e una grazia capace di ricominciare da me.",
  },
  {
    title: "Un cammino che continua",
    text: "Sto ancora crescendo. Non ho tutte le risposte, ma ho trovato una direzione, una Parola viva e un Dio che non mi ha lasciata com'ero.",
  },
];

const helps = ["si sentono perse", "cercano uno scopo", "stanno attraversando un momento difficile", "vogliono conoscere Dio", "hanno domande sincere"];

export function MyStoryPage() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <div className="bg-warm text-ink">
      <section className="px-4 pb-12 pt-14 sm:px-6 lg:pt-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">La mia storia</p>
          <h1 className="mt-4 font-display text-5xl font-black leading-tight sm:text-7xl">Ciao, sono Victoria.</h1>
          <p className="mt-6 max-w-2xl whitespace-pre-line text-xl leading-9 text-ink/72">
            {"Per anni ho cercato risposte.\nQuesto sito nasce dal desiderio di condividere cio che ho scoperto."}
          </p>
        </motion.div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div className="overflow-hidden rounded-lg bg-ink/10 shadow-[0_16px_50px_rgba(0,0,0,0.12)]">
            <img
              src="/PHOTOTESTIMONY.png"
              alt="Victoria"
              className="aspect-[4/5] h-full w-full object-cover object-center"
            />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Chi sono</p>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Non sono arrivata qui con una vita perfetta.</h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-ink/72">
              <p>Sono una persona che ha fatto domande, ha sbagliato, ha avuto paura e ha cercato senso in tanti posti.</p>
              <p>Victoria in Cristo nasce da un cammino reale: il desiderio di parlare di fede senza maschere, senza pressione, senza frasi fatte.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">La mia testimonianza</p>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Una storia fatta di ricerca, cadute e grazia.</h2>
          <div className="mt-8 grid gap-4">
            {timeline.map((item, index) => (
              <motion.article key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.35, delay: index * 0.04 }} className="grid gap-4 rounded-lg border border-ink/10 bg-white p-5 sm:grid-cols-[auto_1fr]">
                <span className="flex size-10 items-center justify-center rounded-full bg-gold text-sm font-black text-deepblack">{index + 1}</span>
                <div>
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-2 leading-7 text-ink/68">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-lg bg-ink p-6 text-warm sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Perche esiste questo sito?</p>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Per chi sta cercando Dio senza sapere da dove iniziare.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-warm/72">
            Ho creato Victoria in Cristo per accompagnare persone che non vogliono risposte superficiali, ma parole semplici, vere e radicate nella Bibbia.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {helps.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-bold text-warm/80">{item}</span>)}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-lg border border-gold/30 bg-gold/15 p-7 sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Se potessi dirti una sola cosa</p>
          <blockquote className="mt-4 font-display text-3xl font-black leading-tight sm:text-5xl">
            Non devi sistemare tutta la tua vita prima di avvicinarti a Dio.
          </blockquote>
          <p className="mt-5 text-lg leading-8 text-ink/70">Puoi iniziare da dove sei. Con le tue domande, le tue ferite, la tua confusione. Gesu non ha paura della tua storia.</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <article className="rounded-lg bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Versetto che ha cambiato la mia vita</p>
            <h2 className="mt-3 text-2xl font-black">Giovanni 3:16</h2>
            <p className="mt-4 text-xl font-bold leading-8">“Poiche Iddio ha tanto amato il mondo...”</p>
            <p className="mt-4 leading-7 text-ink/68">Questo versetto mi ha ricordato che l'amore di Dio non e un'idea astratta. E una scelta, un dono, una strada aperta.</p>
            <p className="mt-4 rounded-lg bg-warm p-4 text-sm font-bold leading-6 text-ink/70">Applicazione personale: quando mi sento lontana, torno qui. Non parto da quanto sono forte io, ma da quanto Dio ha amato.</p>
          </article>

          <form onSubmit={submit} className="rounded-lg bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Contattami</p>
            <h2 className="mt-3 text-2xl font-black">Scrivimi con sincerita.</h2>
            <div className="mt-5 grid gap-3">
              <label className="grid gap-2 text-sm font-bold text-ink/75">Nome<input required name="name" className="rounded-lg border border-ink/10 bg-warm px-4 py-3 outline-none focus:border-gold" /></label>
              <label className="grid gap-2 text-sm font-bold text-ink/75">Email<input required type="email" name="email" className="rounded-lg border border-ink/10 bg-warm px-4 py-3 outline-none focus:border-gold" /></label>
              <label className="grid gap-2 text-sm font-bold text-ink/75">Messaggio<textarea required name="message" className="min-h-32 rounded-lg border border-ink/10 bg-warm px-4 py-3 outline-none focus:border-gold" /></label>
            </div>
            <button className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-black text-warm"><Send size={17} /> Invia messaggio</button>
            {sent ? <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-ink/65"><Mail size={16} /> Messaggio salvato nella demo.</p> : null}
          </form>
        </div>
      </section>
    </div>
  );
}
