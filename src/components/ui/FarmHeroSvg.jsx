export default function FarmHeroSvg({ className = 'w-full h-auto max-h-[340px]' }) {
  return (
    <svg
      viewBox="0 0 800 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Illustration of a flourishing Indian farm with rising sun, green hills and crop rows"
      role="img"
    >
      <defs>
        {/* Sky gradient */}
        <linearGradient id="skyGrad" x1="400" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF9E6" />
          <stop offset="0.6" stopColor="#E6F5EC" />
          <stop offset="1" stopColor="#D2EBD9" />
        </linearGradient>

        {/* Sun gradient */}
        <radialGradient id="sunGrad" cx="400" cy="110" r="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4B400" />
          <stop offset="0.7" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>

        {/* Distant Hills */}
        <linearGradient id="backHills" x1="400" y1="120" x2="400" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5FA872" />
          <stop offset="1" stopColor="#3C8B52" />
        </linearGradient>

        {/* Mid Hills */}
        <linearGradient id="midHills" x1="400" y1="150" x2="400" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#31874B" />
          <stop offset="1" stopColor="#1F6B3A" />
        </linearGradient>

        {/* Foreground Soil & Rows */}
        <linearGradient id="soilGrad" x1="400" y1="220" x2="400" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7B4B2A" />
          <stop offset="0.5" stopColor="#643A1E" />
          <stop offset="1" stopColor="#4A2B14" />
        </linearGradient>

        {/* Crop Green */}
        <linearGradient id="cropGreen" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#68D391" />
          <stop offset="1" stopColor="#2E9E5B" />
        </linearGradient>
      </defs>

      {/* Sky Background */}
      <rect width="800" height="360" rx="16" fill="url(#skyGrad)" />

      {/* Sun and Glow */}
      <circle cx="400" cy="110" r="75" fill="url(#sunGrad)" />
      <circle cx="400" cy="110" r="42" fill="#F4B400" />

      {/* Sun rays */}
      <g stroke="#F4B400" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round">
        <line x1="400" y1="52" x2="400" y2="38" />
        <line x1="441" y1="69" x2="451" y2="59" />
        <line x1="458" y1="110" x2="472" y2="110" />
        <line x1="441" y1="151" x2="451" y2="161" />
        <line x1="359" y1="69" x2="349" y2="59" />
        <line x1="342" y1="110" x2="328" y2="110" />
        <line x1="359" y1="151" x2="349" y2="161" />
      </g>

      {/* Distant Hills */}
      <path
        d="M-40 220 Q120 120 280 170 T620 160 Q720 140 840 200 L840 360 L-40 360 Z"
        fill="url(#backHills)"
        opacity="0.85"
      />

      {/* Middle Green Hills */}
      <path
        d="M-20 230 Q160 160 380 205 T760 190 L820 240 L820 360 L-20 360 Z"
        fill="url(#midHills)"
      />

      {/* Small village huts / trees on horizon */}
      <g opacity="0.9">
        <rect x="230" y="174" width="22" height="14" fill="#E2E8F0" rx="1" />
        <polygon points="228,174 241,162 254,174" fill="#C53030" />
        <circle cx="218" cy="178" r="9" fill="#14502A" />
        <circle cx="264" cy="176" r="11" fill="#14502A" />
      </g>

      {/* Foreground Soil Field */}
      <path
        d="M0 225 Q320 210 800 225 L800 360 L0 360 Z"
        fill="url(#soilGrad)"
      />

      {/* Perspective Crop Rows (converging toward horizon) */}
      <g stroke="#9C623C" strokeWidth="2.5" opacity="0.4">
        <line x1="400" y1="218" x2="400" y2="360" />
        <line x1="400" y1="218" x2="260" y2="360" />
        <line x1="400" y1="218" x2="120" y2="360" />
        <line x1="400" y1="218" x2="-20" y2="360" />
        <line x1="400" y1="218" x2="540" y2="360" />
        <line x1="400" y1="218" x2="680" y2="360" />
        <line x1="400" y1="218" x2="820" y2="360" />
      </g>

      {/* Lush Sprouting Crops in Rows */}
      {/* Center Row */}
      <g fill="url(#cropGreen)">
        {/* Row 1 - near */}
        <path d="M400 345 C388 340 388 325 400 320 C412 325 412 340 400 345 Z" />
        <path d="M400 320 Q400 305 385 305 Q395 315 400 320 Z" />
        <path d="M400 320 Q400 305 415 305 Q405 315 400 320 Z" />

        {/* Row 1 - mid */}
        <path d="M400 295 C390 290 390 278 400 274 C410 278 410 290 400 295 Z" />
        <path d="M400 274 Q400 262 388 262 Q396 270 400 274 Z" />
        <path d="M400 274 Q400 262 412 262 Q404 270 400 274 Z" />

        {/* Row 1 - far */}
        <circle cx="400" cy="235" r="4.5" />
        <circle cx="400" cy="248" r="6" />

        {/* Left Row 1 */}
        <path d="M260 348 C248 343 248 328 260 323 C272 328 272 343 260 348 Z" />
        <path d="M260 323 Q260 308 245 308 Q255 318 260 323 Z" />
        <path d="M260 323 Q260 308 275 308 Q265 318 260 323 Z" />
        <circle cx="288" cy="272" r="7" />
        <circle cx="316" cy="242" r="5" />

        {/* Right Row 1 */}
        <path d="M540 348 C528 343 528 328 540 323 C552 328 552 343 540 348 Z" />
        <path d="M540 323 Q540 308 525 308 Q535 318 540 323 Z" />
        <path d="M540 323 Q540 308 555 308 Q545 318 540 323 Z" />
        <circle cx="512" cy="272" r="7" />
        <circle cx="484" cy="242" r="5" />

        {/* Outer Rows */}
        <circle cx="120" cy="340" r="11" />
        <circle cx="176" cy="280" r="8" />
        <circle cx="232" cy="244" r="5" />

        <circle cx="680" cy="340" r="11" />
        <circle cx="624" cy="280" r="8" />
        <circle cx="568" cy="244" r="5" />
      </g>
    </svg>
  );
}
