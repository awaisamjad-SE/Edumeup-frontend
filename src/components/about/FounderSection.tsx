import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FounderSection = () => (
  <section className="bg-background section-padding-lg">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-center"
        >
          {/* Photo placeholder */}
          <div className="flex justify-center">
            <div className="w-56 h-56 rounded-2xl bg-light-blue-surface flex items-center justify-center shadow-lg">
              <span className="text-6xl">👨‍💼</span>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-1">Meet the Founder</h2>
            <p className="text-sm text-deep-blue font-semibold mb-4">Founder & CEO</p>

            <blockquote className="border-l-4 border-deep-blue pl-4 mb-6">
              <p className="text-lg italic text-foreground leading-relaxed">
                "Every child who fails because of a system failure is a tragedy we can prevent. That's why EduMeUp exists."
              </p>
            </blockquote>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Educator for 15+ years. Started tutoring O-Level students in 2010, founded EduMeUp in 2016 after seeing the same patterns of preventable failure year after year. Passionate about using technology and research to democratize quality education.
            </p>

            <button className="inline-flex items-center gap-1 text-deep-blue font-semibold text-sm hover:underline">
              Meet the Full Team <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default FounderSection;
