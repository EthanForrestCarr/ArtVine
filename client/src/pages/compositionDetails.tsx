import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_COMPOSITIONS } from '../utils/queries';
import { SAVE_TO_LIBRARY } from '../utils/mutations';


const CompositionDetails: React.FC = () => {
    const navigate = useNavigate(); //Used to navigate between pages
    const { compositionId } = useParams<{ compositionId: string }>(); // Retrieve the composition ID from the URL

    //State for search term
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Fetch the composition data using the QUERY_COMPOSITION query
    const { loading, error, data } = useQuery(QUERY_COMPOSITIONS, {
        variables: { id: compositionId, search: searchTerm },
    });


    //Mutation for saving a composition to the library
    const [saveToLibrary] = useMutation(SAVE_TO_LIBRARY, {
        onCompleted: (data) => {
            console.log('Composition saved to library:', data);
            alert('Composition added to your library!');
        },
    });

    //Handle the loading and error states
    if (loading) return <p className="loading-spinner">Loading composition details...</p>;
    if (error) return <p>Oops! Something went wrong while loading the composition. Please try again later.</p>;

    // Extract the fetched composition data
    const fetchedComposition = data?.composition;

    // If no composition is found, show an error message
    if (!fetchedComposition) {
        return <p>Composition not found.</p>;
    };

     // Destructuring composition data from the fetched composition object
    const { compositionTitle, compositionText, compositionAuthor, createdAt, tags } = fetchedComposition;

    //Handler to save a composition to library
    const handleSaveToLibrary = async () => {
        try {
            await saveToLibrary({ variables: { compositionId } });
        } catch (err) {
            console.error("Error saving composition", err);
        }
    };

    //Handler to handle filtering logic by tag
    const handleTagClick = (tag: string) => {
        setSearchTerm(tag); // Update the search term based on the tag clicked
    };

    // Handle the back button functionality
    const handleBackButton = () => {
        navigate('/'); // Go back to the previous page
    };

    return (
        
        <div className="composition-detail">
            <h2 className="title">{compositionTitle}</h2>
            <div className="content">
                <p>By: {compositionAuthor}</p>
                <p className="has-text-grey">
                    Created on {createdAt}
                </p>
            </div>

            {/* Displays composition content  */}
            <div className="text-content">
                <p>{compositionText}</p>
            </div>

            {/* Tags Section */}
            <div className="tags">
                {tags.map((tag: string, index: number) => (
                    <span
                        key={index}
                        className="tag is-primary is-light"
                        style={{ margin: '0 5px', cursor: 'pointer' }}
                        onClick={() => handleTagClick(tag)}
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Filtered Compositions based on the search term */}
            <div className="filtered-compositions">
                {data?.compositions
                .filter((composition: any) => 
                    composition.tags.some((tag: string) =>
                        tag.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    )
                    .map((filteredComposition: any) => (
                        <div key={filteredComposition._id} className="composition-item">
                        <h3>{filteredComposition.compositionTitle}</h3>
                        <p>{filteredComposition.compositionText}</p>
                    </div>
                    ))}
            </div>

            {/* Buttons for saving and navigation */}
            <div className="buttons mt-4">
                <button className="button is-primary" onClick={handleSaveToLibrary}>
                    Add to Library
                </button>
                <button className="button is-light" onClick={handleBackButton}>
                    Back to Homepage
                </button>
            </div>
        </div>
    )
};

export default CompositionDetails