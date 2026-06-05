import HeroSection from '@/components/nnc-crm/HeroSection'
import SocialProofStrip from '@/components/nnc-crm/SocialProofStrip'
import ProblemStatement from '@/components/nnc-crm/ProblemStatement'
import ProductOverview from '@/components/nnc-crm/ProductOverview'
import FeaturesSection from '@/components/nnc-crm/FeaturesSection'
import HowItWorks from '@/components/nnc-crm/HowItWorks'
import BenefitsSection from '@/components/nnc-crm/BenefitsSection'
import TestimonialsSection from '@/components/nnc-crm/TestimonialsSection'
import PricingSection from '@/components/nnc-crm/PricingSection'
import IntegrationsSection from '@/components/nnc-crm/IntegrationsSection'
import FAQSection from '@/components/nnc-crm/FAQSection'
import FinalCTA from '@/components/nnc-crm/FinalCTA'
import NNCFooter from '@/components/nnc-crm/NNCFooter'

export const metadata = {
  title: 'NNC Digital CRM — Smart CRM Software for Small Businesses in India',
  description: 'Capture every lead, automate follow-ups, and close more deals. NNC Digital CRM is purpose-built for small and growing businesses in India. Try free for 14 days.',
}

export default function NNCCRMPage() {
  return (
    <main style={{ background: '#080c14' }}>
      <HeroSection />
      <SocialProofStrip />
      <ProblemStatement />
      <ProductOverview />
      <FeaturesSection />
      <HowItWorks />
      <BenefitsSection />
      <TestimonialsSection />
      <PricingSection />
      <IntegrationsSection />
      <FAQSection />
      <FinalCTA />
      <NNCFooter />
    </main>
  )
}
