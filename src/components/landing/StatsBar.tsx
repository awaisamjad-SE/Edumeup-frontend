import { motion } from 'framer-motion';

const stats = [
  { icon: '🎯', value: '91%', label: 'Pass Rate', sub: '(vs 65% traditional)' },
  { icon: '🧠', value: '75%', label: 'Knowledge Retention', sub: '(vs 5% passive)' },
  { icon: '🎓', value: '84%', label: 'University Acceptance', sub: '' },
  { icon: '💰', value: '$7K-29K', label: 'Annual Savings', sub: 'vs alternatives' },
];

const StatsBar = () => {
  return (
    <section className="bg-light-blue section-padding">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-extrabold font-heading text-deep-blue mb-1">
                {stat.value}
              </div>
              <div className="text-base font-medium text-muted-foreground">{stat.label}</div>
              {stat.sub && (
                <div className="text-xs text-muted-foreground mt-0.5">{stat.sub}</div>
              )}
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground italic mt-8 max-w-2xl mx-auto">
          *Statistics based on independent University of Education Lahore randomized controlled trial (n=611, 18 months, p&lt;0.001)
        </p>
      </div>
    </section>
  );
};

export default StatsBar;
