import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import aboutHero from '@/assets/about-hero.png';

const stats = [
  { icon: '📅', value: '2016', label: 'Founded' },
  { icon: '👨‍🎓', value: '50,000+', label: 'Students Served' },
  { icon: '🎓', value: '91%', label: 'Pass Rate' },
  { icon: '🏫', value: '200+', label: 'Partner Schools' },
  { icon: '📚', value: '15,000+', label: 'Learning Activities' },
];

const AboutHero = () => (
  <section className="gradient-hero pt-24 md:pt-28 pb-0 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 items-center pb-16 md:pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold font-heading text-foreground leading-[1.1] mb-6">
            From One Classroom<br />to a Million Dreams
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
            EduMeUp began with a simple question: Why should quality education depend on geography, wealth, or luck? Since 2016, we've been building the answer.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/courses">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 gap-2 shadow-lg shadow-primary/25">
                Join Our Mission <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="font-semibold px-8">
              Meet the Team
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center">
          <img src={aboutHero} alt="EduMeUp classroom" className="w-full max-w-[480px] rounded-2xl shadow-xl" />
        </motion.div>
      </div>
    </div>
    {/* Stats banner */}
    <div className="bg-light-blue py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-deep-blue">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutHero;
