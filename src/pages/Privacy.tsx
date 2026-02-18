import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: February 2025</p>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Overview</h2>
              <p>
                3PN (Prepare, Progress, and Prosper Network) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our platform, including the CAD Diagnostic assessment and related services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
              <p className="font-medium mt-2">Account Information:</p>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                <li>Full name and email address (when you create an account)</li>
                <li>Password (stored securely using industry-standard encryption)</li>
              </ul>
              <p className="font-medium mt-3">Assessment Data:</p>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                <li>Your responses to the CAD Diagnostic assessment questions</li>
                <li>Calculated quadrant results and pillar scores</li>
                <li>AI-generated insights based on your assessment results</li>
              </ul>
              <p className="font-medium mt-3">Usage Data:</p>
              <ul className="list-disc pl-6 space-y-1 mt-1">
                <li>Assessment completion dates and progress milestones</li>
                <li>Basic analytics (e.g., page views) to improve the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide and personalize your assessment results and insights</li>
                <li>To track your progress and award milestones on your Mastery Voyage</li>
                <li>To send account-related notifications (e.g., welcome emails, assessment summaries)</li>
                <li>To generate anonymized, aggregate analytics for platform improvement</li>
                <li>To communicate important updates about the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Storage & Security</h2>
              <p>
                Your data is stored securely using Supabase, a trusted cloud database provider with enterprise-grade security. All data is encrypted in transit (TLS/SSL) and at rest. We implement Row Level Security (RLS) policies to ensure that you can only access your own data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share data only in these limited circumstances:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>AI Processing:</strong> Assessment responses are processed using Google's Gemini AI to generate personalized insights. No personally identifiable information is sent to the AI, only your assessment scores and quadrant results.</li>
                <li><strong>Admin Access:</strong> Platform administrators may view aggregate data (e.g., total users, quadrant distributions) but do not access individual assessment responses.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Access your personal data and assessment results at any time</li>
                <li>Download your assessment results as a PDF report</li>
                <li>Request correction of inaccurate personal information</li>
                <li>Request deletion of your account and all associated data</li>
                <li>Opt out of non-essential email communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Cookies & Tracking</h2>
              <p>
                We use essential cookies for authentication and session management only. We do not use advertising trackers or sell your browsing data. No third-party analytics cookies are used without your consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Guest Users</h2>
              <p>
                If you use the platform as a guest (without creating an account), your assessment results are processed in your browser only and are not stored on our servers. Guest assessment data is not retained or tracked.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify registered users of material changes via email. The "Last updated" date at the top of this page indicates the most recent revision.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or wish to exercise your data rights, contact us at{' '}
                <a href="mailto:info@3pn.org" className="text-primary hover:underline">info@3pn.org</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
