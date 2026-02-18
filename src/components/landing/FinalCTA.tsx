import { ArrowRight, Calendar, Download, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const trustItems = [
  '2,000+ Students',
  '91% Pass Rate',
  '15+ Research Studies',
  '24/7 AI Support',
];

const FinalCTA = () => {
  return (
    <section className="gradient-cta section-padding-lg">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-primary-foreground mb-6 leading-tight">
            Ready to Transform Your<br />Learning Journey?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10">
            Join 2,000+ students across 25+ countries who are achieving academic excellence with research-backed methodology.
          </p>

          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-lg px-12 py-7 gap-2 shadow-xl mb-6"
          >
            Start Free Diagnostic Now <ArrowRight className="h-5 w-5" />
          </Button>

          <p className="text-sm text-primary-foreground/60 mb-12">
            No credit card required · 2-3 hours · Instant personalized roadmap
          </p>

          {/* Action cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto mb-12">
            {[
              { icon: Calendar, title: 'Schedule Consultation', desc: 'Free 30-min call with our education advisor' },
              { icon: Download, title: 'Download Research Study', desc: 'Full peer-reviewed study (PDF)' },
              { icon: MessageCircle, title: 'Contact Our Team', desc: 'Live chat, email, or WhatsApp' },
            ].map((action, i) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-dark rounded-xl p-5 cursor-pointer card-lift"
              >
                <action.icon className="h-6 w-6 text-primary-foreground mb-3 mx-auto" />
                <h3 className="text-sm font-bold text-primary-foreground mb-1">{action.title}</h3>
                <p className="text-xs text-primary-foreground/60">{action.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust bar */}
          <div className="glass-dark rounded-xl p-4 max-w-2xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              {trustItems.map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-foreground/70" />
                  <span className="text-sm text-primary-foreground/80 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
