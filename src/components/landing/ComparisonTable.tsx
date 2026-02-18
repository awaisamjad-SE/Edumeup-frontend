import { motion } from 'framer-motion';

const features = [
  'AI Diagnostic (Sub-skill)',
  'Personalized Learning Path',
  'Dual-Coding (Video+Interactive)',
  'Spaced Repetition System',
  'Past Paper Practice',
  'Human Expert Tutors',
  'Progress Dashboard',
  'Parent Visibility',
  'Mobile App',
  'O-Level Bridge Program',
  'Research Validation',
  'Pass Rate',
];

type Rating = '✅' | '⚠️' | '❌' | string;

const competitors: { name: string; ratings: Rating[] }[] = [
  {
    name: 'EduMeUp',
    ratings: ['✅ Sub-skill level', '✅ 80% mastery gate', '✅ H5P + Video', '✅ AI-optimized', '✅ With analysis', '✅ $15-35/hr', '✅ Real-time', '✅ Full dashboard', '✅ Coming soon', '✅ World\'s only', '✅ Peer-reviewed', '91%'],
  },
  {
    name: 'Khan Academy',
    ratings: ['⚠️ Basic', '⚠️ Self-directed', '⚠️ Video only', '❌', '❌', '❌', '⚠️ Basic', '⚠️ Limited', '✅', '❌', '❌', '~70-75%'],
  },
  {
    name: 'Kognity/GCSEPod',
    ratings: ['❌', '❌ Linear', '⚠️ Video only', '❌', '⚠️ Limited', '❌', '⚠️ Basic', '❌', '⚠️', '❌', '❌', 'Unknown'],
  },
  {
    name: 'ChatGPT',
    ratings: ['❌', '❌', '❌', '❌', '❌', '❌', '❌', '❌', '✅', '❌', '❌', 'N/A'],
  },
  {
    name: 'Private Tutor',
    ratings: ['⚠️ Manual', '⚠️ Varies', '⚠️ Verbal only', '⚠️ Manual', '⚠️ If available', '✅ Expensive', '❌', '⚠️ Manual', '❌', '❌', '❌', '~65%'],
  },
];

const differentiators = [
  { icon: '💎', title: '$3-5M Content Moat', desc: 'Multi-purpose content system across 6 use cases per lesson, impossible to replicate quickly.' },
  { icon: '🎯', title: "World's Only O-Level Bridge", desc: "The 'Get Ready' program is the only dedicated O-Level bridge course globally." },
  { icon: '🔬', title: 'Independent Research Proof', desc: 'Peer-reviewed university study with n=611, 18 months, p<0.001 significance.' },
];

const ComparisonTable = () => {
  return (
    <section className="bg-light-blue section-padding-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
            Why EduMeUp Succeeds Where Others Fail
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we compare across every dimension that matters
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto mb-12"
        >
          <table className="w-full min-w-[800px] bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <thead>
              <tr>
                <th className="p-4 text-left text-sm font-bold font-heading text-foreground bg-muted">Feature</th>
                {competitors.map(c => (
                  <th
                    key={c.name}
                    className={`p-4 text-center text-sm font-bold font-heading ${
                      c.name === 'EduMeUp' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                    }`}
                  >
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, fi) => (
                <tr key={feature} className={fi % 2 === 0 ? 'bg-background' : 'bg-card'}>
                  <td className="p-3 text-sm font-medium text-foreground border-t border-border">{feature}</td>
                  {competitors.map(c => (
                    <td
                      key={c.name + feature}
                      className={`p-3 text-center text-xs border-t border-border ${
                        c.name === 'EduMeUp' ? 'bg-light-blue font-semibold text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {c.ratings[fi]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Differentiator boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card rounded-xl p-6 border-2 ${
                i === 0 ? 'border-gold' : i === 1 ? 'border-green' : 'border-deep-blue'
              }`}
            >
              <div className="text-3xl mb-3">{d.icon}</div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
