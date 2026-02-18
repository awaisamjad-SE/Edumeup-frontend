import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const programs = [
  {
    icon: '🎨',
    title: 'Starter Primary',
    ages: 'Ages 4-7',
    grades: 'Pre-K to Grade 2',
    description: 'Foundational literacy, numeracy, and curiosity-driven exploration through interactive play-based learning.',
    features: ['Phonics & Early Reading', 'Number Sense & Patterns', 'Interactive Activities'],
    special: false,
  },
  {
    icon: '📚',
    title: 'Lower Primary',
    ages: 'Ages 8-10',
    grades: 'Grades 3-5',
    description: 'Building core academic skills in mathematics, science, English, and social studies with structured progression.',
    features: ['Core Subject Mastery', 'Critical Thinking', 'Project-Based Learning'],
    special: false,
  },
  {
    icon: '🔬',
    title: 'Upper Primary',
    ages: 'Age 11',
    grades: 'Grade 6',
    description: 'Advanced primary curriculum preparing students for the transition to secondary education.',
    features: ['Advanced Mathematics', 'Science Exploration', 'Essay Writing Skills'],
    special: false,
  },
  {
    icon: '🎯',
    title: 'Get Ready',
    ages: 'Ages 12-14',
    grades: 'Grades 7-8',
    description: "The world's only dedicated O-Level bridge program. Fill knowledge gaps and build exam readiness.",
    features: ['Gap Analysis & Remediation', 'O-Level Foundations', 'Study Skills Mastery'],
    special: true,
  },
  {
    icon: '🎓',
    title: 'O-Level / IGCSE',
    ages: 'Ages 14-16',
    grades: 'Grades 9-10',
    description: 'Complete O-Level and IGCSE preparation with past papers, examiner insights, and proven techniques.',
    features: ['Full Syllabus Coverage', 'Past Paper Practice', 'Exam Strategies'],
    special: false,
  },
  {
    icon: '🏛️',
    title: 'FSc / Intermediate',
    ages: 'Ages 17-18',
    grades: 'Grades 11-12',
    description: 'Higher secondary preparation for university entrance with rigorous academic content.',
    features: ['University Prep', 'Advanced Sciences', 'SAT/Entry Test Support'],
    special: false,
  },
];

const ProgramsGrid = () => {
  return (
    <section className="gradient-light section-padding-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
            What We Offer: Complete Pre-K to O-Level Curriculum
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six comprehensive programs designed for every stage of your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative bg-card rounded-xl p-6 card-lift min-h-[320px] flex flex-col ${
                program.special
                  ? 'border-[3px] border-gold shadow-lg'
                  : 'border border-border shadow-sm'
              }`}
            >
              {program.special && (
                <span className="absolute -top-3 left-6 bg-gold text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  ⭐ UNIQUE PROGRAM
                </span>
              )}

              <div className="text-3xl mb-3">{program.icon}</div>
              <h3 className="text-xl font-bold font-heading text-foreground mb-1">{program.title}</h3>
              <div className="text-sm text-muted-foreground mb-3">
                {program.ages} · {program.grades}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{program.description}</p>

              <div className="space-y-2 mb-6">
                {program.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-green">✓</span> {f}
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <button className="flex items-center gap-1 text-deep-blue font-semibold text-sm hover:underline">
                  Explore Program <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-10 gap-2 shadow-lg shadow-primary/25"
          >
            Start Free Diagnostic <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsGrid;
