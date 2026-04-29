import { IDEAS } from "@/data/hackmate";
import { Lightbulb } from "lucide-react";

export const IdeasSection = () => {
  return (
    <section className="w-full max-w-5xl mx-auto mt-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
          <Lightbulb className="h-4 w-4" /> Need inspiration?
        </div>
        <h2 className="text-3xl font-bold tracking-tight mt-2">Hackathon ideas</h2>
        <p className="text-muted-foreground mt-2">
          Pick a starting point and remix it with your new team.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {IDEAS.map((idea, i) => (
          <div
            key={idea.title}
            className="group bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-smooth animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold mb-4">
              {i + 1}
            </div>
            <h3 className="text-lg font-bold">{idea.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {idea.tagline}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {idea.stack.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};