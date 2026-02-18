import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import heroStudent from '@/assets/hero-student.png';

const HeroSection = () => {
  const trustItems = [
    '91% Pass Rate (Independent Study)',
    '2,000+ Students in 25+ Countries',
    'Research-Backed Methodology',
  ];

  const pills = [
    'AI-Powered Diagnostics',
    'Personalized Learning Paths',
    'Moodle LMS Integration',
  ];

  return (
    <section className="gradient-hero pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Pre-headline badge */}
            <div className="inline-flex items-center gap-2 bg-light-blue-surface rounded-full px-4 py-2 mb-6">
              <span className="text-lg">🏆</span>
              <span className="text-sm font-semibold text-deep-blue">Independent University Study Validated</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold font-heading text-foreground leading-[1.1] mb-6">
              Transform 5% Learning{' '}
              <br className="hidden md:block" />
              Into{' '}
              <span className="text-deep-blue">75%+ Mastery</span>{' '}
              With Research-Backed Education
            </h1>

            <p className="text-lg text-muted-foreground mb-6 max-w-lg leading-relaxed">
              The only education platform with a peer-reviewed university study proving 91% pass rates vs 65% traditional. Pre-K to O-Level, powered by AI diagnostics and proven methodology.
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {pills.map(pill => (
                <span
                  key={pill}
                  className="bg-light-blue-surface text-deep-blue text-sm font-medium px-4 py-1.5 rounded-full"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-8 py-6 gap-2 shadow-lg shadow-primary/25"
              >
                Start Free Diagnostic <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-foreground border-border hover:bg-muted font-semibold text-base px-8 py-6 gap-2"
              >
                Or explore features <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row gap-3">
              {trustItems.map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <img
              src={heroStudent}
              alt="Student achieving 91% pass rate through EduMeUp research-backed learning system"
              className="w-full max-w-[600px] h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
