import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import dashboardMockup from '@/assets/dashboard-mockup.png';

const WhatIsEduMeUp = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-background section-padding-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
            What Is EduMeUp?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete Pre-K to O-Level learning system that combines AI diagnostics, research-backed methodology, and expert instruction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-foreground leading-relaxed mb-4">
              EduMeUp isn't just another online learning platform. It's a <strong>comprehensive education system</strong> built on cognitive science research that has been independently validated by a university study involving 611 students over 18 months.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Every student begins with an <strong>AI-powered diagnostic assessment</strong> that identifies specific knowledge gaps at the sub-skill level. From there, the system creates a personalized learning path using dual-coding (video + interactive), spaced repetition, and mastery-based progression.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Unlike traditional tutoring or passive video courses, EduMeUp ensures <strong>75%+ knowledge retention</strong> compared to the 5% retention rate of typical lecture-based learning.
            </p>

            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden"
              >
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Our platform integrates with Moodle LMS, giving students seamless access to course content, progress tracking, and certifications. Parents get real-time visibility, teachers get powerful tools, and schools can boost their outcomes by 40%+ with minimal effort.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  From homeschooling families saving $140,000+ on international school fees to students jumping from 45% to 91% scores, EduMeUp delivers measurable, transformative results.
                </p>
              </motion.div>
            )}

            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-deep-blue font-semibold text-sm mt-2 hover:underline"
            >
              {expanded ? 'Read Less' : 'Read More'}
              <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src={dashboardMockup}
              alt="EduMeUp student dashboard showing personalized learning interface"
              className="w-full max-w-[500px] rounded-xl shadow-lg border border-border"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsEduMeUp;
