import CommunityStats from "@/components/home/CommunityStats";
import FeaturedRecipesSection from "@/components/home/FeaturedRecipesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import NewsletterCTA from "@/components/home/NewsLetter";
import PopularRecipesSection from "@/components/home/PopularRecipesSection";
import PricingSection from "@/components/home/PricingSection";
import WhyChooseRecipeHub from "@/components/home/WhyChooseRecipeHub";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <CommunityStats />
      <FeaturedRecipesSection />
      <WhyChooseRecipeHub />
      <PopularRecipesSection />
      <PricingSection/>
      <HowItWorks />
      <NewsletterCTA />
    </section>
  );
}
