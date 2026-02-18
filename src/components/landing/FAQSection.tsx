import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'What makes EduMeUp different from Khan Academy or other free resources?',
    a: "Khan Academy is excellent for supplementary learning, but it lacks AI-powered diagnostics, personalized learning paths, spaced repetition, and doesn't have independent research validation. EduMeUp's methodology has been proven in a university study (n=611) to produce 91% pass rates vs 65% traditional, with 75% retention vs 5% passive learning.",
  },
  {
    q: 'How much does EduMeUp cost? Is it worth the investment?',
    a: 'Self-Learning plans range from $150-1,500/year per student. Teacher-Guided plans range from $400-4,000/year. Add-on tutoring is $15-35/hour. Compared to international schools ($15K-50K/year) or private tutoring ($30-100/hour), EduMeUp offers 85-95% cost savings with independently proven better outcomes.',
  },
  {
    q: 'Will universities accept homeschoolers using EduMeUp?',
    a: "Absolutely. EduMeUp prepares students for internationally recognized O-Level/IGCSE examinations. These qualifications are accepted by universities worldwide. 84% of our students receive university acceptance, including top institutions like LUMS, NUST, and international universities.",
  },
  {
    q: 'How does the AI Diagnostic Assessment work?',
    a: "Our AI diagnostic identifies knowledge gaps at the sub-skill level — not just 'weak in algebra' but specifically 'struggles with quadratic factorization when coefficients are negative.' This precision allows us to create truly personalized learning paths that address the root causes of academic struggles.",
  },
  {
    q: 'What is the "Get Ready" program and who is it for?',
    a: "Get Ready is the world's only dedicated O-Level bridge program, designed for students aged 12-14 (Grades 7-8) who are preparing for O-Level/IGCSE studies. It systematically fills knowledge gaps and builds exam readiness, ensuring students enter O-Level courses fully prepared.",
  },
  {
    q: 'Can parents monitor their child\'s progress?',
    a: "Yes. Parents get a comprehensive dashboard with real-time progress tracking, mastery percentages per subject, assignment completion, grade trends, and smart alerts for milestones or struggles. You'll always know exactly where your child stands.",
  },
  {
    q: 'What subjects and grade levels do you cover?',
    a: 'We offer complete curriculum coverage from Pre-K through O-Level/IGCSE (ages 4-16), with extensions to FSc/Intermediate (ages 17-18). Core subjects include Mathematics, Physics, Chemistry, Biology, English, Computer Science, Business Studies, and more.',
  },
  {
    q: 'How is the content delivered? What is "dual-coding"?',
    a: "Dual-coding means every concept is taught through two channels: video instruction AND interactive H5P activities. Research shows this visual+verbal encoding doubles memory strength. Our lessons include explanatory videos, drag-and-drop activities, quizzes, simulations, and hands-on practice problems.",
  },
  {
    q: 'What is your refund policy?',
    a: "We offer a 30-day money-back guarantee — no questions asked. If you're not satisfied within the first 30 days, we refund 100% of your payment. Our refund rate is less than 3% because the vast majority of students see meaningful improvement within the first month.",
  },
  {
    q: 'Do you offer support for schools and institutions?',
    a: "Yes. We offer institutional licensing with bulk pricing, school-wide dashboards, teacher management tools, curriculum alignment, and outcome guarantees (40%+ improvement). Contact us for a demo and custom pricing.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section className="bg-background section-padding-lg">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">Still have questions? We're here to help.</p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2 px-8" size="lg">
            Schedule Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
