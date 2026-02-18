import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    key: 'students',
    label: 'Students',
    services: [
      { icon: '🔍', title: 'AI Diagnostic Assessment', desc: 'Pinpoint knowledge gaps at sub-skill level with our adaptive AI engine.' },
      { icon: '🛠️', title: 'Remedial Programs', desc: 'Targeted intervention to close gaps before advancing to new content.' },
      { icon: '🎬', title: 'Dual-Coding Lessons', desc: 'Video + interactive H5P activities for 75%+ retention.' },
      { icon: '📝', title: 'Past Paper Practice', desc: 'Authentic exam papers with marking schemes and examiner tips.' },
      { icon: '📅', title: 'Spaced Review System', desc: 'AI-scheduled reviews at optimal intervals to prevent forgetting.' },
      { icon: '📊', title: 'Progress Dashboard', desc: 'Real-time mastery tracking across all subjects and topics.' },
      { icon: '🤖', title: 'AI Study Assistant', desc: '24/7 AI chatbot for instant help with homework and concepts.' },
      { icon: '👨‍🏫', title: 'Expert Tutors', desc: 'On-demand one-on-one tutoring sessions with qualified teachers.' },
      { icon: '📱', title: 'Mobile Learning', desc: 'Full access on any device — learn anytime, anywhere.' },
    ],
  },
  {
    key: 'parents',
    label: 'Parents',
    services: [
      { icon: '📊', title: 'Real-Time Progress Reports', desc: 'See exactly where your child stands in every subject.' },
      { icon: '🔔', title: 'Smart Alerts', desc: 'Get notified about milestones, struggles, and upcoming reviews.' },
      { icon: '👨‍👩‍👧', title: 'Parent Dashboard', desc: 'Comprehensive overview of all linked students\' progress.' },
      { icon: '💬', title: 'Teacher Communication', desc: 'Direct messaging with assigned teachers and tutors.' },
      { icon: '📝', title: 'Homework Tracking', desc: 'Monitor assignments, submissions, and grades.' },
      { icon: '🎯', title: 'Goal Setting', desc: 'Set academic targets and track progress toward them.' },
      { icon: '📅', title: 'Schedule Management', desc: 'View and manage tutoring sessions and study schedules.' },
      { icon: '💰', title: 'Cost Savings Calculator', desc: 'Compare your spending to traditional alternatives.' },
      { icon: '🔒', title: 'Safe Learning Environment', desc: 'Controlled, ad-free platform with parental controls.' },
    ],
  },
  {
    key: 'teachers',
    label: 'Teachers',
    services: [
      { icon: '📚', title: 'Course Creation Tools', desc: 'Build and publish courses with our intuitive LMS editor.' },
      { icon: '📊', title: 'Student Analytics', desc: 'Deep insights into student performance and engagement.' },
      { icon: '📝', title: 'Assessment Builder', desc: 'Create quizzes, assignments, and exams with auto-grading.' },
      { icon: '👨‍🏫', title: 'Tutoring Platform', desc: 'Set availability, manage sessions, and earn competitively.' },
      { icon: '🎓', title: 'Professional Development', desc: 'Access teaching resources and certification programs.' },
      { icon: '💬', title: 'Student Communication', desc: 'Direct messaging and group announcements.' },
      { icon: '📅', title: 'Schedule Management', desc: 'Manage your teaching calendar and availability.' },
      { icon: '💰', title: 'Competitive Earnings', desc: '$15-35/hour for tutoring with flexible schedules.' },
      { icon: '🏆', title: 'Recognition System', desc: 'Build your reputation through reviews and ratings.' },
    ],
  },
  {
    key: 'schools',
    label: 'Schools',
    services: [
      { icon: '🏫', title: 'School Dashboard', desc: 'Institutional overview of all students and teachers.' },
      { icon: '📊', title: 'Performance Analytics', desc: 'School-wide and class-level performance reports.' },
      { icon: '🔗', title: 'LMS Integration', desc: 'Seamless Moodle integration with existing infrastructure.' },
      { icon: '👨‍🏫', title: 'Teacher Management', desc: 'Onboard, manage, and monitor teaching staff.' },
      { icon: '📚', title: 'Curriculum Alignment', desc: 'Map content to national and international standards.' },
      { icon: '💰', title: 'Bulk Licensing', desc: 'Volume pricing for schools with group management.' },
      { icon: '📝', title: 'Reporting Tools', desc: 'Exportable reports for board meetings and parents.' },
      { icon: '🔒', title: 'Data Security', desc: 'GDPR-compliant with enterprise-grade security.' },
      { icon: '🎯', title: 'Outcome Guarantees', desc: '40%+ improvement guarantee for institutional partners.' },
    ],
  },
  {
    key: 'homeschool',
    label: 'Homeschool',
    services: [
      { icon: '🏡', title: 'Complete Curriculum', desc: 'Full Pre-K to O-Level coverage — no gaps, no supplements needed.' },
      { icon: '🎯', title: 'Personalized Pacing', desc: 'Learn at your own speed with mastery-based progression.' },
      { icon: '📊', title: 'Parent Progress Tools', desc: 'Track multiple children with detailed progress reports.' },
      { icon: '🎓', title: 'Accredited Pathways', desc: 'O-Level/IGCSE certification with university acceptance.' },
      { icon: '👨‍🏫', title: 'Teacher Support', desc: 'Access qualified teachers when you need expert help.' },
      { icon: '💰', title: '85-95% Cost Savings', desc: 'vs international schools, with better outcomes.' },
      { icon: '🌍', title: 'Global Community', desc: 'Connect with homeschooling families worldwide.' },
      { icon: '📱', title: 'Flexible Scheduling', desc: 'Learn anytime — perfect for traveling families.' },
      { icon: '📝', title: 'Portfolio Building', desc: 'Documented learning journey for university applications.' },
    ],
  },
];

const ServicesTabbed = () => {
  const [activeTab, setActiveTab] = useState('students');
  const activeServices = tabs.find(t => t.key === activeTab)?.services || [];

  return (
    <section className="bg-background section-padding-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
            Services & Resources: Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tailored experiences for every stakeholder in the education journey
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-muted rounded-xl p-1 gap-1 flex-wrap justify-center">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Service cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {activeServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-card border border-border rounded-xl p-5 card-lift"
              >
                <div className="text-2xl mb-3">{service.icon}</div>
                <h3 className="text-base font-bold font-heading text-foreground mb-1">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesTabbed;
