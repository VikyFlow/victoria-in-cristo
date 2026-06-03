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
      <section className="relative overflow-hidden bg-[#f7ead6] px-4 pb-12 pt-10 text-ink sm:px-6 lg:pb-16 lg:pt-14">
        <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 rounded-lg border border-white/60 bg-white/55 p-5 shadow-[0_24px_80px_rgba(58,39,20,0.12)] backdrop-blur-md sm:p-7 lg:p-8"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <Sparkles size={14} /> alla ricerca della verita'
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.96] text-ink sm:text-7xl lg:text-8xl">
              NON SEI QUI PER CASO.
            </h1>
            <p className="mt-6 max-w-2xl whitespace-pre-line text-lg leading-8 text-ink/72 sm:text-xl">
              {"Forse stai cercando risposte.\nForse stai cercando il tuo scopo.\nForse stai cercando Dio."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/inizia-da-qui">Scopri perche esisti</ButtonLink>
              <ButtonLink to="/bibbia" variant="dark">Esplora la Bibbia</ButtonLink>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/60 shadow-[0_30px_90px_rgba(58,39,20,0.18)] sm:min-h-[560px] lg:min-h-[680px]"
          >
            <img
              src="/hero-testimony.png"
              alt="Ragazza con capelli rosso rame che guarda verso una luce amorevole nel cielo"
              className="absolute inset-0 h-full w-full object-cover object-[52%_center]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5b3419]/10 via-transparent to-white/5" />
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
