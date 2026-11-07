import React, { useState } from 'react';
import quickSipLogoImg from '../assets/images/regenerated_image_1794024924986.png';

interface QuickSipLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'badge' | 'text-only' | 'badge-compact';
  theme?: 'black' | 'yellow';
}

export const QuickSipLogo: React.FC<QuickSipLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'badge',
  theme = 'black',
}) => {
  const defaultSrc = quickSipLogoImg || (theme === 'black' ? '/quicksip-logo-black.svg' : '/quicksip-logo.svg');
  const [imgSrc, setImgSrc] = useState(defaultSrc);

  const sizeMap = {
    xs: 'h-6 w-auto max-w-[120px]',
    sm: 'h-8 w-auto max-w-[140px]',
    md: 'h-10 sm:h-12 w-auto max-w-[170px]',
    lg: 'h-13 sm:h-16 w-auto max-w-[210px]',
    xl: 'h-16 sm:h-20 w-auto max-w-[260px]',
    '2xl': 'h-24 sm:h-28 w-auto max-w-[320px]',
  };

  if (variant === 'text-only') {
    return (
      <div className={`inline-flex items-center font-black italic tracking-tighter ${className}`}>
        <span className="text-xl sm:text-2xl font-black italic tracking-tighter transform -skew-x-6">
          <span className="text-white">QUICK</span>
          <span className="text-black bg-[#ffe600] px-1.5 py-0.5 ml-1 rounded">SIP</span>
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center select-none transition-transform hover:scale-105 active:scale-95 ${className}`}>
      <img
        src={imgSrc}
        onError={() => {
          if (imgSrc !== '/quicksip-logo-black.svg') {
            setImgSrc('/quicksip-logo-black.svg');
          }
        }}
        alt="QuickSip Logo"
        className={`${sizeMap[size]} object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]`}
      />
    </div>
  );
};

