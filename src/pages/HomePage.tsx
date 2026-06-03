import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ArticleCard } from "../components/ArticleCard";
import { ButtonLink } from "../components/ButtonLink";
import { FeelingCard } from "../components/FeelingCard";
import { SectionHeader } from "../components/SectionHeader";
import { articles, feelings } from "../data/mockData";

export function HomePage() {
  const published = articles.filter((article) => article.status === "published").slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
        <img
          src="/hero-testimony.png"
          alt="Ragazza con capelli rosso rame che guarda verso una luce amorevole nel cielo"
          className="absolute inset-0 z-0 h-full w-full object-cover object-[70%_center] sm:object-[64%_center] lg:object-[62%_center]"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(7,12,24,0)_0%,rgba(7,12,24,0.06)_42%,rgba(7,12,24,0.68)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,12,24,0.7)_0%,rgba(7,12,24,0.42)_34%,rgba(7,12,24,0.06)_68%,rgba(7,12,24,0)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-52 bg-gradient-to-t from-deepblack via-deepblack/55 to-transparent" />
        <div className="relative z-20 mx-auto flex min-h-[calc(100svh-9rem)] max-w-7xl items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl pb-8 pt-[42vh] sm:pb-12 sm:pt-[38vh] lg:pt-0"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur-md">
              <Sparkles size={14} /> alla ricerca della verita'
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.96] text-white drop-shadow-[0_12px_38px_rgba(0,0,0,0.55)] sm:text-7xl lg:text-8xl">
              NON SEI QUI PER CASO.
            </h1>
            <p className="mt-6 max-w-2xl whitespace-pre-line text-lg leading-8 text-cyan-50/82 sm:text-xl">
              {"Forse stai cercando risposte.\nForse stai cercando il tuo scopo.\nForse stai cercando Dio."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/inizia-da-qui">Scopri perche esisti</ButtonLink>
              <ButtonLink to="/bibbia" variant="secondary">Esplora la Bibbia</ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Come ti senti oggi?" title="Scegli da dove partire." description="Non serve avere le parole giuste. Parti dal punto in cui sei e trova versetti, preghiere e passi concreti." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {feelings.map((feeling) => <FeelingCard key={feeling.id} feeling={feeling} />)}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Blog" title="Articoli per fede, identita e vita reale." />
          <div className="grid gap-5 md:grid-cols-3">
            {published.map((article) => <ArticleCard key={article.id} article={article} />)}
          </div>
        </div>
      </section>
    </>
  );
}
