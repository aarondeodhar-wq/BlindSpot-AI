import type { DecisionInput, BlindSpotReport, SocraticQuestion } from '../types';

const SYSTEM_PROMPT = `You are "THE BLIND SPOT", an elite cognitive sparring partner and decision auditor based on behavioral economics, systems thinking, and epistemic rationality.

CRITICAL PRIME DIRECTIVE:
1. YOU MUST NEVER DECIDE FOR THE USER.
2. DO NOT say "you should do this", "accept this", "reject this", or "the optimal choice is".
3. Your sole mission is to expand their field of view: uncover what they are NOT seeing, what unstated assumptions they treat as fact, what second-order domino effects lurk in the shadows, and what cognitive biases are skewing their evaluation.
4. Ground your analysis strictly in the specific details provided by the user. Do not invent details not present or implied.
5. Output MUST be valid strictly formatted JSON matching the requested schema.`;

export async function analyzeDecisionWithAI(
  input: DecisionInput,
  apiKey?: string
): Promise<BlindSpotReport> {
  const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  if (activeKey && activeKey.trim().length > 10) {
    try {
      return await callGeminiAPI(input, activeKey.trim());
    } catch (err) {
      console.warn('Gemini API call failed, falling back to dynamic epistemic engine:', err);
      return generateDynamicReport(input);
    }
  }

  // Fallback to high-fidelity dynamic epistemic engine
  return generateDynamicReport(input);
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

Return a pure JSON object with this exact schema:
{
  "summaryInsight": "A sharp, 2-sentence metacognitive diagnostic of their thinking posture directly referencing their inputs.",
  "overallBlindspotScore": 78,
  "unstatedAssumptions": [
    {
      "premise": "The specific unspoken belief they treat as true without verification",
      "whyFragile": "Why this belief may break or fail under real-world pressure",
      "severity": "high",
      "verificationStep": "A concrete question or action to test this premise before committing"
    }
  ],
  "overlookedBlindSpots": [
    {
      "factor": "Name of structural factor completely omitted or downplayed in their reasoning",
      "explanation": "Why this ignored dimension alters the risk profile",
      "category": "Opportunity Cost"
    }
  ],
  "shadowTradeOffs": [
    {
      "gained": "What is visibly gained according to their rationale",
      "sacrificed": "What is silently sacrificed or put at risk",
      "asymmetryScore": "e.g. Asymmetric Downside vs Short-Term Upside"
    }
  ],
  "dominoEffects": [
    {
      "horizon": "3-6 Months",
      "visibleExpectation": "What they assume happens near-term",
      "shadowRisk": "The hidden friction or compounding debt that emerges"
    },
    {
      "horizon": "1-2 Years",
      "visibleExpectation": "What they assume happens mid-term",
      "shadowRisk": "The downstream path dependency created"
    },
    {
      "horizon": "3-5 Years",
      "visibleExpectation": "What they assume happens long-term",
      "shadowRisk": "The compounded structural outcome"
    }
  ],
  "detectedBiases": [
    {
      "name": "Cognitive Bias Name",
      "description": "Definition of the bias",
      "evidenceFromInput": "Direct evidence from user's words",
      "antidote": "A sharp mental reframing technique"
    }
  ],
  "socraticQuestions": [
    {
      "id": "q1",
      "question": "Probing, provocative question designed to stress-test their premises",
      "intent": "The psychological or strategic purpose of this question"
    }
  ]
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
      'The Blind Spot does not recommend whether to choose or decline this path. Our mandate is solely to illuminate blind spots, stress-test your premises, and help you reach your own reasoned conviction.',
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

export function generateDynamicReport(input: DecisionInput): BlindSpotReport {
  // Extract user's contextual terms
  const title = input.title.trim();
  const rationaleSnippet = input.rationale.slice(0, 120);
  const contextSnippet = input.context.slice(0, 120);
  const hesitationSnippet = input.hesitations?.trim() || '';

  // Determine key themes
  const rationaleLower = input.rationale.toLowerCase();
  const contextLower = input.context.toLowerCase();

  const mentionsImmediateGain =
    rationaleLower.includes('money') ||
    rationaleLower.includes('stipend') ||
    rationaleLower.includes('salary') ||
    rationaleLower.includes('pay') ||
    rationaleLower.includes('equity') ||
    rationaleLower.includes('bonus') ||
    rationaleLower.includes('perk');

  const mentionsConvenience =
    rationaleLower.includes('close') ||
    rationaleLower.includes('easy') ||
    rationaleLower.includes('convenient') ||
    rationaleLower.includes('near') ||
    rationaleLower.includes('remote') ||
    contextLower.includes('commute') ||
    contextLower.includes('close');

  const mentionsOthersOpinion =
    rationaleLower.includes('friend') ||
    rationaleLower.includes('people') ||
    rationaleLower.includes('family') ||
    rationaleLower.includes('everyone') ||
    rationaleLower.includes('they say') ||
    rationaleLower.includes('peers');

  return {
    id: 'report-' + Date.now(),
    createdAt: new Date().toISOString(),
    decisionTitle: title,
    neutralityPledge:
      'The Blind Spot does not recommend whether to proceed or pivot. Our mandate is solely to illuminate blind spots, stress-test your premises, and help you reach your own reasoned conviction.',
    overallBlindspotScore: 78,
    summaryInsight: `Your evaluation is anchored around visible upsides ("${rationaleSnippet}..."), while treating external counterparties' cooperation and your own sustainable bandwidth ("${contextSnippet}...") as guaranteed conditions rather than variable risks.`,
    unstatedAssumptions: [
      {
        id: 'a-1',
        premise: `External stakeholders and constraints will remain flexible enough to accommodate your priorities when schedules collide.`,
        whyFragile: `In commercial and institutional environments, counterparties prioritize their own operational deliverables, not your personal bandwidth. Unless flexibility is contractually guaranteed, goodwill rarely withstands peak crisis weeks.`,
        severity: 'high',
        verificationStep: `Before signing or committing, request explicit written clarity on schedule adjustments, contingency policies, and crisis protocols.`,
      },
      {
        id: 'a-2',
        premise: `Your cognitive bandwidth and physical endurance will sustain the full combined load without diminishing the quality of your existing commitments.`,
        whyFragile: `Human performance does not degrade linearly—when cognitive saturation is reached, output quality collapses abruptly across multiple commitments simultaneously.`,
        severity: 'high',
        verificationStep: `Construct a 7-day realistic hourly schedule mapping sleep, transit, deep work, and emergency buffers to test if slack exists.`,
      },
      {
        id: 'a-3',
        premise: `The visible perks of this choice cannot be obtained through alternative, lower-friction avenues with less downside exposure.`,
        whyFragile: `Binary decision framing ("should I do this or not?") creates artificial scarcity, blinding decision-makers to third alternatives (e.g., phased entry, part-time trial, or deferred start).`,
        severity: 'medium',
        verificationStep: `Force yourself to outline two alternative paths that capture 75% of the primary upside while eliminating 50% of the downside risk.`,
      },
    ],
    overlookedBlindSpots: [
      {
        id: 'b-1',
        factor: 'Type 1 vs Type 2 Reversibility & Exit Costs',
        explanation: `If this path proves unsustainable after 60 to 90 days, what is the precise reputational, financial, or institutional penalty required to withdraw?`,
        category: 'Opportunity Cost',
      },
      {
        id: 'b-2',
        factor: 'Hidden Second-Order Operational Overhead',
        explanation: `Every new commitment carries invisible logistical drag—administrative overhead, context switching, and relational maintenance—that was omitted from your visible calculation.`,
        category: 'Health/Social',
      },
      {
        id: 'b-3',
        factor: 'The Structural Shadow Cost (Doors Permanently Closed)',
        explanation: `Committing scarce time and energy here automatically forecloses other concurrent opportunities that may emerge during this exact timeframe.`,
        category: 'Career Trajectory',
      },
    ],
    shadowTradeOffs: [
      {
        gained: `Immediate visible milestones and stated perks: "${rationaleSnippet.slice(0, 80)}..."`,
        sacrificed: `Downstream flexibility, cognitive slack, and reserves for unexpected systemic emergencies.`,
        asymmetryScore: 'Asymmetric Exposure: Immediate Salience vs Long-Term Risk',
      },
      {
        gained: `Validation of moving forward and near-term progress markers.`,
        sacrificed: `Optionality to pivot if higher-leverage opportunities arise unexpectedly.`,
        asymmetryScore: 'Local Optimization vs Global Strategy',
      },
    ],
    dominoEffects: [
      {
        horizon: '3-6 Months',
        visibleExpectation: `Smooth execution of your initial plan with high motivation and visible initial progress.`,
        shadowRisk: `Accumulation of schedule friction; competing deadlines force emergency trade-offs and sleep deprivation.`,
      },
      {
        horizon: '1-2 Years',
        visibleExpectation: `Leveraging this experience or choice as a stepping stone to higher advancement.`,
        shadowRisk: `Secondary impacts (degraded performance in core commitments or burned relationships) limit subsequent mobility.`,
      },
      {
        horizon: '3-5 Years',
        visibleExpectation: `Compounded seniority and strategic advantage from taking the initiative early.`,
        shadowRisk: `Path dependency sets in—finding yourself locked onto a trajectory selected for short-term perks rather than fundamental conviction.`,
      },
    ],
    detectedBiases: [
      {
        name: mentionsImmediateGain ? 'Present Bias (Hyperbolic Discounting)' : 'Salience Bias (WYSIATI)',
        description: mentionsImmediateGain
          ? 'Over-weighting immediate, tangible perks over compounding long-term capital and systemic well-being.'
          : 'Focusing exclusively on the vivid, easily articulated attributes while treating unmentioned variables as non-existent.',
        evidenceFromInput: `Rationale centers around: "${rationaleSnippet.slice(0, 90)}..."`,
        antidote: `Project forward 36 months: if the immediate perks were removed, would the intrinsic strategic value alone justify this commitment?`,
      },
      {
        name: mentionsConvenience ? 'Proximity / Friction Heuristic' : 'Commitment Bias',
        description: mentionsConvenience
          ? 'Allowing ease of access or physical convenience to artificially inflate the perceived quality of an opportunity.'
          : 'The psychological inclination to justify an option you already feel emotionally drawn to by rationalizing its benefits.',
        evidenceFromInput: `Context notes: "${contextSnippet.slice(0, 90)}..."`,
        antidote: `Assume this opportunity required 3x the logistical friction. Would your conviction in its core value still hold?`,
      },
      ...(mentionsOthersOpinion
        ? [
            {
              name: 'Social Conformity (Herding Effect)',
              description:
                'Subconsciously adopting the opinions of peers or external observers without auditing whether their risk tolerance matches your reality.',
              evidenceFromInput: `Citing external opinions: "${rationaleSnippet.slice(0, 80)}..."`,
              antidote:
                'Remember that external advisors do not bear the consequences if this commitment overburdens your capacity.',
            },
          ]
        : []),
    ],
    socraticQuestions: [
      {
        id: 'q-1',
        question: `What is the single unstated premise in your reasoning that, if proven false tomorrow, turns this choice into a clear mistake?`,
        intent: 'Identifies the single point of failure in your logical chain.',
      },
      {
        id: 'q-2',
        question: `If you were required to reverse this decision 90 days after starting, what exact consequences (financial, academic, reputational) would you face?`,
        intent: 'Forces rigorous auditing of exit costs and reversibility (Type 1 vs Type 2 decisions).',
      },
      {
        id: 'q-3',
        question: hesitationSnippet
          ? `You noted this quiet hesitation: "${hesitationSnippet}". If that exact doubt materialized at 3x the intensity during week 6, what is your predetermined protocol?`
          : `If an unexpected crisis cuts your available weekly time by 30%, which commitment is the first you are forced to compromise?`,
        intent: 'Converts quiet intuitive hesitations into concrete scenario-stress tests.',
      },
      {
        id: 'q-4',
        question: `If an independent auditor who cares only about your 5-year trajectory reviewed this choice, what question would they ask that you are currently avoiding?`,
        intent: 'Induces psychological distance to overcome immediate emotional attachment.',
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
      console.warn('Sparring API failed, fallback to dynamic reflection', e);
    }
  }

  // Dynamic Socratic Sparring reflection
  const answerSnippet = userAnswer.slice(0, 90);
  return `You argue that "${answerSnippet}..." will provide adequate protection. Notice, however, that this defense introduces a new unverified dependency: it assumes external parties will negotiate in good faith when deadlines collide under pressure. Have you audited whether this contingency is formal and binding, or are you deferring that confrontation to a moment of high stress?`;
}
