import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { SectionHeader } from "../components/SectionHeader";
import { bibleService } from "../services/bibleService";

export function ReadingPlansPage() {
  const { user } = useAuth();
  const [version, setVersion] = useState(0);
  const plans = bibleService.getReadingPlans();
  const userState = user ? bibleService.getUserState(user.id) : null;

  function toggleDay(planId: string, day: number) {
    if (!user || !userState) return;
    const days = userState.readingProgress[planId] ?? [];
    const nextDays = days.includes(day) ? days.filter((item) => item !== day) : [...days, day];
    bibleService.saveUserState(user.id, { ...userState, readingProgress: { ...userState.readingProgress, [planId]: nextDays } });
    setVersion(version + 1);
  }

  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Piani di lettura" title="Percorsi biblici che puoi continuare." description="Pace, identita, Gesu, primo mese nella Bibbia e Salmi per momenti difficili." />
        <div className="grid gap-5 lg:grid-cols-2">
          {plans.map((plan) => {
            const completed = userState?.readingProgress[plan.id] ?? [];
            return (
              <article key={plan.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{plan.durationDays} giorni · {plan.theme}</p>
                    <h2 className="mt-2 text-2xl font-black text-white">{plan.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-warm/65">{plan.description}</p>
                  </div>
                  <span className="rounded-full bg-gold/15 px-3 py-2 text-sm font-black text-gold">{completed.length}/{plan.days.length}</span>
                </div>
                <div className="mt-5 grid gap-3">
                  {plan.days.map((day) => {
                    const done = completed.includes(day.day);
                    return (
                      <button key={day.day} onClick={() => toggleDay(plan.id, day.day)} className={`grid gap-2 rounded-lg border p-4 text-left transition ${done ? "border-gold bg-gold/10" : "border-white/10 bg-deepblack/55"}`}>
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-black text-white">Giorno {day.day}: {day.title}</p>
                          <CheckCircle2 size={19} className={done ? "text-gold" : "text-warm/25"} />
                        </div>
                        <p className="text-sm font-bold text-gold">{day.reference}</p>
                        <p className="text-sm leading-6 text-warm/65">{day.reflection}</p>
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
