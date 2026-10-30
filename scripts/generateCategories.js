import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images/categories');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const svgs = {
  'industrial-equipment.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1931"/>
      <stop offset="100%" stop-color="#1A3D63"/>
    </linearGradient>
    <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4A7FA7"/>
      <stop offset="50%" stop-color="#B3CFE5"/>
      <stop offset="100%" stop-color="#1A3D63"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF9800"/>
      <stop offset="100%" stop-color="#E65100"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg)"/>
  <!-- Tech Grid -->
  <g opacity="0.15" stroke="#B3CFE5" stroke-width="1">
    <line x1="0" y1="100" x2="600" y2="100"/>
    <line x1="0" y1="200" x2="600" y2="200"/>
    <line x1="0" y1="300" x2="600" y2="300"/>
    <line x1="150" y1="0" x2="150" y2="400"/>
    <line x1="300" y1="0" x2="300" y2="400"/>
    <line x1="450" y1="0" x2="450" y2="400"/>
  </g>
  <!-- Main Industrial Equipment Illustration -->
  <g transform="translate(180, 80)">
    <!-- Heavy equipment chassis -->
    <rect x="20" y="40" width="200" height="200" rx="12" fill="#122543" stroke="#4A7FA7" stroke-width="4"/>
    <rect x="35" y="55" width="170" height="70" rx="6" fill="#0A1931" stroke="#245284" stroke-width="2"/>
    <!-- Ventilation ribs -->
    <line x1="45" y1="145" x2="195" y2="145" stroke="#4A7FA7" stroke-width="4" stroke-linecap="round"/>
    <line x1="45" y1="165" x2="195" y2="165" stroke="#4A7FA7" stroke-width="4" stroke-linecap="round"/>
    <line x1="45" y1="185" x2="195" y2="185" stroke="#4A7FA7" stroke-width="4" stroke-linecap="round"/>
    <line x1="45" y1="205" x2="195" y2="205" stroke="#4A7FA7" stroke-width="4" stroke-linecap="round"/>
    <!-- Status lights -->
    <circle cx="55" cy="75" r="6" fill="#4CAF50"/>
    <circle cx="75" cy="75" r="6" fill="url(#accent)"/>
    <circle cx="95" cy="75" r="6" fill="#4A7FA7"/>
    <!-- Digital display screen -->
    <rect x="120" y="65" width="70" height="22" rx="3" fill="#0A1931" stroke="#4A7FA7"/>
    <text x="155" y="80" fill="#B3CFE5" font-family="monospace" font-size="11" text-anchor="middle" font-weight="bold">415V 50Hz</text>
    <!-- Heavy Transformer core side -->
    <rect x="225" y="70" width="55" height="140" rx="8" fill="url(#metal)" stroke="#B3CFE5" stroke-width="2"/>
    <line x1="230" y1="90" x2="275" y2="90" stroke="#0A1931" stroke-width="3"/>
    <line x1="230" y1="110" x2="275" y2="110" stroke="#0A1931" stroke-width="3"/>
    <line x1="230" y1="130" x2="275" y2="130" stroke="#0A1931" stroke-width="3"/>
    <line x1="230" y1="150" x2="275" y2="150" stroke="#0A1931" stroke-width="3"/>
    <line x1="230" y1="170" x2="275" y2="170" stroke="#0A1931" stroke-width="3"/>
    <line x1="230" y1="190" x2="275" y2="190" stroke="#0A1931" stroke-width="3"/>
    <!-- High voltage lightning bolt -->
    <polygon points="120,0 95,28 115,28 100,55 145,20 122,20" fill="url(#accent)"/>
  </g>
