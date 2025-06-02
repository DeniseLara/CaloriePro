import './HowItWorks.css'
import { RiUserAddLine, RiSearchEyeLine, RiBarChartBoxLine } from 'react-icons/ri';

function HowItWorks(){
    return(
  <section className="how-it-works container">
   <div className="how-title">
     <h2>How It Works</h2>
     <p>Discover how easy it is to start tracking your calories and reach your goals!</p>
   </div>

  <div className="how-steps">

    <article className="step">
      <RiUserAddLine className="step-icon" aria-hidden="true"/>
      <h3>Sign Up</h3>
      <p>Create an account in seconds to get started.</p>
    </article>

    <article className="step">
      <RiSearchEyeLine className="step-icon" aria-hidden="true"/>
      <h3>Search & Save</h3>
      <p>Find your favorite foods and save them for easy tracking.</p>
    </article>

    <article className="step">
      <RiBarChartBoxLine className="step-icon" aria-hidden="true"/>
      <h3>Track Progress</h3>
      <p>Monitor your calorie intake with a personalized dashboard.</p>
    </article>

  </div>
</section>
    );
}

export default HowItWorks;