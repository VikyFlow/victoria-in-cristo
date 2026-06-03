const faqs = [
  ["Dio esiste davvero?", "La fede cristiana invita a cercare Dio con mente, cuore e vita. Qui trovi articoli e Bibbia pratica per iniziare in modo onesto."],
  ["Come leggere la Bibbia?", "Inizia dai Vangeli, osserva Gesu, annota domande e applicazioni. Non devi capire tutto subito."],
  ["Dio mi ama?", "Il centro del Vangelo e che Dio mostra amore in Gesu prima che tu abbia tutto a posto."],
  ["Come pregare?", "Parla a Dio con sincerita: grazie, aiutami, guidami. La preghiera puo iniziare piccola."],
  ["Serve registrarsi?", "No. Login e registrazione servono solo per salvare preferiti, versetti e preferenze newsletter."],
];

export function FaqPage() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">FAQ</p>
        <h1 className="mt-3 font-display text-4xl font-black text-white sm:text-6xl">Domande frequenti, senza risposte di plastica.</h1>
        <div className="mt-8 grid gap-4">
          {faqs.map(([question, answer]) => (
            <details key={question} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <summary className="cursor-pointer text-lg font-black text-white">{question}</summary>
              <p className="mt-3 leading-7 text-warm/70">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