</svg>`,

  'panels-protection.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1931"/>
      <stop offset="100%" stop-color="#1A3D63"/>
    </linearGradient>
    <linearGradient id="panelBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2EEF8"/>
      <stop offset="100%" stop-color="#B3CFE5"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg2)"/>
  <g transform="translate(150, 60)">
    <!-- Outer Electrical Panel Cabinet -->
    <rect x="0" y="0" width="300" height="260" rx="14" fill="url(#panelBody)" stroke="#4A7FA7" stroke-width="5"/>
    <rect x="15" y="15" width="270" height="230" rx="8" fill="#0A1931"/>
    <!-- Top DIN rail window with clear smoky shield -->
    <rect x="30" y="30" width="240" height="90" rx="6" fill="#1A3D63" opacity="0.8" stroke="#4A7FA7" stroke-width="2"/>
    <!-- Row of Breakers inside -->
    <rect x="45" y="45" width="20" height="60" rx="3" fill="#F6FAFD"/>
    <rect x="49" y="55" width="12" height="15" rx="2" fill="#FF9800"/>
    <rect x="70" y="45" width="20" height="60" rx="3" fill="#F6FAFD"/>
    <rect x="74" y="55" width="12" height="15" rx="2" fill="#1A3D63"/>
    <rect x="95" y="45" width="20" height="60" rx="3" fill="#F6FAFD"/>
    <rect x="99" y="55" width="12" height="15" rx="2" fill="#1A3D63"/>
    <rect x="120" y="45" width="35" height="60" rx="3" fill="#E2EEF8"/>
    <rect x="125" y="60" width="25" height="18" rx="2" fill="#FF5722"/>
    <rect x="160" y="45" width="20" height="60" rx="3" fill="#F6FAFD"/>
    <rect x="164" y="55" width="12" height="15" rx="2" fill="#1A3D63"/>
    <rect x="185" y="45" width="20" height="60" rx="3" fill="#F6FAFD"/>
    <rect x="189" y="55" width="12" height="15" rx="2" fill="#1A3D63"/>
    <rect x="210" y="45" width="20" height="60" rx="3" fill="#F6FAFD"/>
    <rect x="214" y="55" width="12" height="15" rx="2" fill="#4CAF50"/>
    <rect x="235" y="45" width="20" height="60" rx="3" fill="#F6FAFD"/>
    <rect x="239" y="55" width="12" height="15" rx="2" fill="#1A3D63"/>
    <!-- Busbar / Wiring section -->
    <rect x="30" y="140" width="240" height="85" rx="6" fill="#122543" stroke="#245284"/>
    <line x1="50" y1="165" x2="250" y2="165" stroke="#E65100" stroke-width="4"/>
    <line x1="50" y1="180" x2="250" y2="180" stroke="#FFD54F" stroke-width="4"/>
    <line x1="50" y1="195" x2="250" y2="195" stroke="#2196F3" stroke-width="4"/>
    <!-- Key lock & handle -->
    <circle cx="280" cy="130" r="7" fill="#4A7FA7"/>
    <rect x="278" y="127" width="4" height="14" fill="#0A1931"/>
  </g>
</svg>`,

  'wires-cables.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1931"/>
      <stop offset="100%" stop-color="#1A3D63"/>
    </linearGradient>
    <linearGradient id="wood" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C79261"/>
      <stop offset="100%" stop-color="#8D5524"/>
    </linearGradient>
    <linearGradient id="copper" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF8A65"/>
      <stop offset="50%" stop-color="#D84315"/>
      <stop offset="100%" stop-color="#FFAB91"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg3)"/>
  <!-- Cable Reel Drum on left -->
  <g transform="translate(100, 70)">
    <!-- Back flange -->
    <ellipse cx="90" cy="130" rx="65" ry="110" fill="#6D3D14"/>
    <!-- Wound black heavy duty cable drum -->
    <path d="M 90,40 C 130,40 180,60 180,130 C 180,200 130,220 90,220 L 90,40 Z" fill="#1C232B"/>
    <!-- Cable texture lines -->
    <path d="M 110,48 C 145,55 170,85 170,130 C 170,175 145,205 110,212" stroke="#333E4D" stroke-width="6" fill="none"/>
    <path d="M 130,58 C 155,70 165,95 165,130 C 165,165 155,190 130,202" stroke="#12181F" stroke-width="6" fill="none"/>
    <!-- Front wooden flange -->
    <ellipse cx="60" cy="130" rx="55" ry="110" fill="url(#wood)" stroke="#532B0D" stroke-width="3"/>
    <circle cx="60" cy="130" r="22" fill="#0A1931" stroke="#3A1C06" stroke-width="4"/>
    <circle cx="60" cy="130" r="12" fill="#122543"/>
    <!-- Bolt holes -->
    <circle cx="60" cy="60" r="5" fill="#3A1C06"/>
    <circle cx="60" cy="200" r="5" fill="#3A1C06"/>
    <circle cx="35" cy="130" r="5" fill="#3A1C06"/>
    <circle cx="85" cy="130" r="5" fill="#3A1C06"/>
  </g>
  <!-- Multi-core industrial power cables spreading right -->
  <g transform="translate(290, 110)">
    <!-- Black outer sheath stripped back -->
    <path d="M 0,90 Q 60,90 100,70" stroke="#1E293B" stroke-width="32" fill="none" stroke-linecap="round"/>
    <!-- Red phase -->
    <path d="M 90,60 Q 150,20 220,15" stroke="#E53935" stroke-width="12" fill="none"/>
    <circle cx="225" cy="15" r="7" fill="url(#copper)"/>
    <!-- Yellow phase -->
    <path d="M 95,68 Q 160,50 220,55" stroke="#FDD835" stroke-width="12" fill="none"/>
    <circle cx="225" cy="55" r="7" fill="url(#copper)"/>
    <!-- Blue phase -->
    <path d="M 95,78 Q 160,95 220,105" stroke="#1E88E5" stroke-width="12" fill="none"/>
    <circle cx="225" cy="105" r="7" fill="url(#copper)"/>
    <!-- Green/Earth -->
    <path d="M 90,88 Q 150,140 220,155" stroke="#43A047" stroke-width="12" fill="none"/>
    <circle cx="225" cy="155" r="7" fill="url(#copper)"/>
  </g>
