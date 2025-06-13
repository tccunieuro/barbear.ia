
import React from 'react';
import { Scissors } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-primary to-primary-600 rounded-xl shadow-lg ${className}`}>
      <div className={`bg-white p-2 rounded-lg ${sizeClasses[size]} flex items-center justify-center`}>
        <Scissors className="h-6 w-6 text-primary" />
      </div>
    </div>
  );
};
