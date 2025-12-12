import { cn } from '@/lib/utils';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const levelTitles: Record<number, string> = {
  1: 'Python Newbie',
  2: 'Code Curious',
  3: 'Syntax Learner',
  4: 'Logic Builder',
  5: 'Function Finder',
  6: 'Loop Master',
  7: 'Data Wrangler',
  8: 'Object Thinker',
  9: 'Module Maven',
  10: 'Python Pro',
};

export function getLevelTitle(level: number): string {
  if (level >= 10) return 'Python Pro';
  return levelTitles[level] || `Level ${level}`;
}

export function LevelBadge({ level, size = 'md', className }: LevelBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs h-6 w-6',
    md: 'text-sm h-8 w-8',
    lg: 'text-lg h-12 w-12',
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center font-bold rounded-full",
        "gradient-hero text-primary-foreground",
        sizeClasses[size],
        className
      )}
    >
      {level}
    </div>
  );
}
