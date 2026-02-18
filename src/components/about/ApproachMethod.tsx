import { motion } from 'framer-motion';

const pillars = [
  {
    icon: '🩺',
    title: 'Diagnostic-First Learning',
    how: "Every student begins with a comprehensive diagnostic that identifies exactly where their gaps are—down to specific sub-topics.",
    why: "A Grade 9 student struggling with physics might actually have a math problem from Grade 6. We find it.",
    result: 'Targeted learning paths that fix root causes, not symptoms',
  },
  {
    icon: '✅',
    title: 'Mastery-Based Progression',
    how: "Students don't move forward until they've demonstrated 80%+ mastery. No more social promotion.",
    why: "This prevents the 'Swiss cheese' knowledge that causes later failures.",
    result: 'Deep understanding that lasts, not shallow memorization that fades',
  },
  {
    icon: '🤖',
    title: 'Adaptive Practice',
    how: 'Our algorithm continuously adjusts difficulty based on performance. Struggling? More support. Excelling? More challenge.',
    why: "Every student works in their optimal learning zone—not too easy, not too hard.",
    result: 'Maximum learning efficiency with minimum frustration',
  },
  {
    icon: '🔄',
    title: 'Continuous Assessment',
    how: 'Regular low-stakes testing identifies weaknesses before they become failures. Parents and students see progress in real-time.',
    why: 'No more surprises at exam time. Problems are caught and fixed early.',
    result: 'Confidence going into exams, backed by data-proven readiness',
  },
];

const ApproachMethod = () => (
  <section className="gradient-light section-padding-lg">
    <div className="container mx-auto px-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
          How We're Different
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Traditional education moves at one pace. Some students are bored, others are lost. EduMeUp's adaptive approach ensures every student learns at exactly the right level and speed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <div className="text-3xl mb-3">{p.icon}</div>
            <h3 className="text-lg font-bold font-heading text-foreground mb-4">{p.title}</h3>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-deep-blue uppercase tracking-wider">How It Works</span>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{p.how}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-deep-blue uppercase tracking-wider">Why It Matters</span>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{p.why}</p>
              </div>
              <div className="bg-green-light border border-green/20 rounded-lg p-3">
                <span className="text-xs font-bold text-green uppercase tracking-wider">Result</span>
                <p className="text-sm font-semibold text-green mt-1">{p.result}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ApproachMethod;
