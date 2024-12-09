
import { useNavigate } from 'react-router-dom';


const AboutArtVine = () => {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-body has-text-centered">
      <p className="title">Hi, I'm the about page</p>
      </div>
      </section>
      <button className="button is-primary" onClick={handleBack}>Back</button>

    </>
  );
};

export default AboutArtVine;