import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const paths = [
  { icon: '🎓', title: 'For Students', desc: 'Start your personalized learning journey today', cta: 'Take Free Diagnostic', to: '/' },
  { icon: '👨‍👩‍👧', title: 'For Parents', desc: 'Give your child the gift of mastery-based learning', cta: 'Explore Programs', to: '/courses' },
  { icon: '🏫', title: 'For Schools', desc: 'Partner with us to transform your institution', cta: 'Request School Demo', to: '/' },
  { icon: '👨‍🏫', title: 'For Teachers', desc: 'Use our resources and earn income through our partner program', cta: 'Join as Teacher', to: '/register' },
  { icon: '💼', title: 'For Investors & Partners', desc: 'Join our mission to transform education', cta: 'Contact Us', to: '/' },
];

const JoinMission = () => (
  <section className="bg-deep-blue section-padding-lg">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-primary-foreground mb-4">
          Be Part of the Change
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {paths.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-dark rounded-xl p-6 text-center card-lift"
          >
            <div className="text-4xl mb-4">{p.icon}</div>
            <h3 className="text-base font-bold font-heading text-primary-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-5">{p.desc}</p>
            <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-sm gap-1" size="sm">
              {p.cta} <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default JoinMission;
