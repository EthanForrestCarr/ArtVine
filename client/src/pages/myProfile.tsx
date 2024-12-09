import React, { useState } from 'react';
import CompositionForm from '../components/compositionForm';
import CompositionList from '../components/compositionList';
import Auth from '../utils/auth';

const MyProfile: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const userEmail = Auth.loggedIn() ? Auth.getProfile().data.email : '';

    const toggleForm = () => {
        setShowForm((prev) => !prev);
    };

    if (!Auth.loggedIn()) {
        return <p>You need to be logged in to view this page.</p>;
    }

    return (
        <div className="profile-page" style={{ padding: '2rem' }}>
            <h2>Welcome, {userEmail}</h2>
            <button
                onClick={toggleForm}
                style={{
                    margin: '1rem 0',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                }}
            >
                {showForm ? 'Hide Form' : 'Add a Poem'}
            </button>
            {showForm && <CompositionForm />}
            <h3>Your Poems</h3>
            <CompositionList filterByAuthor={true}/>
        </div>
    );
};

export default MyProfile;
