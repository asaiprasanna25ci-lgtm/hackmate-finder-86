# HackMate AI — Build Prompt & Documentation

## 1. ONE-SHOT PROMPT
Paste this entire block into any AI (Claude, Cursor, v0, Bolt, etc):

---

```
I have a React + TypeScript + Tailwind + shadcn/ui hackathon teammate-matching app called HackMate.

Current file structure:
src/
  components/hackmate/
    IdeasSection.tsx   ← idea cards grid
    MatchCard.tsx      ← swipe card UI
    ProfileForm.tsx    ← user profile form
  pages/
    Index.tsx          ← main page
    NotFound.tsx
  data/
    hackmate.ts        ← all types + data
  App.tsx              ← React Router routes

Design system (index.css):
- --primary: 252 83% 62% (purple)
- --gradient-primary: linear-gradient(135deg, hsl(252 83% 62%), hsl(270 90% 72%))
- --shadow-card, --shadow-elevated already defined
- Tailwind classes: bg-gradient-primary, shadow-card, shadow-elevated, animate-fade-in, animate-scale-in

Data types already defined in hackmate.ts:
- HackathonIdea { title, tagline, stack[] }
- Teammate { id, name, skills[], interests, experience, description, avatar }
- IDEAS array (3 ideas: StudyBuddy AI, GreenRoute, PitchPal)
- TEAMMATES array (6 people: Ada, Diego, Priya, Marcus, Sara, Yuki)

I need you to build 3 things:

────────────────────────────────────────
THING 1: Add "AI Coach" button to the header in Index.tsx
────────────────────────────────────────
- Top right of the header, next to the Restart button
- Uses bg-gradient-primary, text-primary-foreground, shadow-card styling
- Sparkles icon from lucide-react
- onClick calls useNavigate() to go to /chat

────────────────────────────────────────
THING 2: New file src/pages/ChatPage.tsx — full page AI chat
────────────────────────────────────────
Layout: h-screen, flex column, no scroll on outer container

TOP NAV BAR:
- Back arrow (ArrowLeft icon) → navigate("/")
- App logo + "HackMate AI" title + "● Gemini connected" status dot
- "New chat" button (RotateCcw icon) — clears messages, only shown when messages.length > 0
- "Disconnect" button — clears localStorage key + resets state, only shown when apiKey exists

BODY (flex row, flex-1, overflow hidden):

LEFT SIDEBAR (hidden on mobile, w-60 on lg+):
  Section 1 — "Project Ideas" with Lightbulb icon header
    - List all IDEAS from hackmate.ts as clickable rows
    - Each row: numbered badge (bg-gradient-primary) + idea title + ChevronRight on hover
    - onClick sends this prompt to AI:
      "Tell me everything about building '[idea.title]' for a hackathon —
       architecture, tech stack, 24h timeline, which teammates I need, and the best pitch angle."

  Section 2 — "Teammates" with Users icon header
    - List all TEAMMATES as clickable rows
    - Each row: avatar circle (bg-gradient-primary) + name + skills truncated
    - onClick sends this prompt:
      "Analyze [name] as a hackathon teammate. Skills: [skills] ([experience]).
       Interests: [interests]. What role should they own? What projects suit them? Any risks?"

MAIN CHAT AREA (flex-1, flex column):

  MESSAGES AREA (flex-1, overflow-y-auto):
    Empty state (when no messages):
      - Centered, Sparkles icon in gradient box
      - Title: "Describe your hackathon"
      - Subtitle: "Tell me the theme, your skills, team size, and time limit —
                   I'll suggest the best idea, pick your teammates, and give you a full roadmap."
      - 4 starter prompt cards in a 2x2 grid:
          🎓 "EdTech hackathon" → "I'm joining a 24-hour hackathon focused on education.
             I'm a frontend dev with React experience. Suggest the best idea,
             which teammates I need, and give me a roadmap."
          🌱 "Climate hack" → "Climate-focused hackathon, 48 hours, team of 2.
             I know Python and some ML. What should we build, who else do we need, and what's our pitch?"
          🤖 "AI project" → "We want to build something with LLMs. 3 person team, 24 hours —
             one designer, one backend, I do frontend. Best AI project we can realistically ship and win?"
          💰 "Fintech hack" → "Fintech hackathon, open theme, 36 hours.
             Intermediate full-stack. Suggest a winning idea with full roadmap and team breakdown."
      - Small text: "Or click any idea / teammate in the sidebar →"

    Message bubbles:
      - User messages: bg-gradient-primary, text-primary-foreground, rounded-2xl rounded-br-sm, flex-row-reverse
      - AI messages: bg-card border border-border, rounded-2xl rounded-bl-sm, Bot icon avatar (bg-gradient-primary)
      - AI messages render markdown: **bold**, ## headers (colored primary), bullet lists, code blocks
      - Typing indicator: 3 bouncing dots when loading

  INPUT BAR (border-t, bg-card/70 backdrop-blur):
    - Auto-growing textarea (rows=1, max-height 160px via scrollHeight)
    - Placeholder: "Describe your hackathon — theme, your skills, team size, time limit…"
    - Enter = send, Shift+Enter = new line
    - Send button: h-11 w-11 rounded-2xl bg-gradient-primary, Send icon, disabled when loading or empty
    - Hint text below: "Enter to send · Shift+Enter for new line"

API KEY GATE (shown instead of chat when no apiKey):
  - Centered card, max-w-sm, rounded-3xl, shadow-elevated
  - Zap icon in gradient box
  - Title: "Connect Gemini AI"
  - Password input for the key (save to localStorage as "hm_gemini_key")
  - "Start chatting" button
  - Link: "Get a free Gemini key at Google AI Studio →" pointing to https://aistudio.google.com/app/apikey

GEMINI API INTEGRATION:
  Model: gemini-1.5-flash-8b (more generous free tier)
  Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key={apiKey}

  System prompt for the AI:
  """
  You are HackMate AI — a sharp, expert hackathon coach embedded in a teammate-matching app.

  When a user describes their hackathon (theme, problem, tech interests, time limit, team size), you:
  1. Suggest the 1-2 BEST fitting ideas from the app's idea pool (or invent a better one if needed)
  2. Recommend specific teammates from the pool that complement the project
  3. Give a concrete 24-hour roadmap with architecture, stack, and timeline
  4. End with the single strongest pitch angle

  App's idea pool:
  1. "StudyBuddy AI" — Turn any PDF or lecture into flashcards, quizzes and a chat tutor in one click. [AI, frontend, backend]
  2. "GreenRoute" — A maps app that suggests the lowest-carbon route across walking, transit and rideshare. [frontend, backend]
  3. "PitchPal" — Practice your hackathon pitch with an AI judge that scores clarity, demo and impact. [AI, design, frontend]

  Available teammates:
  • Ada Chen | frontend, design | Intermediate | Interests: Design systems, motion UI, climate tech
  • Diego Park | backend, AI | Advanced | Interests: LLM agents, vector DBs, devtools
  • Priya Natarajan | AI, frontend | Intermediate | Interests: Computer vision, education, accessibility
  • Marcus Lee | design, frontend | Beginner | Interests: Branding, 3D, generative art
  • Sara Okafor | backend, frontend | Advanced | Interests: Fintech, real-time apps, dev experience
  • Yuki Tanaka | AI, backend | Intermediate | Interests: RAG, healthcare, open source

  Formatting rules:
  - Use **bold** for key terms and names
  - Use ## for section headers
  - Use bullet lists for steps and options
  - Be tactical and direct — no filler text
  - When recommending teammates, explain exactly WHY they fit this specific project
  - When giving a roadmap, give hour ranges (e.g. "Hours 0-3: …")
  """

  Send full conversation history each call (multi-turn).
  generationConfig: { temperature: 0.75, maxOutputTokens: 2000 }

────────────────────────────────────────
THING 3: Update IdeasSection.tsx — click any idea card → AI roadmap modal
────────────────────────────────────────
- Make each idea card a <button> instead of a <div>
- On hover: show "Full roadmap →" text top-right of card, border becomes primary/40
- On click: open a modal/sheet overlay

MODAL DESIGN:
  - Fixed overlay with backdrop-blur-sm bg-foreground/20
  - Card: max-w-2xl, rounded-3xl, max-h-[85vh], flex column, shadow-elevated
  - Header: idea tags (stack items as small badges) + idea title + tagline + X close button
  - Body: scrollable

  MODAL STATES:
  1. No API key → show inline key input (password field + Generate button + link to AI Studio)
     Save key to localStorage "hm_gemini_key"
  2. Loading → centered Loader2 spinner + "Gemini is building your roadmap…"
  3. Error → destructive alert + "Try again" link
  4. Success → render markdown roadmap

  ROADMAP PROMPT to send:
  """
  You are an expert hackathon mentor. Generate a complete, detailed hackathon project plan.

  Title: "[idea.title]"
  Tagline: [idea.tagline]
  Tech stack areas: [idea.stack joined by ", "]

  Structure with these exact sections:
  ## 🎯 Problem & Opportunity
  ## 🏗️ System Architecture
  ## 🛠️ Tech Stack
  ## ⏱️ 24-Hour Sprint Timeline
  ## ✅ MVP Scope
  ## 🎤 Pitch & Demo Strategy
  ## 🏆 Winning Edge

  Be specific, tactical, and hackathon-aware. No fluff.
  """

  MARKDOWN RENDERING (no external deps, pure string replacement):
  - ## heading → styled div with primary color
  - **bold** → <strong>
  - bullet lists → <ul><li>
  - code blocks → <pre><code>
  - Double newlines → spacer div

────────────────────────────────────────
THING 4: Update App.tsx — add /chat route
────────────────────────────────────────
import ChatPage from "./pages/ChatPage.tsx";
<Route path="/chat" element={<ChatPage />} />
Add before the * catch-all route.

────────────────────────────────────────
CONSTRAINTS:
- No new npm packages (zero new dependencies)
- Keep all existing types from hackmate.ts unchanged
- Keep all existing components (MatchCard, ProfileForm) unchanged
- Use existing shadcn/ui components (Button, etc) where possible
- All Tailwind classes must use the existing design system variables
- localStorage key for Gemini API key: "hm_gemini_key" (shared between chat page and ideas modal)
- TypeScript strict — no `any` types
────────────────────────────────────────
```

