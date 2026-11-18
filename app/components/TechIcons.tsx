import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const TechIcons: Record<string, React.FC<IconProps>> = {
  // ── FRONTEND ──
  React: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 115.3 100" className={className} fill="none">
      <ellipse cx="57.65" cy="50" rx="55.65" ry="21.5" stroke="#61DAFB" strokeWidth="6" transform="rotate(30 57.65 50)" />
      <ellipse cx="57.65" cy="50" rx="55.65" ry="21.5" stroke="#61DAFB" strokeWidth="6" transform="rotate(90 57.65 50)" />
      <ellipse cx="57.65" cy="50" rx="55.65" ry="21.5" stroke="#61DAFB" strokeWidth="6" transform="rotate(150 57.65 50)" />
      <circle cx="57.65" cy="50" r="10.5" fill="#61DAFB" />
    </svg>
  ),

  'Next.js': ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 180 180" className={className} fill="none">
      <mask id="mask-next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: 'alpha' }}>
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#mask-next)">
        <circle cx="90" cy="90" r="90" fill="#000000" stroke="#333333" strokeWidth="6" />
        <path d="M149.508 157.438L69.147 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="url(#paint0_linear_next)" />
        <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_next)" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_next" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_next" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),

  TypeScript: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="16" fill="#3178C6" />
      <path d="M72.2 46.5h33.8v9H89v45h-10.2v-45h-6.6v-9zm-29.4 9v45H32.6v-45H21.2v-9h33.8v9H42.8z" fill="#FFFFFF" />
      <path d="M85 86.8c1.8 1.4 4.2 2.2 6.8 2.2 4 0 6.5-1.9 6.5-4.8 0-7.8-19.8-3.7-19.8-19.4 0-7.7 6.1-13.8 16.5-13.8 5.6 0 9.8 1.5 13.1 4l-4 6.7c-2.4-1.8-5.3-2.9-8.9-2.9-4.8 0-6.7 2.4-6.7 4.7 0 7.8 19.8 4 19.8 19.5 0 8.3-6.5 14-17.2 14-6.6 0-11.8-1.9-15.6-4.9l4.3-6.9z" fill="#FFFFFF" />
    </svg>
  ),

  'Tailwind CSS': ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 54 33" className={className} fill="#38BDF8">
      <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
    </svg>
  ),

  'HTML/CSS': ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      {/* HTML badge */}
      <path d="M6 8l5 40 18 5 18-5 5-40H6z" fill="#E44D26" />
      <path d="M29 12v38l14.5-4 4-34H29z" fill="#F16529" />
      <path d="M15 18h28l-.7 6H29v5h12.5l-1 11-11.5 3.2V37l6-1.7.4-5.3H21l-1-12zm0 0" fill="#EBEBEB" />
      <path d="M29 18v6h12.5l-.4 5H29v6h6.8l-.4 5.2-6.4 1.7V48l11.5-3.2 1-11H29v-5h13.3l.7-6H29z" fill="#FFFFFF" />
    </svg>
  ),

  JavaScript: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      <rect width="64" height="64" rx="8" fill="#F7DF1E" />
      <path d="M37.3 46.2c1.4 2.3 3.3 3.9 6.7 3.9 2.8 0 4.6-1.4 4.6-3.4 0-2.4-1.9-3.2-5.2-4.7l-1.8-.8c-5.1-2.2-8.5-5-8.5-10.9 0-5.4 4.2-9.6 10.7-9.6 4.7 0 8.1 1.7 10.3 5.7l-4.9 3.1c-1.1-2-2.4-2.8-5.3-2.8-2.5 0-4.1 1.6-4.1 3.4 0 2.2 1.6 3.1 4.7 4.4l1.8.8c6 2.6 9.2 5.3 9.2 11.2 0 6.4-5 10.2-11.6 10.2-6.4 0-10.4-3.2-12.3-7.3l5.7-3.2zm-21.4 1.2c1 1.8 2.3 3.3 4.9 3.3 2.6 0 4.2-1.3 4.2-6.2V21.4h6.3v23c0 8.5-4.8 12.3-11.4 12.3-5.3 0-8.9-2.8-10.7-6.5l6.7-2.8z" fill="#000000" />
    </svg>
  ),

  Bootstrap: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="24" fill="#7952B3" />
      <path d="M42 32h27.4c7.6 0 13.4 1.8 17.5 5.4 3.9 3.4 5.9 8.2 5.9 14.1 0 4.7-1.3 8.7-3.8 11.8-2.5 3.1-6.1 5.3-10.7 6.4 5.6 1.1 9.9 3.6 12.8 7.3s4.4 8.5 4.4 14.4c0 6.6-2.3 11.9-6.8 15.9-4.5 4-10.7 6-18.7 6H42V32zm16 28h11.2c3.7 0 6.4-.8 8.1-2.4 1.8-1.6 2.7-4 2.7-7.2 0-3.3-.9-5.7-2.6-7.3s-4.3-2.3-7.8-2.3H58V60zm0 40.8h13.2c4.1 0 7.2-.9 9.2-2.7 2-1.8 3-4.5 3-8.1 0-3.5-1-6.2-3-8-2-1.8-5.2-2.7-9.5-2.7H58v21.5z" fill="#FFFFFF" />
    </svg>
  ),

  // ── BACKEND ──
  'Node.js': ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <path d="M64 4l52 30v60L64 124 12 94V34L64 4z" fill="#339933" />
      <path d="M64 10l46 27v53L64 117 18 90V37L64 10z" fill="#026E00" />
      <path d="M64 26l32 19v38L64 102 32 83V45l32-19z" fill="#FFFFFF" />
      <path d="M64 36L44 48v23l20 12 20-12V48L64 36z" fill="#339933" />
    </svg>
  ),

  Python: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <path d="M63.2 4.4c-28.7 0-26.9 12.4-26.9 12.4l.1 12.9h27.4v3.9H26.3S8.8 31.6 8.8 60.5c0 28.8 15.3 27.7 15.3 27.7h9.1V75.4s-.5-15.3 15-15.3h25.8s14.4.2 14.4-13.9V20s1.8-15.6-25.2-15.6zm-14.7 8.3a4.4 4.4 0 110 8.8 4.4 4.4 0 010-8.8z" fill="#3776AB" />
      <path d="M64.8 123.6c28.7 0 26.9-12.4 26.9-12.4l-.1-12.9H64.2v-3.9h37.5s17.5 2 17.5-26.9c0-28.8-15.3-27.7-15.3-27.7h-9.1v12.8s.5 15.3-15 15.3H44s-14.4-.2-14.4 13.9V108s-1.8 15.6 25.2 15.6zm14.7-8.3a4.4 4.4 0 110-8.8 4.4 4.4 0 010 8.8z" fill="#FFD438" />
    </svg>
  ),

  'Express.js': ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="16" fill="#1e1e24" stroke="#44444e" strokeWidth="4" />
      <text x="64" y="74" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="bold" fontSize="32" letterSpacing="1">
        ex
      </text>
    </svg>
  ),

  PostgreSQL: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <path d="M64 8C33.1 8 8 33.1 8 64s25.1 56 56 56 56-25.1 56-56S94.9 8 64 8z" fill="#336791" />
      <path d="M89.7 54.5c-1-8.5-5.2-16.1-12-21.4-6.4-5-14.5-7.7-22.7-7.7-17.7 0-32.9 12.4-36.4 29.8-3.4 16.7 4.9 33.4 20.3 40.5 4.9 2.3 10.3 3.5 15.7 3.5 13.6 0 26.1-7.4 32.6-19.4l-7.9-4.2c-4.6 8.5-13.4 13.7-23.1 13.7-4 0-7.9-.9-11.5-2.6-11.4-5.3-17.5-17.7-14.9-30 2.6-12.7 13.7-21.8 26.6-21.8 6.1 0 12 2 16.8 5.7 5 3.9 8 9.5 8.7 15.7l7.8-1.8z" fill="#FFFFFF" />
    </svg>
  ),

  MongoDB: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <path d="M64 4s-2.8 3.5-6.5 14.1C51.6 34.6 44 60.1 44 76.5c0 19.3 12.3 35.5 20 47.5 7.7-12 20-28.2 20-47.5 0-16.4-7.6-41.9-13.5-58.4C66.8 7.5 64 4 64 4z" fill="#47A248" />
      <path d="M64 4v120c7.7-12 20-28.2 20-47.5 0-16.4-7.6-41.9-13.5-58.4C66.8 7.5 64 4 64 4z" fill="#499D4A" />
      <path d="M64 96.5c-.3 0-.7-.1-1-.3-1.6-.9-2.5-2.6-2.5-4.4V68.3c0-1.8.9-3.5 2.5-4.4.6-.3 1.3-.4 2-.4s1.4.1 2 .4c1.6.9 2.5 2.6 2.5 4.4v23.5c0 1.8-.9 3.5-2.5 4.4-.5.2-1 .3-1.5.3z" fill="#FFFFFF" />
    </svg>
  ),

  PHP: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <ellipse cx="64" cy="64" rx="58" ry="34" fill="#777BB4" />
      <path d="M30.6 52.8h11.2c4.4 0 7.3.7 8.8 2.2 1.5 1.5 2 3.8 1.4 7-.6 3.2-2.1 5.6-4.5 7.1-2.4 1.5-6.1 2.3-11.2 2.3h-4.3l-2.4 11.8H21l6.7-30.4h2.9zm3.8 6.4l-1.6 7.6h4.8c2.4 0 4.1-.3 5.1-1 .9-.7 1.6-1.8 1.9-3.3.4-1.6.1-2.5-.7-2.9-.8-.4-2.3-.4-4.5-.4h-5zm22.4-6.4h8l-3.3 14.8h.3c1.6-2.5 3.3-4.3 5.3-5.5 2-1.2 4.3-1.8 6.9-1.8 3.5 0 6 1.1 7.4 3.3 1.4 2.2 1.8 5.6 1.1 10.1l-2.1 9.5H72l2-9.1c.5-2.2.4-3.8-.3-4.8-.7-1-2-1.5-3.8-1.5-1.7 0-3.3.6-4.7 1.8-1.4 1.2-2.5 3.2-3.3 5.8l-1.7 7.8h-7.9l6.5-30.4zm34.2 0h11.2c4.4 0 7.3.7 8.8 2.2 1.5 1.5 2 3.8 1.4 7-.6 3.2-2.1 5.6-4.5 7.1-2.4 1.5-6.1 2.3-11.2 2.3h-4.3l-2.4 11.8h-8.1l6.7-30.4h2.4zm3.8 6.4l-1.6 7.6h4.8c2.4 0 4.1-.3 5.1-1 .9-.7 1.6-1.8 1.9-3.3.4-1.6.1-2.5-.7-2.9-.8-.4-2.3-.4-4.5-.4h-5z" fill="#FFFFFF" />
    </svg>
  ),

  Laravel: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <path d="M64 8l48 28v56L64 120 16 92V36L64 8z" fill="#FF2D20" />
      <path d="M42 45l22 13-22 13V45zm22 13l22-13v26L64 84V58zm0 26l22-13v26L64 110V84z" fill="#FFFFFF" />
    </svg>
  ),

  MySQL: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="16" fill="#00758F" />
      <path d="M28 84l18-42h10l8 24 8-24h10l18 42h-11l-4-11H67l-3 11H52l-3-11H39l-4 11H28zm14-19h10l-5-15-5 15zm28 0h10l-5-15-5 15z" fill="#F29111" />
      <path d="M84 40c4 0 8 4 8 8s-4 8-8 8-8-4-8-8 4-8 8-8z" fill="#FFFFFF" />
    </svg>
  ),

  'NextAuth/Auth.js': ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#7C3AED" />
      <path d="M64 24L32 40v28c0 24 16 38 32 44 16-6 32-20 32-44V40L64 24z" fill="#FFFFFF" />
      <path d="M64 50c-6.6 0-12 5.4-12 12 0 4.8 2.8 9 7 10.9V82h10v-9.1c4.2-1.9 7-6.1 7-10.9 0-6.6-5.4-12-12-12z" fill="#7C3AED" />
    </svg>
  ),

  Java: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <path d="M51.8 100.8c-10.4-1.6-17.7-6.8-17.7-12.8 0-4.3 3.8-8.2 10.3-10.6-2.5 3.6-1.5 7.6 2.7 10.5 4.3 2.9 10.8 4.4 18.2 4.4 11.2 0 20.4-3.5 20.4-8.8 0-1.8-.7-3.4-2.1-4.8 4.1 2.3 6.6 5.4 6.6 8.7 0 6.9-9.8 12.8-23.7 14-4.8.4-9.8.4-14.7-.6z" fill="#5382A1" />
      <path d="M78.6 68.4c5.8 4.2 11.2 12.4 1.2 21.6 8.2-4.4 13.4-11.8 9.6-17.4-3-4.4-10.8-4.2-10.8-4.2zM64 16c3 6.8-3.4 12.8-3.4 12.8 9.8-10.4 4.8-18.8 3.4-12.8z" fill="#E76F00" />
      <path d="M45.6 56.4s-10.2 4.6-2.2 14.4c5.2 6.4 15.6 6.8 19.6 1.8 3.8-4.8 1.4-9.4-3.8-11.4-6.4-2.4-13.6-4.8-13.6-4.8z" fill="#5382A1" />
      <path d="M71.4 34.2c6.2 7.4-4.8 17.6-4.8 17.6 13.6-11.4 11.4-21.4 4.8-17.6z" fill="#E76F00" />
    </svg>
  ),

  // ── TOOLS & PLATFORMS ──
  Git: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <path d="M125.4 57.6L70.4 2.6c-3.5-3.5-9.1-3.5-12.6 0L45.4 15 61 30.6c3.7-1.3 8.1-.4 11 2.6 2.9 2.9 3.8 7.3 2.6 11l15.1 15.1c3.7-1.3 8.1-.4 11 2.6 4.1 4.1 4.1 10.8 0 14.9s-10.8 4.1-14.9 0c-3.1-3.1-3.9-7.7-2.3-11.5L69.6 51.3v34.4c1.6 1 3 2.5 3.9 4.3 3.1 6.1.7 13.6-5.4 16.7s-13.6.7-16.7-5.4c-3.1-6.1-.7-13.6 5.4-16.7 2.4-1.2 5.1-1.6 7.6-1.1V49.2c-2.5.5-5.2.1-7.6-1.1-3.9-2-6.2-6-6-10.3L34.9 23.4 2.6 55.7c-3.5 3.5-3.5 9.1 0 12.6l55 55c3.5 3.5 9.1 3.5 12.6 0l55.2-55.2c3.5-3.4 3.5-9-.1-12.5z" fill="#F05032" />
    </svg>
  ),

  Docker: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <path d="M123.6 53.6c-2.8-1.9-9.1-3.3-14.1-1.3-.8-5.9-4.8-10.9-10.7-13.4l-3.3-1.4-2.1 3c-5.4 7.6-5.7 17.5-1.2 25.5-3.5 2-8 3.3-13.3 3.3H7.5c-4 0-7.3 3.3-7.3 7.3 0 16 6.8 31.4 18.8 42.1 13.4 12 31.3 18.6 49.9 18.6 37.4 0 69.8-24.8 77.4-60.6 6.3-.5 12.7-3.9 15.6-9.7l2.1-4.2-6.4-1.8zM42.2 40.7h14.1v14.1H42.2V40.7zm0-18.8h14.1V36H42.2V21.9zm-18.8 0h14.1V36H23.4V21.9zm0 18.8h14.1v14.1H23.4V40.7zm18.8 37.5H23.4V64.1h18.8v14.1zm18.7-18.7H42.2V64.1h18.7v14.1zm0-18.8H60.9V40.7h18.8v14.1zm18.8 0H79.7V40.7h18.8v14.1z" fill="#2496ED" />
    </svg>
  ),

  AWS: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="16" fill="#232F3E" />
      <path d="M38.8 61.2c0 2.8.5 5 1.5 6.6 1 1.6 2.5 2.4 4.5 2.4 1.8 0 3.3-.8 4.4-2.3 1.1-1.5 1.7-3.7 1.7-6.5v-18h7v18.7c0 4.6-1.2 8.3-3.6 11-2.4 2.7-5.9 4-10.4 4-4.2 0-7.4-1.2-9.7-3.7-2.3-2.5-3.5-5.9-3.5-10.2V43.4h7v17.8zm33.8 15.4l-7.7-26.6h7.3l4.6 19.3 4.8-19.3h6.5l4.8 19.3 4.6-19.3h7.2L97 76.6h-6.8l-4.7-18.4-4.7 18.4h-6.8zm-44.5 15c21.8 9.8 48.2 9.8 70 0l2 4c-23.2 10.4-50.8 10.4-74 0l2-4z" fill="#FF9900" />
      <path d="M102 91l5.5 3.5-4-5.5-1.5 2z" fill="#FF9900" />
    </svg>
  ),

  Vercel: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="16" fill="#000000" stroke="#333333" strokeWidth="4" />
      <path d="M64 24L104 96H24L64 24z" fill="#FFFFFF" />
    </svg>
  ),

  Figma: ({ className = 'w-6 h-6', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <path d="M44 64c0-11 9-20 20-20h20v20H64c-11 0-20-9-20-20z" fill="#0ACF83" />
      <path d="M44 104c0-11 9-20 20-20v20c0 11-9 20-20 20s-20-9-20-20h20z" fill="#A259FF" />
      <path d="M64 24v20H44c0-11 9-20 20-20h20v20H64z" fill="#F24E1E" />
      <path d="M64 24h20c11 0 20 9 20 20s-9 20-20 20H64V24z" fill="#FF7262" />
      <path d="M84 64c11 0 20 9 20 20s-9 20-20 20-20-9-20-20h20z" fill="#1ABCFE" />
    </svg>
  ),
};
