import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { SAVE_TO_LIBRARY, REMOVE_FROM_LIBRARY } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth } from "../utils/auth"; // Custom hook to get user info
import { CHECK_LIBRARY_STATUS } from "../utils/queries"; // Query to check if composition is in the library

interface CompositionProps {
    _id: string;
    compositionId: string;
    compositionTitle: string;
    compositionText: string;
    compositionAuthor: string;
    createdAt: string;
    tags: string[];
}

const CompositionCard: React.FC<CompositionProps> = ({
    _id,
    compositionId,
    compositionTitle,
    compositionText,
    compositionAuthor,
    tags,
}) => {
    const navigate = useNavigate();
    const { profile: user } = useAuth() as { profile: { compositions: string[] } | null }; // Get logged-in user info
    const [inLibrary, setInLibrary] = useState(false); // Local state for library status

    // Fetch initial library status
    const { data, loading: libraryLoading, refetch } = useQuery(CHECK_LIBRARY_STATUS, {
        variables: { compositionId },
        skip: !user, // Skip query if the user is not logged in
        fetchPolicy: "network-only", // Always fetch fresh data from the server
    });

    useEffect(() => {
        if (data?.checkLibraryStatus) {
            setInLibrary(data.checkLibraryStatus.inLibrary);
        }
    }, [data]);

    // Mutations for adding and removing compositions
    const [saveToLibrary] = useMutation(SAVE_TO_LIBRARY, {
        onCompleted: () => {
            setInLibrary(true); // Update local state
            alert("Composition added to your library!");
            refetch(); // Refetch the library status after mutation
        },
        onError: (err) => console.error("Error adding composition:", err),
    });

    const [removeFromLibrary] = useMutation(REMOVE_FROM_LIBRARY, {
        onCompleted: () => {
            setInLibrary(false); // Update local state
            alert("Composition removed from your library!");
            refetch(); // Refetch the library status after mutation
        },
        onError: (err) => console.error("Error removing composition:", err),
    });

    const handleLibraryAction = async () => {
        try {
            if (inLibrary) {
                await removeFromLibrary({ variables: { compositionId } });
            } else {
                await saveToLibrary({ variables: { compositionId } });
            }
        } catch (err) {
            console.error("Error updating library status:", err);
        }
    };

    const handleEditClick = () => {
        navigate(`/editComposition/${compositionId}`);
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
                        <div className="media-right">
                            <div className="dropdown is-hoverable is-right">
                                <div className="dropdown-trigger">
                                    <button
                                        id="dropdown-button"
                                        className="button"
                                        aria-haspopup="true"
                                        aria-controls="dropdown-menu"
                                    >
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
                    </div>
                    <div className="content" style={{ height: "330px" }}>
                        <textarea
                            className="card-textarea textarea has-fixed-size"
                            style={{ minHeight: "100%" }}
                            readOnly
                        >
                            {compositionText}
                        </textarea>
                    </div>
                </div>
                <footer className="card-footer has-background-primary-30">
                    <Link
                        to={`/compositionDetails/${compositionId}`}
                        className="card-footer-item has-text-primary-invert"
                    >
                        View Composition
                    </Link>
                    {user && (
                        <>
                            {console.log(user.compositions, _id)}
                            { user?.compositions?.includes(_id) ? (
                            
                                <button
                                    onClick={handleEditClick}
                                    className="card-footer-item has-text-primary-invert"
                                >
                                    Edit Composition
                                </button>
                            ) : (
                                <button
                                    onClick={handleLibraryAction}
                                    className="card-footer-item has-text-primary-invert"
                                    disabled={libraryLoading}
                                >
                                    {libraryLoading
                                        ? "Loading..."
                                        : inLibrary
                                        ? "Remove from Library"
                                        : "Add to Library"}
                                </button>
                            )}
                        </>
                    )}
                </footer>
            </div>
        </div>
    );
};

export default CompositionCard;
