import { Card, CardContent } from '@/components/ui/card';
import { XPBadge } from '@/components/ui/xp-badge';
import { Achievement } from '@/hooks/useAchievements';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  isEarned?: boolean;
  earnedAt?: string;
}

export function AchievementCard({ achievement, isEarned = false, earnedAt }: AchievementCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-300",
        isEarned 
          ? "border-accent/50 bg-accent/5" 
          : "opacity-60 grayscale"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div 
            className={cn(
              "relative text-4xl flex-shrink-0",
              isEarned && "animate-bounce-in"
            )}
          >
            {achievement.icon}
            {!isEarned && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold">{achievement.name}</h4>
            <p className="text-sm text-muted-foreground mt-0.5">
              {achievement.description}
            </p>
            {isEarned && earnedAt && (
              <p className="text-xs text-success mt-2">
                Earned {new Date(earnedAt).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* XP */}
          <XPBadge amount={achievement.xp_reward} size="sm" />
        </div>
      </CardContent>
    </Card>
  );
}
