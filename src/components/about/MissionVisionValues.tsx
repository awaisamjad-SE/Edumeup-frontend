import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const cards = [
  {
    icon: '🎯',
    title: 'Our Mission',
    statement: 'To provide every Pakistani student access to world-class, personalized education—regardless of location, background, or economic status.',
    expansion: "We believe that the accident of where you're born shouldn't determine how far you can go. EduMeUp exists to break that barrier.",
  },
  {
    icon: '🌟',
    title: 'Our Vision',
    statement: "A Pakistan where every child achieves their full academic potential through technology-enabled, mastery-based learning.",
    expansion: "By 2030, we aim to serve 1 million students annually and reduce Pakistan's O-Level failure rate from 40% to under 15%.",
  },
];

const values = [
  { icon: '👨‍🎓', title: 'Student First', desc: 'Every decision starts with one question: Does this help students learn better? If not, we don\'t do it.', example: "We've refused features that look good but don't improve outcomes." },
  { icon: '✓', title: 'Mastery Over Speed', desc: "We'd rather a student take 3 months to truly master algebra than rush through in 1 month and fail later.", example: "Our platform doesn't let students skip ahead until they've proven mastery." },
  { icon: '🔬', title: 'Research-Driven', desc: "We don't guess—we measure. Every feature is validated against learning outcomes.", example: "91% pass rate isn't marketing; it's peer-reviewed research." },
  { icon: '💚', title: 'Accessible Pricing', desc: "Quality education shouldn't bankrupt families. We price for access, not exclusivity.", example: 'Full O-Level prep at PKR 2,500/month vs. PKR 50,000+ at traditional academies.' },
  { icon: '👨‍🏫', title: 'Teacher Empowerment', desc: "Technology enhances teachers—it doesn't replace them. We build tools that make great teachers even better.", example: 'Our diagnostic reports give teachers insights that would take hours to gather manually.' },
];

const MissionVisionValues = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section className="bg-background section-padding-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
            Mission, Vision & Values
          </h2>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-7 shadow-sm"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold font-heading text-foreground mb-3">{card.title}</h3>
              <p className="text-base text-foreground leading-relaxed mb-3">{card.statement}</p>
              <button
                onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                className="flex items-center gap-1 text-deep-blue font-semibold text-sm hover:underline"
              >
                {expandedCard === i ? 'Read Less' : 'Read More'}
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedCard === i ? 'rotate-180' : ''}`} />
              </button>
              {expandedCard === i && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {card.expansion}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <h3 className="text-2xl font-bold font-heading text-foreground text-center mb-8">Our Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-card border border-border rounded-xl p-5 shadow-sm"
            >
              <div className="text-3xl mb-3">{v.icon}</div>
              <h4 className="text-base font-bold font-heading text-foreground mb-2">{v.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{v.desc}</p>
              <p className="text-xs text-deep-blue italic">"{v.example}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionValues;
