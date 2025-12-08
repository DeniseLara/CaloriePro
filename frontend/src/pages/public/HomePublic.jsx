import { useRef } from "react";

import Hero from "../../components/homepublic/Hero";
import Card from "../../components/homepublic/Card";
import Testimonies from "../../components/homepublic/Testimonies";
import Counter from "../../components/homepublic/Counter";
import HowItWorks from "../../components/homepublic/HowItWorks";
import Start from "../../components/homepublic/Start";

function HomePublic() {
  const benefitsRef = useRef();

  return (
    <>
      <Hero benefitsRef={benefitsRef}/>

      <Counter />

      <Card ref={benefitsRef}/>

      <HowItWorks />
    
      <Testimonies />

      <Start />
    </>
  );
}

export default HomePublic;