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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a professional career coach specializing in the CAD Diagnostic framework (Capability, Competence, Character, Capacity). Based on an assessment, provide personalized insights.

CAD Assessment Results:
- Dominant Quadrant: Q${cadResults.dominantQuadrant}
- Strategic Pathway: ${cadResults.strategicPathway}
- Readiness for Mastery: ${cadResults.readinessForQ4.toFixed(1)}%
- Internal Leverage (Command): ${cadResults.internalLeverage.toFixed(1)}%
- External System: ${cadResults.externalSystem.toFixed(1)}%
- User Name: ${userProfile?.name || 'Participant'}

Quadrant Framework:
- Q1 (The Unsure): Awareness + No System - Starting point of "un-outsourcing"
- Q2 (The Specialist): Awareness + System - Route A: System-First (corporate path)
- Q3 (The Dependable): Command + No System - Route B: Command-First (entrepreneur path)
- Q4 (Mastery): Command + System - Point B, full integration of 3Cs + Capacity

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
      summary: "You're at Q1 (The Unsure), the starting point of your transformation journey. This is where 'un-outsourcing' begins - recognizing your potential while building the foundations to achieve it. You're ready to move from passenger to pilot.",
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
      summary: "You're at Q2 (The Specialist), following Route A: System-First. You've built strong external structures and processes. The next step is developing internal command to match your systematic excellence and reach Q4 (Mastery).",
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
      summary: "You're at Q3 (The Dependable), following Route B: Command-First. You have natural talent and confidence, but building systems will amplify your impact. Your journey to Q4 (Mastery) requires systematizing your brilliance.",
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
      summary: "You've reached Q4 (Mastery/Point B) - the integration of Command and System across all 3Cs plus Capacity. You've successfully 'un-outsourced' your development. You're a Pilot, not a passenger. Now it's time to multiply impact and guide others.",
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
- Understand the quadrant system: Q1 (The Unsure), Q2 (The Specialist), Q3 (The Dependable), Q4 (Mastery)
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
