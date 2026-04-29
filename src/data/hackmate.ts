export type Skill = "frontend" | "backend" | "AI" | "design";

export const SKILLS: Skill[] = ["frontend", "backend", "AI", "design"];
export const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export interface Profile {
  name: string;
  skills: Skill[];
  interests: string;
  experience: ExperienceLevel;
}

export interface Teammate extends Profile {
  id: string;
  description: string;
  avatar: string;
}

export const TEAMMATES: Teammate[] = [
  {
    id: "1",
    name: "Ada Chen",
    skills: ["frontend", "design"],
    interests: "Design systems, motion UI, climate tech",
    experience: "Intermediate",
    description:
      "Loves crafting delightful interfaces and shipping pixel-perfect prototypes overnight.",
    avatar: "AC",
  },
  {
    id: "2",
    name: "Diego Park",
    skills: ["backend", "AI"],
    interests: "LLM agents, vector DBs, devtools",
    experience: "Advanced",
    description:
      "Backend wizard who can stand up an API, queue and vector store before the pizza arrives.",
    avatar: "DP",
  },
  {
    id: "3",
    name: "Priya Natarajan",
    skills: ["AI", "frontend"],
    interests: "Computer vision, education, accessibility",
    experience: "Intermediate",
    description:
      "ML engineer with a soft spot for educational tools and clean React components.",
    avatar: "PN",
  },
  {
    id: "4",
    name: "Marcus Lee",
    skills: ["design", "frontend"],
    interests: "Branding, 3D, generative art",
    experience: "Beginner",
    description:
      "Designer turned coder. Brings a strong visual identity and Figma magic to every team.",
    avatar: "ML",
  },
  {
    id: "5",
    name: "Sara Okafor",
    skills: ["backend", "frontend"],
    interests: "Fintech, real-time apps, dev experience",
    experience: "Advanced",
    description:
      "Full-stack engineer who lives for crunchy real-time features and clean architecture.",
    avatar: "SO",
  },
  {
    id: "6",
    name: "Yuki Tanaka",
    skills: ["AI", "backend"],
    interests: "RAG, healthcare, open source",
    experience: "Intermediate",
    description:
      "Researcher-turned-builder shipping practical AI for healthcare workflows.",
    avatar: "YT",
  },
];

export interface HackathonIdea {
  title: string;
  tagline: string;
  stack: string[];
}

export const IDEAS: HackathonIdea[] = [
  {
    title: "StudyBuddy AI",
    tagline:
      "Turn any PDF or lecture into flashcards, quizzes and a chat tutor in one click.",
    stack: ["AI", "frontend", "backend"],
  },
  {
    title: "GreenRoute",
    tagline:
      "A maps app that suggests the lowest-carbon route across walking, transit and rideshare.",
    stack: ["frontend", "backend"],
  },
  {
    title: "PitchPal",
    tagline:
      "Practice your hackathon pitch with an AI judge that scores clarity, demo and impact.",
    stack: ["AI", "design", "frontend"],
  },
];

/**
 * Simple static matching: rank teammates by overlap of skills + experience match,
 * then exclude any that have already been seen.
 */
export function rankTeammates(profile: Profile, seen: Set<string>): Teammate[] {
  const score = (t: Teammate) => {
    const skillOverlap = t.skills.filter((s) => profile.skills.includes(s)).length;
    const complementary = t.skills.filter((s) => !profile.skills.includes(s)).length;
    const expMatch = t.experience === profile.experience ? 1 : 0;
    // favor complementary skills slightly more than overlap — better teams
    return complementary * 2 + skillOverlap + expMatch;
  };
  return [...TEAMMATES]
    .filter((t) => !seen.has(t.id))
    .sort((a, b) => score(b) - score(a));
}