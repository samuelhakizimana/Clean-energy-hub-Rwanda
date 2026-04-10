import * as React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden', className)} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 border-bottom border-gray-50', className)} {...props}>{children}</div>
);

export const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6', className)} {...props}>{children}</div>
);

export const CardFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 bg-gray-50/50 border-top border-gray-50', className)} {...props}>{children}</div>
);
