import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const metrics = [
  { label: 'Overall Pass Rate', value: '91%', context: 'vs. 55% national average' },
  { label: 'Get Ready Pass Rate', value: '92%', context: 'for bridge program completers' },
  { label: 'Student Retention', value: '87%', context: 'complete their enrolled courses' },
  { label: 'Parent Satisfaction', value: '94%', context: 'would recommend to friends' },
  { label: 'Teacher Partner Growth', value: '300%', context: 'year-over-year since 2023' },
];

const stories = [
  {
    name: 'Fatima from Multan',
    story: 'Failed O-Level Math twice at a top school. After 6 months with EduMeUp, scored an A. Now studying engineering at NUST.',
  },
  {
    name: "Ahmed's Village",
    story: "From a village with no O-Level teachers within 50km. Studied entirely online with EduMeUp. First person from his village to pass O-Level.",
  },
  {
    name: 'Government School Partnership',
    story: "Partner school saw pass rates jump from 32% to 78% in one year after implementing EduMeUp's diagnostic system.",
  },
];

const ImpactOutcomes = () => (
  <section className="bg-background section-padding-lg">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
          Results That Speak
        </h2>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-14">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-light-blue rounded-xl p-5 text-center"
          >
            <div className="text-3xl md:text-4xl font-extrabold font-heading text-deep-blue mb-1">{m.value}</div>
            <div className="text-sm font-semibold text-foreground mb-1">{m.label}</div>
            <div className="text-xs text-muted-foreground">{m.context}</div>
          </motion.div>
        ))}
      </div>

      {/* Stories */}
      <h3 className="text-2xl font-bold font-heading text-foreground text-center mb-8">Impact Stories</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stories.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-light-blue-surface flex items-center justify-center text-lg font-bold text-deep-blue mb-4">
              {s.name[0]}
            </div>
            <h4 className="text-base font-bold font-heading text-foreground mb-2">{s.name}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.story}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/" className="inline-flex items-center gap-1 text-deep-blue font-semibold text-sm hover:underline">
          Read Full Success Stories <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default ImpactOutcomes;
