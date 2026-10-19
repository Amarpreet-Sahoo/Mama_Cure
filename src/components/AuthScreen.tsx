import { useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import LogoBadge from '@/components/LogoBadge';

type Mode = 'login' | 'signup';

export default function AuthScreen() {
  const [params] = useSearchParams();
  const initialMode = (params.get('mode') as Mode) === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/onboarding');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(friendlyError(msg));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbf5f0] px-6 py-12">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#f3d4cb] opacity-50 blur-3xl pp-float" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-[#cdd9c5] opacity-40 blur-3xl pp-float-slow" />

      {/* Back link */}
      <button
        onClick={() => navigate('/')}
        className="absolute left-6 top-6 z-10 flex items-center gap-1.5 text-sm font-light text-[#6b655d] transition-colors hover:text-[#c97b76] sm:left-12"
      >
        <ArrowLeft className="h-4 w-4" />
        Home
      </button>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md pp-reveal">
        <div className="rounded-3xl border border-[#e9ded5] bg-white/80 p-8 shadow-xl shadow-black/[0.03] backdrop-blur-xl sm:p-10">
          {/* Logo + heading */}
          <div className="flex flex-col items-center text-center">
            <LogoBadge className="h-16" />
            <h1 className="font-display mt-6 text-2xl font-medium tracking-tight text-[#4a4540] sm:text-3xl">
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="mt-2 text-sm font-light text-[#8a8278]">
              {mode === 'signup'
                ? 'Begin your personalized postpartum journey today.'
                : 'Sign in to continue your care journey.'}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="mt-7 flex rounded-full bg-[#f7e8e0]/60 p-1">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 rounded-full py-2 text-sm font-medium transition-all duration-300 ${
                mode === 'login' ? 'bg-white text-[#c97b76] shadow-sm' : 'text-[#8a8278] hover:text-[#4a4540]'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 rounded-full py-2 text-sm font-medium transition-all duration-300 ${
                mode === 'signup' ? 'bg-white text-[#c97b76] shadow-sm' : 'text-[#8a8278] hover:text-[#4a4540]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-[#6b655d]">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b8aea4]" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#e9ded5] bg-white/90 py-3 pl-10 pr-4 text-sm text-[#4a4540] placeholder:text-[#c4b8ae] transition-all focus:border-[#e8a5a0] focus:outline-none focus:ring-2 focus:ring-[#e8a5a0]/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-[#6b655d]">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b8aea4]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                  className="w-full rounded-xl border border-[#e9ded5] bg-white/90 py-3 pl-10 pr-10 text-sm text-[#4a4540] placeholder:text-[#c4b8ae] transition-all focus:border-[#e8a5a0] focus:outline-none focus:ring-2 focus:ring-[#e8a5a0]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8aea4] transition-colors hover:text-[#8a8278]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-[#f7e8e0]/70 px-4 py-2.5 text-xs font-medium text-[#c97b76]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#c97b76] py-3.5 text-sm font-medium text-white shadow-lg shadow-[#c97b76]/20 transition-all duration-300 hover:bg-[#b86a65] hover:shadow-xl hover:shadow-[#c97b76]/30 active:scale-[0.98] disabled:opacity-60"
            >
              {submitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : (
                <>
                  {mode === 'signup' ? 'Create Account' : 'Log In'}
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </>
              )}
            </button>
          </form>

          {/* Toggle hint */}
          <p className="mt-6 text-center text-xs font-light text-[#8a8278]">
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }}
              className="font-medium text-[#c97b76] underline-offset-2 hover:underline"
            >
              {mode === 'signup' ? 'Log in' : 'Create one'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function friendlyError(msg: string): string {
  if (msg.includes('email-already-in-use')) return 'An account with this email already exists.';
  if (msg.includes('invalid-credential') || msg.includes('wrong-password')) return 'Incorrect email or password.';
  if (msg.includes('user-not-found')) return 'No account found with this email.';
  if (msg.includes('weak-password')) return 'Password should be at least 6 characters.';
  if (msg.includes('invalid-email')) return 'Please enter a valid email address.';
  if (msg.includes('too-many-requests')) return 'Too many attempts. Please try again later.';
  return msg.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, '').trim() || 'Something went wrong. Please try again.';
}
