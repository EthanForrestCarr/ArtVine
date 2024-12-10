import { useNavigate, Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { SAVE_TO_LIBRARY } from "../utils/mutations";
import { useMutation } from "@apollo/client";

interface CompositionProps {
    compositionId: string;
    compositionTitle: string;
    compositionText: string;
    compositionAuthor: string;
    createdAt: string;
    tags: string[];
}

const CompositionCard: React.FC<CompositionProps> = ({ compositionId, compositionTitle, compositionText, compositionAuthor, tags }) => {
    const navigate = useNavigate();
    const [libraryButton, setLibraryButton] = useState('Add to Library');

    const [saveToLibrary] = useMutation(SAVE_TO_LIBRARY, {
        onCompleted: (data) => {
            console.log('Composition saved to library:', data);
            setLibraryButton('Remove From Library')
            // alert('Composition added to your library!');
        },
    });

    const handleSaveClick = async () => {
        try {
            await saveToLibrary({ variables: { compositionId } });
        } catch (err) {
            console.error('Error saving composition:', err);
        }
    };


    const handleTagClick = (tag: string) => {
        navigate(`/explore?search=${encodeURIComponent(tag)}`);
    };

    return (
        <div className="cell">
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-content" style={{ height: "70px" }}>
                            <p className="title is-4">{compositionTitle}</p>
                            <p className="subtitle is-6">by {compositionAuthor}</p>
                        </div>
                        {/* Start of dropdown */}
                        <div className="media-right">
                            <div className="dropdown is-hoverable is-right">
                                <div className="dropdown-trigger">
                                    <button id="dropdown-button" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span>#</span>
                                    </button>
                                </div>
                                <div className="dropdown-menu is-right" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content is-shadowless">
                                        {tags && tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="dropdown-item"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleTagClick(tag)}
                                            >
                                                #{tag}<br></br>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End of dropdown */}
                    </div>
                    <div className="content" style={{ height: "330px" }}>
                        <textarea className="card-textarea textarea has-fixed-size" style={{ minHeight: '100%' }} readOnly>
                            {compositionText}
                        </textarea>
                    </div>
                </div>
                <footer className="card-footer has-background-primary-30">
                    <Link to={`/compositionDetails/${compositionId}`} className="card-footer-item">View Composition</Link>
                    <button onClick={handleSaveClick} className="card-footer-item">{libraryButton}</button>
                </footer>
            </div>
        </div>
    );
};

export default CompositionCard;
