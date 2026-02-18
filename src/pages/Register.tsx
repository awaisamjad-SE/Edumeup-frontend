import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, User, Eye, EyeOff, Home, BookMarked, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { registerUser } from '@/lib/api';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'student' | 'parent' | 'teacher'>('student');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const canSubmit = username.trim() !== '' && email.trim() !== '' && password.trim() !== '';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    setError('');
    try {
      await registerUser(role, email.trim(), username.trim(), password);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please review your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { key: 'student' as const, label: 'Student', desc: 'Learn and grow' },
    { key: 'parent' as const, label: 'Parent', desc: 'Monitor your child' },
    { key: 'teacher' as const, label: 'Teacher', desc: 'Teach and inspire' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mini Navigation Bar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">EduMeUp</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link to="/courses" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <BookMarked className="h-4 w-4" />
              Courses
            </Link>
            <Link to="/about" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Info className="h-4 w-4" />
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient items-center justify-center p-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-md text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-display text-primary-foreground mb-4">Join EduMeUp Today</h1>
          <p className="text-primary-foreground/70">Start your learning journey with thousands of students worldwide.</p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-display text-foreground">EduMeUp</span>
          </Link>

          <h2 className="text-2xl font-bold font-display text-foreground mb-1">Create Account</h2>
          <p className="text-muted-foreground text-sm mb-6">Choose your role and get started</p>

          {/* Role selection */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map(r => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`p-3 rounded-lg border text-center transition-all ${role === r.key ? 'border-secondary bg-secondary/5 ring-1 ring-secondary' : 'border-border hover:border-muted-foreground/30'}`}
              >
                <div className={`text-sm font-semibold ${role === r.key ? 'text-secondary' : 'text-foreground'}`}>{r.label}</div>
                <div className="text-xs text-muted-foreground">{r.desc}</div>
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Username"
                className="pl-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Email address"
                type="email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
              size="lg"
              type="submit"
              disabled={!canSubmit || loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary font-medium hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default Register;
