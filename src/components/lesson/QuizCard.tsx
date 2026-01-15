import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XPBadge } from '@/components/ui/xp-badge';
import { Quiz } from '@/hooks/useCourses';
import { useRecordQuizAttempt } from '@/hooks/useProgress';
import { useAddXP } from '@/hooks/useProfile';
import { cn, formatContent } from '@/lib/utils';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  onComplete?: () => void;
}

export function QuizCard({ quiz, onComplete }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const recordAttempt = useRecordQuizAttempt();
  const addXP = useAddXP();

  const isCorrect = selectedAnswer === quiz.correct_answer;

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;
    
    setIsSubmitted(true);
    setShowExplanation(true);
    
    await recordAttempt.mutateAsync({
      quizId: quiz.id,
      correct: isCorrect
    });

    if (isCorrect) {
      await addXP.mutateAsync(quiz.xp_reward);
    }
  };

  const handleContinue = () => {
    onComplete?.();
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Quiz Time!</CardTitle>
          </div>
          <XPBadge amount={quiz.xp_reward} size="sm" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium whitespace-pre-wrap">{formatContent(quiz.question)}</p>

        <div className="space-y-2">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isSubmitted && setSelectedAnswer(index)}
              disabled={isSubmitted}
              className={cn(
                "w-full text-left p-4 rounded-lg border-2 transition-all",
                "hover:border-primary/50",
                selectedAnswer === index && !isSubmitted && "border-primary bg-primary/5",
                isSubmitted && index === quiz.correct_answer && "border-success bg-success/10",
                isSubmitted && selectedAnswer === index && index !== quiz.correct_answer && "border-destructive bg-destructive/10",
                !isSubmitted && selectedAnswer !== index && "border-border hover:bg-muted/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold",
                  selectedAnswer === index ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
                {isSubmitted && index === quiz.correct_answer && (
                  <CheckCircle className="h-5 w-5 text-success ml-auto" />
                )}
                {isSubmitted && selectedAnswer === index && index !== quiz.correct_answer && (
                  <XCircle className="h-5 w-5 text-destructive ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showExplanation && quiz.explanation && (
          <div className={cn(
            "p-4 rounded-lg",
            isCorrect ? "bg-success/10 border border-success/30" : "bg-accent/10 border border-accent/30"
          )}>
            <p className="text-sm whitespace-pre-wrap">
              <span className="font-bold">{isCorrect ? '🎉 Correct!' : '💡 Not quite!'}</span>
              {' '}{formatContent(quiz.explanation || '')}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          {!isSubmitted ? (
            <Button 
              onClick={handleSubmit} 
              disabled={selectedAnswer === null}
              className="gradient-hero"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleContinue} className="gradient-hero">
              Continue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
