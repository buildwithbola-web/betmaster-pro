import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 32 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" /> {/* Green */}
          <stop offset="50%" stopColor="#3b82f6" /> {/* Blue */}
          <stop offset="100%" stopColor="#a855f7" /> {/* Purple */}
        </linearGradient>
        <linearGradient id="diamond-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>

      {/* Top Diamond */}
      <path 
        d="M50 15 L58 23 L50 31 L42 23 Z" 
        fill="url(#diamond-gradient)" 
      />

      {/* Inner Chevron under Diamond */}
      <path 
        d="M40 33 L50 43 L60 33 L55 33 L50 38 L45 33 Z" 
        fill="#22c55e" 
        stroke="#22c55e"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main 'M' Shape */}
      <path 
        d="M20 70 V35 C20 30, 25 30, 25 35 L50 55 L75 35 C75 30, 80 30, 80 35 V70 C80 75, 75 75, 75 70 L60 55 C60 50, 55 50, 50 55 C45 50, 40 50, 40 55 L25 70 C25 75, 20 75, 20 70 Z" 
        fill="none" 
        stroke="url(#logo-gradient)" 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;
