import { motion } from 'framer-motion';

const problems = [
  {
    icon: '🚫',
    title: '22.8 Million Out of School',
    desc: "More children out of school than any country except Nigeria. Rural areas and girls disproportionately affected.",
    stat: 'Only 58% enrollment rate in rural areas',
  },
  {
    icon: '📉',
    title: 'Learning Without Understanding',
    desc: "Students memorize answers without comprehension. 75% of Grade 5 students can't read a Grade 2 sentence.",
    stat: '40% O-Level failure rate nationally',
  },
  {
    icon: '💰',
    title: 'Quality = Expensive',
    desc: 'Good schools cost PKR 50,000-200,000/month. Quality education became a privilege, not a right.',
    stat: 'Average family can afford <PKR 5,000/month',
  },
];

const ProblemSection = () => (
  <section className="bg-background section-padding-lg">
    <div className="container mx-auto px-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
          The Education Crisis We Witnessed
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Pakistan faces one of the world's most acute education challenges. With 22.8 million children out of school and millions more receiving inadequate education, we saw a system that was failing an entire generation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <div className="text-4xl mb-4">{p.icon}</div>
            <h3 className="text-lg font-bold font-heading text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
            <div className="bg-destructive/5 border border-destructive/10 rounded-lg p-3">
              <p className="text-sm font-semibold text-destructive">{p.stat}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-light-blue border-l-4 border-deep-blue rounded-r-xl p-6 max-w-3xl mx-auto"
      >
        <p className="text-base text-foreground italic leading-relaxed">
          "We met students who worked harder than anyone—yet failed. Not because they lacked ability, but because the system wasn't designed for them to succeed."
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
