import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCourse, useLessons } from '@/hooks/useCourses';
import { useUserProgress } from '@/hooks/useProgress';
import { Navbar } from '@/components/layout/Navbar';
import { LessonCard } from '@/components/cards/LessonCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

export default function CourseDetail() {
  const { courseId } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: course } = useCourse(courseId);
  const { data: lessons } = useLessons(courseId);
  const { data: progress } = useUserProgress();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  if (!course) return null;

  const completedLessons = new Set(progress?.filter(p => p.completed).map(p => p.lesson_id) || []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/courses"><ArrowLeft className="h-4 w-4 mr-2" />Back to Courses</Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{course.icon}</span>
            <div>
              <Badge variant="outline" className="mb-2 capitalize">{course.difficulty}</Badge>
              <h1 className="text-3xl font-bold">{course.title}</h1>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">{course.description}</p>
        </div>

        <div className="space-y-3">
          {lessons?.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              courseId={course.id}
              lessonNumber={index + 1}
              isCompleted={completedLessons.has(lesson.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
