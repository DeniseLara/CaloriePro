import './Card.css'
import { FaUtensils, FaChartPie, FaClipboardList } from "react-icons/fa";

const features = [
  {
    icon: <span className="card-icon"><FaUtensils /></span>,
    title: "Calorie tracker",
    description: "Keep precise track of your daily calorie intake with just a few clicks."
  },
  {
    icon: <span className="card-icon"><FaChartPie /></span>,
    title: "Personalized Dashboard",
    description: "View your progress and set goals easily."
  },
  {
    icon: <span className="card-icon"><FaClipboardList /></span>,
    title: "Food History",
    description: "Review all the foods you've logged and track your calorie intake."
  }
];


const Card = () => {

    return(
    <div className="card container">
           {features.map((feature, index) => (
    <div key={index} className="card-content">
      <div className="card-title">
        {feature.icon}
        {feature.title}
      </div>
      <p className="card-description">{feature.description}</p>
    </div>
    ))}
    </div>
  )
};

export default Card;