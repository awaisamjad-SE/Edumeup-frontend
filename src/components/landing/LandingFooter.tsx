import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  forLearners: [
    { label: 'Students', to: '/courses' },
    { label: 'Parents', to: '/' },
    { label: 'Homeschool Families', to: '/' },
    { label: 'Teachers', to: '/' },
    { label: 'Schools', to: '/' },
    { label: 'Free Diagnostic', to: '/' },
    { label: 'Course Catalog', to: '/courses' },
    { label: 'Pricing', to: '/' },
  ],
  resources: [
    { label: 'Features', to: '/' },
    { label: 'Get Ready Program', to: '/' },
    { label: 'Tutoring', to: '/' },
    { label: 'Research Study', to: '/' },
    { label: 'Success Stories', to: '/' },
    { label: 'Blog', to: '/' },
    { label: 'FAQ', to: '/' },
    { label: 'Support Center', to: '/' },
  ],
  legal: [
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms of Service', to: '/' },
    { label: 'Refund Policy', to: '/' },
    { label: 'Guarantee Terms', to: '/' },
  ],
};

const socialIcons = [Facebook, Twitter, Instagram, Linkedin, Youtube];

const LandingFooter = () => {
  return (
    <footer className="bg-navy">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                <BookOpen className="h-5 w-5 text-secondary-foreground" />
              </div>
              <span className="text-xl font-bold font-heading text-primary-foreground">EduMeUp</span>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed mb-6">
              Research-backed education platform transforming learning outcomes for Pre-K to O-Level students worldwide. Independently validated by a peer-reviewed university study.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((Icon, i) => (
                <a key={i} href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* For Learners */}
          <div>
            <h4 className="text-sm font-bold text-primary-foreground/50 uppercase tracking-wider mb-4">For Learners</h4>
            <div className="space-y-2.5">
              {footerLinks.forLearners.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block text-[15px] text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-primary-foreground/50 uppercase tracking-wider mb-4">Resources</h4>
            <div className="space-y-2.5">
              {footerLinks.resources.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block text-[15px] text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-sm font-bold text-primary-foreground/50 uppercase tracking-wider mb-4">Legal & Contact</h4>
            <div className="space-y-2.5 mb-6">
              {footerLinks.legal.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block text-[15px] text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2 text-sm text-primary-foreground/60">
              <p>📧 admin@edumeup.com</p>
              <p>🕒 24/7 AI Support + Business Hours Team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-navy-dark py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-primary-foreground/40 gap-2">
          <span>© {new Date().getFullYear()} EduMeUp by Softsincs. All rights reserved.</span>
          <span>Powered by Moodle | Edwiser</span>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
