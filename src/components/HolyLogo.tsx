import React from 'react';
import { QuickSipLogo } from './QuickSipLogo';

interface HolyLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'outline' | 'black' | 'white';
}

export const HolyLogo: React.FC<HolyLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  return <QuickSipLogo className={className} size={size === 'xl' ? 'xl' : size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'} />;
};
