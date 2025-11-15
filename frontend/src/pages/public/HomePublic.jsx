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
      <Hero benefitsRef={benefitsRef}/>

      <FadeInSection>
        <Counter />
      </FadeInSection>

      <FadeInSection>
        <Card ref={benefitsRef}/>
      </FadeInSection>

      <FadeInSection>
        <HowItWorks />
      </FadeInSection>
    
      <FadeInSection>
        <Testimonies />
      </FadeInSection>

      <FadeInSection>
        <Start />
      </FadeInSection>
    </>
  );
}

export default HomePublic;