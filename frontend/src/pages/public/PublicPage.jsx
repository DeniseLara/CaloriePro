import { useRef } from "react";

import Hero from "../../components/homepublic/Hero";
import Card from "../../components/homepublic/Card";
import Testimonies from "../../components/homepublic/Testimonies";
import Counter from "../../components/homepublic/Counter";
import HowItWorks from "../../components/homepublic/HowItWorks";
import Start from "../../components/homepublic/Start";

const PublicPage = ({ openSignUpModal }) => {
  const benefitsRef = useRef();

  return (
    <>
    <div id="hero">
      <Hero openSignUpModal={openSignUpModal} benefitsRef={benefitsRef}/>
    </div>

   <div id="benefits" ref={benefitsRef}>
    <Card />
   </div>
    
    <div id="testimonials">
    <Testimonies />
    </div>

    <Counter />

    <div id="howitworks">
      <HowItWorks />
    </div>
    <Start openSignUpModal={openSignUpModal} />
    </>
  );
}

export default PublicPage;