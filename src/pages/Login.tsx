import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, User, ArrowRight } from 'lucide-react';
import logo from '@/assets/3pn-logo.png';

/**
 * Translate raw Supabase auth errors into friendly, actionable messages.
 * Handles the cross-provider scenario (Google ↔ Email) elegantly.
 */
const friendlyAuthError = (error: any, isLogin: boolean): string => {
  const msg = (error?.message || '').toLowerCase();

  // --- Signup errors ---
  if (!isLogin) {
    if (msg.includes('user already registered') || msg.includes('already been registered')) {
      return 'This email already has an account. Try signing in instead — or use Google if you signed up that way.';
    }
    if (msg.includes('password') && msg.includes('characters')) {
      return 'Password must be at least 6 characters.';
    }
  }

  // --- Login errors ---
  if (isLogin) {
    if (msg.includes('invalid login credentials') || msg.includes('invalid_credentials')) {
      return 'Incorrect email or password. If you signed up with Google, use the Google button below.';
    }
    if (msg.includes('email not confirmed')) {
      return 'Please check your inbox and confirm your email first.';
    }
  }

  // --- Shared errors ---
  if (msg.includes('rate limit') || msg.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  if (msg.includes('network') || msg.includes('fetch')) {
    return 'Network error — please check your connection and try again.';
  }
  if (msg.includes('provider') && msg.includes('linked')) {
    return 'This email is linked to Google sign-in. Use the Google button below.';
  }

  return error?.message || 'Something went wrong. Please try again.';
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        toast.success('Welcome back! 🚀');
        navigate('/dashboard');
      } else {
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.fullName
        );
        if (error) throw error;
        toast.success('Account created! 🎉', {
          description: 'Check your email to verify, then you\'re all set.',
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      const friendly = friendlyAuthError(error, isLogin);
      toast.error(friendly);

      // Smart auto-switch: if they tried to sign up but account exists, flip to login
      if (!isLogin && (
        (error?.message || '').toLowerCase().includes('already registered') ||
        (error?.message || '').toLowerCase().includes('already been registered')
      )) {
        setTimeout(() => {
          setIsLogin(true);
          toast.info('Switched to Sign In for you ✨');
        }, 1500);
      }

      // Smart hint: if login fails, suggest Google
      if (isLogin && (
        (error?.message || '').toLowerCase().includes('invalid login credentials') ||
        (error?.message || '').toLowerCase().includes('invalid_credentials')
      )) {
        // Don't auto-switch, just the toast message is enough
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src={logo} alt="3PN Logo" className="h-16 mx-auto mb-3 dark:brightness-0 dark:invert" />
          </Link>
          <p className="text-muted-foreground text-sm">
            {isLogin
              ? 'Welcome back to your Mastery Voyage'
              : 'Discover where you are on the career readiness spectrum'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLogin
                ? 'Access your CAD Diagnostic dashboard and track progress'
                : 'Join the 3PN network — Prepare, Progress, and Prosper'}
            </p>
          </div>

          {/* Google first — primary CTA */}
          <Button
            variant="outline"
            className="w-full gap-3 mb-4 h-11"
            onClick={signInWithGoogle}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
              {isLogin && (
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle between login/signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-primary font-semibold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
