import OpenAI from 'openai';
import { CADAssessmentResults, QuadrantLevel } from './assessmentData';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true // For demo purposes - move to backend in production
});

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
  try {
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

Please provide:
1. A warm, encouraging summary (2-3 sentences) explaining their quadrant position in the CAD framework
2. List 3 key strengths they demonstrated across the 3Cs + Capacity
3. List 3 specific areas for growth to progress toward Q4 (Mastery)
4. Provide 4 actionable next steps tailored to their strategic pathway
5. A motivational message (1-2 sentences) using the "un-outsourcing" philosophy

Format your response as JSON with keys: summary, strengths (array), areasForGrowth (array), actionSteps (array), motivationalMessage`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career coach specializing in the CAD Diagnostic framework. Help professionals transition from Point A (potential) to Point B (power) through "un-outsourcing" their development.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const insights = JSON.parse(completion.choices[0].message.content || '{}');
    return insights as PersonalizedInsights;
  } catch (error) {
    console.error('Error generating AI insights:', error);
    // Fallback to default insights
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

export async function generateCareerGuidance(
  question: string,
  userContext?: { quadrant?: QuadrantLevel; pathway?: string; name?: string }
): Promise<string> {
  try {
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

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: question
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content || 'I apologize, but I encountered an issue generating a response. Please try again.';
  } catch (error) {
    console.error('Error generating career guidance:', error);
    return 'I apologize, but I encountered a technical issue. Please try again or contact support if the problem persists.';
  }
}
