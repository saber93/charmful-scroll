import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import PromoBannersGrid from "@/components/home/PromoBannersGrid";
import WelcomeSection from "@/components/home/WelcomeSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import DealOfTheDay from "@/components/home/DealOfTheDay";
import HotDealProducts from "@/components/home/HotDealProducts";
import PromoBanner from "@/components/home/PromoBanner";
import BrandsCarousel from "@/components/home/BrandsCarousel";
import Testimonials from "@/components/home/Testimonials";
import BlogSection from "@/components/home/BlogSection";
import InstagramGallery from "@/components/home/InstagramGallery";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PromoBannersGrid />
        <WelcomeSection />
        <CategoryGrid />
        <DealOfTheDay />
        <HotDealProducts />
        <PromoBanner />
        <BrandsCarousel />
        <Testimonials />
        <BlogSection />
        <InstagramGallery />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
