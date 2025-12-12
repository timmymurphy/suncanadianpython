import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Code, Gamepad2, Trophy, Users, Zap, BookOpen } from 'lucide-react';

export default function Landing() {
  const features = [
    { icon: BookOpen, title: 'Interactive Lessons', description: 'Learn Python through bite-sized, visual tutorials' },
    { icon: Code, title: 'Coding Challenges', description: 'Practice with hands-on coding exercises' },
    { icon: Gamepad2, title: 'Gamification', description: 'Earn XP, level up, and unlock achievements' },
    { icon: Trophy, title: 'Leaderboard', description: 'Compete with learners worldwide' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-6 animate-float">🐍</div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Learn Python the <span className="text-gradient">Fun Way</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master Python programming through interactive lessons, coding challenges, and gamified learning. Earn XP, unlock achievements, and become a Python pro!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gradient-hero text-lg px-8">
                <Link to="/auth?mode=signup">
                  <Zap className="h-5 w-5 mr-2" />
                  Start Learning Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why PyQuest?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl gradient-hero flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-2 text-4xl mb-6">
              <span>🎯</span><span>🔥</span><span>⭐</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Python Journey?</h2>
            <p className="text-muted-foreground mb-8">Join thousands of learners and start coding today!</p>
            <Button size="lg" asChild className="gradient-hero">
              <Link to="/auth?mode=signup">Get Started - It's Free!</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐍</span>
            <span className="font-bold">PyQuest</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 PyQuest. Learn Python the fun way.</p>
        </div>
      </footer>
    </div>
  );
}
