import { useMemo, useState } from "react";
import { ProfileForm } from "@/components/hackmate/ProfileForm";
import { MatchCard } from "@/components/hackmate/MatchCard";
import { IdeasSection } from "@/components/hackmate/IdeasSection";
import { Profile, Teammate, rankTeammates } from "@/data/hackmate";
import { Button } from "@/components/ui/button";
import { Users, Heart, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [matches, setMatches] = useState<Teammate[]>([]);

  const queue = useMemo(
    () => (profile ? rankTeammates(profile, seen) : []),
    [profile, seen]
  );
  const current = queue[0];

  const handleMatch = () => {
    if (!current) return;
    setMatches((m) => [...m, current]);
    setSeen((s) => new Set(s).add(current.id));
    toast.success(`Matched with ${current.name}! 🎉`);
  };

  const handleSkip = () => {
    if (!current) return;
    setSeen((s) => new Set(s).add(current.id));
  };

  const reset = () => {
    setProfile(null);
    setSeen(new Set());
    setMatches([]);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="max-w-5xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
            <Users className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">HackMate</span>
        </div>
        {profile && (
          <Button
            onClick={reset}
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-1" /> Restart
          </Button>
        )}
      </header>

      <main className="px-6 pb-20">
        {!profile ? (
          <section className="pt-6">
            <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
                Find your perfect hackathon teammate
              </h1>
              <p className="mt-4 text-muted-foreground text-lg">
                Build your profile, swipe through hackers, and ship something great this weekend.
              </p>
            </div>
            <ProfileForm onSubmit={setProfile} />
          </section>
        ) : (
          <section className="pt-4">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Hey {profile.name.split(" ")[0]} 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Here's a hacker we think you'd vibe with.
              </p>
            </div>

            {current ? (
              <MatchCard teammate={current} onMatch={handleMatch} onSkip={handleSkip} />
            ) : (
              <div className="max-w-md mx-auto bg-card rounded-2xl shadow-card p-10 text-center border border-border animate-scale-in">
                <div className="h-14 w-14 rounded-full bg-gradient-primary mx-auto flex items-center justify-center text-primary-foreground">
                  <Heart className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-xl font-bold">You're all caught up!</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  You've seen every available hacker. Restart to browse again.
                </p>
                <Button
                  onClick={reset}
                  className="mt-6 bg-gradient-primary text-primary-foreground"
                >
                  Start over
                </Button>
              </div>
            )}

            {matches.length > 0 && (
              <div className="max-w-3xl mx-auto mt-12">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 text-center">
                  Your matches ({matches.length})
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {matches.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center gap-2 bg-card border border-border rounded-full pl-1 pr-4 py-1 shadow-card animate-fade-in"
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        {m.avatar}
                      </div>
                      <span className="text-sm font-medium">{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <IdeasSection />
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
