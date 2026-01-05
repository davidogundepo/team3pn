import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ChooseYourPath from "@/components/ChooseYourPath";
import RealStories from "@/components/RealStories";
import FounderSection from "@/components/FounderSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ChooseYourPath />
        <RealStories />
        <FounderSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;