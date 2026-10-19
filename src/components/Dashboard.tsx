import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { useAuth } from '@/context/AuthContext';
import { Heart, LogOut, Sparkles } from 'lucide-react';
import LogoBadge from '@/components/LogoBadge';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await signOut(auth);
    } catch {
      setSigningOut(false);
    }
    navigate('/');
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#fbf5f0]">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#f3d4cb] opacity-50 blur-3xl pp-float" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-[#cdd9c5] opacity-40 blur-3xl pp-float-slow" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#f7e8e0] opacity-60 blur-3xl pp-float" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12">
        <LogoBadge className="h-12" />

        <button
          onClick={handleLogout}
          disabled={signingOut}
          className="flex items-center gap-2 rounded-full border border-[#d8ccc2] bg-white/80 px-5 py-2.5 text-sm font-medium text-[#4a4540] backdrop-blur transition-all duration-300 hover:border-[#c97b76] hover:text-[#c97b76] active:scale-[0.98] disabled:opacity-60"
        >
          {signingOut ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#c97b76]/30 border-t-[#c97b76]" />
          ) : (
            <LogOut className="h-4 w-4" strokeWidth={1.6} />
          )}
          Log Out
        </button>
      </header>

      {/* Centered greeting */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border border-[#e8a5a0]/40 bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-[#c97b76] backdrop-blur pp-reveal"
          style={{ ['--pp-delay' as string]: '0ms' }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Your care space
        </span>

        <h1
          className="font-display mt-7 max-w-2xl text-3xl font-medium leading-[1.2] tracking-tight text-[#4a4540] pp-reveal sm:text-5xl"
          style={{ ['--pp-delay' as string]: '150ms' }}
        >
          Welcome back to your
          <br />
          <span className="text-[#c97b76]">care space, Mama.</span>
        </h1>

        <p
          className="mt-6 max-w-md text-base font-light leading-relaxed text-[#6b655d] pp-reveal"
          style={{ ['--pp-delay' as string]: '300ms' }}
        >
          {user?.email ? `Signed in as ${user.email}` : "You're all set. Your personalized dashboard is coming soon."}
        </p>

        <div
          className="mt-8 flex items-center gap-1.5 text-xs font-light text-[#a59c92] pp-reveal"
          style={{ ['--pp-delay' as string]: '450ms' }}
        >
          <Heart className="h-3.5 w-3.5 text-[#e8a5a0] pp-breathe" fill="#e8a5a0" strokeWidth={1.5} />
          More features coming soon
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#e9ded5] bg-white/40 px-6 py-6 text-center text-xs font-light text-[#8a8278] backdrop-blur sm:px-12">
        <p>Made with care for every mother.</p>
      </footer>
    </div>
  );
}
