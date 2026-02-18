import { GoogleGenerativeAI } from '@google/generative-ai';
import { CADAssessmentResults, QuadrantLevel } from './assessmentData';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export interface CADResponse {
  questionId: number;
  quadrant: QuadrantLevel;
  internalState: 'awareness' | 'command';
  externalState: 'no-system' | 'system';
  pillar: string;
}

export interface PersonalizedInsights {
  summary: string;
  strengths: string[];
  areasForGrowth: string[];
  actionSteps: string[];
  motivationalMessage: string;
}

export async function generatePersonalizedInsights(
  cadResults: CADAssessmentResults,
  responses: CADResponse[],
  userProfile?: { name?: string; email?: string }
): Promise<PersonalizedInsights> {
  // If no API key, use built-in insights immediately
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    return getFallbackInsights(cadResults.dominantQuadrant, cadResults.strategicPathway);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

    const prompt = `You are a professional career coach specializing in the CAD Diagnostic framework (Capability, Competence, Character, Capacity). Based on an assessment, provide personalized insights.

CAD Assessment Results:
- Dominant Quadrant: Q${cadResults.dominantQuadrant}
- Strategic Pathway: ${cadResults.strategicPathway}
- Readiness for Mastery: ${cadResults.readinessForQ4.toFixed(1)}%
- Internal Leverage (Command): ${cadResults.internalLeverage.toFixed(1)}%
- External System: ${cadResults.externalSystem.toFixed(1)}%
- User Name: ${userProfile?.name || 'Participant'}

Quadrant Framework:
- Q1 (The New Traveler): Awareness + No System - Starting point of "un-outsourcing"
- Q2 (The Steady Support): Awareness + System - Route A: System-First (corporate path)
- Q3 (The Independent Starter): Command + No System - Route B: Command-First (entrepreneur path)
- Q4 (Systemic Leverage Peak): Command + System - Point B, full integration of 3Cs + Capacity

The 3PN Philosophy:
"Un-outsourcing" means transitioning from being a passenger to being a Pilot - moving from Point A (potential) to Point B (power).

Pillar Scores:
${Object.entries(cadResults.pillarScores).map(([pillar, score]) => `- ${pillar}: ${score}/80`).join('\n')}

Response Distribution:
${Object.entries(cadResults.quadrantCounts).map(([q, count]) => `Q${q}: ${count} responses`).join(', ')}

Please provide a JSON response with these exact keys:
- "summary": A warm, encouraging summary (2-3 sentences) explaining their quadrant position
- "strengths": Array of 3 key strengths they demonstrated
- "areasForGrowth": Array of 3 specific areas for growth toward Q4 (Mastery)
- "actionSteps": Array of 4 actionable next steps for their strategic pathway
- "motivationalMessage": A motivational message (1-2 sentences) using the "un-outsourcing" philosophy

Return ONLY valid JSON, no markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Clean the response - remove markdown code blocks if present
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const insights = JSON.parse(cleanedText);
    return insights as PersonalizedInsights;
  } catch (error) {
    console.error('Error generating AI insights:', error);
    return getFallbackInsights(cadResults.dominantQuadrant, cadResults.strategicPathway);
  }
}

function getFallbackInsights(quadrant: QuadrantLevel, pathway: string): PersonalizedInsights {
  const insights = {
    1: {
      summary: "You're at Q1 (The New Traveler), the starting point of your transformation journey. This is where 'un-outsourcing' begins - recognizing your potential while building the foundations to achieve it. You're ready to move from passenger to pilot.",
      strengths: [
        "Self-awareness of where you are in your journey",
        "Willingness to grow and transform",
        "Open to building new systems and structures"
      ],
      areasForGrowth: [
        "Develop internal command and confidence",
        "Establish consistent systems and routines",
        "Clarify your unique strengths and direction"
      ],
      actionSteps: [
        "Complete daily reflection to build self-awareness (Capability pillar)",
        "Create one simple system for your most important task",
        "Identify your top 3 natural strengths through assessment",
        "Find an accountability partner to support your growth"
      ],
      motivationalMessage: "Every master started at Q1. Your awareness is the first spark of transformation - now it's time to build the fire. From passenger to Pilot starts here!"
    },
    2: {
      summary: "You're at Q2 (The Steady Support), following Route A: System-First. You've built strong external structures and processes. The next step is developing internal command to match your systematic excellence and reach Q4 (Systemic Leverage Peak).",
      strengths: [
        "Strong systems and consistent execution",
        "Reliable performance within structures",
        "Foundation built for next-level growth"
      ],
      areasForGrowth: [
        "Develop authentic internal confidence and command",
        "Move from following systems to innovating within them",
        "Trust your instincts alongside your processes"
      ],
      actionSteps: [
        "Practice making decisions based on intuition, not just data",
        "Lead a project where you design the system yourself",
        "Develop your unique voice and perspective in your field",
        "Build Character pillar through navigating ambiguous challenges"
      ],
      motivationalMessage: "You've mastered the 'system' part of success. Now un-outsource your power by adding command. Q4 awaits when structure meets authentic leadership!"
    },
    3: {
      summary: "You're at Q3 (The Independent Starter), following Route B: Command-First. You have natural talent and confidence, but building systems will amplify your impact. Your journey to Q4 (Systemic Leverage Peak) requires systematizing your brilliance.",
      strengths: [
        "Natural command and confidence in your abilities",
        "Strong instincts and decision-making capability",
        "Raw talent ready to be structured and scaled"
      ],
      areasForGrowth: [
        "Document and systematize your natural processes",
        "Build repeatable frameworks around your success",
        "Create leverage through structure and delegation"
      ],
      actionSteps: [
        "Document your decision-making process for one key task",
        "Create a simple framework others can follow for your best work",
        "Build one automated system to handle routine work",
        "Develop Competence pillar by teaching your method to someone else"
      ],
      motivationalMessage: "You have the spark - now build the engine. Un-outsourcing means packaging your genius into systems that multiply your impact. Q4 is one framework away!"
    },
    4: {
      summary: "You've reached Q4 (Systemic Leverage Peak / Point B) - the integration of Command and System across all 3Cs plus Capacity. You've successfully 'un-outsourced' your development. You're a Pilot, not a passenger. Now it's time to multiply impact and guide others.",
      strengths: [
        "Full command of your unique capabilities",
        "Robust systems that amplify your strengths",
        "Proven track record of consistent excellence"
      ],
      areasForGrowth: [
        "Expand your capacity to mentor and develop others",
        "Build movements and communities around your expertise",
        "Define and execute your legacy vision"
      ],
      actionSteps: [
        "Mentor 2-3 people through their Q1→Q4 journey",
        "Share your frameworks through content, speaking, or teaching",
        "Build a community or platform that scales your impact",
        "Document your CAD journey to inspire the next generation"
      ],
      motivationalMessage: "You've completed the journey from Point A to Point B. Your success is now a launchpad for others' transformation. Lead the way and multiply the impact!"
    }
  };

  return insights[quadrant] || insights[1];
}

// Built-in career guidance responses
const careerResponses: Record<string, string[]> = {
  career: [
    "Focus on building your Capability first - understand your unique strengths and how they create value. The 3PN framework emphasizes that self-knowledge is the foundation of all career growth.",
    "Consider where you are in the CAD quadrant. If you're in Q1 or Q2, focus on building systems. If you're in Q3, focus on systematizing your natural talents. Q4 is about multiplying your impact.",
  ],
  skills: [
    "The 3PN framework groups skills into four pillars: Capability (knowing yourself), Competence (doing the work), Character (being trustworthy), and Capacity (scaling your impact). Focus on the pillar where you scored lowest.",
    "Start with one skill at a time. Build a system around practicing it daily. Track your progress weekly. This is the 'System-First' approach from the CAD framework.",
  ],
  confidence: [
    "Confidence comes from Command - the internal state in the CAD framework. Build it through consistent small wins, reflection on your strengths, and progressive challenges.",
    "Remember the un-outsourcing philosophy: you already have the potential (Point A). Building confidence means recognizing you're the Pilot, not a passenger. Start with what you already know you're good at.",
  ],
  mentor: [
    "A good mentor helps you move from your current quadrant toward Q4 (Mastery). Look for someone who has both Command AND System in the areas where you want to grow.",
    "The 3PN network connects professionals at different stages. Reach out to people one quadrant ahead of you - they understand your current challenges best.",
  ],
  default: [
    "That's a great question! The 3PN framework emphasizes 'un-outsourcing' - taking control of your own development journey. Start by understanding where you are in the CAD quadrant (take our assessment if you haven't), then focus on building both Command (internal confidence) and System (external structures).",
    "Every career journey is unique, but the CAD framework gives you a compass. Focus on your weakest pillar among Capability, Competence, Character, and Capacity. Build one small system this week to practice improvement.",
  ],
};

function getRelevantResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('career') || q.includes('job') || q.includes('work') || q.includes('profession')) {
    return careerResponses.career[Math.floor(Math.random() * careerResponses.career.length)];
  }
  if (q.includes('skill') || q.includes('learn') || q.includes('develop') || q.includes('grow')) {
    return careerResponses.skills[Math.floor(Math.random() * careerResponses.skills.length)];
  }
  if (q.includes('confiden') || q.includes('afraid') || q.includes('doubt') || q.includes('unsure')) {
    return careerResponses.confidence[Math.floor(Math.random() * careerResponses.confidence.length)];
  }
  if (q.includes('mentor') || q.includes('coach') || q.includes('guide') || q.includes('network')) {
    return careerResponses.mentor[Math.floor(Math.random() * careerResponses.mentor.length)];
  }
  return careerResponses.default[Math.floor(Math.random() * careerResponses.default.length)];
}

export async function generateCareerGuidance(
  question: string,
  userContext?: { quadrant?: QuadrantLevel; pathway?: string; name?: string }
): Promise<string> {
  // If no API key, use built-in responses
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    return getRelevantResponse(question);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are a supportive career coach for young professionals in the 3PN (Prepare, Progress, and Prosper Network) program. 
    
Your role is to:
- Provide actionable, practical career advice
- Be encouraging and supportive
- Keep responses concise (2-3 paragraphs)
- Reference the CAD Diagnostic framework when relevant: Capability → Competence → Character → Capacity
- Emphasize the "un-outsourcing" philosophy: transitioning from passenger to Pilot (Point A to Point B)
- Understand the quadrant system: Q1 (The New Traveler), Q2 (The Steady Support), Q3 (The Independent Starter), Q4 (Systemic Leverage Peak)
${userContext?.quadrant ? `- The user is currently in Q${userContext.quadrant}` : ''}
${userContext?.pathway ? `- Their strategic pathway is: ${userContext.pathway}` : ''}
${userContext?.name ? `- Address them as ${userContext.name}` : ''}`;

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser question: ${question}` }] }
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    return result.response.text() || 'I apologize, but I encountered an issue generating a response. Please try again.';
  } catch (error) {
    console.error('Error generating career guidance:', error);
    return getRelevantResponse(question);
  }
}

// Dashboard AI Insight types
export interface DashboardInsight {
  recommendation: string;
  actionStep: string;
  reflection: string;
}

// Generate a fresh AI insight for the dashboard
export async function generateDashboardInsight(context: {
  quadrant?: number;
  pathway?: string;
  pillarScores?: Record<string, number>;
  userName?: string;
  hasAssessment: boolean;
}): Promise<DashboardInsight> {
  // Fallback content
  const fallbacks: Record<number, DashboardInsight> = {
    0: {
      recommendation: "Every expert was once a beginner. The fact that you're here means you're already ahead of most people who never take the first step.",
      actionStep: "Take the free 5-minute diagnostic to discover your starting point. No wrong answers, just clarity.",
      reflection: "Clarity beats motivation. Most people stay stuck not because they lack drive, but because they don't know where to direct it.",
    },
    1: {
      recommendation: "You're at the beginning of something powerful. Focus on building one core skill deeply rather than spreading yourself thin.",
      actionStep: "Pick one skill from your assessment and dedicate 30 minutes daily to it this week.",
      reflection: "The gap between where you are and where you want to be is simply a system. Start documenting what works for you.",
    },
    2: {
      recommendation: "You have both awareness and structure working for you. Your next step is building independence and internal command.",
      actionStep: "Identify one area where you've been waiting for approval and take ownership of it today.",
      reflection: "Your system is your superpower, but don't let it become a crutch. The leaders who break through can operate with and without structure.",
    },
    3: {
      recommendation: "You've got command but no system to scale it. You're making things happen, but you're probably burning energy that could be automated.",
      actionStep: "Write down the 3 tasks you repeat most. Find a way to template or automate at least one this week.",
      reflection: "Your independence is a strength, but sustainable success requires building systems around yourself.",
    },
    4: {
      recommendation: "You're operating at the highest level. Your focus now should be on legacy: mentoring others and expanding your impact beyond yourself.",
      actionStep: "Reach out to one person who's earlier in their journey and offer to share what you've learned.",
      reflection: "At your level, the biggest risk is complacency. Stay hungry by setting a goal in a completely new domain.",
    },
  };

  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    return fallbacks[context.quadrant || 0];
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = context.hasAssessment
      ? `You are a sharp, insightful AI career coach for the 3PN platform. Generate a fresh, personalised dashboard insight for this user.

User: ${context.userName || 'Professional'}
Their Quadrant: Q${context.quadrant} (${context.quadrant === 1 ? 'The New Traveler: Awareness + No System' : context.quadrant === 2 ? 'The Steady Support: Awareness + System' : context.quadrant === 3 ? 'The Independent Starter: Command + No System' : 'Systemic Leverage Peak: Command + System'})
Pathway: ${context.pathway || 'Not specified'}
Pillar Scores: ${context.pillarScores ? Object.entries(context.pillarScores).map(([k, v]) => `${k}: ${v}/80`).join(', ') : 'Not available'}

Rules:
- Be warm but direct. No fluff.
- Reference their specific quadrant situation
- If a pillar score is notably low, address it specifically
- Keep it under 60 words per field
- Don't use em dashes

Return ONLY valid JSON with exactly these keys:
- "recommendation": One personalised observation about where they are and what to focus on (2-3 sentences max)
- "actionStep": One specific, actionable thing they can do TODAY (1 sentence)
- "reflection": A thought-provoking insight about growth that feels personal to their stage (1-2 sentences)`
      : `You are a sharp, insightful AI career coach for the 3PN platform. Generate a motivating dashboard insight for a new user named ${context.userName || 'there'} who hasn't taken their assessment yet.

Rules:
- Be warm but direct. No fluff.
- Motivate them to take the free 5-minute diagnostic
- Make them feel like taking the first step is powerful
- Keep it under 60 words per field
- Don't use em dashes

Return ONLY valid JSON with exactly these keys:
- "recommendation": A warm, motivating observation about why self-knowledge matters (2-3 sentences max)
- "actionStep": A nudge to take the free diagnostic right now (1 sentence)
- "reflection": A thought-provoking insight about starting (1-2 sentences)`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.9,
      },
    });

    const text = result.response.text();
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned) as DashboardInsight;
  } catch (error) {
    console.error('Dashboard AI insight error:', error);
    return fallbacks[context.quadrant || 0];
  }
}

// Assessment AI companion nudges
const pillarNudges: Record<string, string[]> = {
  Capability: [
    "Knowing yourself is the foundation. Every great leader started by understanding their own wiring.",
    "Oprah once said she succeeded because she became genuinely curious about herself first. Self-awareness is your starting advantage.",
    "You're building your internal compass. That clarity will guide every decision ahead.",
  ],
  Competence: [
    "Skills are built, not born. Every expert was once a beginner who refused to stop practising.",
    "Kobe Bryant wasn't the most talented player in his draft class. But his obsession with skill-building made him legendary.",
    "Competence is the bridge between potential and performance. You're laying down the planks right now.",
  ],
  Character: [
    "Character is what you do when no one is watching. It's the pillar that holds everything else up.",
    "Chimamanda Ngozi Adichie built her career on authenticity, not trends. Character compounds over time.",
    "Trust is earned in drops and lost in buckets. Your character answers are shaping the most important pillar.",
  ],
  Capacity: [
    "Capacity is about scaling yourself. It's not just what you can do, but how far your impact reaches.",
    "Jay-Z went from selling out concerts to building Roc Nation. The difference? He learned to multiply his capacity.",
    "You're thinking about leverage now. That's the shift from doing more to achieving more.",
  ],
};

export async function generateAssessmentNudge(
  questionNumber: number,
  totalQuestions: number,
  pillar: string,
  quality: string,
  chosenOptionLabel: string,
): Promise<string> {
  // Fallback: pick from curated nudges
  const fallbackNudges = pillarNudges[pillar] || pillarNudges.Capability;
  const fallback = fallbackNudges[questionNumber % fallbackNudges.length];

  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    return fallback;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a warm, sharp AI coach guiding someone through a career assessment on the 3PN platform.

They just answered question ${questionNumber + 1} of ${totalQuestions}.
Pillar: ${pillar}
Quality being measured: ${quality}
Their answer: "${chosenOptionLabel}"

Write ONE short reflection (max 2 sentences, under 30 words total). Be captivating, not generic.

Rules:
- About 30% of the time, naturally reference a famous person who relates to this topic (Oprah, Denzel Washington, Kobe Bryant, Chimamanda Ngozi Adichie, Steve Jobs, Michelle Obama, Aliko Dangote, Jay-Z, Elon Musk, Folorunso Alakija). When you do, make it feel organic, not forced.
- The other 70%, just speak directly and insightfully without mentioning anyone.
- Never use em dashes.
- Don't be preachy or generic. Be specific to what they chose.
- If they're past question 15, add encouragement about being close to finishing.
- Return ONLY the reflection text, no quotes, no JSON.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 60,
        temperature: 1.0,
      },
    });

    const text = result.response.text().trim();
    return text || fallback;
  } catch {
    return fallback;
  }
}
