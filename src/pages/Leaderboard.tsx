import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLeaderboard, useProfile } from '@/hooks/useProfile';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LevelBadge } from '@/components/ui/level-badge';
import { cn } from '@/lib/utils';

export default function Leaderboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: leaders } = useLeaderboard();
  const { data: profile } = useProfile();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Leaderboard</h1>
        <p className="text-muted-foreground mb-8 text-center">Top Python learners</p>

        <div className="space-y-3">
          {leaders?.map((leader, index) => (
            <Card 
              key={leader.id}
              className={cn(
                "transition-all",
                leader.user_id === user?.id && "border-primary/50 bg-primary/5"
              )}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-8 text-center font-bold text-lg">
                  {index < 3 ? medals[index] : index + 1}
                </div>
                <Avatar>
                  <AvatarImage src={leader.avatar_url || undefined} />
                  <AvatarFallback>{leader.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{leader.username}</p>
                  <p className="text-sm text-muted-foreground">{leader.xp_points} XP</p>
                </div>
                <LevelBadge level={leader.level} />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