---

## 2. FILE CHANGE SUMMARY

| File | Action | What changes |
|---|---|---|
| `src/pages/Index.tsx` | Edit | Add "AI Coach" button + `useNavigate("/chat")` in header |
| `src/pages/ChatPage.tsx` | Create new | Full page chat — all of Thing 2 |
| `src/components/hackmate/IdeasSection.tsx` | Replace | Clickable cards + roadmap modal |
| `src/App.tsx` | Edit | Add `/chat` route |

**Files you do NOT touch:**
- `hackmate.ts` — data unchanged
- `MatchCard.tsx` — unchanged
- `ProfileForm.tsx` — unchanged
- `index.css` — unchanged
- `NavLink.tsx` — unchanged

---

## 3. SHARED STATE / STORAGE

```
localStorage key: "hm_gemini_key"
  - Set when user enters API key in either the chat page gate OR the ideas modal
  - Read on mount in both components
  - Cleared when user clicks "Disconnect" in chat nav
  - Shared — entering key once works everywhere
```

---

## 4. GEMINI API REFERENCE

```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key={KEY}

Body:
{
  "system_instruction": { "parts": [{ "text": "...system prompt..." }] },
  "contents": [
    { "role": "user", "parts": [{ "text": "user message" }] },
    { "role": "model", "parts": [{ "text": "ai reply" }] },
    ...
  ],
  "generationConfig": { "temperature": 0.75, "maxOutputTokens": 2000 }
}

Response path: data.candidates[0].content.parts[0].text

Free tier model: gemini-1.5-flash-8b (use this, NOT gemini-2.0-flash)
Get key: https://aistudio.google.com/app/apikey
```

