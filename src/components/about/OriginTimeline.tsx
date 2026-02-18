import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2014',
    title: 'The Seed',
    icon: '💡',
    story: "Our founder, while tutoring O-Level students in Lahore, noticed a pattern: brilliant students failing not because of ability, but because they had foundational gaps from years earlier. A Grade 10 student struggling with algebra often had missed key concepts in Grade 5.",
    quote: "I realized we weren't dealing with 'weak students'—we were dealing with a system that never checked if students truly understood before moving on.",
  },
  {
    year: '2015',
    title: 'The Research',
    icon: '📖',
    story: 'We studied mastery-based learning, spaced repetition, and adaptive algorithms. We partnered with University of Education Lahore to validate our approach.',
    highlight: 'Key Insight: Learning happens at different speeds. Fixed-pace classrooms leave 60% of students behind.',
  },
  {
    year: '2016',
    title: 'The First Classroom',
    icon: '🏠',
    story: "EduMeUp launched with 32 students in a single room in Lahore. No fancy office, no investors—just a mission and a laptop.",
    highlight: 'Result: 28 of 32 students (87.5%) passed their O-Level exams, compared to 55% national average.',
  },
  {
    year: '2018',
    title: 'Going Digital',
    icon: '💻',
    story: "We built our first online platform on Moodle, creating Pakistan's first truly adaptive O-Level preparation system.",
    highlight: 'Milestone: Reached 1,000 students across Pakistan',
  },
  {
    year: '2020',
    title: 'The Pandemic Pivot',
    icon: '🏡',
    story: 'When COVID closed schools, we were ready. Our platform served students seamlessly while others scrambled.',
    highlight: 'Growth: Student base grew 400% in 6 months',
  },
  {
    year: '2022',
    title: 'University Validation',
    icon: '🏆',
    story: 'University of Education Lahore completed an independent study: EduMeUp students achieved 91% pass rate vs. 55% control group.',
    badge: 'UNIVERSITY-PROVEN METHODOLOGY',
  },
  {
    year: '2024',
    title: 'Get Ready Launch',
    icon: '🌉',
    story: "We launched the world's first O-Level bridge program—Get Ready—filling gaps before they become failures.",
    highlight: 'Result: 92% of Get Ready completers pass O-Level (vs. 55% without)',
  },
  {
    year: '2026',
    title: 'Today',
    icon: '🌍',
    story: 'Now serving 50,000+ students, 200+ schools, and expanding across South Asia. Our mission remains unchanged: quality education for every child.',
  },
];

const OriginTimeline = () => (
  <section className="bg-light-blue section-padding-lg">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
          How EduMeUp Began
        </h2>
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-16 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-3.5 md:left-5.5 top-1 w-5 h-5 rounded-full bg-primary border-4 border-background z-10" />

              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-sm font-bold font-heading text-deep-blue bg-light-blue-surface px-3 py-1 rounded-full">
                    {m.year}
                  </span>
                  <h3 className="text-lg font-bold font-heading text-foreground">{m.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{m.story}</p>

                {m.quote && (
                  <blockquote className="border-l-3 border-deep-blue pl-3 text-sm italic text-foreground bg-light-blue rounded-r-lg p-3">
                    "{m.quote}"
                  </blockquote>
                )}
                {m.highlight && (
                  <div className="bg-green-light border border-green/20 rounded-lg p-3">
                    <p className="text-sm font-semibold text-green">{m.highlight}</p>
                  </div>
                )}
                {m.badge && (
                  <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    🏆 {m.badge}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default OriginTimeline;
