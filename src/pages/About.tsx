import { useEffect } from 'react';
import Header from '@/components/Header';
import LandingFooter from '@/components/landing/LandingFooter';
import AboutHero from '@/components/about/AboutHero';
import ProblemSection from '@/components/about/ProblemSection';
import OriginTimeline from '@/components/about/OriginTimeline';
import MissionVisionValues from '@/components/about/MissionVisionValues';
import ApproachMethod from '@/components/about/ApproachMethod';
import ImpactOutcomes from '@/components/about/ImpactOutcomes';
import RecognitionPartners from '@/components/about/RecognitionPartners';
import FounderSection from '@/components/about/FounderSection';
import JoinMission from '@/components/about/JoinMission';
import AboutFooterCTA from '@/components/about/AboutFooterCTA';

const About = () => {
  useEffect(() => {
    document.title = 'Our Story – EduMeUp | Transforming Education in Pakistan Since 2016';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', "Discover EduMeUp's mission to provide world-class education to every Pakistani student. Learn about our journey from a single classroom to Pakistan's leading adaptive learning platform.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AboutHero />
      <ProblemSection />
      <OriginTimeline />
      <MissionVisionValues />
      <ApproachMethod />
      <ImpactOutcomes />
      <RecognitionPartners />
      <FounderSection />
      <JoinMission />
      <AboutFooterCTA />
      <LandingFooter />
    </div>
  );
};

export default About;
