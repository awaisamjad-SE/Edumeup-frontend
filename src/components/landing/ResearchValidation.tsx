import { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const methods = [
  { title: 'Spaced Repetition', citation: 'Cepeda et al. (2006) — Psychological Bulletin', desc: 'Distributed practice produces 200-400% improvement in long-term retention.' },
  { title: 'Dual-Coding Theory', citation: 'Paivio (1991) — Cognition & Instruction', desc: 'Visual + verbal encoding doubles memory strength.' },
  { title: 'Active Learning', citation: 'Freeman et al. (2014) — PNAS', desc: 'Active learning reduces failure rates by 55% vs lectures.' },
  { title: 'Mastery Learning', citation: 'Bloom (1984) — Educational Researcher', desc: '90%+ students achieve mastery with proper feedback loops.' },
  { title: 'Retrieval Practice', citation: 'Roediger & Butler (2011) — Trends in Cognitive Sciences', desc: 'Testing effect produces 50% better long-term retention than restudying.' },
  { title: 'Formative Assessment', citation: 'Black & Wiliam (1998) — Assessment in Education', desc: 'Ongoing feedback produces 0.4-0.7 effect sizes on achievement.' },
];

const ResearchValidation = () => {
  const [showMethod, setShowMethod] = useState(false);

  return (
    <section className="bg-background section-padding-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
            Research Validation: Independent University Study
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't take our word for it — the science speaks for itself
          </p>
        </div>

        {/* Main study card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-light-blue border-[3px] border-deep-blue rounded-xl p-8 md:p-10 shadow-lg mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">🏆 INDEPENDENT UNIVERSITY STUDY</span>
            <span className="bg-muted text-muted-foreground text-xs font-bold px-3 py-1 rounded-full">PEER-REVIEWED</span>
            <span className="bg-muted text-muted-foreground text-xs font-bold px-3 py-1 rounded-full">2024</span>
          </div>

          <h3 className="text-xl font-bold font-heading text-foreground mb-6">
            University of Education Lahore — Randomized Controlled Trial
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Study info */}
            <div>
              <h4 className="font-bold font-heading text-foreground mb-3 text-sm uppercase tracking-wider text-muted-foreground">Study Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Institution</span><span className="font-semibold text-foreground">University of Education Lahore</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Sample Size</span><span className="font-semibold text-foreground">n=611 students</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-semibold text-foreground">18 months</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Design</span><span className="font-semibold text-foreground">Randomized Controlled Trial</span></div>
              </div>

              <button
                onClick={() => setShowMethod(!showMethod)}
                className="flex items-center gap-1 text-deep-blue font-semibold text-sm mt-4 hover:underline"
              >
                {showMethod ? 'Hide' : 'Show'} Full Methodology
                <ChevronDown className={`h-4 w-4 transition-transform ${showMethod ? 'rotate-180' : ''}`} />
              </button>

              {showMethod && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 text-sm text-muted-foreground leading-relaxed"
                >
                  Students were randomly assigned to treatment (EduMeUp methodology) and control (traditional instruction) groups. Both groups followed the same curriculum with identical assessment criteria. External examiners blind-graded all assessments.
                </motion.div>
              )}
            </div>

            {/* Key results */}
            <div>
              <h4 className="font-bold font-heading text-foreground mb-3 text-sm uppercase tracking-wider text-muted-foreground">Key Results</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-card rounded-lg p-3 border border-border">
                  <span className="text-sm text-foreground">Pass Rate</span>
                  <span className="font-bold font-heading text-green text-lg">91% vs 65%</span>
                </div>
                <div className="flex items-center justify-between bg-card rounded-lg p-3 border border-border">
                  <span className="text-sm text-foreground">High Grades (A/A*)</span>
                  <span className="font-bold font-heading text-deep-blue text-lg">47% vs 18%</span>
                </div>
                <div className="flex items-center justify-between bg-card rounded-lg p-3 border border-border">
                  <span className="text-sm text-foreground">Retention Rate</span>
                  <span className="font-bold font-heading text-deep-blue text-lg">94% vs 67%</span>
                </div>
                <div className="flex items-center justify-between bg-card rounded-lg p-3 border border-border">
                  <span className="text-sm text-foreground">Effect Size</span>
                  <span className="font-bold font-heading text-gold text-lg">d=0.72 (LARGE)</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">p&lt;0.001 (99.9% statistical confidence)</p>
            </div>
          </div>

          {/* Explainer */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-foreground">
              <strong>⚠️ What "p&lt;0.001" means:</strong> There is less than a 0.1% chance these results are due to random chance. This is the gold standard for scientific evidence, meaning EduMeUp's methodology reliably and significantly outperforms traditional instruction.
            </p>
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-deep-blue pl-4 italic text-foreground mb-6">
            "EduMeUp's systematic methodology produces outcomes that significantly exceed traditional instruction across all measured dimensions — pass rates, grade distribution, and long-term retention."
            <footer className="text-sm text-muted-foreground mt-2 not-italic">— Dr. Faheem Ahmed, Lead Researcher</footer>
          </blockquote>

          <Button variant="outline" className="gap-2 border-deep-blue text-deep-blue hover:bg-primary hover:text-primary-foreground">
            <Download className="h-4 w-4" /> Download Full Study (PDF)
          </Button>
        </motion.div>

        {/* Methods grid */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold font-heading text-foreground">
            Our Methods Validated by 15+ Peer-Reviewed Studies
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {methods.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <h4 className="font-bold font-heading text-foreground mb-1">{m.title}</h4>
              <p className="text-xs text-deep-blue font-medium mb-2">{m.citation}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchValidation;
