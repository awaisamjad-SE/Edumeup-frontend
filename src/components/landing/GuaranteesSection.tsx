import { motion } from 'framer-motion';

const guarantees = [
  {
    icon: '✅',
    title: '30-Day Money-Back Guarantee',
    desc: "Try EduMeUp completely risk-free. If you're not satisfied within the first 30 days, we'll refund 100% of your payment — no questions asked.",
    stat: 'Refund rate: <3% (because it works)',
    borderColor: 'border-green',
  },
  {
    icon: '🎯',
    title: 'Get Ready Success Guarantee',
    desc: "Complete the full Get Ready bridge program with 80%+ attendance and practice completion. If your O-Level scores don't improve significantly, we'll provide additional support at no cost.",
    stat: '89% of students score 80%+ after completion',
    borderColor: 'border-gold',
  },
];

const GuaranteesSection = () => {
  return (
    <section className="bg-navy section-padding-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-primary-foreground mb-4">
            Risk-Free: Our Unprecedented Guarantees
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            We're so confident in our methodology, we back it with real guarantees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {guarantees.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card rounded-xl p-8 border-[3px] ${g.borderColor}`}
            >
              <div className="text-5xl mb-4">{g.icon}</div>
              <h3 className="text-xl font-bold font-heading text-foreground mb-3">{g.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{g.desc}</p>
              <p className="text-sm font-semibold text-foreground">{g.stat}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuaranteesSection;
