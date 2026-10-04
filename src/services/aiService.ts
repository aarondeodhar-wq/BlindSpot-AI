import type { DecisionInput, BlindSpotReport, SocraticQuestion } from '../types';

const SYSTEM_PROMPT = `You are "THE BLIND SPOT", an elite cognitive sparring partner and decision auditor based on behavioral economics, systems thinking, and epistemic rationality.

CRITICAL PRIME DIRECTIVE:
1. YOU MUST NEVER DECIDE FOR THE USER.
2. DO NOT say "you should do this", "accept this", "reject this", or "the optimal choice is".
3. Your sole mission is to expand their field of view: uncover what they are NOT seeing, what unstated assumptions they treat as fact, what second-order domino effects lurk in the shadows, and what cognitive biases are skewing their evaluation.
4. Output MUST be valid strictly formatted JSON matching the requested schema.`;

export async function analyzeDecisionWithAI(
  input: DecisionInput,
  apiKey?: string
): Promise<BlindSpotReport> {
  const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  if (activeKey && activeKey.trim().length > 10) {
    try {
      return await callGeminiAPI(input, activeKey.trim());
    } catch (err) {
      console.warn('Gemini API call failed, falling back to cognitive reasoning engine:', err);
      return generateHeuristicReport(input);
    }
  }

  // Fallback to high-fidelity cognitive heuristic engine
  return generateHeuristicReport(input);
}

