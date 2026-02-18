import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <BookOpen className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="text-lg font-bold font-display">EduMeUp</span>
          </Link>
          <p className="text-sm text-primary-foreground/70">
            Empowering learners worldwide with quality education and expert instructors.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/60">Explore</h4>
          <div className="space-y-2">
            <Link to="/courses" className="block text-sm text-primary-foreground/80 hover:text-secondary transition-colors">Courses</Link>
            <Link to="/dashboard" className="block text-sm text-primary-foreground/80 hover:text-secondary transition-colors">My Learning</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/60">Support</h4>
          <div className="space-y-2">
            <span className="block text-sm text-primary-foreground/80">Help Center</span>
            <span className="block text-sm text-primary-foreground/80">Contact Us</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/60">Legal</h4>
          <div className="space-y-2">
            <span className="block text-sm text-primary-foreground/80">Privacy Policy</span>
            <span className="block text-sm text-primary-foreground/80">Terms of Service</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} EduMeUp. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
