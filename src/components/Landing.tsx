import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import LogoBadge from '@/components/LogoBadge';

const TEAM = [
  { name: 'Amarpreet' },
  { name: 'Darsh' },
  { name: 'Aagrata' },
  { name: 'Benish' },
  { name: 'Pranjal' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbf5f0]">
      {/* Floating decorative background blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#f3d4cb] opacity-50 blur-3xl pp-float" />
      <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-[#cdd9c5] opacity-40 blur-3xl pp-float-slow" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#f7e8e0] opacity-60 blur-3xl pp-float" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12">
        <LogoBadge className="h-16 pp-reveal" style={{ ['--pp-delay' as string]: '0ms' }} />

        <nav className="hidden items-center gap-8 text-sm font-light text-[#6b655d] md:flex pp-reveal" style={{ ['--pp-delay' as string]: '120ms' }}>
          <a href="#team" className="transition-colors hover:text-[#c97b76]">Our Team</a>
          <a href="#about" className="transition-colors hover:text-[#c97b76]">About</a>
          <a href="#support" className="transition-colors hover:text-[#c97b76]">Support</a>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-14 text-center sm:pt-24">
        <h1
          className="font-display max-w-3xl text-4xl font-medium leading-[1.15] tracking-tight text-[#4a4540] pp-reveal sm:text-6xl"
          style={{ ['--pp-delay' as string]: '200ms' }}
        >
          You cared for them.
          <br />
          <span className="text-[#c97b76]">Now let us care for you.</span>
        </h1>

        <p
          className="mt-6 max-w-xl text-base font-light leading-relaxed text-[#6b655d] sm:text-lg pp-reveal"
          style={{ ['--pp-delay' as string]: '460ms' }}
        >
          MamaCure offers gentle, personalized support through every stage of your
          postpartum journey, with tailored check-ins, expert guidance, and a community
          that understands, right when you need it.
        </p>

        {/* Buttons */}
        <div
          className="mt-10 flex w-full flex-col items-center gap-3 pp-reveal sm:w-auto sm:flex-row sm:gap-4"
          style={{ ['--pp-delay' as string]: '600ms' }}
        >
          <button
            onClick={() => navigate('/auth?mode=signup')}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#c97b76] px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#c97b76]/20 transition-all duration-300 hover:bg-[#b86a65] hover:shadow-xl hover:shadow-[#c97b76]/30 active:scale-[0.98] sm:w-auto"
          >
            Create Account
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </button>
          <button
            onClick={() => navigate('/auth?mode=login')}
            className="flex w-full items-center justify-center rounded-full border border-[#d8ccc2] bg-white/80 px-8 py-3.5 text-sm font-medium text-[#4a4540] backdrop-blur transition-all duration-300 hover:border-[#c97b76] hover:text-[#c97b76] active:scale-[0.98] sm:w-auto"
          >
            Log In
          </button>
        </div>
      </main>

      {/* Team & Mentor */}
      <section id="team" className="relative z-10 mx-auto mt-24 max-w-5xl px-6 pb-16 sm:mt-32 sm:px-12">
        <div
          className="mb-10 text-center pp-reveal"
          style={{ ['--pp-delay' as string]: '760ms' }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#c97b76]">
            The people behind MamaCure
          </p>
          <h2 className="font-display mt-3 text-2xl font-medium tracking-tight text-[#4a4540] sm:text-3xl">
            Guided by experience, built with care
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {/* Mentor card — featured */}
          <div
            className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#e8a5a0]/40 bg-gradient-to-b from-white to-[#f7e8e0]/60 p-7 text-center shadow-sm pp-reveal sm:flex-row sm:items-center sm:gap-5 sm:p-6 sm:text-left"
            style={{ ['--pp-delay' as string]: '880ms' }}
          >
            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#c97b76] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
              <Star className="h-3 w-3 fill-white" strokeWidth={1.5} />
              Project Mentor
            </span>

            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e8a5a0] shadow-inner">
              <span className="font-display text-lg font-medium text-white">PS</span>
            </span>

            <div className="mt-4 sm:mt-0 sm:pr-24">
              <h3 className="font-display text-lg font-medium tracking-tight text-[#4a4540]">
                P. Senthilnathan
              </h3>
              <p className="mt-1 text-sm font-light leading-relaxed text-[#8a8278]">
                Guiding the vision and direction of MamaCure with wisdom and a steady, caring hand.
              </p>
            </div>
          </div>

          {/* Team row — all five in a single horizontal line on desktop */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="flex flex-col items-center rounded-xl border border-[#e9ded5] bg-white/70 p-3 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#e8a5a0]/50 hover:shadow-md pp-reveal sm:p-4"
                style={{ ['--pp-delay' as string]: `${1000 + i * 110}ms` }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#cdd9c5]/60 sm:h-10 sm:w-10">
                  <span className="font-display text-xs font-medium text-[#4a4540] sm:text-sm">
                    {member.name.slice(0, 2)}
                  </span>
                </span>
                <p className="mt-2 text-xs font-medium text-[#4a4540] sm:text-sm">{member.name}</p>
                <p className="mt-0.5 text-[0.6rem] font-light text-[#a59c92] sm:text-xs">Team Member</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#e9ded5] bg-white/40 px-6 py-8 text-center text-xs font-light text-[#8a8278] backdrop-blur sm:px-12">
        <p>Made with care for every mother.</p>
      </footer>
    </div>
  );
}
