import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  content: string;
  code_example: string | null;
  xp_reward: number;
  order_index: number;
  created_at: string;
}

export interface Quiz {
  id: string;
  lesson_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
  xp_reward: number;
  created_at: string;
}

export interface CodingChallenge {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  starter_code: string;
  expected_output: string;
  hints: string[] | null;
  xp_reward: number;
  created_at: string;
}

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data as Course[];
    },
  });
}

export function useCourse(courseId: string | undefined) {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      if (!courseId) return null;
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
      
      if (error) throw error;
      return data as Course;
    },
    enabled: !!courseId,
  });
}

export function useLessons(courseId: string | undefined) {
  return useQuery({
    queryKey: ['lessons', courseId],
    queryFn: async () => {
      if (!courseId) return [];
      
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index');
      
      if (error) throw error;
      return data as Lesson[];
    },
    enabled: !!courseId,
  });
}

export function useLesson(lessonId: string | undefined) {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: async () => {
      if (!lessonId) return null;
      
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single();
      
      if (error) throw error;
      return data as Lesson;
    },
    enabled: !!lessonId,
  });
}

export function useQuizzes(lessonId: string | undefined) {
  return useQuery({
    queryKey: ['quizzes', lessonId],
    queryFn: async () => {
      if (!lessonId) return [];
      
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('lesson_id', lessonId);
      
      if (error) throw error;
      return data.map(q => ({
        ...q,
        options: q.options as string[]
      })) as Quiz[];
    },
    enabled: !!lessonId,
  });
}

export function useCodingChallenges(lessonId: string | undefined) {
  return useQuery({
    queryKey: ['coding_challenges', lessonId],
    queryFn: async () => {
      if (!lessonId) return [];
      
      const { data, error } = await supabase
        .from('coding_challenges')
        .select('*')
        .eq('lesson_id', lessonId);
      
      if (error) throw error;
      return data.map(c => ({
        ...c,
        hints: c.hints as string[] | null
      })) as CodingChallenge[];
    },
    enabled: !!lessonId,
  });
}
