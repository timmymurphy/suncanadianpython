import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Course } from '@/hooks/useCourses';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  progress?: number;
  lessonsCompleted?: number;
  totalLessons?: number;
}

const difficultyColors = {
  beginner: 'bg-success/20 text-success border-success/30',
  intermediate: 'bg-accent/20 text-accent border-accent/30',
  advanced: 'bg-destructive/20 text-destructive border-destructive/30',
};

export function CourseCard({ course, progress = 0, lessonsCompleted = 0, totalLessons = 0 }: CourseCardProps) {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/30 gradient-card">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <span className="text-4xl group-hover:animate-wiggle">{course.icon}</span>
            <Badge 
              variant="outline" 
              className={cn("capitalize text-xs", difficultyColors[course.difficulty])}
            >
              {course.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {course.description}
            </p>
          </div>
          
          {totalLessons > 0 && (
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-3">
                <ProgressRing progress={progress} size={40} strokeWidth={4}>
                  <span className="text-xs font-bold">{Math.round(progress)}%</span>
                </ProgressRing>
                <div className="text-xs text-muted-foreground">
                  {lessonsCompleted}/{totalLessons} lessons
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
