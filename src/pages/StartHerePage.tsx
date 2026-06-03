import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ButtonLink";

const steps = [
  "Leggi il Vangelo di Marco iniziando da un capitolo al giorno.",
  "Scegli uno stato emotivo e prega con parole tue.",
  "Leggi un articolo che parla alla domanda che hai adesso.",
  "Fai una domanda onesta a Dio, anche se non sei sicuro di credere.",
];

export function StartHerePage() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Inizia da qui</p>
        <h1 className="mt-3 font-display text-4xl font-black text-white sm:text-6xl">Se stai cercando Dio, puoi cominciare senza fingere.</h1>
        <p className="mt-5 text-lg leading-8 text-warm/75">Questa pagina e pensata per chi si sente vuoto, curioso, lontano, confuso o semplicemente stanco di risposte superficiali.</p>
        <div className="mt-8 grid gap-3">
          {steps.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-black text-deepblack">{index + 1}</span>
              <p className="leading-7 text-warm/78">{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/bibbia">Leggi la Bibbia</ButtonLink>
          <ButtonLink to="/blog" variant="secondary">Leggi il blog</ButtonLink>
        </div>
        <p className="mt-8 text-sm text-warm/50">Per provare il login demo: <Link className="text-gold" to="/login">utente@demo.it / password123</Link></p>
      </div>
    </section>
  );
}