</svg>`,

  'lighting-led.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1931"/>
      <stop offset="100%" stop-color="#1A3D63"/>
    </linearGradient>
    <radialGradient id="lightBeam" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#FFF9C4" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#B3CFE5" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg4)"/>
  <!-- Light Glow Beam -->
  <polygon points="300,180 50,380 550,380" fill="url(#lightBeam)" opacity="0.35"/>
  <g transform="translate(160, 60)">
    <!-- Mounting Bracket -->
    <path d="M 20,120 L 5,120 L 5,170 L 275,170 L 275,120 L 260,120" stroke="#4A7FA7" stroke-width="6" fill="none"/>
    <circle cx="20" cy="120" r="8" fill="#B3CFE5"/>
    <circle cx="260" cy="120" r="8" fill="#B3CFE5"/>
    <!-- Heavy Aluminum Heat Sink Fins (top) -->
    <rect x="40" y="50" width="200" height="40" rx="4" fill="#122543" stroke="#4A7FA7" stroke-width="2"/>
    <line x1="55" y1="35" x2="55" y2="50" stroke="#B3CFE5" stroke-width="4"/>
    <line x1="75" y1="35" x2="75" y2="50" stroke="#B3CFE5" stroke-width="4"/>
    <line x1="95" y1="35" x2="95" y2="50" stroke="#B3CFE5" stroke-width="4"/>
    <line x1="115" y1="35" x2="115" y2="50" stroke="#B3CFE5" stroke-width="4"/>
    <line x1="135" y1="35" x2="135" y2="50" stroke="#B3CFE5" stroke-width="4"/>
    <line x1="155" y1="35" x2="155" y2="50" stroke="#B3CFE5" stroke-width="4"/>
    <line x1="175" y1="35" x2="175" y2="50" stroke="#B3CFE5" stroke-width="4"/>
    <line x1="195" y1="35" x2="195" y2="50" stroke="#B3CFE5" stroke-width="4"/>
    <line x1="215" y1="35" x2="215" y2="50" stroke="#B3CFE5" stroke-width="4"/>
    <!-- Main Floodlight Bezel -->
    <rect x="30" y="80" width="220" height="150" rx="10" fill="#1A2634" stroke="#4A7FA7" stroke-width="5"/>
    <!-- Tempered Glass Pane -->
    <rect x="45" y="95" width="190" height="120" rx="6" fill="#0A1931" stroke="#245284" stroke-width="2"/>
    <!-- Matrix of LED chips (SMD Array) -->
    <g fill="#FFF59D">
      <!-- Row 1 -->
      <rect x="65" y="110" width="14" height="14" rx="2"/><rect x="90" y="110" width="14" height="14" rx="2"/><rect x="115" y="110" width="14" height="14" rx="2"/><rect x="140" y="110" width="14" height="14" rx="2"/><rect x="165" y="110" width="14" height="14" rx="2"/><rect x="190" y="110" width="14" height="14" rx="2"/>
      <!-- Row 2 -->
      <rect x="65" y="132" width="14" height="14" rx="2"/><rect x="90" y="132" width="14" height="14" rx="2"/><rect x="115" y="132" width="14" height="14" rx="2"/><rect x="140" y="132" width="14" height="14" rx="2"/><rect x="165" y="132" width="14" height="14" rx="2"/><rect x="190" y="132" width="14" height="14" rx="2"/>
      <!-- Row 3 -->
      <rect x="65" y="154" width="14" height="14" rx="2"/><rect x="90" y="154" width="14" height="14" rx="2"/><rect x="115" y="154" width="14" height="14" rx="2"/><rect x="140" y="154" width="14" height="14" rx="2"/><rect x="165" y="154" width="14" height="14" rx="2"/><rect x="190" y="154" width="14" height="14" rx="2"/>
      <!-- Row 4 -->
      <rect x="65" y="176" width="14" height="14" rx="2"/><rect x="90" y="176" width="14" height="14" rx="2"/><rect x="115" y="176" width="14" height="14" rx="2"/><rect x="140" y="176" width="14" height="14" rx="2"/><rect x="165" y="176" width="14" height="14" rx="2"/><rect x="190" y="176" width="14" height="14" rx="2"/>
    </g>
    <text x="140" y="206" fill="#B3CFE5" font-family="sans-serif" font-size="10" text-anchor="middle" font-weight="bold">INDUSTRIAL LED IP66</text>
  </g>
</svg>`,

  'hardware-accessories.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1931"/>
      <stop offset="100%" stop-color="#1A3D63"/>
    </linearGradient>
    <linearGradient id="brass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFD54F"/>
      <stop offset="50%" stop-color="#FFA000"/>
      <stop offset="100%" stop-color="#FFE082"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg5)"/>
  <g transform="translate(100, 70)">
    <!-- Brass Cable Gland -->
    <g transform="translate(40, 50)">
      <rect x="10" y="20" width="50" height="70" rx="4" fill="url(#brass)" stroke="#C79100" stroke-width="2"/>
      <polygon points="10,20 60,20 50,0 20,0" fill="url(#brass)" stroke="#C79100" stroke-width="2"/>
      <!-- Threading lines -->
      <line x1="15" y1="35" x2="55" y2="35" stroke="#9E6C00" stroke-width="2"/>
      <line x1="15" y1="45" x2="55" y2="45" stroke="#9E6C00" stroke-width="2"/>
      <line x1="15" y1="55" x2="55" y2="55" stroke="#9E6C00" stroke-width="2"/>
      <line x1="15" y1="65" x2="55" y2="65" stroke="#9E6C00" stroke-width="2"/>
      <rect x="0" y="90" width="70" height="30" rx="4" fill="url(#brass)" stroke="#C79100" stroke-width="2"/>
      <!-- Hex nut indents -->
      <circle cx="35" cy="105" r="4" fill="#805600"/>
    </g>
    <!-- Heavy Duty Terminal Lug -->
    <g transform="translate(170, 70)">
      <rect x="0" y="40" width="70" height="25" rx="5" fill="#B3CFE5" stroke="#4A7FA7" stroke-width="2"/>
      <circle cx="95" cy="52" r="28" fill="#B3CFE5" stroke="#4A7FA7" stroke-width="2"/>
      <circle cx="95" cy="52" r="12" fill="#0A1931"/>
    </g>
    <!-- Industrial Switch / Interlock Socket -->
    <g transform="translate(290, 40)">
      <rect x="0" y="0" width="100" height="140" rx="10" fill="#E2EEF8" stroke="#4A7FA7" stroke-width="4"/>
      <circle cx="50" cy="50" r="30" fill="#0A1931" stroke="#FF9800" stroke-width="3"/>
      <!-- Rotary switch bar -->
      <rect x="35" y="44" width="30" height="12" rx="3" fill="#FF9800" transform="rotate(45, 50, 50)"/>
      <rect x="25" y="95" width="50" height="30" rx="4" fill="#0A1931"/>
      <circle cx="38" cy="110" r="4" fill="#FF5722"/>
      <circle cx="50" cy="110" r="4" fill="#4CAF50"/>
      <circle cx="62" cy="110" r="4" fill="#2196F3"/>
    </g>
  </g>
