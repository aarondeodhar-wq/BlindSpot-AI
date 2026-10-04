# 👁️ THE BLIND SPOT // Cognitive Sparring Partner & Decision Auditor

> *"What you aren't seeing matters more than what you are."*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![WCAG AA](https://img.shields.io/badge/WCAG-2.1_AA_Compliant-success?style=for-the-badge)

---

## 🎯 Problem Statement & Challenge

People make decisions based on what is most visible to them (salience bias). In the process, they overlook critical factors, rely on unstated assumptions, or fail to recognize conflicts within their own reasoning.

### The Challenge
Build an AI-powered solution that helps users identify potential **blind spots** in their reasoning when considering a decision.

### 🛡️ The Golden Rule (Prime Constraint)
> **The system MUST NOT make the decision for the user.** Its purpose is strictly to help the user think more critically about the decision.

---

## 💡 The Solution: The Blind Spot Framework

**The Blind Spot** is an epistemic sparring partner and decision auditor based on behavioral economics, systems dynamics, and cognitive psychology. It takes the user's stated rationale and constraints, decomposes their mental model, and projects unexamined surface area across **6 distinct dimensions**:

```
                          ┌───────────────────────────┐
                          │   USER'S VISIBLE INPUT    │
                          │ (Perks, Salary, Proximity)│
                          └─────────────┬─────────────┘
                                        │
                         [ WYSIATI INVERSION ENGINE ]
                                        │
  ┌─────────────────────────────────────┼─────────────────────────────────────┐
  ▼                                     ▼                                     ▼
1. 🧊 UNSTATED ASSUMPTIONS         2. 🕳️ STRUCTURAL BLIND SPOTS       3. ⚖️ SHADOW TRADE-OFFS
   (Fragile beliefs taken as facts)   (Omitted external factors)          (Invisible sacrifices)

  ▼                                     ▼                                     ▼
4. 🔮 2ND-ORDER DOMINOS            5. 🧠 COGNITIVE BIAS RADAR          6. ⚔️ SOCRATIC SPARRING
   (3-6 mo, 1-2 yr, 3-5 yr)           (Present/Proximity bias)            (Interactive challenge)
```

---

## 🚀 Live Demo & Key Capabilities

- **Strict Non-Prescriptive Contract:** Zero advice like "accept this" or "reject this". Refuses to decide for the user.
- **Direct Alignment with Prompt Example:** Includes a 1-click preset for the exact hackathon brief:
  * *Student deciding whether to accept a 6-month internship ($2,500/mo stipend, 15 min from home, 40 hrs/week, while balancing 4 engineering subjects and 75% attendance policy).*
- **Verification Protocols:** Each unstated assumption includes a concrete action step (e.g., questions to ask recruiters before signing).
- **Asymmetric Bento Grid Dashboard:** Dark mode editorial visual layout built with fluid clamp spacing and WCAG 2.1 AA accessible contrast.
- **Interactive Socratic Sparring Arena:** Users can type defenses to the AI's stress-test questions and receive immediate counter-reflections.
- **Instant Export Suite:** One-click copy for decision dossiers in Markdown, or export as structured JSON.
- **Zero-Failure Architecture:** Works out of the box with built-in heuristic reasoning (no API key required for evaluation), with optional live Google Gemini 2.5 Flash inference.

---

## 🧠 Cognitive Science Foundations

1. **WYSIATI Inversion (Daniel Kahneman - *Thinking, Fast and Slow*):** Overcomes "What You See Is All There Is" by auditing what wasn't mentioned.
2. **Second-Order Thinking (Howard Marks - *The Most Important Thing*):** Explores cascading ripple effects across multiple time horizons.
3. **The Prospective Pre-Mortem (Gary Klein):** Assumes the decision failed 12 months out and diagnoses the root vulnerabilities in advance.
4. **Epistemic Sparring (Socrates):** Asking incisive questions that force the user to examine their own unstated premises.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 19 + TypeScript (Vite bundler)
- **Styling:** Tailwind CSS with custom glassmorphism, radial mesh gradients, and dark void palette
- **Icons:** Lucide React
- **Typography:** Space Grotesk (display), Plus Jakarta Sans (body), JetBrains Mono (metrics)
- **AI Engine:** Google Gemini 2.5 Flash API + Deterministic Epistemic Fallback Engine
- **Accessibility:** WCAG 2.1 AA compliant contrast ratios and keyboard navigation

---

## ⚡ Quick Start & Local Run

```bash
# 1. Clone repository
git clone https://github.com/your-username/the-blind-spot.git
cd the-blind-spot

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Instant Deployment to Live Link

Deploy in 60 seconds with **Vercel** or **Netlify**:

### Option A: Vercel CLI
```bash
npx vercel
# Follow prompt: select default settings, deploy in ~30 seconds!
```

### Option B: Netlify CLI
```bash
npx netlify deploy --prod --dir=dist
```

### Option C: GitHub -> Vercel
1. Push this repository to GitHub.
2. Connect the repo on [vercel.com](https://vercel.com).
3. The framework preset is automatically detected as **Vite**. Click **Deploy**!

---

## 📝 Submission Summary (For Hackathon Judges)

- **Application Name:** THE BLIND SPOT (BlindSpot AI)
- **Live URL:** [https://blindspot-app-two.vercel.app](https://blindspot-app-two.vercel.app)
- **Repository:** [https://github.com/aarondeodhar-wq/BlindSpot-AI](https://github.com/aarondeodhar-wq/BlindSpot-AI)
- **Brief Description:**
  The Blind Spot is an AI-powered cognitive sparring partner that audits critical decisions without making the choice for the user. Grounded in behavioral economics and systems thinking, it inverts the user's stated rationale to uncover unstated assumptions, overlooked externalities, shadow trade-offs, multi-horizon second-order domino effects, and active cognitive biases. Features an interactive Socratic sparring arena where users can challenge and refine their own conviction before committing to irreversible choices.
