import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EXPERIENCE_LEVELS,
  ExperienceLevel,
  Profile,
  SKILLS,
  Skill,
} from "@/data/hackmate";
import { Sparkles } from "lucide-react";

interface Props {
  onSubmit: (profile: Profile) => void;
}

export const ProfileForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [interests, setInterests] = useState("");
  const [experience, setExperience] = useState<ExperienceLevel>("Beginner");

  const toggleSkill = (s: Skill) =>
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const valid = name.trim().length > 0 && skills.length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        onSubmit({ name: name.trim(), skills, interests: interests.trim(), experience });
      }}
      className="w-full max-w-xl mx-auto bg-card rounded-2xl shadow-card p-8 space-y-6 animate-scale-in border border-border"
    >
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
          <Sparkles className="h-4 w-4" />
          Build your hacker profile
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Tell us about you</h2>
        <p className="text-muted-foreground text-sm">
          We'll match you with teammates who complement your strengths.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Alex Hacker"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Skills</Label>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => {
            const active = skills.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggleSkill(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-smooth ${
                  active
                    ? "bg-gradient-primary text-primary-foreground border-transparent shadow-card"
                    : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interests">Interests</Label>
        <Textarea
          id="interests"
          placeholder="AI for education, climate, devtools…"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Experience level</Label>
        <Select value={experience} onValueChange={(v) => setExperience(v as ExperienceLevel)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {EXPERIENCE_LEVELS.map((lvl) => (
              <SelectItem key={lvl} value={lvl}>
                {lvl}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={!valid}
        className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold h-12 rounded-xl shadow-card transition-smooth"
      >
        Find my teammates
      </Button>
    </form>
  );
};