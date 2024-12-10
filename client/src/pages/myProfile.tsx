import React, { useState } from 'react';
import CompositionForm from '../components/compositionForm.jsx';
import CompositionList from '../components/compositionList.jsx';
import Auth from '../utils/auth.js';

const MyProfile: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const userEmail = Auth.loggedIn() ? Auth.getProfile()?.data.email : '';

    const toggleForm = () => {
        setShowForm((prev) => !prev);
    };

    if (!Auth.loggedIn()) {
        return <p>You need to be logged in to view this page.</p>;
    }

    return (
        <div className="profile-page" style={{ padding: '2rem' }}>
            <p className="title is-3">Welcome, {userEmail}</p>
            <button
                className="button is-primary mb-2"
                onClick={toggleForm}
            >
                {showForm ? 'Hide Form' : 'Add a Poem'}
            </button>
            {showForm && <CompositionForm />}
            <p className="title is-4">Your Poems</p>
            <CompositionList filterByAuthor={true}/>
        </div>
    );
};

export default MyProfile;
