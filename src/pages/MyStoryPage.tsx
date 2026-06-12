import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const storyParagraphs = [
  "Sono qui per dirti che c'è un motivo alla tua esistenza. La tua vita è preziosa.",
  "Voglio spendere due parole per dirti che tutto parte da un Perché? E quando la domanda arriva al cielo, siate pronti a ricevere la Risposta.",
  "Quando nel 2021 feci questa domanda, mi rispose Dio. E mi donò in un secondo una pace sovrannaturale, che non posso spiegarti a parole, ma posso dirti che è reale perché la mia vita non fu mai più la stessa.",
  "Vengo da una famiglia rotta. Mia mamma e mio papà purtroppo non sono mai stati molto presenti fin dalla mia giovane età, e dentro il mio cuore avevo un bisogno di essere vista.",
  "Ognuno di noi cerca Amore, e voglio dirti che questo amore ti sta cercando, e per il quale questa persona ha donato la sua stessa vita per riscattarti dalla corruzione e la malvagità che ti domina.",
  "Gesù ha fatto qualcosa di nuovo in me. Ha cambiato il mio cuore, mi ha reso una donna sensibile e amorevole, mi ha dato un proposito. Adesso tutto ha senso perché il mio cammino sta nel conoscere il mio Creatore meraviglioso, di cui ogni giorno sempre di più posso scoprire la sua bontà che non meritiamo affatto.",
  "E tu che leggi e sei arrivato fino qui, voglio dirti che Dio vive e proprio in questo momento lui ti ha dato intelligenza. Lui è la saggezza, e ogni giorno sebbene tu non lo vedi lui è lì che ti aspetta, aspetta una Risposta al suo invito di far parte della sua famiglia. Una famiglia eterna.",
  "Non sei solo/sola. Questa vita non ci appartiene e per questo con tutto il mio cuore ti voglio dire cercalo e lui si farà trovare. Perché colui che ha fatto gli occhi, forse non vede? Colui che ha formato gli orecchi forse non sente?",
  "Gesù vive e vuole farti nascere di nuovo donandoti il tuo Santo Spirito.",
];

const prayerLines = [
  "Gesù ho sempre sentito parlare di te,",
  "ma non ti conosco personalmente.",
  "Perdonami.",
  "Perdona i miei peccati, elencali pure, nel tuo cuore sai già cosa è sbagliato.",
  "Parla al mio cuore, donami la tua vita, battezzami con il tuo Santo Spirito.",
  "Apri i miei occhi, apri le mie orecchie.",
  "Grazie per donarmi il respiro e per essere morto al posto mio.",
  "Io rinuncio all'incredulità, all'orgoglio e a tutto ciò che mi separa dalla vita.",
];

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
            {"Per anni ho cercato qualcosa che in realtà non sapevo stesse cercando me."}
          </p>
        </motion.div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div className="overflow-hidden rounded-lg bg-ink/10 shadow-[0_16px_50px_rgba(0,0,0,0.12)]">
            <img
              src="/story-user-placeholder.svg"
              alt="Victoria"
              className="aspect-[4/5] h-full w-full object-cover object-center"
            />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Chi sono</p>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Sono qui per dirti che c'è un motivo alla tua esistenza.</h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-ink/72">
              <p>La tua vita è preziosa.</p>
              <p>Voglio spendere due parole per dirti che tutto parte da un Perché? E quando la domanda arriva al cielo, siate pronti a ricevere la Risposta.</p>
              <p>Quando nel 2021 feci questa domanda, mi rispose Dio. E mi donò in un secondo una pace sovrannaturale, che non posso spiegarti a parole, ma posso dirti che è reale perché la mia vita non fu mai più la stessa.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">La mia testimonianza</p>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Gesù ha fatto qualcosa di nuovo in me.</h2>
          <div className="mt-8 rounded-lg bg-white p-6 shadow-[0_16px_50px_rgba(0,0,0,0.06)] sm:p-8">
            <div className="space-y-5 text-lg leading-9 text-ink/72">
              {storyParagraphs.slice(3, 9).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-lg bg-ink p-6 text-warm sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Se stai leggendo ancora</p>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Fai questa preghiera di vero cuore.</h2>
          <div className="mt-6 rounded-lg border border-gold/30 bg-white/10 p-5 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Preghiera</p>
            <div className="mt-5 space-y-3 text-xl font-bold leading-9 text-warm">
              {prayerLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-lg border border-gold/30 bg-gold/15 p-7 sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Se potessi dirti una sola cosa</p>
          <blockquote className="mt-4 font-display text-3xl font-black leading-tight sm:text-5xl">
            Non sei solo/sola.
          </blockquote>
          <p className="mt-5 text-lg leading-8 text-ink/70">Gesù vive e vuole farti nascere di nuovo donandoti il suo Santo Spirito. Cercalo e lui si farà trovare.</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <article className="rounded-lg bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Versetto che ha cambiato la mia vita</p>
            <h2 className="mt-3 text-2xl font-black">Giovanni 3:8</h2>
            <p className="mt-4 text-xl font-bold leading-8">“Il vento soffia dove vuole, e tu ne odi il rumore, ma non sai né d'onde viene né dove va; così è di chiunque è nato dallo Spirito.”</p>
            <p className="mt-4 leading-7 text-ink/68">Questo versetto mi ha fatto capire che chi nasce dallo Spirito non vive più controllato solo da ciò che vede o capisce. Dio guida, trasforma e porta in una direzione nuova.</p>
            <p className="mt-4 rounded-lg bg-warm p-4 text-sm font-bold leading-6 text-ink/70">Applicazione personale: quando non capisco tutto del mio cammino, torno qui. Lo Spirito Santo sa dove mi sta portando, anche quando io non vedo ancora tutta la strada.</p>
          </article>

          <form onSubmit={submit} className="rounded-lg bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Contattami</p>
            <h2 className="mt-3 text-2xl font-black">Scrivimi con sincerità.</h2>
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
