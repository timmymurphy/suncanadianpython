import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface XPBadgeProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

export function XPBadge({ amount, size = 'md', className, animate = false }: XPBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div
      className={cn(
        "inline-flex items-center font-bold rounded-full",
        "bg-secondary/20 text-secondary border border-secondary/30",
        sizeClasses[size],
        animate && "animate-bounce-in",
        className
      )}
    >
      <Zap className={cn(iconSizes[size], "fill-current")} />
      <span>+{amount} XP</span>
    </div>
  );
}
