import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Sparkles } from "lucide-react";
import storyPhoto from "../../IMG_5622.jpg";

const storyParagraphs = [
  "Sono qui per dirti che c'è un motivo alla tua esistenza.\nLa tua vita è preziosa.",
  "Voglio spendere due parole per dirti che tutto parte da un Perché? La mia domanda era: qual’è la mia ragione di vita? E quando la domanda arriva al cielo, siate pronti a ricevere la Risposta.",
  "Quando nel 2021 feci questa domanda, mi rispose Gesù. E mi donò in un secondo una pace sovrannaturale, che non posso spiegarti a parole, ma posso dirti che è reale perché la mia vita non fu mai più la stessa.",
  "Vengo da una famiglia rotta. Mia mamma e mio papà purtroppo non sono mai stati molto presenti fin dalla mia giovane età, e dentro il mio cuore nacque molta sofferenza.",
  "Ognuno di noi cerca Amore, e voglio dirti che questo amore ti sta cercando. Questa persona ha donato la sua stessa vita per riscattarti.",
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

const bornAgainParagraphs = [
  "Gesù parla di nuova nascita. Parla di ravvedimento.",
  "Che cosa ho fatto in modo pratico? Ho cambiato la direzione della mia vita e mi sono battezzata in acqua all’età di 21 anni, consapevole di quello che ho scelto di fare.",
  "Quando ho deciso di ubbidire di vero cuore ai comandamenti di Gesù, ho confessato i miei peccati e me ne sono allontanata.",
  "Ho compreso il danno del parlare male del prossimo, ho lasciato indietro il vittimismo e ho rinunciato all’orgoglio di saper fare tutto da sola.",
  "Ho iniziato a leggere la Bibbia, a pregare giornalmente, a digiunare, e giorno dopo giorno ho visto e sto vedendo il mio cuore purificato.",
  "Il segreto non è sforzarti a essere perfetto, ma arrenderti. Io mi sono arresa. Arresa alla sua presenza.",
];

export function MyStoryPage() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <div className="bg-[#fbf7ef] text-ink">
      <section className="relative overflow-hidden border-b border-ink/10 bg-[#11131f] px-4 py-12 text-warm sm:px-6 md:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-9 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="inline-flex items-center gap-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">
              <Sparkles size={16} /> La mia storia
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-8xl">
              Ciao, sono Victoria.
            </h1>
            <p className="mt-6 max-w-3xl text-2xl font-semibold leading-[1.35] text-warm/86 sm:text-4xl sm:leading-[1.25] lg:text-5xl">
              Per anni ho cercato qualcosa che in realtà non sapevo stesse cercando me.
            </p>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-warm/72 sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.45]">
              Sono qui per dirti che c'è un motivo alla tua esistenza.
              <br />
              La tua vita è preziosa.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.08 }} className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
              <img src={storyPhoto} alt="Victoria" className="aspect-[4/5] h-full w-full object-cover object-[center_18%]" />
            </div>
            <div className="relative z-10 mx-3 -mt-8 rounded-lg border border-gold/30 bg-[#fbf7ef] p-4 text-ink shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:absolute sm:-bottom-5 sm:left-8 sm:right-8 sm:mx-0 sm:mt-0">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-gold">2021</p>
              <p className="mt-1 text-lg font-bold leading-7 sm:text-xl sm:leading-8">Quando la domanda arrivò al cielo, Gesù rispose con una pace sovrannaturale.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 md:py-18 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 sm:gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">Il perché</p>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">Tutto parte da una domanda.</h2>
          </div>
          <div className="space-y-6 text-xl leading-[1.65] text-ink/76 sm:text-3xl sm:leading-[1.48] lg:text-4xl lg:leading-[1.42]">
            {storyParagraphs.slice(1, 3).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white px-4 py-14 sm:px-6 md:py-18 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">La testimonianza</p>
              <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">Gesù ha fatto qualcosa di nuovo in me.</h2>
            </div>
            <div className="space-y-6 text-xl leading-[1.65] text-ink/76 sm:text-3xl sm:leading-[1.48] lg:text-4xl lg:leading-[1.42]">
              {storyParagraphs.slice(3, 8).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-14 border-t border-ink/10 pt-12 sm:mt-20 sm:pt-14">
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">Nuova nascita</p>
                <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">Come sono nata di nuovo?</h2>
              </div>
              <div className="space-y-6 text-xl leading-[1.65] text-ink/76 sm:text-3xl sm:leading-[1.48] lg:text-4xl lg:leading-[1.42]">
                {bornAgainParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#11131f] px-4 py-14 text-warm sm:px-6 md:py-18 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">Il passo</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Come puoi nascere di nuovo?
          </h2>
          <div className="mt-8 rounded-lg border border-gold/30 bg-white/10 p-5 sm:mt-10 sm:p-8">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">Atti 2:38</p>
            <p className="mt-5 text-2xl font-bold leading-[1.45] text-white sm:text-3xl lg:text-4xl">
              "Ravvedetevi, e ciascuno di voi sia battezzato nel nome di Gesù Cristo per il perdono dei peccati; e voi riceverete il dono dello Spirito Santo."
            </p>
          </div>
          <div className="mt-10 sm:mt-12">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">Preghiera</p>
            <h3 className="mt-4 max-w-3xl font-display text-2xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              Se stai leggendo ancora, fai questa preghiera di vero cuore.
            </h3>
          </div>
          <div className="mt-8 border-l-4 border-gold pl-5 sm:mt-10 sm:pl-8">
            <div className="space-y-4 text-2xl font-semibold leading-[1.45] text-warm/92 sm:space-y-5 sm:text-3xl lg:text-4xl lg:leading-[1.45]">
              {prayerLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 md:py-18 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">Se potessi dirti una sola cosa</p>
          <blockquote className="mt-5 font-display text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
            Non sei solo/sola.
          </blockquote>
          <p className="mt-7 max-w-4xl text-2xl leading-[1.5] text-ink/70 sm:text-3xl lg:text-4xl">
            Gesù vive e vuole farti nascere di nuovo donandoti il suo Santo Spirito. Cercalo e lui si farà trovare.
          </p>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-[#11131f] px-4 py-14 text-warm sm:px-6 md:py-18 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">Lo Spirito Santo</p>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">Lui ti guida in ogni verità.</h2>
          </div>
          <div className="rounded-lg border border-gold/30 bg-white/10 p-5 sm:p-8">
            <p className="text-2xl font-bold leading-[1.45] text-white sm:text-3xl lg:text-4xl">
              "Ma quando sarà venuto lui, lo Spirito della verità, egli vi guiderà in tutta la verità."
            </p>
            <p className="mt-5 text-lg font-black text-gold sm:text-xl">Giovanni 16:13</p>
            <p className="mt-6 text-lg leading-8 text-warm/72 sm:text-xl sm:leading-9">
              Non devi camminare da sola. Lo Spirito Santo insegna, corregge, consola e porta il cuore verso la verità di Gesù.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-lg border border-ink/10 bg-[#fbf7ef] p-6 sm:p-8">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">Versetto che ha cambiato la mia vita</p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl">Giovanni 3:8</h2>
            <p className="mt-5 text-2xl font-bold leading-[1.45] sm:text-3xl">"Il vento soffia dove vuole, e tu ne odi il rumore, ma non sai né d'onde viene né dove va; così è di chiunque è nato dallo Spirito."</p>
            <p className="mt-5 text-lg leading-8 text-ink/68 sm:text-xl sm:leading-9">Questo versetto mi ha fatto capire che chi nasce dallo Spirito non vive più controllato solo da ciò che vede o capisce. Dio guida, trasforma e porta in una direzione nuova.</p>
          </article>

          <form onSubmit={submit} className="rounded-lg border border-ink/10 bg-[#fbf7ef] p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Contattami</p>
            <h2 className="mt-4 text-3xl font-black">Scrivimi con sincerità.</h2>
            <div className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-bold text-ink/75">Nome<input required name="name" className="rounded-lg border border-ink/10 bg-white px-4 py-3 outline-none focus:border-gold" /></label>
              <label className="grid gap-2 text-sm font-bold text-ink/75">Email<input required type="email" name="email" className="rounded-lg border border-ink/10 bg-white px-4 py-3 outline-none focus:border-gold" /></label>
              <label className="grid gap-2 text-sm font-bold text-ink/75">Messaggio<textarea required name="message" className="min-h-32 rounded-lg border border-ink/10 bg-white px-4 py-3 outline-none focus:border-gold" /></label>
            </div>
            <button className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-black text-warm"><Send size={17} /> Invia messaggio</button>
            {sent ? <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ink/65"><Mail size={16} /> Messaggio salvato nella demo.</p> : null}
          </form>
        </div>
      </section>
    </div>
  );
}
