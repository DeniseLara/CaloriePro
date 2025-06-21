import { useRef } from "react";

import Hero from "../../components/homepublic/Hero";
import Card from "../../components/homepublic/Card";
import Testimonies from "../../components/homepublic/Testimonies";
import Counter from "../../components/homepublic/Counter";
import HowItWorks from "../../components/homepublic/HowItWorks";
import Start from "../../components/homepublic/Start";
import FadeInSection from "../../components/ui/FadeInSection";

function PublicPage({ openSignUpModal }) {
  const benefitsRef = useRef();

  return (
    <>
    <div id="hero">
      <Hero openSignUpModal={openSignUpModal} benefitsRef={benefitsRef}/>
    </div>

   <div id="benefits" ref={benefitsRef}>
    <FadeInSection>
    <Card />
    </FadeInSection>
   </div>
    
    <div id="testimonials">
    <FadeInSection>
    <Testimonies />
    </FadeInSection>
    </div>
    
    <FadeInSection>
    <Counter />
    </FadeInSection>

    <div id="howitworks">
      <FadeInSection>
      <HowItWorks />
      </FadeInSection>
    </div>

    <FadeInSection>
    <Start openSignUpModal={openSignUpModal} />
    </FadeInSection>
    </>
  );
}

export default PublicPage;