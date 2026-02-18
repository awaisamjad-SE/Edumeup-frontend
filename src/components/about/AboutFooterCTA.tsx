import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const AboutFooterCTA = () => (
  <section className="gradient-cta section-padding-lg">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-primary-foreground mb-6 leading-tight">
        Ready to Start Your<br />EduMeUp Journey?
      </h2>
      <p className="text-lg text-primary-foreground/90 max-w-xl mx-auto mb-10">
        Join 50,000+ students who've discovered a better way to learn
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link to="/courses">
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-lg px-10 py-7 gap-2 shadow-xl">
            Start Free Diagnostic <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
        <Link to="/">
          <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-7">
            See How It Works
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {['50,000+ Students', '91% Pass Rate', 'Research-Backed', '30-Day Guarantee'].map(item => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary-foreground/70" />
            <span className="text-sm text-primary-foreground/80 font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutFooterCTA;
