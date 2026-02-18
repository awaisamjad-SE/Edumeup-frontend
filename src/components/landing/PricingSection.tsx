import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const plans = [
  {
    badge: '🎯 MOST AFFORDABLE',
    title: 'Self-Learning',
    price: '$150-1,500',
    period: 'per student/year',
    features: [
      'Full AI Diagnostic Assessment',
      'Personalized Learning Paths',
      'Dual-Coded Video + H5P Lessons',
      'Spaced Repetition System',
      'Past Papers with Analysis',
      'Progress Dashboard',
      'AI Study Assistant (24/7)',
      'Mobile Access',
    ],
    bestFor: 'Independent learners who are self-motivated',
    cta: 'Start Free',
    ctaStyle: 'bg-primary text-primary-foreground hover:bg-primary/90',
    popular: false,
  },
  {
    badge: '⭐ MOST POPULAR',
    title: 'Teacher-Guided',
    price: '$400-4,000',
    period: 'per student/year',
    features: [
      'Everything in Self-Learning',
      'Assigned Expert Teacher',
      'Weekly Live Sessions',
      'Personalized Feedback',
      'Parent Progress Reports',
      'Priority Support',
      'Exam Strategy Coaching',
      'University Prep Guidance',
    ],
    bestFor: 'Students who benefit from structured guidance and accountability',
    cta: 'Book Consultation',
    ctaStyle: 'bg-gold text-accent-foreground hover:bg-accent/90',
    popular: true,
  },
  {
    badge: '🎯 AS-NEEDED',
    title: 'Add-On Tutoring',
    price: '$15-35',
    period: 'per hour/session',
    features: [
      'One-on-One Expert Tutors',
      'Subject-Specific Help',
      'Exam Preparation Sessions',
      'Homework Help',
      'Concept Clarification',
      'Flexible Scheduling',
      'Session Recordings',
      'Choose Your Tutor',
    ],
    bestFor: 'Occasional support for specific subjects or exam prep',
    cta: 'Browse Tutors',
    ctaStyle: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="bg-background section-padding-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
            Transparent Pricing: Exceptional Value
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your learning style and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card rounded-xl p-7 flex flex-col ${
                plan.popular
                  ? 'border-[3px] border-gold shadow-xl -translate-y-2 relative'
                  : 'border border-border shadow-sm'
              }`}
            >
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 self-start ${
                plan.popular ? 'bg-gold text-accent-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {plan.badge}
              </span>

              <h3 className="text-xl font-bold font-heading text-foreground mb-2">{plan.title}</h3>

              <div className="mb-4">
                <span className="text-3xl font-extrabold font-heading text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
              </div>

              <div className="space-y-2.5 mb-6 flex-1">
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <div className="bg-muted rounded-lg p-3 mb-5">
                <p className="text-xs text-muted-foreground"><strong>Best For:</strong> {plan.bestFor}</p>
              </div>

              <Button className={`w-full font-bold gap-2 ${plan.ctaStyle}`} size="lg">
                {plan.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Savings comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-green-light border-2 border-green rounded-xl p-8 text-center"
        >
          <div className="flex flex-wrap justify-center gap-8 mb-4 text-sm">
            <div>
              <span className="text-muted-foreground">Traditional Education:</span>
              <span className="font-bold text-foreground ml-2">$345K-1.017M</span>
            </div>
            <div>
              <span className="text-muted-foreground">EduMeUp:</span>
              <span className="font-bold text-green ml-2">$7.5K-135K</span>
            </div>
          </div>
          <p className="text-2xl md:text-4xl font-extrabold font-heading text-green">
            💰 SAVE $210,000-882,000
          </p>
          <p className="text-sm text-muted-foreground mt-2">85-95% cost reduction with better outcomes</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
