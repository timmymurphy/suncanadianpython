import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/hooks/useCourses';
import { Navbar } from '@/components/layout/Navbar';
import { CourseCard } from '@/components/cards/CourseCard';

export default function Courses() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: courses } = useCourses();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Learning Paths</h1>
        <p className="text-muted-foreground mb-8">Choose a course to start learning Python</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <CourseCard key={course.id} course={course} totalLessons={4} />
          ))}
        </div>
      </main>
    </div>
  );
}
