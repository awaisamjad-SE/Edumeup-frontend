import Header from '@/components/Header';
import HeroSection from '@/components/landing/HeroSection';
import StatsBar from '@/components/landing/StatsBar';
import WhatIsEduMeUp from '@/components/landing/WhatIsEduMeUp';
import ProgramsGrid from '@/components/landing/ProgramsGrid';
import ServicesTabbed from '@/components/landing/ServicesTabbed';
import ComparisonTable from '@/components/landing/ComparisonTable';
import ResearchValidation from '@/components/landing/ResearchValidation';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import StakeholderCards from '@/components/landing/StakeholderCards';
import PricingSection from '@/components/landing/PricingSection';
import GuaranteesSection from '@/components/landing/GuaranteesSection';
import FAQSection from '@/components/landing/FAQSection';
import FinalCTA from '@/components/landing/FinalCTA';
import LandingFooter from '@/components/landing/LandingFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsBar />
      <WhatIsEduMeUp />
      <ProgramsGrid />
      <ServicesTabbed />
      <ComparisonTable />
      <ResearchValidation />
      <TestimonialsSection />
      <StakeholderCards />
      <PricingSection />
      <GuaranteesSection />
      <FAQSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
};

export default Index;
