import { Button } from "@/components/ui/button";
import { Teammate } from "@/data/hackmate";
import { Heart, X, Sparkles } from "lucide-react";

interface Props {
  teammate: Teammate;
  onMatch: () => void;
  onSkip: () => void;
}

export const MatchCard = ({ teammate, onMatch, onSkip }: Props) => {
  return (
    <div
      key={teammate.id}
      className="w-full max-w-md mx-auto bg-card rounded-2xl shadow-elevated border border-border overflow-hidden animate-scale-in"
    >
      <div className="bg-gradient-primary p-8 flex flex-col items-center text-primary-foreground">
        <div className="h-24 w-24 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold border-2 border-card/30">
          {teammate.avatar}
        </div>
        <h3 className="mt-4 text-2xl font-bold">{teammate.name}</h3>
        <span className="mt-1 text-xs uppercase tracking-wider opacity-90">
          {teammate.experience}
        </span>
      </div>

      <div className="p-6 space-y-5">
        <p className="text-foreground text-center leading-relaxed">
          {teammate.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {teammate.skills.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Interests
          </div>
          <p className="text-sm text-foreground">{teammate.interests}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            onClick={onSkip}
            variant="outline"
            className="h-12 rounded-xl border-border hover:bg-secondary"
          >
            <X className="h-4 w-4 mr-1" /> Skip
          </Button>
          <Button
            onClick={onMatch}
            className="h-12 rounded-xl bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold"
          >
            <Heart className="h-4 w-4 mr-1" /> Match
          </Button>
        </div>
      </div>
    </div>
  );
};