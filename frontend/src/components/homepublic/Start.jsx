import { useModal } from '../../context/ModalContext';
import styles from './Start.module.css'; 

function Start() {
  const { openModal } = useModal();

  return (
    <section className={`section ${styles.start}`}>
      <div className={`container ${styles.startContainer}`}>
        <div className={styles.startContent}>
          <h2 className={`section__title ${styles.startTitle}`}>
            ¡Start now and improve your lifestyle!
          </h2>
          <p>
            Sign up to access all the tools and features that will help you 
            maintain proper control of your eating habits.
          </p>
          <button 
            className={styles.startButton} 
            onClick={openModal}
            type='button'
            aria-label='go to sign up form'
          >
            <span className={styles.startSpan}>
              START NOW
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Start;
