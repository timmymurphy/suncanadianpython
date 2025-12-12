import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useCourses } from '@/hooks/useCourses';
import { useUserProgress } from '@/hooks/useProgress';
import { Navbar } from '@/components/layout/Navbar';
import { CourseCard } from '@/components/cards/CourseCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LevelBadge, getLevelTitle } from '@/components/ui/level-badge';
import { StreakFlame } from '@/components/ui/streak-flame';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Zap, Trophy, Target } from 'lucide-react';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const { data: courses } = useCourses();
  const { data: progress } = useUserProgress();

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  if (!profile) return null;

  const xpToNextLevel = ((profile.level) * 100) - profile.xp_points;
  const levelProgress = ((profile.xp_points % 100) / 100) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {profile.username}! 👋</h1>
          <p className="text-muted-foreground">Ready to continue your Python journey?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="gradient-card">
            <CardContent className="p-4 flex items-center gap-4">
              <ProgressRing progress={levelProgress} size={60}>
                <LevelBadge level={profile.level} size="sm" />
              </ProgressRing>
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="font-bold">{getLevelTitle(profile.level)}</p>
                <p className="text-xs text-muted-foreground">{xpToNextLevel} XP to next</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total XP</p>
                <p className="text-2xl font-bold">{profile.xp_points}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                <StreakFlame streak={profile.current_streak} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{profile.current_streak} days</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lessons Done</p>
                <p className="text-2xl font-bold">{progress?.filter(p => p.completed).length || 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Continue Learning</h2>
            <Button variant="ghost" asChild>
              <Link to="/courses">View All →</Link>
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses?.slice(0, 3).map((course) => (
              <CourseCard 
                key={course.id} 
                course={course}
                totalLessons={4}
                lessonsCompleted={0}
                progress={0}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/leaderboard">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl gradient-accent flex items-center justify-center">
                  <Trophy className="h-7 w-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-bold group-hover:text-primary transition-colors">Leaderboard</h3>
                  <p className="text-sm text-muted-foreground">See how you rank against others</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/achievements">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl gradient-hero flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="font-bold group-hover:text-primary transition-colors">Achievements</h3>
                  <p className="text-sm text-muted-foreground">View your badges and progress</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
