import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAchievements, useUserAchievements } from '@/hooks/useAchievements';
import { Navbar } from '@/components/layout/Navbar';
import { AchievementCard } from '@/components/cards/AchievementCard';

export default function Achievements() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: achievements } = useAchievements();
  const { data: userAchievements } = useUserAchievements();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  const earnedIds = new Set(userAchievements?.map(ua => ua.achievement_id) || []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Achievements</h1>
        <p className="text-muted-foreground mb-8">
          {userAchievements?.length || 0} of {achievements?.length || 0} earned
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements?.map((achievement) => {
            const userAchievement = userAchievements?.find(ua => ua.achievement_id === achievement.id);
            return (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                isEarned={earnedIds.has(achievement.id)}
                earnedAt={userAchievement?.earned_at}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
