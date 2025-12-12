import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { XPBadge } from '@/components/ui/xp-badge';
import { CodingChallenge as ChallengeType } from '@/hooks/useCourses';
import { useAddXP } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';
import { Code, Lightbulb, CheckCircle, XCircle, Play } from 'lucide-react';

interface CodingChallengeProps {
  challenge: ChallengeType;
  onComplete?: () => void;
}

export function CodingChallenge({ challenge, onComplete }: CodingChallengeProps) {
  const [code, setCode] = useState(challenge.starter_code);
  const [output, setOutput] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  
  const addXP = useAddXP();

  // Simple code evaluation (just checks output match for demo)
  const runCode = async () => {
    // In a real app, you'd send this to a secure backend for execution
    // For demo purposes, we'll do simple pattern matching
    try {
      // Extract print statements and simulate output
      const printMatches = code.match(/print\(['"](.*?)['"]\)/g);
      const outputs: string[] = [];
      
      if (printMatches) {
        printMatches.forEach(match => {
          const content = match.match(/print\(['"](.*)['"].*\)/);
          if (content) {
            outputs.push(content[1]);
          }
        });
      }

      // Also check for variable prints
      const varPrintMatches = code.match(/print\((\w+)\)/g);
      if (varPrintMatches) {
        // Try to find variable assignments
        varPrintMatches.forEach(match => {
          const varName = match.match(/print\((\w+)\)/)?.[1];
          if (varName) {
            const assignment = code.match(new RegExp(`${varName}\\s*=\\s*['"](.*?)['"]`));
            if (assignment) {
              outputs.push(assignment[1]);
            }
          }
        });
      }

      // Check for loops printing numbers
      if (code.includes('range(1, 6)') || code.includes('range(5)')) {
        const hasLoopPrint = code.includes('for') && code.includes('print');
        if (hasLoopPrint) {
          if (code.includes('range(1, 6)')) {
            outputs.push('1\n2\n3\n4\n5');
          }
        }
      }

      const simulatedOutput = outputs.join('\n') || 'No output';
      setOutput(simulatedOutput);
      
      // Compare with expected output (simplified)
      const normalizedOutput = simulatedOutput.toLowerCase().trim();
      const normalizedExpected = challenge.expected_output.toLowerCase().trim();
      
      const correct = normalizedOutput.includes(normalizedExpected) || 
                      normalizedExpected.includes(normalizedOutput);
      
      setIsCorrect(correct);
      
      if (correct) {
        await addXP.mutateAsync(challenge.xp_reward);
      }
    } catch (error) {
      setOutput('Error running code');
      setIsCorrect(false);
    }
  };

  const showNextHint = () => {
    if (challenge.hints && currentHint < challenge.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
    setShowHints(true);
  };

  return (
    <Card className="border-2 border-secondary/30">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-secondary" />
            <CardTitle className="text-lg">{challenge.title}</CardTitle>
          </div>
          <XPBadge amount={challenge.xp_reward} size="sm" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">{challenge.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Code Editor */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Code:</label>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono min-h-[150px] bg-card"
            placeholder="Write your Python code here..."
          />
        </div>

        {/* Output */}
        {output !== null && (
          <div className={cn(
            "p-4 rounded-lg font-mono text-sm",
            isCorrect 
              ? "bg-success/10 border border-success/30" 
              : "bg-destructive/10 border border-destructive/30"
          )}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="h-4 w-4 text-success" />
              ) : (
                <XCircle className="h-4 w-4 text-destructive" />
              )}
              <span className="font-bold">
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </span>
            </div>
            <div className="whitespace-pre-wrap">{output}</div>
            {!isCorrect && (
              <p className="text-xs mt-2 text-muted-foreground">
                Expected: {challenge.expected_output}
              </p>
            )}
          </div>
        )}

        {/* Hints */}
        {showHints && challenge.hints && challenge.hints.length > 0 && (
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-accent" />
              <span className="font-bold text-sm">Hint {currentHint + 1}</span>
            </div>
            <p className="text-sm">{challenge.hints[currentHint]}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={showNextHint}
            disabled={!challenge.hints || (showHints && currentHint >= challenge.hints.length - 1)}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            {showHints ? 'Next Hint' : 'Show Hint'}
          </Button>

          <div className="flex gap-2">
            <Button onClick={runCode} className="gradient-teal">
              <Play className="h-4 w-4 mr-2" />
              Run Code
            </Button>
            {isCorrect && (
              <Button onClick={onComplete} className="gradient-hero">
                Continue
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
