import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLesson, useQuizzes, useCodingChallenges } from '@/hooks/useCourses';
import { useCompleteLesson } from '@/hooks/useProgress';
import { useAddXP } from '@/hooks/useProfile';
import { Navbar } from '@/components/layout/Navbar';
import { CodeBlock } from '@/components/lesson/CodeBlock';
import { QuizCard } from '@/components/lesson/QuizCard';
import { CodingChallenge } from '@/components/lesson/CodingChallenge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XPBadge } from '@/components/ui/xp-badge';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Lesson() {
  const { courseId, lessonId } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: lesson } = useLesson(lessonId);
  const { data: quizzes } = useQuizzes(lessonId);
  const { data: challenges } = useCodingChallenges(lessonId);
  const completeLesson = useCompleteLesson();
  const addXP = useAddXP();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  if (!lesson) return null;

  const handleComplete = async () => {
    await completeLesson.mutateAsync(lesson.id);
    await addXP.mutateAsync(lesson.xp_reward);
    setCompleted(true);
    toast.success(`🎉 Lesson complete! +${lesson.xp_reward} XP`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to={`/courses/${courseId}`}><ArrowLeft className="h-4 w-4 mr-2" />Back to Course</Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            <XPBadge amount={lesson.xp_reward} />
          </div>
        </div>

        {/* Lesson Content */}
        <Card className="mb-6">
          <CardContent className="p-6 prose prose-sm max-w-none">
            {lesson.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
          </CardContent>
        </Card>

        {/* Code Example */}
        {lesson.code_example && (
          <div className="mb-6">
            <h3 className="font-bold mb-3">Example Code</h3>
            <CodeBlock code={lesson.code_example} />
          </div>
        )}

        {/* Quizzes */}
        {quizzes && quizzes.length > 0 && (
          <div className="mb-6 space-y-4">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}

        {/* Coding Challenges */}
        {challenges && challenges.length > 0 && (
          <div className="mb-6 space-y-4">
            {challenges.map((challenge) => (
              <CodingChallenge key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}

        {/* Complete Button */}
        <div className="flex justify-center py-8">
          {completed ? (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="h-6 w-6" />
              <span className="font-bold text-lg">Lesson Completed!</span>
            </div>
          ) : (
            <Button size="lg" onClick={handleComplete} className="gradient-hero">
              Complete Lesson
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
