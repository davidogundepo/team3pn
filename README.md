# 3PN Self-Assessment Tool - CAD Diagnostic

A professional development assessment platform based on the **CAD Diagnostic Framework** (Capability, Competence, Character, Capacity). This tool helps individuals identify their current quadrant and strategic pathway toward mastery.

## 🎯 Framework Overview

The CAD Diagnostic maps professional development across two key dimensions:

- **Internal Leverage**: Awareness vs Command
- **External System**: No System vs System

This creates four distinct quadrants:

### The Quadrants

1. **Q1: The Unsure** (Awareness + No System)
   - Starting point of transformation
   - Recognizing potential without structure
   - Focus: Build awareness and basic systems

2. **Q2: The Specialist** (Awareness + System)
   - Strong processes, developing command
   - Route A: System-First (Corporate path)
   - Focus: Develop internal confidence and leadership

3. **Q3: The Dependable** (Command + No System)
   - Natural talent, needs systematization
   - Route B: Command-First (Entrepreneur path)
   - Focus: Build repeatable frameworks

4. **Q4: Mastery / Point B** (Command + System)
   - Full integration of 3Cs + Capacity
   - Pilot, not passenger
   - Focus: Multiply impact through mentoring

## 🧩 The Four Pillars

The assessment evaluates 20 qualities across:

- **Capability**: Self-knowledge, identity, natural fit, growth mindset, self-belief
- **Competence**: Action planning, market savvy, skill application, working methods
- **Character**: Emotional resilience, self-control, learning from experience
- **Capacity**: Helping others, communication, networking, vision, influence

## 🚀 Features

- **20-Question CAD Assessment**: Each question maps to quadrants based on the 2x2 framework
- **AI-Powered Insights**: Personalized feedback using GPT-4
- **Strategic Pathway Recommendations**: Route A (System-First) or Route B (Command-First)
- **Progress Metrics**: Track readiness for Q4 mastery
- **PDF Export**: Downloadable results with quadrant analysis
- **User Authentication**: Save and track assessment history via Supabase

## 🛠 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui components
- **AI**: OpenAI GPT-4 API
- **Backend**: Supabase (Auth + Database)
- **PDF Generation**: jsPDF
- **Routing**: React Router

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/3pn-assessment.git

# Navigate to project directory
cd 3pn-assessment

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Add your API keys to .env
VITE_OPENAI_API_KEY=your_openai_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

# Run development server
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with:

```env
VITE_OPENAI_API_KEY=sk-...
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase Database Schema

The app requires an `assessments` table:

```sql
create table assessments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  quadrant int not null check (quadrant between 1 and 4),
  pathway text,
  responses jsonb,
  cad_results jsonb,
  ai_insights jsonb,
  completed_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);
```

## 🎨 Project Structure

```
src/
├── components/        # React components (Header, Footer, UI)
├── lib/
│   ├── assessmentData.ts  # CAD questions & scoring algorithm
│   ├── openai.ts          # AI integration
│   └── supabase.ts        # Database client
├── pages/
│   ├── Index.tsx          # Landing page
│   ├── Assessment.tsx     # Main assessment flow
│   └── ...                # Other pages
└── main.tsx           # App entry point
```

## 📊 Scoring Algorithm

The `calculateQuadrant()` function:

1. Maps each response to Q1-Q4 based on internal/external state
2. Counts distribution across quadrants
3. Calculates dominant quadrant
4. Determines strategic pathway (Route A vs Route B)
5. Computes readiness for Q4 mastery (0-100%)
6. Tracks pillar scores (Capability, Competence, Character, Capacity)

## 🤖 AI Integration

The AI generates personalized insights by:

- Analyzing quadrant position and pathway
- Identifying strengths across the 3Cs + Capacity
- Recommending focus areas for growth
- Providing actionable next steps
- Delivering motivational messaging aligned with "un-outsourcing" philosophy

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
# Build the app
npm run build

# Deploy dist folder to gh-pages branch
# (You can use gh-pages package or manual deployment)
```

### Deploy to Vercel/Netlify

Both platforms auto-detect Vite projects. Simply connect your repository.

## 📝 Philosophy: "Un-Outsourcing"

The CAD Diagnostic is grounded in the concept of **un-outsourcing** your professional development:

> Moving from being a **passenger** (Point A: potential) to being a **Pilot** (Point B: power)

This means:
- Taking ownership of your growth
- Building internal command, not just external credentials
- Creating systems that amplify your unique strengths
- Progressing from Q1 → Q4 through deliberate development

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **3PN Framework**: Developed by Gbenga Awomodu
- **CAD Diagnostic**: Capability, Competence, Character, Capacity model
- **UI Components**: Built with shadcn/ui
- **AI**: Powered by OpenAI GPT-4

## 📧 Contact

For questions or support, please open an issue or contact the 3PN team.

---

**Built with ❤️ for the 3PN community**
