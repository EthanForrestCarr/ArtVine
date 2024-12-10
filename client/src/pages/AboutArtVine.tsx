import './AboutArtVine.css';
import LogoImage from '../assets/ArtVine_transparent.png';

const AboutUs = () => {

  return (
    <>
      <section className="hero is-small has-background-primary-dark">
        <div className="hero-body">
          <div className="columns">
            <div className="column is-one-fifth">
              <img className="is-pulled-right" src={LogoImage} height="120px" width="120px"></img>
            </div>
            <div className="column">
              <p className="title has-text-primary">Welcome to ArtVine</p>
              <p className="subtitle">Create and connect.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section>
          <h2>Our Purpose</h2>
          <p>At ArtVine, we aim to elevate the art of poetry by offering a platform where poets can share their work, engage with readers, and collaborate creatively.</p>
        </section>

        <section>
          <p className="title is-4">Key Features</p>
          <div className="columns is-2">
            <div className="box column">
              <p className="title is-5">Share Your Voice</p>
              <p>Upload and organize your poetry collections for a global audience. Share your words with the world and let your voice be heard.</p>
            </div>
            <div className="box column">
              <p className="title is-5">Explore the Collection</p>
              <p>Browse through a rich collection of poems from emerging and established poets, offering unique voices and perspectives.</p>
            </div>
            <div className="box column">
              <p className="title is-5">Collaborate Creatively</p>
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
    </>
  );
}

export default AboutUs;