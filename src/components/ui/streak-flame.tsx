import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

interface StreakFlameProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StreakFlame({ streak, size = 'md', className }: StreakFlameProps) {
  const sizeClasses = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-1.5',
    lg: 'text-base gap-2',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const isActive = streak > 0;

  return (
    <div
      className={cn(
        "inline-flex items-center font-bold",
        sizeClasses[size],
        className
      )}
    >
      <Flame
        className={cn(
          iconSizes[size],
          isActive ? "text-accent fill-accent animate-pulse" : "text-muted-foreground"
        )}
      />
      <span className={isActive ? "text-accent" : "text-muted-foreground"}>
        {streak} day{streak !== 1 ? 's' : ''}
      </span>
    </div>
  );
}
