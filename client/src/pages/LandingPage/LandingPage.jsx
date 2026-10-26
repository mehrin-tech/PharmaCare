import React from 'react'
import Navbar from '../../components/Landing/Navbar'
import HeroSection from '../../components/Landing/HeroSection'
import AboutSection from '../../components/Landing/AboutSection'
import HowItWorks from '../../components/Landing/HowItsWork'
import TopOffers from '../../components/Landing/TopOffers'
import WhyTrustUs from '../../components/Landing/WhyTrustUs'
import PartnerWithUs from '../../components/Landing/PatnerWithUs'
import Footer from '../../components/Landing/Footer'
const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <AboutSection/>
      <HowItWorks/>
      <TopOffers/>
      <WhyTrustUs/>
      <PartnerWithUs/>
      <Footer/>

    </div>
  )
}

export default LandingPage
