import type { CSSProperties } from 'react';

type LogoBadgeProps = {
  className?: string;
  style?: CSSProperties;
};

/**
 * Unified MamaCure logo rendered inside a soft, rounded square badge.
 * The full SVG (graphic + wordmark) stays legible thanks to internal
 * padding and overflow clipping.
 */
export default function LogoBadge({ className = '', style }: LogoBadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden rounded-2xl p-1.5 ${className}`}
      style={style}
    >
      <img
        src="/MamaCure_logoV1.svg"
        alt="MamaCure"
        className="h-full w-auto select-none object-contain"
        draggable={false}
      />
    </div>
  );
}
