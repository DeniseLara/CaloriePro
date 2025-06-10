import Slider from "react-slick";
import "./Testimonies.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Ana from '../../assets/ana.jpg';
import Carla from '../../assets/carla.jpg';
import Juan from '../../assets/juan.jpg';
import Luis from '../../assets/luis.jpg';


const Testimonies = () => {
  const testimonials = [
    {
      text: "CaloriePro helped me stay on track with my weight goals! It's incredibly easy to use.",
      author: "Ana Rodríguez",
      photo: Ana,
    },
    {
      text: "The control of my food and calories has been amazing. Now I can easily track and see my progress every day.",
      author: "Juan Pérez",
      photo: Juan,
    },
    {
      text: "The personalized dashboard is exactly what I needed to track my progress.",
      author: "Carla Gómez",
      photo: Carla,
    },
    {
      text: "It's the best app to maintain a healthy lifestyle!",
      author: "Luis García",
      photo: Luis,
    },
  ];

  const settings = {
    dots: true, // Agregar puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 1, // Mostrar un testimonio a la vez
    slidesToScroll: 1, // Deslizar un testimonio a la vez
    autoplay: true, // Hacer autoplay
    autoplaySpeed: 3000, // Tiempo de transición entre slides (3 segundos)
    arrows: false, 
  };

  return (
    <section className="services__swiper container">
        <h2 className="services__principal">User Testimonials</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="services__card">
              <div className="services__icon">
                <img className="services__image" loading="lazy" src={testimonial.photo} alt={testimonial.author} />
              </div>
              <h3 className="services__title">{testimonial.author}</h3>
              <p className="services__description">&quot;{testimonial.text}&quot;</p>
            </div>
          ))}
        </Slider>
    </section>
  );
}

export default Testimonies;
