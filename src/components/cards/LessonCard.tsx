import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { XPBadge } from '@/components/ui/xp-badge';
import { Lesson } from '@/hooks/useCourses';
import { CheckCircle, Circle, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  lesson: Lesson;
  courseId: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  lessonNumber: number;
}

export function LessonCard({ 
  lesson, 
  courseId, 
  isCompleted = false, 
  isLocked = false,
  lessonNumber 
}: LessonCardProps) {
  const content = (
    <Card 
      className={cn(
        "group transition-all duration-300",
        isLocked 
          ? "opacity-50 cursor-not-allowed" 
          : "hover:shadow-md hover:border-primary/30 cursor-pointer"
      )}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className={cn(
          "flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center",
          isCompleted 
            ? "bg-success/20" 
            : isLocked 
              ? "bg-muted" 
              : "bg-primary/10 group-hover:bg-primary/20"
        )}>
          {isCompleted ? (
            <CheckCircle className="h-6 w-6 text-success" />
          ) : isLocked ? (
            <Circle className="h-6 w-6 text-muted-foreground" />
          ) : (
            <PlayCircle className="h-6 w-6 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Lesson {lessonNumber}
            </span>
            {isCompleted && (
              <span className="text-xs text-success font-medium">Completed</span>
            )}
          </div>
          <h4 className={cn(
            "font-semibold truncate",
            !isLocked && "group-hover:text-primary transition-colors"
          )}>
            {lesson.title}
          </h4>
        </div>
        <XPBadge amount={lesson.xp_reward} size="sm" />
      </CardContent>
    </Card>
  );

  if (isLocked) {
    return <div>{content}</div>;
  }

  return <Link to={`/courses/${courseId}/lessons/${lesson.id}`}>{content}</Link>;
}