import React from 'react';

export default function TechwaveLogo({ variant = 'dark', className = '', showTagline = true, size = 'default' }) {
  // variant: 'dark' (on light backgrounds), 'light' (on dark navy backgrounds), 'banner'
  const isLight = variant === 'light';

  const primaryTextColor = isLight ? '#FFFFFF' : '#0A1931';
  const secondaryTextColor = isLight ? '#B3CFE5' : '#4A7FA7';
  const taglineColor = isLight ? '#FF9800' : '#D97706';
  const boltColor = '#FF9800';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Monogram Mark */}
      <svg
        viewBox="0 0 80 60"
        className={size === 'large' ? 'w-16 h-12' : size === 'small' ? 'w-9 h-7' : 'w-12 h-9'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="swooshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A7FA7" />
            <stop offset="50%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>
          <linearGradient id="twGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isLight ? '#FFFFFF' : '#0A1931'} />
            <stop offset="100%" stopColor={isLight ? '#B3CFE5' : '#1A3D63'} />
          </linearGradient>
        </defs>

        {/* Dynamic Top Swoosh */}
        <path
          d="M 12 18 C 28 4, 52 4, 68 15 C 60 12, 40 10, 24 19 Z"
          fill="url(#swooshGrad)"
        />

        {/* Stylized Heavy T & W Monogram with embedded lightning bolt */}
        {/* T-Bar Top */}
        <path
          d="M 6 18 L 48 18 L 43 25 L 29 25 L 24 48 L 13 48 L 19 25 L 6 25 Z"
          fill="url(#twGrad)"
        />

        {/* Lightning Bolt accent in T center */}
        <path
          d="M 28 20 L 20 34 L 27 34 L 22 47 L 34 31 L 27 31 Z"
          fill={boltColor}
        />

        {/* Stylized W overlapping */}
        <path
          d="M 38 24 L 46 48 L 54 31 L 62 48 L 74 24 L 64 24 L 58 39 L 52 26 L 46 26 L 41 39 L 36 24 Z"
          fill={isLight ? '#B3CFE5' : '#1A3D63'}
        />
      </svg>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight">
          <span
            className="font-extrabold text-xl md:text-2xl font-heading tracking-wider"
            style={{ color: primaryTextColor }}
          >
            TECH
          </span>
          <span
            className="font-extrabold text-xl md:text-2xl font-heading tracking-wider text-orange-500"
          >
            WAVE
          </span>
        </div>
        <span
          className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.25em] -mt-0.5"
          style={{ color: secondaryTextColor }}
        >
          ENTERPRISES
        </span>
        {showTagline && (
          <span
            className="italic text-[10px] md:text-[11px] font-medium font-serif mt-0.5"
            style={{ color: taglineColor }}
          >
            Powering Your Industry
          </span>
        )}
      </div>
    </div>
  );
}