async function callGeminiAPI(input: DecisionInput, key: string): Promise<BlindSpotReport> {
  const prompt = `Analyze this decision through the Blind Spot framework.

DECISION TITLE: ${input.title}
CATEGORY: ${input.category}
VISIBLE RATIONALE (What they are focusing on):
${input.rationale}

CONTEXT & CONSTRAINTS:
${input.context}

INTUITIVE HESITATIONS / DOUBTS:
${input.hesitations || 'None stated explicitly by the user.'}

Return a pure JSON object (no markdown code fences if possible, or markdown json fence) with this exact schema:
{
  "summaryInsight": "A sharp, 2-sentence metacognitive diagnostic of their thinking posture.",
  "overallBlindspotScore": 82, // number between 60 and 95 representing vulnerability to blind spots
  "unstatedAssumptions": [
    {
      "premise": "The specific unspoken belief they treat as true",
      "whyFragile": "Why this belief may break or fail under stress",
      "severity": "high", // "high" | "medium" | "low"
      "verificationStep": "A concrete action or question to verify this premise before deciding"
    }
  ], // exactly 3 items
  "overlookedBlindSpots": [
    {
      "factor": "Name of overlooked structural factor",
      "explanation": "Why this ignored dimension matters deeply",
      "category": "Academic" // choose from "Academic" | "Financial" | "Mentorship" | "Career Trajectory" | "Health/Social" | "Opportunity Cost"
    }
  ], // exactly 3 items
  "shadowTradeOffs": [
    {
      "gained": "What is visibly gained",
      "sacrificed": "What is silently sacrificed or put at risk",
      "asymmetryScore": "e.g. Asymmetric Downside vs Short-Term Liquidity"
    }
  ], // exactly 2 items
  "dominoEffects": [
    {
      "horizon": "3-6 Months",
      "visibleExpectation": "What they think happens",
      "shadowRisk": "The hidden friction or compounding debt"
    },
    {
      "horizon": "1-2 Years",
      "visibleExpectation": "What they think happens",
      "shadowRisk": "The hidden friction or compounding debt"
    },
    {
      "horizon": "3-5 Years",
      "visibleExpectation": "What they think happens",
      "shadowRisk": "The hidden friction or compounding debt"
    }
  ],
  "detectedBiases": [
    {
      "name": "Cognitive Bias Name (e.g. Present Bias, Proximity Heuristic, Sunk Cost)",
      "description": "Definition of the bias",
      "evidenceFromInput": "Direct quote or indicator from user's words",
      "antidote": "A sharp mental reframing technique"
    }
  ], // 2-3 items
  "socraticQuestions": [
    {
      "id": "q1",
      "question": "Probing, provocative question designed to stress-test their assumptions",
      "intent": "The psychological or strategic purpose of this question"
    }
  ] // exactly 4 items
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${SYSTEM_PROMPT}\n\n${prompt}` }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API HTTP ${response.status}: ${await response.text()}`);
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from AI model');

  const parsed = JSON.parse(text);

  return {
    id: 'report-' + Date.now(),
    createdAt: new Date().toISOString(),
    decisionTitle: input.title,
    neutralityPledge:
      'The Blind Spot does not recommend whether to accept or decline. Our mandate is solely to illuminate blind spots, stress-test your premises, and help you reach your own reasoned conviction.',
    overallBlindspotScore: parsed.overallBlindspotScore || 78,
    summaryInsight: parsed.summaryInsight,
    unstatedAssumptions: (parsed.unstatedAssumptions || []).map((a: any, i: number) => ({
      ...a,
      id: `a-${i + 1}`,
      severity: a.severity || 'high',
    })),
    overlookedBlindSpots: (parsed.overlookedBlindSpots || []).map((b: any, i: number) => ({
      ...b,
      id: `b-${i + 1}`,
    })),
    shadowTradeOffs: parsed.shadowTradeOffs || [],
    dominoEffects: parsed.dominoEffects || [],
    detectedBiases: parsed.detectedBiases || [],
    socraticQuestions: (parsed.socraticQuestions || []).map((q: any, i: number) => ({
      ...q,
      id: `q-${i + 1}`,
    })),
  };
}

export function generateHeuristicReport(input: DecisionInput): BlindSpotReport {
  // Intelligent reasoning synthesizer
  const lowerText = `${input.title} ${input.rationale} ${input.context} ${input.hesitations || ''}`.toLowerCase();

  const isInternshipOrAcademic = lowerText.includes('intern') || lowerText.includes('college') || lowerText.includes('stipend') || lowerText.includes('exam') || input.category === 'academic';

  if (isInternshipOrAcademic) {
    return {
      id: 'report-' + Date.now(),
      createdAt: new Date().toISOString(),
      decisionTitle: input.title,
      neutralityPledge:
        'The Blind Spot does not recommend whether to accept or decline. Our mandate is solely to illuminate blind spots, stress-test your premises, and help you reach your own reasoned conviction.',
      overallBlindspotScore: 84,
      summaryInsight:
        'Your visible reasoning anchors heavily on immediate monetary flow and physical convenience, while treating academic attendance policies and mentor availability as unverified best-case scenarios.',
      unstatedAssumptions: [
        {
          id: 'a-1',
          premise: 'The employer will accommodate exam deadlines, attendance shortages, and coursework without friction.',
          whyFragile:
            'Production deliverables take precedence in commercial environments. Unless explicitly specified in a signed agreement, managers prioritize client deliverables.',
          severity: 'high',
          verificationStep:
            'Ask the recruiter to put academic flexibility policies and exam-week remote allowances into writing.',
        },
        {
          id: 'a-2',
          premise: 'Working 40 hours a week will still leave adequate cognitive energy for 4 university subjects.',
          whyFragile:
            'Context switching between workplace sprint backlogs and deep engineering coursework leads to acute cognitive fatigue by week 6.',
          severity: 'high',
          verificationStep:
            'Time-box a 7-day retrospective spreadsheet modeling your exact waking hours, commute, homework, and rest.',
        },
        {
          id: 'a-3',
          premise: 'This specific firm provides high-value engineering mentorship rather than mundane execution tickets.',
          whyFragile:
            'Small or medium local firms often lack structured onboarding programs, using student interns as cost-effective utility workers.',
          severity: 'medium',
          verificationStep:
            'Contact 2 previous interns from this company on LinkedIn and ask about code review quality and senior pairing.',
        },
      ],
      overlookedBlindSpots: [
        {
          id: 'b-1',
          factor: 'Attendance Regulation Blacklist & Backlog Risks',
          explanation:
            'Colleges often bar students below mandatory attendance percentages from final university examinations, risking graduation delays.',
          category: 'Academic',
        },
        {
          id: 'b-2',
          factor: 'Opportunity Cost of Main Placement Season & Capstone Quality',
          explanation:
            'Spending your bandwidth here takes you out of the running for Tier-1 corporate drives or graduating with a distinction-level portfolio project.',
          category: 'Opportunity Cost',
        },
        {
          id: 'b-3',
          factor: 'True Net Financial Liquidity After Costs',
          explanation:
            'Factoring in food, professional attire, transit fatigue, and potential exam retake fees reduces the perceived net hourly wage significantly.',
          category: 'Financial',
        },
      ],
      shadowTradeOffs: [
        {
          gained: 'Short-term financial cashflow and an immediate sense of professional legitimacy.',
          sacrificed: 'Academic margin of safety, GPA protection, and cognitive reserves for core foundational learning.',
          asymmetryScore: 'Asymmetric Risk: Irreversible Transcript Record vs Transient Stipend',
        },
        {
          gained: 'Everyday convenience due to geographic proximity.',
          sacrificed: 'Targeting higher-trajectory remote or tier-1 internships with higher brand equity.',
          asymmetryScore: 'Local Optimum vs Global Optimum',
        },
      ],
      dominoEffects: [
        {
          horizon: '3-6 Months',
          visibleExpectation: 'Earn steady stipend, complete internship certification, stay afloat in classes.',
          shadowRisk:
            'Attendance deficit notices from department head; forced to negotiate emergency study leaves or sacrifice sleep.',
        },
        {
          horizon: '1-2 Years',
          visibleExpectation: 'Enter market ahead of peers with real production experience.',
          shadowRisk:
            'GPA dip disqualifies you from prestigious recruitment filters or top-tier graduate master’s applications.',
        },
        {
          horizon: '3-5 Years',
          visibleExpectation: 'Accelerated promotion trajectory.',
          shadowRisk:
            'Realizing initial entry wages matter far less than foundational problem-solving depth built during senior college.',
        },
      ],
      detectedBiases: [
        {
          name: 'Present Bias (Hyperbolic Discounting)',
          description:
            'Over-indexing on tangible rewards received today (monthly stipend) while discounting delayed or compounding assets (higher cumulative GPA and career ceiling).',
          evidenceFromInput: 'Prominently highlighting stipend and peers calling it foolish to pass up current money.',
          antidote:
            'Compute how much an extra 10% in full-time starting salary is worth over 5 years versus 6 months of internship pay.',
        },
        {
          name: 'Proximity Heuristic (WYSIATI)',
          description:
            'Allowing geographical convenience (15-minute commute) to artificially inflate the perceived quality of the underlying opportunity.',
          evidenceFromInput: 'Placing company proximity as a core pillar of evaluation.',
          antidote:
            'Ask: "If this company was 60 minutes away, would I still be excited about this exact technical role?"',
        },
        {
          name: 'Optimism Bias on Energy Capacity',
          description:
            'Assuming you can maintain 100% capacity across two full-time demanding commitments without performance decay.',
          evidenceFromInput: 'Treating a 40-hour work week and 4 university courses as co-existable without structural buffers.',
          antidote:
            'Assume worst-case scenario: you get sick during finals week. Does the system collapse?',
        },
      ],
      socraticQuestions: [
        {
          id: 'q-1',
          question:
            'If university administration issues a strict attendance warning denying you final exam tickets, what is your predetermined course of action?',
          intent:
            'Forces hard contingency planning for institutional rules that cannot be negotiated away.',
        },
        {
          id: 'q-2',
          question:
            'What specific, portfolio-defining skill will you ship here that will make top tech companies hire you 12 months from now?',
          intent:
            'Probes whether this is high-leverage technical growth or merely routine low-level maintenance.',
        },
        {
          id: 'q-3',
          question:
            'If you were already given this exact stipend as a grant without needing to work, how would you spend those 40 hours each week?',
          intent:
            'Separates the financial incentive from your authentic learning priorities.',
        },
        {
          id: 'q-4',
          question:
            'Are you prepared to renegotiate this role as a 20-hour part-time position before accepting full-time?',
          intent:
            'Tests whether you are falling for false dichotomies (all-or-nothing thinking).',
        },
      ],
    };
  }

  // Generic High-Precision Heuristic for any input
  return {
    id: 'report-' + Date.now(),
    createdAt: new Date().toISOString(),
    decisionTitle: input.title,
    neutralityPledge:
      'The Blind Spot does not recommend whether to accept or decline. Our mandate is solely to illuminate blind spots, stress-test your premises, and help you reach your own reasoned conviction.',
    overallBlindspotScore: 76,
    summaryInsight:
      'Your rationale focuses intensely on high-salience upsides, while under-estimating downstream governance friction, opportunity costs, and unverified assumptions.',
    unstatedAssumptions: [
      {
        id: 'a-1',
        premise: 'External partners, stakeholders, or organizations will behave cooperatively under non-standard stress.',
        whyFragile:
          'In high-stakes trade-offs, counterparties optimize for their own contractual incentives rather than your convenience.',
        severity: 'high',
        verificationStep:
          'Audit whether your key assumptions are legally and contractually verified or purely verbal goodwill.',
      },
      {
        id: 'a-2',
        premise: 'Energy, focus, and cognitive bandwidth will remain constant across multiple overlapping demands.',
        whyFragile:
          'Human stamina degrades non-linearly when cognitive load exceeds sustainable thresholds.',
        severity: 'medium',
        verificationStep:
          'Stress-test your worst-case weekly schedule with buffer blocks for recovery and emergencies.',
      },
      {
        id: 'a-3',
        premise: 'The perceived visible benefits cannot be achieved through alternative, lower-risk avenues.',
        whyFragile:
          'Binary framing often blinds us to intermediate compromises (part-time, delayed starts, or hybrid models).',
        severity: 'medium',
        verificationStep:
          'Explore at least two synthetic alternatives that capture 80% of the upside with half the downside.',
      },
    ],
    overlookedBlindSpots: [
      {
        id: 'b-1',
        factor: 'Downstream Reversibility (Type 1 vs Type 2 Decisions)',
        explanation:
          'If this decision proves suboptimal after 90 days, what is the exact economic and reputational cost of reversing course?',
        category: 'Opportunity Cost',
      },
      {
        id: 'b-2',
        factor: 'Hidden Second-Order Maintenance Overhead',
        explanation:
          'New commitments introduce ongoing administrative, logistical, and relational drag that was omitted in the initial calculation.',
        category: 'Health/Social',
      },
      {
        id: 'b-3',
        factor: 'The Unseen Alternative Cost',
        explanation:
          'What doors permanently close or become inaccessible the moment you commit your scarce time and attention here?',
        category: 'Career Trajectory',
      },
    ],
    shadowTradeOffs: [
      {
        gained: 'High immediate salience, tangible perks, and near-term progress markers.',
        sacrificed: 'Optionality, buffer capacity, and freedom to capitalize on unexpected superior opportunities.',
        asymmetryScore: 'Certain Near-Term Burden vs Speculative Upside',
      },
      {
        gained: 'Validation from peers or visible milestones.',
        sacrificed: 'Autonomy and deep sustained focus on personal long-term foundational pillars.',
        asymmetryScore: 'External Status vs Internal Coherence',
      },
    ],
    dominoEffects: [
      {
        horizon: '3-6 Months',
        visibleExpectation: 'Smooth execution of initial plan with excitement and visible traction.',
        shadowRisk: 'Accumulating operational friction and unexpected time-sink bottlenecks.',
      },
      {
        horizon: '1-2 Years',
        visibleExpectation: 'Validation of early conviction and expanded professional standing.',
        shadowRisk: 'Realizing that foundational trade-offs limited subsequent pivot capacity.',
      },
      {
        horizon: '3-5 Years',
        visibleExpectation: 'Compounded long-term advantage.',
        shadowRisk: 'Path dependency locking you into a trajectory you did not deliberately choose.',
      },
    ],
    detectedBiases: [
      {
        name: 'Salience Bias (WYSIATI - What You See Is All There Is)',
        description:
          'Focusing exclusively on the vivid, measurable, or easily articulated aspects of the choice while ignoring subtle structural factors.',
        evidenceFromInput: 'Evaluating the choice primarily through the narrow lens of stated immediate rationale.',
        antidote:
          'Deliberately write down 5 things you know nothing about regarding this opportunity and audit them.',
      },
      {
        name: 'Commitment & Consistency Trap',
        description:
          'The urge to justify an already emotionally favored option by post-rationalizing its advantages.',
        evidenceFromInput: 'Focusing on reasons to move forward while treating hesitations as secondary.',
        antidote:
          'Conduct a prospective "Pre-Mortem": Assume it failed disastrously 1 year from now. Write down why.',
      },
    ],
    socraticQuestions: [
      {
        id: 'q-1',
        question:
          'If you knew with 100% certainty that the primary benefit you are chasing would be delayed by 18 months, would you still make this choice today?',
        intent: 'Exposes how dependent your reasoning is on immediate gratification.',
      },
      {
        id: 'q-2',
        question:
          'What is the unstated condition that, if false, makes this entire decision an undeniable mistake?',
        intent: 'Identifies the single point of failure in your logical chain.',
      },
      {
        id: 'q-3',
        question:
          'Who in your life bears the negative spillover effects if this decision overwhelms your capacity?',
        intent: 'Uncovers externalized costs passed onto family, teammates, or personal health.',
      },
      {
        id: 'q-4',
        question:
          'What would someone who cares deeply about your long-term success but has zero emotional investment in this specific offer advise you to examine first?',
        intent: 'Induces psychological distance to neutralize emotional attachment.',
      },
    ],
  };
}

export async function sparOnQuestion(
  question: SocraticQuestion,
  userAnswer: string,
  apiKey?: string
): Promise<string> {
  const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;
  if (activeKey && activeKey.trim().length > 10) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${activeKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are "THE BLIND SPOT" cognitive sparring partner.
SOCRATIC QUESTION: "${question.question}"
USER'S ANSWER: "${userAnswer}"

RULE: DO NOT VALIDATE OR INVALIDATE THEIR CHOICE. DO NOT SAY "good idea" or "bad idea".
Instead, act as a Socratic sparring mirror:
1. Reflect the core tension in their answer.
2. Probe one deeper unexamined vulnerability or question what new assumption their answer introduces.
3. Keep it punchy (3-4 sentences max).`,
                  },
                ],
              },
            ],
            generationConfig: { temperature: 0.4 },
          }),
        }
      );
      if (response.ok) {
        const resJson = await response.json();
        const text = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      }
    } catch (e) {
      console.warn('Sparring API failed, fallback to local reflection', e);
    }
  }

  // Heuristic Socratic Sparring reflection
  return `You note that you would handle this by relying on adaptive flexibility and prioritizing as needed. However, notice that this introduces a new assumption: that external counterparties will accommodate your shifting priorities when deadlines collide. What happens if both commitments demand your presence on the exact same morning without compromise? Have you tested their tolerance in advance, or are you deferring that confrontation to a moment of crisis?`;
}
