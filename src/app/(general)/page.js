import { Suspense } from "react";
import CommunityStats from "@/components/home/CommunityStats";
import FeaturedRecipesSection from "@/components/home/FeaturedRecipesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import NewsletterCTA from "@/components/home/NewsLetter";
import PopularRecipesSection from "@/components/home/PopularRecipesSection";
import PricingSection from "@/components/home/PricingSection";
import SectionLoading from "@/components/ui/SectionLoading";
import SectionReveal from "@/components/home/SectionReveal";
import WhyChooseRecipeHub from "@/components/home/WhyChooseRecipeHub";

export default function Home() {
  return (
    <section>
      <SectionReveal>
        <HeroSection />
      </SectionReveal>

      <SectionReveal delay={0.05}>
        <CommunityStats />
      </SectionReveal>

      <Suspense
        fallback={
          <SectionLoading
            label="Loading featured recipes..."
            className="py-24"
          />
        }
      >
        <SectionReveal delay={0.08}>
          <FeaturedRecipesSection />
        </SectionReveal>
      </Suspense>

      <SectionReveal delay={0.05}>
        <WhyChooseRecipeHub />
      </SectionReveal>

      <Suspense
        fallback={
          <SectionLoading
            label="Loading popular recipes..."
            className="py-24"
          />
        }
      >
        <SectionReveal delay={0.08}>
          <PopularRecipesSection />
        </SectionReveal>
      </Suspense>

      <SectionReveal delay={0.05}>
        <PricingSection />
      </SectionReveal>

      <SectionReveal delay={0.05}>
        <HowItWorks />
      </SectionReveal>

      <SectionReveal delay={0.05}>
        <NewsletterCTA />
      </SectionReveal>
    </section>
  );
}
