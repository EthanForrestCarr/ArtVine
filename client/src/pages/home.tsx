import React from 'react';
import CompositionList from '../components/compositionList.jsx';
import LogoImage from '../assets/ArtVine_transparent.png';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <section className="hero is-small has-background-primary-dark">
                <div className="hero-body">
                    <div className="columns is-flex-direction-row">
                        <div className="column is-one-fifth">
                            <img className="is-pulled-right" src={LogoImage}></img>
                        </div>
                        <div className="column is-four-fifths">
                            <p className="title has-text-primary">Welcome to ArtVine</p>
                            <p className="subtitle">Create and connect.</p>
                        </div>
                    </div>
                </div>
            </section>
            <CompositionList />
            <p className="mt-2">
                Use the left (<kbd>←</kbd>) and right (<kbd>→</kbd>) arrow keys to navigate through poems.
            </p>
        </div>
    );
};

export default Home;


