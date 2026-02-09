# 3PN Self-Assessment Web Application

## 🎯 Project Overview

A production-ready career self-assessment platform with AI-powered insights, user authentication, and personalized guidance. Built for the 3PN (Prepare, Progress, and Prosper Network).

### Features

✅ **20-Question Diagnostic Assessment**
- 4 options per question (A, B, C, D)
- Categories: Know Yourself → Build Yourself → Multiply Impact
- Smart scoring algorithm

✅ **AI-Powered Features**
- Personalized insights using OpenAI GPT-4
- Real-time career guidance chatbot
- Custom action plans and recommendations

✅ **User Authentication & Dashboard**
- Secure login/signup with Supabase Auth
- Personal dashboard with progress tracking
- Assessment history and analytics

✅ **PDF Generation & Email**
- Automated PDF result reports
- Email delivery of results
- Professional formatting with branding

✅ **Responsive Design**
- Mobile-first approach
- Beautiful UI with shadcn/ui components
- Dark mode support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- OpenAI API key
- Resend account for email (optional)

### 1. Clone and Install

```bash
cd "team3pn"
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase-schema.sql`
3. Get your project URL and anon key from Settings > API

### 3. Set Up OpenAI

1. Get an API key from [platform.openai.com](https://platform.openai.com)
2. Make sure you have credits in your account

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-your-openai-key-here

# Resend Email Configuration (Optional)
VITE_RESEND_API_KEY=re_your-resend-key-here

# App Configuration
VITE_APP_URL=http://localhost:5173
VITE_APP_NAME=3PN Self-Assessment
```

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app!

## 📁 Project Structure

```
team3pn/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AICareerChat.tsx # AI chatbot component
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── contexts/
│   │   └── AuthContext.tsx  # Authentication provider
│   ├── lib/
│   │   ├── supabase.ts      # Supabase client
│   │   ├── openai.ts        # OpenAI integration
│   │   ├── assessmentData.ts # Questions & scoring
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Assessment.tsx   # 20-question assessment
│   │   ├── Dashboard.tsx    # User dashboard
│   │   ├── Login.tsx        # Auth page
│   │   ├── Index.tsx        # Homepage
│   │   └── ...
│   └── App.tsx              # Main app with routes
├── supabase-schema.sql      # Database schema
├── .env.example             # Environment template
└── package.json
```

## 🔧 Key Technologies

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui, Radix UI
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: OpenAI GPT-4
- **PDF**: jsPDF
- **Email**: Resend
- **State**: React Query, Context API

## 📊 Database Schema

### Tables

1. **profiles** - User information
2. **assessments** - Assessment results with AI insights
3. **mentor_matches** - Mentor-mentee relationships

See `supabase-schema.sql` for complete schema.

## 🎨 User Journey

1. **Landing Page** → User discovers 3PN
2. **Assessment** → 20 questions (5-7 minutes)
3. **AI Processing** → Personalized insights generated
4. **Results** → Stage assignment with action plan
5. **Login/Signup** → Create account to save results
6. **Dashboard** → Track progress, access resources
7. **AI Coach** → Get ongoing career guidance

## 🔐 Authentication Flow

- Email/password signup
- Email verification (automatic)
- Protected routes for dashboard
- Guest mode for taking assessment without account

## 🤖 AI Integration

### Assessment Insights
- Analyzes 20 responses
- Generates personalized feedback
- Provides strengths, growth areas, and action steps
- Motivational messages tailored to stage

### Career Chat
- Real-time guidance
- Context-aware responses
- Remembers user's stage
- Available 24/7

## 📝 Assessment Scoring

### Stage Calculation
- **Know Yourself**: 7 questions focused on self-discovery
- **Build Yourself**: 7 questions on skill development
- **Multiply Impact**: 6 questions on leadership/mentoring

### Algorithm
- Each answer maps to a stage
- Count responses per stage
- If 8+ in Multiply Impact → That's your stage
- If 7+ in Build Yourself → That's your stage
- Otherwise → Know Yourself

## 📧 Email Integration (Optional)

To enable email functionality:

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Add API key to `.env.local`
4. Customize email templates in the code

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel with environment variables
```

### Option 2: Netlify

```bash
npm run build
# Deploy dist folder to Netlify
```

### Option 3: Your Server

```bash
npm run build
# Serve the dist folder with any static file server
```

## 🔒 Security Considerations

⚠️ **IMPORTANT**: The current implementation uses OpenAI in the browser for demo purposes. For production:

1. Move AI calls to a serverless function
2. Never expose API keys in the client
3. Implement rate limiting
4. Add input validation
5. Use environment variables properly

## 📈 Admin Features

Access the admin panel at `/admin` to:
- View all assessments
- Track user engagement
- Export data
- Manage users

## 🐛 Troubleshooting

### Common Issues

**"No API key found"**
- Check `.env.local` file exists
- Restart dev server after adding env vars

**Supabase connection error**
- Verify project URL and anon key
- Check if database schema is created
- Ensure Row Level Security policies are set

**AI not responding**
- Check OpenAI API key validity
- Verify you have credits
- Check browser console for errors

## 📞 Support

For issues or questions:
- Check the code comments
- Review Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Review OpenAI docs: [platform.openai.com/docs](https://platform.openai.com/docs)

## 🎯 Next Steps (Future Enhancements)

- [ ] Email automation for results
- [ ] SMS notifications
- [ ] Calendar integration for mentorship
- [ ] Video introductions
- [ ] Community forums
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

## 📄 License

This is a client project for 3PN. All rights reserved.

## 🙏 Acknowledgments

Built with ❤️ for helping young professionals achieve their career dreams.

---

**Ready to launch?** Make sure all environment variables are set, database is configured, and run `npm run build` for production!
