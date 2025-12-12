import styles from "./Testimonies.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { PiStarFill, PiStarThin } from "react-icons/pi";
import { TestimoniesHeader, TestimoniesSlider } from '../ui/Animation/TestimoniesSection';

import Ana from '../../assets/testimonie1.webp';
import Carla from '../../assets/testimonie3.webp';
import Juan from '../../assets/testimonie2.webp';
import Luis from '../../assets/testimonie4.webp';

function Testimonies() {
  const testimonials = [
    {
      text: "CaloriePro helped me stay on track with my weight goals! It's incredibly easy to use.",
      author: "Ana Rodríguez",
      occupation: "Fitness Coach",
      photo: Ana,
      avatar: "bg-pink-500",
      rating: 5
    },
    {
      text: "The personalized dashboard is exactly what I needed to track my progress.",
      author: "Carla Gómez",
      occupation: "Nutritionist",
      photo: Carla,
      avatar: "bg-purple-500",
      rating: 4
    },
    {
      text: "The control of my food and calories has been amazing. Now I can easily track and see my progress every day.",
      author: "Juan Pérez",
      occupation: "Student",
      photo: Juan,
      avatar: "bg-blue-500",
      rating: 5
    },
    {
      text: "It's the best app to maintain a healthy lifestyle!",
      author: "Luis García",
      occupation: "Office Worker",
      photo: Luis,
      avatar: "bg-orange-500",
      rating: 4
    },
  ];

  return (
    <section className={`section ${styles.services}`} id="testimonials">
      <div className={`container ${styles.servicesContainer}`}>
        <TestimoniesHeader>
        <header className={styles.testimoniesHeader}>
          <h2 className={`section__title ${styles.servicesTitle}`}>
            What The People Thinks About Us
          </h2>
          <p>
            Your journey starts here. See how CaloriePro is transforming 
            daily habits and real lives.
          </p>
        </header>
        </TestimoniesHeader>
         
        <TestimoniesSlider>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          loop={true}
          className={styles.slider}
        >
        
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <article className={styles.servicesCard}>
                <div className={styles.servicesHeader}>
                  <img 
                    className={styles.servicesImage} 
                    loading="lazy" 
                    src={t.photo} 
                    alt={t.author} 
                  />
                  <div className={styles.authorInfo}>
                    <h4 className={styles.author}>{t.author}</h4>
                    <p>{t.occupation}</p>
                  </div>
                </div>

                <div className={styles.rating}>
                {[...Array(5)].map((_, i) =>
                  i < t.rating ? (
                    <PiStarFill key={i} className={styles.starActive} />
                  ) : (
                    <PiStarThin key={i} className={styles.starInactive} />
                  )
                )}
                </div>

                <p className={styles.servicesDescription}>
                  "{t.text}"
                </p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        </TestimoniesSlider>
        </div>
    </section>
  );
}

export default Testimonies;