</svg>`,

  'circuit-breakers.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1931"/>
      <stop offset="100%" stop-color="#1A3D63"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg6)"/>
  <g transform="translate(160, 40)">
    <!-- 3-Pole MCB Body -->
    <!-- Pole 1 -->
    <rect x="0" y="20" width="70" height="260" rx="8" fill="#EAF1F8" stroke="#4A7FA7" stroke-width="3"/>
    <rect x="15" y="35" width="40" height="18" rx="3" fill="#1A3D63"/>
    <rect x="20" y="80" width="30" height="40" rx="4" fill="#0A1931"/>
    <rect x="25" y="85" width="20" height="15" rx="3" fill="#2196F3"/>
    <text x="35" y="150" fill="#0A1931" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">C32</text>
    <line x1="15" y1="180" x2="55" y2="180" stroke="#4A7FA7" stroke-width="2"/>
    <rect x="15" y="235" width="40" height="18" rx="3" fill="#1A3D63"/>

    <!-- Pole 2 -->
    <rect x="75" y="20" width="70" height="260" rx="8" fill="#EAF1F8" stroke="#4A7FA7" stroke-width="3"/>
    <rect x="90" y="35" width="40" height="18" rx="3" fill="#1A3D63"/>
    <rect x="95" y="80" width="30" height="40" rx="4" fill="#0A1931"/>
    <rect x="100" y="85" width="20" height="15" rx="3" fill="#2196F3"/>
    <text x="110" y="150" fill="#0A1931" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">C32</text>
    <line x1="90" y1="180" x2="130" y2="180" stroke="#4A7FA7" stroke-width="2"/>
    <rect x="90" y="235" width="40" height="18" rx="3" fill="#1A3D63"/>

    <!-- Pole 3 -->
    <rect x="150" y="20" width="70" height="260" rx="8" fill="#EAF1F8" stroke="#4A7FA7" stroke-width="3"/>
    <rect x="165" y="35" width="40" height="18" rx="3" fill="#1A3D63"/>
    <rect x="170" y="80" width="30" height="40" rx="4" fill="#0A1931"/>
    <rect x="175" y="85" width="20" height="15" rx="3" fill="#2196F3"/>
    <text x="185" y="150" fill="#0A1931" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">C32</text>
    <line x1="165" y1="180" x2="205" y2="180" stroke="#4A7FA7" stroke-width="2"/>
    <rect x="165" y="235" width="40" height="18" rx="3" fill="#1A3D63"/>

    <!-- Interconnected Trip Bridge Tie -->
    <rect x="25" y="83" width="170" height="12" rx="4" fill="#FF9800"/>
    <text x="110" y="215" fill="#4A7FA7" font-family="monospace" font-size="10" text-anchor="middle">10kA 415V~</text>
  </g>
</svg>`,

  'electronic-components.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg7" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1931"/>
      <stop offset="100%" stop-color="#1A3D63"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg7)"/>
  <g transform="translate(130, 60)">
    <!-- PCB Board -->
    <rect x="0" y="0" width="340" height="260" rx="12" fill="#0F2D3D" stroke="#4A7FA7" stroke-width="3"/>
    <!-- PCB Circuit traces -->
    <g stroke="#64FFDA" stroke-width="2" fill="none" opacity="0.65">
      <path d="M 30,30 L 100,30 L 140,70 L 140,110"/>
      <path d="M 30,60 L 80,60 L 110,90 L 110,130"/>
      <path d="M 310,230 L 250,230 L 210,190 L 210,150"/>
      <path d="M 310,200 L 260,200 L 230,170 L 230,140"/>
      <circle cx="30" cy="30" r="4" fill="#64FFDA"/>
      <circle cx="30" cy="60" r="4" fill="#64FFDA"/>
      <circle cx="310" cy="230" r="4" fill="#64FFDA"/>
      <circle cx="310" cy="200" r="4" fill="#64FFDA"/>
    </g>
    <!-- Microcontroller Chip (IC) -->
    <rect x="120" y="80" width="100" height="100" rx="8" fill="#0A1931" stroke="#B3CFE5" stroke-width="2"/>
    <!-- IC Pins -->
    <g fill="#B3CFE5">
      <rect x="105" y="95" width="15" height="4"/><rect x="105" y="110" width="15" height="4"/><rect x="105" y="125" width="15" height="4"/><rect x="105" y="140" width="15" height="4"/><rect x="105" y="155" width="15" height="4"/>
      <rect x="220" y="95" width="15" height="4"/><rect x="220" y="110" width="15" height="4"/><rect x="220" y="125" width="15" height="4"/><rect x="220" y="140" width="15" height="4"/><rect x="220" y="155" width="15" height="4"/>
      <rect x="135" y="65" width="4" height="15"/><rect x="150" y="65" width="4" height="15"/><rect x="165" y="65" width="4" height="15"/><rect x="180" y="65" width="4" height="15"/><rect x="195" y="65" width="4" height="15"/>
      <rect x="135" y="180" width="4" height="15"/><rect x="150" y="180" width="4" height="15"/><rect x="165" y="180" width="4" height="15"/><rect x="180" y="180" width="4" height="15"/><rect x="195" y="180" width="4" height="15"/>
    </g>
    <circle cx="135" cy="95" r="4" fill="#FF9800"/>
    <text x="170" y="135" fill="#E2EEF8" font-family="monospace" font-size="12" text-anchor="middle" font-weight="bold">TECHWAVE</text>
    <text x="170" y="150" fill="#4A7FA7" font-family="monospace" font-size="10" text-anchor="middle">ARM-DSP</text>
    <!-- Cylindrical Capacitors -->
    <circle cx="55" cy="180" r="18" fill="#1A3D63" stroke="#4A7FA7" stroke-width="2"/>
    <line x1="55" y1="162" x2="55" y2="198" stroke="#B3CFE5" stroke-width="4"/>
    <circle cx="280" cy="70" r="16" fill="#1A3D63" stroke="#4A7FA7" stroke-width="2"/>
  </g>
