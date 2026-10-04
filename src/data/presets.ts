import type { PresetScenario } from '../types';

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'internship-vs-college',
    name: 'Full-Time Internship vs Final College Semester',
    tag: 'Academic & Career',
    icon: 'GraduationCap',
    data: {
      title: 'Accepting a 6-Month Full-Time Internship at a Local Tech Firm',
      category: 'academic',
      rationale:
        'The stipend is very high ($2,500/mo), the office is only 15 minutes away from my house, and they promise hands-on industry experience. My friends say it is foolish to pass up this money right now.',
      context:
        'Role: Junior Software Intern. Working hours: 40 hrs/week (9 AM - 6 PM). College schedule: I still have 4 heavy engineering courses this semester plus a graduation capstone project. College requires 75% attendance policy.',
      hesitations:
        'I am somewhat worried about attendance and my final exams, but I assume the company will understand and let me study during exam week.',
    },
    mockReport: {
      id: 'mock-internship',
      createdAt: new Date().toISOString(),
      decisionTitle: 'Accepting a 6-Month Full-Time Internship at a Local Tech Firm',
      neutralityPledge:
        'The Blind Spot does not recommend whether to accept or decline. Our role is strictly to expose invisible friction, unexamined trade-offs, and critical dependencies in your thought process.',
      overallBlindspotScore: 84,
      summaryInsight:
        'Your current reasoning is anchored heavily on immediate proximity, cash inflow, and the broad label of "industry experience," while under-indexing on structural college attendance policies and unverified manager flexibility.',
      unstatedAssumptions: [
        {
          id: 'a1',
          premise: 'The company will grant paid study leave and flexible hours during exams.',
          whyFragile:
            'Startups and corporate teams operate on production deliverables, not academic calendars. Unless written explicitly into the offer letter, manager empathy cannot be assumed.',
          severity: 'high',
          verificationStep:
            'Ask the recruiter: "Is examination leave contractually documented or discretionary per manager?"',
        },
        {
          id: 'a2',
          premise: '"Industry experience" automatically translates into high-leverage skill acquisition.',
          whyFragile:
            'A 6-month stint with unclear mentorship often turns into repetitive ticket resolution or grunt QA work rather than core architecture experience.',
          severity: 'high',
          verificationStep:
            'Request a 30-minute call with your prospective day-to-day engineering mentor before signing.',
        },
        {
          id: 'a3',
          premise: 'Grades and capstone project quality will not degrade from an 80-hour combined workload.',
          whyFragile:
            '40 hours of work + 20 hours of classes + 15 hours of coursework leaves virtually zero cognitive slack, leading to severe chronic burnout by week 8.',
          severity: 'medium',
          verificationStep:
            'Simulate your weekly hour-by-hour calendar right now including transit, sleep, and assignment deadlines.',
        },
      ],
      overlookedBlindSpots: [
        {
          id: 'b1',
          factor: 'Institutional Academic Penalties & Attendance Blacklist',
          explanation:
            'College has a strict 75% attendance policy. If debarred from semester finals, you risk a 1-year graduation delay, wiping out months of salary gains.',
          category: 'Academic',
        },
        {
          id: 'b2',
          factor: 'Opportunity Cost of Main Campus Placement Season',
          explanation:
            'Committing to this 6-month firm blocks you from applying to Tier-1 on-campus recruitment cycles that occur during the exact same months.',
          category: 'Opportunity Cost',
        },
        {
          id: 'b3',
          factor: 'Actual Mentorship vs Cheap Labor Exploitation',
          explanation:
            'A company hiring full-time students during active term time often lacks experienced seniors to mentor them properly.',
          category: 'Mentorship',
        },
      ],
      shadowTradeOffs: [
        {
          gained: 'Immediate financial liquidity ($15,000 total across 6 months) & short commute.',
          sacrificed: 'GPA security, mental health reserves, and peak energy for your graduation capstone.',
          asymmetryScore: 'High Asymmetry: Irreversible GPA impact vs Temporary Cash',
        },
        {
          gained: 'Resumé line item in local firm.',
          sacrificed: 'Eligibility for competitive summer internships at global tech firms.',
          asymmetryScore: 'Career Trajectory Arbitrage',
        },
      ],
      dominoEffects: [
        {
          horizon: '3-6 Months',
          visibleExpectation: 'Earn money, finish semester smoothly, get internship certificate.',
          shadowRisk:
            'Midterm exam clashes lead to emergency sick leaves, friction with the employer, and falling behind on major project deliverables.',
        },
        {
          horizon: '1-2 Years',
          visibleExpectation: 'Enter job market with 6 months of head-start experience.',
          shadowRisk:
            'Lower cumulative GPA restricts eligibility for graduate school admissions or top-tier companies with strict GPA cutoff filters.',
        },
        {
          horizon: '3-5 Years',
          visibleExpectation: 'Faster seniority promotion.',
          shadowRisk:
            'Foundation in core computer science theory (distributed systems, algorithms) was cut short to fix trivial tickets.',
        },
      ],
      detectedBiases: [
        {
          name: 'Present Bias / Hyperbolic Discounting',
          description:
            'Valuing immediate rewards (monthly stipend today) disproportionately higher than distant compounding rewards (higher graduating GPA & long-term placement prestige).',
          evidenceFromInput: 'Focus on "the stipend is very good" and friends advising not to pass up cash.',
          antidote:
            'Calculate the net present value of a Tier-1 starting salary vs the 6-month stipend you earn today.',
        },
        {
          name: 'Proximity Heuristic / Availability Bias',
          description:
            'Over-weighting convenience (15-min commute) simply because physical proximity is visceral and easy to imagine, despite career quality being the real variable.',
          evidenceFromInput: 'Citing "office is only 15 minutes away from my house" as a primary pillar of choice.',
          antidote:
            'Would you still accept this offer if it was a 45-minute commute? If not, the decision is about convenience, not career value.',
        },
        {
          name: 'Social Conformity (Herding)',
          description:
            'Subconsciously adopting peers\' opinions ("My friends say it is foolish to pass up this money") without verifying if their goals match yours.',
          evidenceFromInput: 'Explicitly referencing peers advising that passing money up is foolish.',
          antidote:
            'Acknowledge that peer advice comes without accountability for your academic transcript.',
        },
      ],
      socraticQuestions: [
        {
          id: 'q1',
          question:
            'If your college strictly enforces the 75% attendance rule and denies exam hall tickets in month 4, what is your contingency protocol?',
          intent:
            'To force scenario planning for downside institutional risks rather than relying on wishful thinking.',
        },
        {
          id: 'q2',
          question:
            'What specific, measurable engineering capability will you acquire in month 5 of this internship that you could not build through an open-source capstone?',
          intent:
            'To distinguish between genuine technical advancement and mundane operational employment.',
        },
        {
          id: 'q3',
          question:
            'If you were already financially secure for the next year, would this exact role still be your highest-conviction choice for career growth?',
          intent: 'To isolate the money variable from the learning and trajectory variable.',
        },
        {
          id: 'q4',
          question:
            'Have you explicitly asked the hiring manager to put "guaranteed study leave during university exam weeks" into your formal offer letter?',
          intent: 'To convert an unstated optimistic assumption into an audited contractual fact.',
        },
      ],
    },
  },
  {
    id: 'startup-vs-faang',
    name: 'Early-Stage Startup Co-Founder vs FAANG Offer',
    tag: 'Career Strategy',
    icon: 'Briefcase',
    data: {
      title: 'Joining Seed-Stage AI Startup as Founding Engineer vs Accepting Google L4 Offer',
      category: 'career',
      rationale:
        'The startup gives 1.5% equity, hyper-speed execution, and a chance to build from scratch. Google feels bureaucratic and slow.',
      context:
        'Startup: 18 months runway, $120k salary, 70hr weeks, unproven product-market fit. Google: $240k total comp, 40hr weeks, stable 401k, Brand pedigree. I have $25k in student loans.',
      hesitations:
        'I fear becoming just a cog at Google, but if the startup folds in 12 months, my loan payments will become stressful.',
    },
  },
  {
    id: 'relocation-abroad',
    name: 'Relocating to London vs Staying in Hometown',
    tag: 'Life & Relocation',
    icon: 'Compass',
    data: {
      title: 'Moving to London for a Mid-Tier Tech Role vs Staying Near Family in Austin',
      category: 'relocation',
      rationale:
        'London offers European travel, international culture, and a fresh start. It sounds thrilling and prestigious.',
      context:
        'Salary: £65,000. Rent in London: £2,100/mo. Current Austin savings rate is $2,800/mo. My parents are in their late 60s.',
      hesitations:
        'I might end up living paycheck to paycheck and feeling isolated during dark winter months.',
    },
  },
];
