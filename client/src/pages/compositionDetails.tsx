import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_COMPOSITION } from '../utils/queries';
import { SAVE_TO_LIBRARY, REMOVE_FROM_LIBRARY } from '../utils/mutations';


const CompositionDetails: React.FC = () => {

    const [helperText, setHelperText] = useState('');
    const [helperFormat, setHelperFormat] = useState('help is-hidden');

    const navigate = useNavigate(); //Used to navigate between pages
    const { compositionId } = useParams<{ compositionId: string }>(); // Retrieve the composition ID from the URL

    // Fetch the composition data using the QUERY_COMPOSITION query
    const { loading, error, data } = useQuery(QUERY_SINGLE_COMPOSITION, {
        variables: { compositionId },
    });

    // Mutations for adding and removing compositions
    const [saveToLibrary] = useMutation(SAVE_TO_LIBRARY, {
        onCompleted: () => {
        },
        onError: (err) => console.error("Error adding composition:", err),
    });

    const [removeFromLibrary] = useMutation(REMOVE_FROM_LIBRARY, {
        onCompleted: () => {
        },
        onError: (err) => console.error("Error removing composition:", err),
    });

    const handleAddToLibrary = async () => {
        try {
            await saveToLibrary({ variables: { compositionId } });
            setHelperText("Added to your library!")
            setHelperFormat("has-text-success has-text-centered");
        } catch (err) {
            console.error("Error updating library status:", err);
        }
    };

    const handleRemoveFromLibrary = async () => {
        try {
            await removeFromLibrary({ variables: { compositionId } });
            setHelperText("Removed from your library.");
            setHelperFormat("has-text-danger has-text-centered");
        } catch (err) {
            console.error("Error updating library status:", err);
        }
    };

    const handleTagClick = (tag: string) => {
        navigate(`/explore?search=${encodeURIComponent(tag)}`);
    };

    //Handle the loading and error states
    if (loading) return <p className="loading-spinner">Loading composition details...</p>;
    if (error) {
        console.error('Error fetching composition:', error);
        return <p>Oops! Something went wrong while loading the composition. Please try again later.</p>;
    }
    // Extract the fetched composition data
    const fetchedComposition = data?.composition;

    // If no composition is found, show an error message
    if (!fetchedComposition) {
        return <p>Composition not found. Please check the composition ID and try again later.</p>;
    };

    // Destructuring composition data from the fetched composition object
    const { compositionTitle, compositionText, compositionAuthor, /* createdAt, */ tags } = fetchedComposition;

    // Handle the back button functionality
    const handleBackButton = () => {
        navigate(-1); // Go back to the previous page
    };

    return (

        <div>
            <div className="hero is-small has-background-primary-dark">
                <div className="hero-body">
                    <h2 className="title has-text-primary">{compositionTitle}</h2>
                    <div className="subtitle">
                        <p>By: {compositionAuthor}</p>
                    </div>
                </div>
            </div>

            {/* Displays composition content  */}
            <div className="content" style={{ whiteSpace: 'pre-line' }}>

                <p className="details-text">{compositionText}</p>
            </div>


            {/* Tags Section */}
            <div className="level">
                <div className="level-item">
                    {tags?.length > 0 ? (
                        tags.map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="tag is-primary is-light"
                                style={{ margin: '0 5px', cursor: 'pointer' }}
                            onClick={() => handleTagClick(tag)}
                            >
                                #{tag}
                            </span>
                        ))
                    ) : (
                        <p className="has-text-warning">No tags available</p>
                    )}
                </div>
            </div>

            {/* Buttons for saving and navigation */}
            <div className="buttons has-addons is-centered">
                <button className="button is-primary" onClick={handleAddToLibrary}>
                    Add to Library
                </button>
                <button className="button is-light" onClick={handleBackButton}>
                    Go Back
                </button>
                <button className="button is-danger" onClick={handleRemoveFromLibrary}>
                    Remove from Library
                </button>
            </div>
            <div>
                <p className={helperFormat}>{helperText}</p>
            </div>

        </div>
    )
};

export default CompositionDetails