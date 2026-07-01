import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Home/Hero/Hero";
import FeaturedLessons from "@/components/Home/FeaturedLessons/FeaturedLessons";
import WhyLearning from "@/components/Home/WhyLearning/WhyLearning";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
       <Hero/>
       <FeaturedLessons/>
         <WhyLearning />
      </main>

      <Footer />
    </>
  );
}