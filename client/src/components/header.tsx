import { Link } from 'react-router-dom';
import { type MouseEvent } from 'react';
import Auth from '../utils/auth';
import LogoImage from '../assets/ArtVine_transparent.png';

const Header = () => {
    const logout = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // Logs the user out by calling the logout method from Auth
        Auth.logout();
    };
    return (
        <header className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                        <img src={LogoImage} height="100px"></img>
                        ArtVine
                </Link>


                {/* The following block of code is for collapsing the navbar into a burger menu on mobile */}
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-main">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbar-main" className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/explore">
                        Explore
                    </Link>
                    <Link className="navbar-item" to="/about">
                        About
                    </Link>
                </div>

                <div className="navbar-end">
                    {/* Checking if the user is logged in to conditionally render profile link and logout button */}
                    {Auth.loggedIn() ? (
                        <>
                            <Link className="navbar-item" to="/library">
                                Library
                            </Link>
                            <Link className="navbar-item" to="/myProfile">
                                {/* Retrieving the logged-in user's profile to display the username */}
                                {Auth.getProfile().data.email}
                            </Link>
                            <button className="navbar-item" onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="navbar-item" to="/login">
                                Login
                            </Link>
                            <Link className="navbar-item" to="/signup">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header >
    );
};

export default Header;