</svg>`,

  'computer-cpu.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg8" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1931"/>
      <stop offset="100%" stop-color="#1A3D63"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD54F"/>
      <stop offset="100%" stop-color="#FF8F00"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg8)"/>
  <g transform="translate(175, 75)">
    <!-- CPU Substrate PCB green/blue -->
    <rect x="0" y="0" width="250" height="250" rx="16" fill="#0D3B52" stroke="#4A7FA7" stroke-width="4"/>
    <!-- Gold edge alignment arrow -->
    <polygon points="12,12 30,12 12,30" fill="url(#gold)"/>
    <!-- Integrated Heat Spreader (IHS) Metal Lid -->
    <rect x="35" y="35" width="180" height="180" rx="10" fill="#1E2A38" stroke="#B3CFE5" stroke-width="3"/>
    <rect x="50" y="50" width="150" height="150" rx="6" fill="#122543"/>
    <!-- Laser markings -->
    <polygon points="125,70 105,100 120,100 110,125 145,95 125,95" fill="url(#gold)"/>
    <text x="125" y="148" fill="#F6FAFD" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">INDUSTRIAL CPU</text>
    <text x="125" y="168" fill="#B3CFE5" font-family="monospace" font-size="11" text-anchor="middle">CORE-TECH v4.8</text>
    <text x="125" y="186" fill="#4A7FA7" font-family="monospace" font-size="9" text-anchor="middle">EMBEDDED AUTOMATION</text>
  </g>
</svg>`,

  'power-control.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg9" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1931"/>
      <stop offset="100%" stop-color="#1A3D63"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg9)"/>
  <g transform="translate(110, 60)">
    <!-- Heavy Duty Contactor / Relay -->
    <g transform="translate(30, 20)">
      <rect x="0" y="0" width="140" height="220" rx="10" fill="#1B2838" stroke="#4A7FA7" stroke-width="4"/>
      <!-- Top terminals -->
      <rect x="15" y="10" width="25" height="30" rx="3" fill="#E2EEF8"/>
      <rect x="55" y="10" width="25" height="30" rx="3" fill="#E2EEF8"/>
      <rect x="95" y="10" width="25" height="30" rx="3" fill="#E2EEF8"/>
      <line x1="27" y1="20" x2="27" y2="30" stroke="#0A1931" stroke-width="2"/>
      <line x1="67" y1="20" x2="67" y2="30" stroke="#0A1931" stroke-width="2"/>
      <line x1="107" y1="20" x2="107" y2="30" stroke="#0A1931" stroke-width="2"/>
      <!-- Center armature indicator window -->
      <rect x="25" y="65" width="90" height="70" rx="6" fill="#0A1931" stroke="#245284" stroke-width="2"/>
      <rect x="45" y="85" width="50" height="30" rx="4" fill="#FF9800"/>
      <!-- Bottom terminals -->
      <rect x="15" y="175" width="25" height="30" rx="3" fill="#E2EEF8"/>
      <rect x="55" y="175" width="25" height="30" rx="3" fill="#E2EEF8"/>
      <rect x="95" y="175" width="25" height="30" rx="3" fill="#E2EEF8"/>
      <text x="70" y="155" fill="#B3CFE5" font-family="sans-serif" font-size="10" text-anchor="middle" font-weight="bold">CONTACTOR 3P</text>
    </g>
    <!-- Pushbutton Control Station -->
    <g transform="translate(210, 40)">
      <rect x="0" y="0" width="120" height="190" rx="12" fill="#EAF1F8" stroke="#4A7FA7" stroke-width="4"/>
      <!-- Emergency Stop Button (Red Mushroom) -->
      <circle cx="60" cy="55" r="30" fill="#D32F2F" stroke="#B71C1C" stroke-width="3"/>
      <circle cx="60" cy="55" r="16" fill="#EF5350"/>
      <!-- Green Start Button -->
      <circle cx="60" cy="135" r="24" fill="#2E7D32" stroke="#1B5E20" stroke-width="3"/>
      <polygon points="54,124 72,135 54,146" fill="#FFFFFF"/>
    </g>
  </g>
