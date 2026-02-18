import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Ahmed Hassan',
    role: 'Student, O-Level',
    badge: '⭐ 5 A* Grades',
    result: { before: '45%', after: '82%', extra: 'LUMS Scholarship' },
    quote: "I was struggling with Physics and Math, getting 45% on mock exams. After 8 months with EduMeUp's diagnostic and remedial program, I scored 82% on my O-Levels and received a scholarship to LUMS. The spaced review system was a game-changer.",
    rating: 5,
  },
  {
    name: 'Mrs. Nadia Khan',
    role: 'Parent of 2 Students',
    badge: '👨‍👩‍👧‍👦 2 Students Enrolled',
    result: { before: 'Stress', after: 'Peace of Mind', extra: 'Full Visibility' },
    quote: "As a working parent, I couldn't monitor my children's studies closely. EduMeUp's parent dashboard gives me real-time visibility. Both my children improved from C grades to A/A* within one academic year. The weekly progress reports are invaluable.",
    rating: 5,
  },
  {
    name: 'The Hassan Family',
    role: 'Homeschool Family',
    badge: '🏡 Homeschool Success',
    result: { before: '$345K Fees', after: '$7.5K EduMeUp', extra: '$140K+ Saved' },
    quote: "We pulled our three children from a $45K/year international school. With EduMeUp, all three achieved 5 A* grades each, got accepted to LUMS and NUST, and we saved over $140,000. The curriculum is actually more comprehensive than what the school offered.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="gradient-light section-padding-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
            Real Students, Real Results: Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — hear from families who transformed their education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-sm border border-border flex flex-col"
            >
              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-full bg-light-blue-surface flex items-center justify-center text-2xl mb-4 mx-auto">
                {t.name[0]}
              </div>

              <div className="text-center mb-4">
                <h3 className="font-bold font-heading text-foreground">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.role}</p>
                <span className="inline-block mt-2 bg-light-blue-surface text-deep-blue text-xs font-bold px-3 py-1 rounded-full">
                  {t.badge}
                </span>
              </div>

              {/* Result card */}
              <div className="bg-light-blue rounded-lg p-3 mb-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-muted-foreground">{t.result.before}</span>
                  <span className="text-deep-blue font-bold">→</span>
                  <span className="font-bold text-green">{t.result.after}</span>
                </div>
                <p className="text-xs text-deep-blue font-semibold mt-1">{t.result.extra}</p>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              <blockquote className="text-sm text-muted-foreground leading-relaxed italic flex-1">
                "{t.quote}"
              </blockquote>

              <p className="text-sm font-semibold text-foreground mt-4">— {t.name}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="gap-2 text-deep-blue border-deep-blue hover:bg-primary hover:text-primary-foreground">
            Read 50+ More Success Stories <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
