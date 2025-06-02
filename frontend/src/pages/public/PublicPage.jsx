import Hero from "./Hero/Hero";
import Card from "./Getstarted/Card";
import Testimonies from "./Getstarted/Testimonies";
import Counter from "./Getstarted/Counter";
import HowItWorks from "./HowItWoks/HowItWorks";
import Start from "./Getstarted/Start";
import { useRef } from "react";

function PublicPage({ openSignUpModal }){
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