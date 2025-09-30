import { useRef } from "react";

import Hero from "../../components/homepublic/Hero";
import Card from "../../components/homepublic/Card";
import Testimonies from "../../components/homepublic/Testimonies";
import Counter from "../../components/homepublic/Counter";
import HowItWorks from "../../components/homepublic/HowItWorks";
import Start from "../../components/homepublic/Start";
import FadeInSection from "../../components/ui/Animation/FadeInSection";

function HomePublic() {
  const benefitsRef = useRef();

  return (
    <>
      <div id="hero">
        <Hero 
          benefitsRef={benefitsRef}
        />
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
      <Start />
      </FadeInSection>
    </>
  );
}

export default HomePublic;