---

## 5. COMPONENT INTERACTION MAP

```
Index.tsx
  └─ header
      └─ [AI Coach button] ──navigate──→ /chat ──→ ChatPage.tsx
                                                       ├─ sidebar ideas ──send prompt──→ Gemini
                                                       ├─ sidebar teammates ──send prompt──→ Gemini
                                                       └─ chat input ──send prompt──→ Gemini

  └─ main (after profile)
      └─ IdeasSection.tsx
          └─ [click idea card] ──→ RoadmapModal
                                     └─ ──POST──→ Gemini API
```

---

## 6. WHAT THE AI DOES IN EACH CONTEXT

### Chat page (free-form)
User says anything about their hackathon → AI responds with:
1. Best idea recommendation from the pool
2. Which 2-3 teammates to pick + why each one
3. 24h roadmap (hour-by-hour)
4. Strongest pitch angle

### Ideas modal (structured)
User clicks a specific idea → AI generates:
1. Problem & opportunity
2. System architecture
3. Tech stack (specific tools)
4. 24h sprint timeline
5. MVP scope (must-have vs cut)
6. Pitch & demo strategy
7. Winning edge

### Sidebar clicks (quick prompts)
- Idea click → full build plan for that idea
- Teammate click → role analysis, project fit, risks

---

## 7. ERROR HANDLING

```
Gemini free tier errors and fixes:
- "quota exceeded gemini-2.0-flash" → switch to gemini-1.5-flash-8b
- "rate limit" → show error, add "Try again in Xs" from error message
- "API key invalid" → show "Invalid key, please reconnect" + clear localStorage
- "empty response" → throw new Error("Empty response from Gemini.")

All errors shown as:
  bg-destructive/10 border border-destructive/30 rounded-2xl px-4 py-3 text-sm text-destructive
```

---

## 8. QUICK COPY — APP.TSX DIFF

```tsx
// Add import:
import ChatPage from "./pages/ChatPage.tsx";

// Add route (before the * route):
<Route path="/chat" element={<ChatPage />} />
```

---

## 9. QUICK COPY — INDEX.TSX HEADER DIFF

```tsx
// Add import:
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

// Inside component:
const navigate = useNavigate();

// In header JSX, next to existing buttons:
<Button
  onClick={() => navigate("/chat")}
  size="sm"
  className="bg-gradient-primary text-primary-foreground font-semibold shadow-card hover:opacity-90 transition-all gap-2"
>
  <Sparkles className="h-3.5 w-3.5" />
  AI Coach
</Button>
```