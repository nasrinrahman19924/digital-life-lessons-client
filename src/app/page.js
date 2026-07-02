import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Home/Hero/Hero";
import FeaturedLessons from "@/components/Home/FeaturedLessons/FeaturedLessons";
import WhyLearning from "@/components/Home/WhyLearning/WhyLearning";
import TopContributors from "@/components/Home/TopContributors/TopContributors";
import MostSavedLessons from "@/components/Home/MostSavedLessons/MostSavedLessons";
import PremiumCTA from "@/components/Home/CTA/PremiumCTA";
import Newsletter from "@/components/Home/Newsletter/Newsletter";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Hero />
        <FeaturedLessons />
        <WhyLearning />
        <TopContributors />
        <MostSavedLessons />
        <PremiumCTA />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
