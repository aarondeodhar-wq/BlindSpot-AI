export interface DecisionInput {
  title: string;
  category: 'career' | 'academic' | 'business' | 'personal' | 'relocation' | 'other';
  rationale: string; // What they see, why they want it
  context: string; // Stipend, hours, location, constraints
  hesitations?: string; // Optional intuitive doubts
}

export interface AssumptionItem {
  id: string;
  premise: string;
  whyFragile: string;
  severity: 'high' | 'medium' | 'low';
  verificationStep: string;
}

export interface BlindSpotItem {
  id: string;
  factor: string;
  explanation: string;
  category: 'Academic' | 'Financial' | 'Mentorship' | 'Career Trajectory' | 'Health/Social' | 'Opportunity Cost';
}

export interface TradeOffItem {
  gained: string;
  sacrificed: string;
  asymmetryScore: string; // e.g. "Short-term Gain vs Long-term Debt"
}

export interface DominoEffect {
  horizon: '3-6 Months' | '1-2 Years' | '3-5 Years';
  visibleExpectation: string;
  shadowRisk: string;
}

export interface BiasItem {
  name: string;
  description: string;
  evidenceFromInput: string;
  antidote: string;
}

export interface SocraticQuestion {
  id: string;
  question: string;
  intent: string;
  userAnswer?: string;
  aiReflection?: string;
}

export interface BlindSpotReport {
  id: string;
  createdAt: string;
  decisionTitle: string;
  neutralityPledge: string;
  overallBlindspotScore: number; // 0 to 100
  summaryInsight: string;
  sourceModel?: string;
  isLiveAI?: boolean;
  unstatedAssumptions: AssumptionItem[];
  overlookedBlindSpots: BlindSpotItem[];
  shadowTradeOffs: TradeOffItem[];
  dominoEffects: DominoEffect[];
  detectedBiases: BiasItem[];
  socraticQuestions: SocraticQuestion[];
}

export interface PresetScenario {
  id: string;
  name: string;
  tag: string;
  icon: string;
  data: DecisionInput;
  mockReport?: BlindSpotReport;
}
