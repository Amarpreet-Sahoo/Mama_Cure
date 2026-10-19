import { Heart } from 'lucide-react';

type IntroProps = {
  onFinish: () => void;
};

/**
 * Full-screen introductory animation. A soft heart pulses into view
 * inside a breathing glow, with the "MamaCure" wordmark and tagline
 * fading in beneath it. After ~3.6s it notifies the parent to
 * transition into the landing page.
 */
export default function Intro({ onFinish }: IntroProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fbf5f0] px-6"
      onAnimationEnd={(e) => {
        if (e.animationName === 'pp-intro-fade-out') onFinish();
      }}
    >
      {/* Soft decorative blobs for depth */}
      <div className="pointer-events-none absolute left-[12%] top-[20%] h-40 w-40 rounded-full bg-[#f3d4cb] opacity-50 blur-3xl pp-float" />
      <div className="pointer-events-none absolute right-[14%] bottom-[22%] h-52 w-52 rounded-full bg-[#cdd9c5] opacity-40 blur-3xl pp-float-slow" />

      <div className="relative flex flex-col items-center pp-intro-fade-out" style={{ animationDelay: '2.7s' }}>
        {/* Glow rings behind the heart */}
        <div className="relative flex items-center justify-center">
          <span className="absolute h-36 w-36 rounded-full bg-[#e8a5a0] pp-glow-breathe" />
          <span
            className="absolute h-36 w-36 rounded-full bg-[#e8a5a0] pp-glow-breathe"
            style={{ animationDelay: '0.8s' }}
          />

          {/* Heart */}
          <div className="relative pp-heart-pulse">
            <Heart
              className="h-16 w-16 text-[#c97b76] pp-breathe"
              strokeWidth={1.4}
              fill="#e8a5a0"
            />
          </div>
        </div>

        {/* Wordmark */}
        <h1
          className="font-display mt-10 text-4xl font-medium tracking-tight text-[#4a4540] pp-fade-up sm:text-5xl"
          style={{ ['--pp-delay' as string]: '900ms' }}
        >
          MamaCure
        </h1>

        {/* Tagline */}
        <p
          className="mt-3 text-base font-light tracking-wide text-[#8a8278] pp-fade-up sm:text-lg"
          style={{ ['--pp-delay' as string]: '1300ms' }}
        >
          Gentle support for new mothers
        </p>
      </div>
    </div>
  );
}
