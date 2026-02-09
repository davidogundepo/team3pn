# 3PN Self-Assessment Platform

> An AI-powered career assessment platform helping young Black professionals discover their path and multiply their impact.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)]()
[![React](https://img.shields.io/badge/React-18-blue)]()
[![License](https://img.shields.io/badge/license-Private-red)]()

---

## 🎯 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment (copy and fill in your keys)
cp .env.local.example .env.local

# 3. Run development server
npm run dev

# 4. Visit http://localhost:5173
```

**First time setup?** → Read **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**

---

## 📚 Documentation

| Document | Purpose | Audience |
|----------|---------|----------|
| **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** | Complete overview of deliverables | Stakeholders & Team |
| **[CLIENT_README.md](./CLIENT_README.md)** | Features & capabilities explained | Business & Marketing |
| **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** | Technical setup instructions | Developers |
| **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** | Step-by-step launch guide | DevOps & Deployment |
| **[supabase-schema.sql](./supabase-schema.sql)** | Database schema | Database Admin |

**Start here:** [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for the big picture!

---

## ✨ Features

### 🎓 Career Assessment
- **20 diagnostic questions** across 3 career stages
- **4 options per question** representing progression levels
- **AI-powered analysis** using OpenAI GPT-4
- **Instant personalized results** with action plans

### 🤖 AI Integration
- **Personalized insights** tailored to responses
- **Career coach chatbot** for ongoing guidance
- **Strength analysis** highlighting what you do well
- **Custom action plans** with specific next steps

### 👤 User Features
- **Secure authentication** with email verification
- **Personal dashboard** tracking progress over time
- **Assessment history** showing growth journey
- **PDF downloads** of all results
- **Guest mode** for trying before creating account

### 📊 Admin Features
- **Analytics dashboard** with key metrics
- **User management** and data export
- **Assessment insights** and patterns
- **Stage distribution** tracking

---

## 🏗️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- React Router
- React Query

**Backend:**
- Supabase (PostgreSQL + Auth)
- OpenAI GPT-4 (AI insights)
- Resend (email delivery)

**Infrastructure:**
- Vercel/Netlify (hosting)
- jsPDF (PDF generation)
- Row-level security (data protection)

---

## 📁 Project Structure

```
team3pn/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AICareerChat.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx # Authentication state
│   ├── lib/
│   │   ├── supabase.ts     # Database client
│   │   ├── openai.ts       # AI integration
│   │   ├── assessmentData.ts # Questions & logic
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Assessment.tsx  # Main assessment flow
│   │   ├── Dashboard.tsx   # User dashboard
│   │   ├── Login.tsx       # Authentication
│   │   └── ...
│   └── App.tsx             # Main app + routing
├── public/                  # Static assets
├── supabase-schema.sql     # Database setup
├── SETUP_GUIDE.md          # Setup instructions
├── CLIENT_README.md        # Feature overview
├── PROJECT_SUMMARY.md      # Complete summary
└── DEPLOYMENT_CHECKLIST.md # Launch guide
```

---

## 🚀 Deployment

### Quick Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# 2. Import to Vercel
# - Go to vercel.com
# - Import your repository
# - Add environment variables
# - Deploy!
```

**Detailed instructions:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 🔑 Environment Variables

Required variables (get from services):

```env
VITE_SUPABASE_URL=          # From supabase.com
VITE_SUPABASE_ANON_KEY=     # From supabase.com
VITE_OPENAI_API_KEY=        # From platform.openai.com
VITE_APP_URL=               # Your domain
```

Optional:
```env
VITE_RESEND_API_KEY=        # For email delivery
```

See [.env.local.example](./.env.local.example) for template.

---

## 🎓 The 3PN Framework

### Stage 1: Know Yourself
*For those just starting out*

**Focus:** Self-awareness, career clarity, goal setting
**Questions:** 1-7 (self-discovery, values, decision making)
**Outcome:** Clear understanding of strengths and direction

### Stage 2: Build Yourself
*For professionals ready to grow*

**Focus:** Skill development, networking, resilience
**Questions:** 8-14 (communication, teamwork, learning)
**Outcome:** Accelerated career growth and opportunities

### Stage 3: Multiply Impact
*For leaders giving back*

**Focus:** Leadership, mentorship, community building
**Questions:** 15-20 (mentoring, influence, purpose)
**Outcome:** Scaled impact and lasting legacy

---

## 📊 Assessment Flow

```
User visits site
    ↓
Start Assessment
    ↓
20 Questions (5-7 minutes)
    ↓
AI Analysis (2-5 seconds)
    ↓
Personalized Results
    ├── Stage Assignment
    ├── AI Insights
    ├── Action Plan
    └── PDF Download
    ↓
Optional: Create Account
    ↓
Personal Dashboard
    ├── Progress Tracking
    ├── Assessment History
    ├── AI Chat Coach
    └── Resources
```

---

## 💡 Key Features Explained

### AI-Powered Insights
Uses OpenAI GPT-4 to:
- Analyze response patterns
- Generate personalized summaries
- Identify strengths and growth areas
- Create custom action plans
- Provide motivational messaging

**Cost:** ~$0.02-0.05 per assessment

### Scoring Algorithm
```typescript
// Simplified logic:
if (multiply_impact_responses >= 8) → Stage 3
else if (build_yourself_responses >= 7) → Stage 2
else → Stage 1

// Falls back to lowest stage with gaps if mixed results
```

### PDF Generation
Automatically creates:
- Professional branded report
- Stage explanation
- AI insights summary
- Strengths & growth areas
- Personalized next steps

---

## 🔒 Security

- ✅ All data encrypted at rest
- ✅ Row-level security policies
- ✅ Secure authentication (Supabase)
- ✅ API keys in environment (never in code)
- ✅ HTTPS only
- ✅ Password hashing
- ✅ Email verification

**GDPR Ready:** Users can export/delete their data

---

## 📈 Analytics & Monitoring

### Built-in Metrics
- Assessment completions
- User signups
- Stage distribution
- Completion rate
- Return visitors

### Cost Monitoring
- OpenAI API usage
- Database size
- Bandwidth usage
- User growth rate

**Admin panel:** `/admin` (requires authentication)

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview prod build
npm run lint         # Check code quality
```

### Adding Questions

Edit `src/lib/assessmentData.ts`:

```typescript
{
  id: 21,
  category: 'New Category',
  question: 'Your question here?',
  options: [
    { value: 'A', label: '...', stage: 'know-yourself', points: 1 },
    { value: 'B', label: '...', stage: 'know-yourself', points: 2 },
    { value: 'C', label: '...', stage: 'build-yourself', points: 3 },
    { value: 'D', label: '...', stage: 'multiply-impact', points: 4 },
  ],
}
```

### Modifying Stages

Edit `src/pages/Assessment.tsx` → `pathDetails` object

---

## 💰 Costs

| Service | Free Tier | Your Usage | Est. Cost |
|---------|-----------|------------|-----------|
| Supabase | 500MB, 50k users | < limits | $0 |
| OpenAI | Pay per use | 500 assessments/mo | $10-25 |
| Vercel | 100GB bandwidth | < limits | $0 |
| Resend | 3k emails/mo | Optional | $0-20 |
| **Total** | | | **$10-45/mo** |

**Scales efficiently:** Handle 10,000 users for ~$100/month

---

## 🤝 Contributing

This is a private project for 3PN. For updates:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit for review
5. Deploy after approval

---

## 📞 Support

**For setup issues:**
1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Review environment variables
3. Check service status pages

**For deployment:**
1. Follow [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
2. Verify all services are configured
3. Check build logs

**For features:**
1. Review [CLIENT_README.md](./CLIENT_README.md)
2. Check code comments
3. TypeScript types provide guidance

---

## 📝 License

Private and proprietary. All rights reserved by 3PN.

---

## 🙏 Acknowledgments

Built for **3PN** - Prepare, Progress, and Prosper Network

**Mission:** Empowering the next generation of Black professionals to achieve their dreams and multiply their impact.

---

## 🚀 Ready to Launch?

1. **Read:** [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Overview
2. **Setup:** [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Configuration
3. **Deploy:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Go live!

**Questions?** All documentation is in this repository.

**Time to launch:** ~30 minutes
**Monthly cost:** $10-50
**Impact:** Unlimited ✨

---

<div align="center">

**Built with ❤️ for helping young professionals achieve their dreams**

[Start Setup](./SETUP_GUIDE.md) • [View Features](./CLIENT_README.md) • [Deploy Now](./DEPLOYMENT_CHECKLIST.md)

</div>
