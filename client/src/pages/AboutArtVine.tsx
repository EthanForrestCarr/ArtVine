import { useNavigate } from 'react-router-dom';
import './AboutArtVine.css';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
    <section className="header">
      <div className="header-body">
        <p className="title">Welcome to ArtVine</p>
        <p className="subtitle">Where Poetry Blooms and Voices Resonate</p>
      </div>
    </section>

    <button className="button primary" onClick={handleBack}>
      Back
    </button>

    <div className="container">
      <section>
        <h2>Our Purpose</h2>
        <p>At ArtVine, we aim to elevate the art of poetry by offering a platform where poets can share their work, engage with readers, and collaborate creatively.</p>
      </section>

      <section>
        <h2>Key Features</h2>
          <div className="features">
          <div className="feature-card">
            <h3>Share Your Voice</h3>
            <p>Upload and organize your poetry collections for a global audience. Share your words with the world and let your voice be heard.</p>
          </div>
          <div className="feature-card">
            <h3>Explore the Collection</h3>
            <p>Browse through a rich collection of poems from emerging and established poets, offering unique voices and perspectives.</p>
          </div>
          <div className="feature-card">
            <h3>Collaborate Creatively</h3>
            <p>Connect with other poets, readers, and artists to explore new creative opportunities and projects.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Responsive & User-Friendly</h2>
        <p>ArtVine is designed with you in mind, providing an easy and enjoyable experience for both poets and readers. Whether on desktop or mobile, enjoy the simplicity and beauty of the platform.</p>
      </section>

      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have a question or want to collaborate? Reach out to individual poets or get in touch with our team directly.</p>
        <p>For inquiries or collaborations, contact us at or contact us individually.</p>
        <p><a href="https://github.com/EthanForrestCarr/ArtVine" className="contact-link">collaborate or contact @artvine.com</a></p>
      </section>
    </div>

    

      <h3>Collaboration Members</h3>
        <div className="collaboration">

          <div className="collaboration-member">
            <h4>Brad Shurts</h4>
            <a href="https://github.com/modifiedyoke" className="contact-link">Brad Shurts</a>
          </div>

          <div className="collaboration-member">
            <h4>Chris Groth</h4>
            <a href="https://github.com/cgroth06" className="contact-link">Chris Groth</a>
          </div>

          <div className="collaboration-member">
            <h4>Dimintri Lo</h4>
            <a href="https://github.com/DimintriLo" className="contact-link">Dimintri Lo</a>
          </div>

          <div className="collaboration-member">
            <h4>Ethan Carr</h4>
            <a href="https://github.com/EthanForrestCarr" className="contact-link">Ethan Carr</a>
          </div>

          <div className="collaboration-member">
            <h4>Yahye Mohamed</h4>
            <a href="https://github.com/yahye-mohamed101" className="contact-link">Yahye Mohamed</a>
          </div>
        </div>

        

    <footer className="footer">
      <p>&copy; 2024 ArtVine. All Rights Reserved.</p>
    </footer>
    </>
  );
}

export default AboutUs;