</svg>`,

  'installation-materials.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bg10" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1931"/>
      <stop offset="100%" stop-color="#1A3D63"/>
    </linearGradient>
    <linearGradient id="galv" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2EEF8"/>
      <stop offset="50%" stop-color="#B3CFE5"/>
      <stop offset="100%" stop-color="#9BBFD6"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg10)"/>
  <g transform="translate(100, 70)">
    <!-- Perforated Galvanized Cable Tray perspective -->
    <path d="M 20,150 L 320,50 L 380,80 L 80,180 Z" fill="url(#galv)" stroke="#4A7FA7" stroke-width="2"/>
    <path d="M 20,150 L 20,185 L 80,215 L 80,180 Z" fill="#789CB5" stroke="#4A7FA7" stroke-width="2"/>
    <path d="M 80,215 L 380,115 L 380,80 L 80,180 Z" fill="#A8C7DB" stroke="#4A7FA7" stroke-width="2"/>
    <!-- Perforations in cable tray -->
    <ellipse cx="90" cy="145" rx="6" ry="12" fill="#0A1931" transform="rotate(-30, 90, 145)"/>
    <ellipse cx="130" cy="130" rx="6" ry="12" fill="#0A1931" transform="rotate(-30, 130, 130)"/>
    <ellipse cx="170" cy="115" rx="6" ry="12" fill="#0A1931" transform="rotate(-30, 170, 115)"/>
    <ellipse cx="210" cy="100" rx="6" ry="12" fill="#0A1931" transform="rotate(-30, 210, 100)"/>
    <ellipse cx="250" cy="85" rx="6" ry="12" fill="#0A1931" transform="rotate(-30, 250, 85)"/>
    <!-- Heavy Duty Junction Box -->
    <g transform="translate(240, 120)">
      <rect x="0" y="0" width="130" height="110" rx="10" fill="#EAF1F8" stroke="#4A7FA7" stroke-width="4"/>
      <!-- Corner screws -->
      <circle cx="15" cy="15" r="5" fill="#4A7FA7"/>
      <circle cx="115" cy="15" r="5" fill="#4A7FA7"/>
      <circle cx="15" cy="95" r="5" fill="#4A7FA7"/>
      <circle cx="115" cy="95" r="5" fill="#4A7FA7"/>
      <!-- Conduit entry holes -->
      <circle cx="65" cy="55" r="22" fill="#0A1931" stroke="#FF9800" stroke-width="3"/>
      <rect x="58" y="2" width="14" height="8" rx="2" fill="#4A7FA7"/>
      <rect x="58" y="100" width="14" height="8" rx="2" fill="#4A7FA7"/>
    </g>
  </g>
</svg>`
};

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(outDir, filename), content.trim());
  console.log('Wrote', filename);
}
