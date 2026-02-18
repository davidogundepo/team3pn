import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: February 2025</p>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the 3PN (Prepare, Progress, and Prosper Network) platform, including the CAD Diagnostic assessment and related services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. About 3PN</h2>
              <p>
                3PN (Prepare, Progress, and Prosper Network) is a career readiness platform designed to help young professionals navigate their journey from potential to power. Our CAD (Capability, Competence, Character, and Capacity) Diagnostic framework provides personalized insights to guide your professional development.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Use of the Platform</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Provide accurate information when creating an account</li>
                <li>Use the platform for legitimate personal and professional development purposes</li>
                <li>Not share your login credentials with others</li>
                <li>Not misuse, copy, or redistribute assessment content without permission</li>
                <li>Respect other users and mentors on the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Assessment Results</h2>
              <p>
                The CAD Diagnostic assessment and AI-generated insights are provided for informational and self-development purposes only. They do not constitute professional career counselling, psychological evaluation, or employment advice. Results should be used as one of many tools in your career development journey.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Account & Data</h2>
              <p>
                When you create an account, you are responsible for maintaining the security of your credentials. Your assessment data, progress, and milestones are stored securely and associated with your account. You may request deletion of your account and associated data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Intellectual Property</h2>
              <p>
                The 3PN platform, CAD Diagnostic framework, assessment questions, branding, and all related content are the intellectual property of 3PN and its founders. You may not reproduce, distribute, or create derivative works without express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
              <p>
                3PN provides the platform "as is" without warranties of any kind. We are not liable for any decisions you make based on your assessment results or AI-generated guidance. The platform is a self-development tool and does not guarantee specific career outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Changes to Terms</h2>
              <p>
                We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the updated terms. We will notify registered users of significant changes via email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us at{' '}
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

export default Terms;
