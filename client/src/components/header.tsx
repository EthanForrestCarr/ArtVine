import { Link, useLocation } from 'react-router-dom';
import { type MouseEvent } from 'react';
import Auth from '../utils/auth.js';
import LogoImage from '../assets/ArtVine_transparent.png';

const Header = () => {
    const logout = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // Logs the user out by calling the logout method from Auth
        Auth.logout();
    };

    let currentPage = useLocation().pathname;
    const selectedStyle = 'navbar-item has-background-primary has-text-black';
    const unselectedStyle = 'navbar-item has-text-white';

    return (
        <header className="navbar is-fixed-top has-background-black" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link key={1} to="/"
                    className={currentPage === "/" ? selectedStyle : unselectedStyle}>
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
                    <Link key={2} to="/explore"
                        className={currentPage === "/explore" ? selectedStyle : unselectedStyle}>
                        Explore
                    </Link>
                    <Link key={3} to="/about"
                        className={currentPage === "/about" ? selectedStyle : unselectedStyle}>
                        About
                    </Link>
                </div>

                <div className="navbar-end">
                    {/* Checking if the user is logged in to conditionally render profile link and logout button */}
                    {Auth.loggedIn() ? (
                        <>
                            <Link key={4} to="/library"
                                className={currentPage === "/library" ? selectedStyle : unselectedStyle}>
                                Library
                            </Link>
                            <Link key={5} to="/myProfile"
                                className={currentPage === "/myProfile" ? selectedStyle : unselectedStyle}>
                                {/* Retrieving the logged-in user's profile to display the username */}
                                {Auth.getProfile()?.data.email}
                            </Link>
                            <a className="navbar-item has-text-white">
                                <button onClick={logout}>
                                    Logout
                                </button>
                            </a>
                        </>
                    ) : (
                        <>
                            <Link key={6} to="/login"
                                className={currentPage === "/login" ? selectedStyle : unselectedStyle}>
                                Login
                            </Link>
                            <Link key={7} to="/signup"
                                className={currentPage === "/signup" ? selectedStyle : unselectedStyle}>
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
