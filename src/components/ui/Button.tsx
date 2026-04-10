import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-[#00A1DE] text-white hover:bg-[#0081B2] active:scale-95',
      secondary: 'bg-[#FAD201] text-[#141414] hover:bg-[#D4B201] active:scale-95',
      outline: 'border-2 border-[#00A1DE] text-[#00A1DE] hover:bg-[#00A1DE]/10 active:scale-95',
      ghost: 'text-[#141414] hover:bg-gray-100 active:scale-95',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5 font-medium',
      lg: 'px-8 py-3.5 text-lg font-bold',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
