import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const timeline = [
  {
    title: "Un vuoto che non sapevo spiegare",
    text: "Per anni ho cercato qualcosa che potesse riempire quello che sentivo dentro. Non lo capivo davvero, ma quel vuoto mi faceva fare domande profonde sulla mia vita.",
  },
  {
    title: "Crescere portando pesi troppo grandi",
    text: "Sono cresciuta attraversando situazioni familiari difficili, assenze, litigi e responsabilità che mi hanno fatta sentire grande prima del tempo. Dentro di me c'erano tristezza, rabbia e tanta confusione.",
  },
  {
    title: "Anni di ribellione e silenzio",
    text: "Da adolescente ho cercato approvazione e rifugio nei posti sbagliati. Fuori potevo sembrare forte, ma dentro stavo accumulando ferite che non sapevo nominare e dolore che spesso tenevo nascosto.",
  },
  {
    title: "La domanda che ha cambiato tutto",
    text: "Un giorno qualcosa ha fatto click dentro di me. Mi sono chiesta: qual è il motivo della mia esistenza? Non volevo più vivere senza sapere perché ero qui.",
  },
  {
    title: "L'incontro con Gesù Cristo",
    text: "Nella mia ricerca ho trovato Gesù Cristo. Lui ha guarito ferite che pensavo sarebbero rimaste per sempre, mi ha insegnato la vera differenza tra il bene e il male e mi ha donato il suo Spirito Santo, che ha cambiato tutto di me.",
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
            {"Per anni ho cercato qualcosa che potesse riempire il vuoto che sentivo dentro.\nNon sapevo che, in realtà, Colui che cercavo stava già cercando me."}
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
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Non sono arrivata qui con una vita perfetta.</h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-ink/72">
              <p>Ho 22 anni e sono cresciuta portando dentro domande, rabbia e un bisogno profondo di essere vista, amata e capita davvero.</p>
              <p>Per molto tempo ho cercato valore, direzione e pace in cose che non potevano darmi ciò di cui la mia anima aveva davvero bisogno. Poi Gesù Cristo è entrato nella mia storia e ha cambiato, stravolto e trasformato ogni cosa: una delle prime cose che mi ha donato è stata una pace nel cuore e nella mente che non avevo mai conosciuto prima.</p>
              <p>Victoria in Cristo nasce dal desiderio di condividere la persona più bella e meravigliosa che io abbia mai incontrato: Gesù.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">La mia testimonianza</p>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">A volte Dio usa il dolore per fare qualcosa di bello.</h2>
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
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Perché esiste questo sito?</p>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Per dirti che la tua vita ha valore.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-warm/72">
            Sono qui per dirti che c'è un motivo per la tua esistenza. Ho creato Victoria in Cristo per accompagnare persone che cercano risposte vere, non frasi superficiali, e per indicare con semplicità Colui che ha cambiato la mia vita.
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
            Gesù non ha paura della tua storia.
          </blockquote>
          <p className="mt-5 text-lg leading-8 text-ink/70">Puoi iniziare da dove sei. Con le tue domande, le tue ferite e la tua confusione. Lui sa guarire ciò che sembrava impossibile da guarire e sa rendere nuova una vita intera.</p>
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
