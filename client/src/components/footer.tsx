import React from 'react';
import logo from '../assets/ArtVine_transparent.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <img src={logo} alt="ArtVine Logo" style={{ width: '50px', height: 'auto'}} />
        <p>
          Content copyright &copy; {new Date().getFullYear()} by ArtVine. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
