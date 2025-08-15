import './Card.css'
import { FaUtensils, FaChartPie, FaClipboardList } from "react-icons/fa";

const features = [
  {
    icon: <FaUtensils />,
    title: "Calorie tracker",
    description: "Keep precise track of your daily calorie intake with just a few clicks."
  },
  {
    icon: <FaChartPie />,
    title: "Personalized Dashboard",
    description: "View your progress and set goals easily."
  },
  {
    icon: <FaClipboardList />,
    title: "Food History",
    description: "Review all the foods you've logged and track your calorie intake."
  }
];


function Card() {

  return(
    <section className="card container">
      {features.map((feature, index) => (
        <article key={index} className="card-content">
          <header className="card-title">
            <span className="card-icon">{feature.icon}</span>
            {feature.title}
          </header>
          <p className="card-description">{feature.description}</p>
        </article>
      ))}
    </section>
  )
};

export default Card;