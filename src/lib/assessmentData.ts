// 3PN Self-Assessment Tool - CAD Diagnostic Framework
// 20 diagnostic questions across Capability, Competence, Character, Capacity
// Each question has 4 descriptive states: Q1 (New Traveler), Q2 (Steady Support), Q3 (Independent Starter), Q4 (Systemic Leverage Peak)

export type Pillar = 'Capability' | 'Competence' | 'Character' | 'Capacity';
export type Stage = 1 | 2 | 3;
export type QuadrantLevel = 1 | 2 | 3 | 4; // Q1-Q4

export interface QuestionOption {
  quadrant: QuadrantLevel; // Q1=New Traveler, Q2=Steady Support, Q3=Independent Starter, Q4=Systemic Leverage Peak
  label: string;
  internalState: 'awareness' | 'command'; // For quadrant mapping
  externalState: 'no-system' | 'system'; // For quadrant mapping
}

export interface Question {
  id: number;
  pillar: Pillar;
  stage: Stage;
  quality: string; // Simple word (e.g., "Self-Knowledge", "Identity", etc.)
  statement: string; // The quality being measured
  options: [QuestionOption, QuestionOption, QuestionOption, QuestionOption]; // Always 4 options
}

export const assessmentQuestions: Question[] = [
  // CAPABILITY PILLAR - Stage 1
  {
    id: 1,
    pillar: 'Capability',
    stage: 1,
    quality: 'Self-Knowledge',
    statement: 'How well do you know your strengths and how you use them?',
    options: [
      {
        quadrant: 1,
        label: "I don't really know what I'm good at yet",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I know what I am good at, but I don't know how to link my strength to my business or career",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I know my strength and how to use it for my career or business success, but I don't have a plan yet",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I know my strengths and I use them to win every day",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 2,
    pillar: 'Capability',
    stage: 1,
    quality: 'Identity',
    statement: 'How intentionally do you use your personality and strengths in how you work?',
    options: [
      {
        quadrant: 1,
        label: "I haven't thought much about how my personality affects how I work",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I'm aware of my personality, but I haven't applied it intentionally",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I sometimes use my personality and strengths to guide how I work",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I consistently use my personality, strengths, and preferences to perform and lead effectively",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 3,
    pillar: 'Capability',
    stage: 1,
    quality: 'Natural Fit',
    statement: 'How much do you enjoy what you do professionally?',
    options: [
      {
        quadrant: 1,
        label: "I am doing things I don't really enjoy",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I am good at my job, but it feels like hard work",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I know what I enjoy, but I'm not doing it yet",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I spend my time doing what I am naturally great at",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 4,
    pillar: 'Capability',
    stage: 1,
    quality: 'Growth Mindset',
    statement: 'How do you view your ability to learn and grow?',
    options: [
      {
        quadrant: 1,
        label: "I think I am stuck with the talents I was born with",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I only learn things that help me do my current job",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I want to grow, but I don't know where to start",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I see my traits as a starting point to get better",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 5,
    pillar: 'Capability',
    stage: 1,
    quality: 'Self-Belief',
    statement: 'How confident are you in your ability to do your job?',
    options: [
      {
        quadrant: 1,
        label: "I often doubt if I can actually do the job",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I am only confident when things are going well",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I believe in myself, but I'm afraid of big tasks",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I have a quiet confidence that I can learn anything",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 6,
    pillar: 'Competence',
    stage: 1,
    quality: 'Action Plan',
    statement: 'How clear are your career goals and action plan?',
    options: [
      {
        quadrant: 1,
        label: "I don't have clear career goals, and I'm not sure what I'm working towards",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I have ideas about my career, but they aren't clearly defined or written down",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I have clear career goals and a basic action plan, but I don't always follow it consistently",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I have clear, realistic career goals and a structured action plan that I actively review and act on",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 7,
    pillar: 'Competence',
    stage: 2,
    quality: 'Market Savvy',
    statement: 'How well do you understand your industry and how to succeed in it?',
    options: [
      {
        quadrant: 1,
        label: "I don't understand how my industry works",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I know my job, but I don't know the big picture",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I see the trends, but I don't know how to react",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I understand the market and I know how to win",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },

  {
    id: 8,
    pillar: 'Competence',
    stage: 2,
    quality: 'Skill Use',
    statement: 'How effectively do you use your skills to get results?',
    options: [
      {
        quadrant: 1,
        label: "I don't know how my skills help me get ahead",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I have skills, but I don't know how to sell them",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I know my skills, but I don't use them all yet",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I know exactly how to use my skills to get results",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 9,
    pillar: 'Competence',
    stage: 2,
    quality: 'Way of Working',
    statement: 'How organized and systematic is your approach to work?',
    options: [
      {
        quadrant: 1,
        label: "My work life feels messy and out of control",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I have a system, but it only works when I'm calm",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I try to be organized, but I skip steps often",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I have a system that works every single time",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 10,
    pillar: 'Competence',
    stage: 1,
    quality: 'My Profile',
    statement: 'How well does your professional profile represent your value?',
    options: [
      {
        quadrant: 1,
        label: "My CV or online profile is old or very messy",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "My profile is okay, but it doesn't show my value",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "My profile is good, but I don't keep it updated",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "My profile clearly shows why I am a top pro",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 11,
    pillar: 'Competence',
    stage: 2,
    quality: 'Soft Skills',
    statement: 'How strong are your communication, teamwork, and people skills?',
    options: [
      {
        quadrant: 1,
        label: "I haven't really thought about how I communicate, work with others, or handle challenges in professional settings",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I know skills like communication, teamwork, and confidence matter, but I'm not sure how strong mine are or how to improve them",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I'm aware of my soft-skill strengths and gaps, and I try to improve how I communicate, work with others, and manage myself",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I consistently use strong soft skills — like communication, teamwork, and emotional awareness — to perform well, influence others, and lead",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 12,
    pillar: 'Character',
    stage: 2,
    quality: 'Staying in Control',
    statement: 'How do you handle stress, pressure, and correction?',
    options: [
      {
        quadrant: 1,
        label: "I get upset or shut down when I'm stressed or corrected",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "When corrected, I listen, but I often feel defensive or stressed inside",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I usually stay calm and try to use feedback, even when it's hard",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I stay level-headed, seek feedback, and use it to get better",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 13,
    pillar: 'Character',
    stage: 2,
    quality: 'Bouncing Back',
    statement: 'How do you recover from failures and setbacks?',
    options: [
      {
        quadrant: 1,
        label: "When I fail, I want to give up or quit",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I get back up, but it takes me a very long time",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I bounce back, but I don't learn from the fall",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I get back up quickly and keep moving forward",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 14,
    pillar: 'Character',
    stage: 2,
    quality: 'Looking Back',
    statement: 'How often do you reflect on your experiences to improve?',
    options: [
      {
        quadrant: 1,
        label: "I never stop to think about what I've done",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I look back, but I don't change how I act",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I reflect, but I only see the bad things",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I look back often to see how I can do better",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },

  {
    id: 15,
    pillar: 'Capacity',
    stage: 3,
    quality: 'Success Blueprint',
    statement: 'Do you have a documented system for your success?',
    options: [
      {
        quadrant: 1,
        label: "I have no idea why I sometimes succeed",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I'm good, but I can't explain my process",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I have a few rules, but they aren't written down",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I have written down the rules for my success",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 16,
    pillar: 'Capacity',
    stage: 3,
    quality: 'Helping Others',
    statement: 'How much do you invest in helping and mentoring others?',
    options: [
      {
        quadrant: 1,
        label: "I don't have time to help anyone else",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I help people if they come to me first or if I have extra time",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I mentor people, but I don't have a plan for it",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I define my success by how much I help others",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 17,
    pillar: 'Capacity',
    stage: 3,
    quality: 'Explaining Ideas',
    statement: 'How well can you explain complex ideas in simple terms?',
    options: [
      {
        quadrant: 1,
        label: "I find it hard to get people to understand me",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I talk a lot, but people still get confused",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I can explain things, but it takes me too long",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I explain complex things in a simple, clear way",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 18,
    pillar: 'Capacity',
    stage: 1,
    quality: 'My Network',
    statement: 'How strong and helpful is your professional network?',
    options: [
      {
        quadrant: 1,
        label: "I don't know many people in my field",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I have many contacts, but they don't help me",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I know people, but I don't keep in touch",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I have strong, helpful bonds with many people",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 19,
    pillar: 'Capacity',
    stage: 1,
    quality: 'Future Vision',
    statement: 'How clear is your long-term career vision?',
    options: [
      {
        quadrant: 1,
        label: "I have no idea where I'll be in five years",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "I have a dream, but I don't know how to reach it",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "I know my next step, but not the one after",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I have a clear vision for the rest of my career",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
  {
    id: 20,
    pillar: 'Capacity',
    stage: 3,
    quality: 'Real Voice (Influence)',
    statement: 'How much influence do you have in your professional circle?',
    options: [
      {
        quadrant: 1,
        label: "I feel like no one really listens to my ideas",
        internalState: 'awareness',
        externalState: 'no-system',
      },
      {
        quadrant: 2,
        label: "People listen only because they have to",
        internalState: 'awareness',
        externalState: 'system',
      },
      {
        quadrant: 3,
        label: "People like me, but they don't follow my lead",
        internalState: 'command',
        externalState: 'no-system',
      },
      {
        quadrant: 4,
        label: "I lead through respect, not just my title",
        internalState: 'command',
        externalState: 'system',
      },
    ],
  },
];

// CAD Diagnostic Scoring Algorithm
export interface QuadrantCounts {
  1: number; // Q1: New Traveler (Awareness + No System)
  2: number; // Q2: Steady Support (Awareness + System)
  3: number; // Q3: Independent Starter (Command + No System)
  4: number; // Q4: Systemic Leverage Peak (Command + System)
}

export interface PillarScores {
  Capability: number;
  Competence: number;
  Character: number;
  Capacity: number;
}

export type StrategicPathway = 'Route A: System-First' | 'Route B: Command-First' | 'Direct Path' | 'Undefined';

export interface CADAssessmentResults {
  dominantQuadrant: QuadrantLevel;
  quadrantCounts: QuadrantCounts;
  pillarScores: PillarScores;
  strategicPathway: StrategicPathway;
  internalLeverage: number; // % of command vs awareness
  externalSystem: number; // % of system vs no-system
  totalResponses: number;
  readinessForQ4: number; // % progress toward mastery (0-100)
}

export function calculateQuadrant(responses: Array<{ 
  quadrant: QuadrantLevel;
  internalState: 'awareness' | 'command';
  externalState: 'no-system' | 'system';
  pillar: Pillar;
}>): CADAssessmentResults {
  const quadrantCounts: QuadrantCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const pillarScores: PillarScores = { Capability: 0, Competence: 0, Character: 0, Capacity: 0 };
  
  let commandCount = 0;
  let systemCount = 0;

  // Count responses by quadrant and pillar
  responses.forEach((response) => {
    quadrantCounts[response.quadrant]++;
    pillarScores[response.pillar] += response.quadrant;
    
    if (response.internalState === 'command') commandCount++;
    if (response.externalState === 'system') systemCount++;
  });

  // Determine dominant quadrant (highest count)
  const dominantQuadrant = (Object.entries(quadrantCounts)
    .sort(([, a], [, b]) => b - a)[0][0]) as unknown as QuadrantLevel;

  // Calculate internal leverage (% command)
  const internalLeverage = (commandCount / responses.length) * 100;
  
  // Calculate external system (% with system)
  const externalSystem = (systemCount / responses.length) * 100;

  // Determine strategic pathway based on Q2 vs Q3 distribution
  let strategicPathway: StrategicPathway;
  if (dominantQuadrant === 4) {
    strategicPathway = 'Direct Path'; // Already at mastery
  } else if (quadrantCounts[2] > quadrantCounts[3]) {
    strategicPathway = 'Route A: System-First'; // Q1 → Q2 → Q4 (corporate)
  } else if (quadrantCounts[3] > quadrantCounts[2]) {
    strategicPathway = 'Route B: Command-First'; // Q1 → Q3 → Q4 (entrepreneur)
  } else {
    strategicPathway = 'Undefined'; // Balanced or mostly Q1
  }

  // Calculate readiness for Q4 (weighted by quadrant)
  const totalPoints = Object.entries(quadrantCounts)
    .reduce((sum, [q, count]) => sum + (Number(q) * count), 0);
  const maxPoints = responses.length * 4;
  const readinessForQ4 = (totalPoints / maxPoints) * 100;

  return {
    dominantQuadrant,
    quadrantCounts,
    pillarScores,
    strategicPathway,
    internalLeverage,
    externalSystem,
    totalResponses: responses.length,
    readinessForQ4,
  };
}
