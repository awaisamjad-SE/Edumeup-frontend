import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const stakeholders = [
  {
    icon: '🎓',
    title: 'Students',
    desc: 'Master your subjects with AI-powered diagnostics and personalized learning paths.',
    cta: 'Start Learning',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Parents',
    desc: 'Stop worrying. Get real-time visibility into your child\'s progress and performance.',
    cta: 'Get Dashboard',
  },
  {
    icon: '🏡',
    title: 'Homeschoolers',
    desc: '92% of our homeschool families achieve results matching or exceeding top international schools.',
    cta: 'Explore Curriculum',
  },
  {
    icon: '🏫',
    title: 'Schools',
    desc: 'Boost your institution\'s pass rates by 40%+ with our integrated learning system.',
    cta: 'Request Demo',
  },
  {
    icon: '👨‍🏫',
    title: 'Teachers',
    desc: 'Ready-made content, powerful analytics, and competitive tutoring earnings of $15-35/hr.',
    cta: 'Explore Teaching',
  },
];

const StakeholderCards = () => {
  return (
    <section className="bg-deep-blue section-padding-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-primary-foreground mb-4">
            Who Are You? Find Your Perfect Path
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Every stakeholder has a tailored experience designed for their needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {stakeholders.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-dark rounded-xl p-6 text-center card-lift group"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold font-heading text-primary-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6">{s.desc}</p>
              <Button
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-sm gap-1"
                size="sm"
              >
                {s.cta} <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StakeholderCards;
