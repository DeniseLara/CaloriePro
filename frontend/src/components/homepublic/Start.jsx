import { useModal } from '../../context/ModalContext';
import './Start.css'; 

function Start() {
  const { openModal } = useModal();

  return (
    <section className="cta">
      <div className="cta-content container">
        <h2>¡Start now and improve your lifestyle!</h2>
        <p>
          Sign up to access all the tools and features that will help you 
          maintain proper control of your eating habits.
        </p>
        <button 
          className="cta-button" 
          onClick={openModal}
          type='button'
          aria-label='go to sign up form'
        >
          <span className="cta-button-text">
            START NOW
          </span>
        </button>
      </div>
    </section>
  );
}

export default Start;
