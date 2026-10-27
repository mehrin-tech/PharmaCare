// import React from 'react'
// import Navbar from '../../components/Landing/Navbar'
// import HeroSection from '../../components/Landing/HeroSection'
// import AboutSection from '../../components/Landing/AboutSection'
// import HowItWorks from '../../components/Landing/HowItsWork'
// import TopOffers from '../../components/Landing/TopOffers'
// import WhyTrustUs from '../../components/Landing/WhyTrustUs'
// import PartnerWithUs from '../../components/Landing/PatnerWithUs'
// import Footer from '../../components/Landing/Footer'
// const LandingPage = () => {
//   return (
//     <div>
//       <Navbar/>
//       <HeroSection/>
//       <AboutSection/>
//       <HowItWorks/>
//       <TopOffers/>
//       <WhyTrustUs/>
//       <PartnerWithUs/>
//       <Footer/>

//     </div>
//   )
// }

// export default LandingPage



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
      <Navbar />

      <div id="home" className="scroll-mt-24">
        <HeroSection />
      </div>

      <div id="about" className="scroll-mt-24">
        <AboutSection />
      </div>

      <div id="how-it-works" className="scroll-mt-24">
        <HowItWorks />
      </div>

      <div id="top-offers" className="scroll-mt-24">
        <TopOffers />
      </div>

      <div id="why-pharmacare" className="scroll-mt-24">
        <WhyTrustUs />
      </div>

      <PartnerWithUs />

      <Footer />
    </div>
  )
}

export default LandingPage
