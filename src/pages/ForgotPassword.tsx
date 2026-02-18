import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/3pn-logo.png';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const siteUrl = import.meta.env.VITE_APP_URL || window.location.origin;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
      toast.success('Reset link sent! Check your inbox.');
    } catch (error: any) {
      // Don't reveal whether email exists — always show success for security
      setSent(true);
      toast.success('If an account exists with that email, a reset link has been sent.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src={logo} alt="3PN Logo" className="h-16 mx-auto mb-3 dark:brightness-0 dark:invert" />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
              <p className="text-muted-foreground mb-6">
                We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>. 
                Click the link in the email to set a new password.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Didn't receive it? Check your spam folder or try again.
              </p>
              <div className="flex flex-col gap-3">
                <Button onClick={() => { setSent(false); setEmail(''); }} variant="outline" className="w-full">
                  Try a different email
                </Button>
                <Button onClick={() => navigate('/login')} className="w-full gap-2">
                  Back to Sign In
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Forgot Password?</h2>
                <p className="text-sm text-muted-foreground">
                  No worries — enter your email and we'll send you a link to reset it.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
