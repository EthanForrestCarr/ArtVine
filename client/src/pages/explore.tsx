import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SEARCH_COMPOSITIONS_AND_USERS } from '../utils/queries.js';
import SearchBar from '../components/searchBar.jsx';
import CompositionCard from '../components/compositionCard.jsx';
import CompositionList from '../components/compositionList.jsx';

const ExplorePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const [displaySearchResults, setDisplaySearchResults] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const compositionsPerPage = 6;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tag = params.get('search');
        if (tag) {
            setSearchQuery(tag);
            setDisplaySearchResults(true);
        }
    }, [location]);

    // Use the search query in a GraphQL query via Apollo Client's useQuery hook
    const { data, loading, error } = useQuery(SEARCH_COMPOSITIONS_AND_USERS, {
        variables: { query: searchQuery },
        skip: !searchQuery,  // Skip the query if searchQuery is empty
    });

    const onSearch = (query: string) => {
        setSearchQuery(query);  // Update the search query when the user types something
        setDisplaySearchResults(true);  // Display search results when the user types something
        setStartIndex(0);  // Reset the start index when the user types something
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!data?.searchCompositionsAndUsers.compositions) return;

            const totalCompositions = data.searchCompositionsAndUsers.compositions.length;
            if (event.key === 'ArrowRight') {
                setStartIndex((prev) =>
                    Math.min(prev + compositionsPerPage, totalCompositions - compositionsPerPage)
                );
            } else if (event.key === 'ArrowLeft') {
                setStartIndex((prev) => Math.max(prev - compositionsPerPage, 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const compositions = data?.searchCompositionsAndUsers?.compositions?.slice(
        startIndex,
        startIndex + compositionsPerPage
    ) || [];


    return (
        <>
            <div className="hero is-small has-background-primary-dark">
                <div className="hero-body is-flex-direction-column">
                    <p className="title has-text-primary">Explore</p>
                    <p className="subtitle">Here you can explore all the work that has been submitted to ArtVine.</p>
                    <SearchBar onSearch={onSearch} />
                </div>
            </div>

            {displaySearchResults ? (
                <div>
                    {/* <div className="block">
                        <p className="title is-4">Users:</p>
                        {data?.searchCompositionsAndUsers?.users?.length > 0 ? (
                            data.searchCompositionsAndUsers.users.map((user: { _id: string; name: string; email: string }) => (
                                <div key={user._id}>
                                    <p className="tag is-dark is-medium mb-1">{user.name} - {user.email}s</p>
                                </div>
                            ))
                        ) : (
                            <p className="tag is-warning">No users found.</p>
                        )}
                    </div> */}
                    <div className="block">
                        <p className="title is-4">Compositions:</p>
                        <div className="composition-grid grid is-col-min-16">
                            {compositions.length > 0 ? (
                                compositions.map(
                                    (composition: {
                                        _id: string;
                                        compositionTitle: string;
                                        compositionText: string;
                                        createdAt: string;
                                        compositionAuthor: string;
                                        tags: string[];
                                    }) => (
                                            <CompositionCard
                                                key={composition._id}
                                                compositionId={composition._id}
                                                compositionTitle={composition.compositionTitle}
                                                compositionText={composition.compositionText}
                                                compositionAuthor={composition.compositionAuthor}
                                                createdAt={composition.createdAt}
                                                tags={composition.tags}
                                            />
                                    )
                                )
                            ) : (
                                <div className="mb-2">
                                    <p className="tag is-warning">No compositions found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <CompositionList />
                </>
            )}
            <p className="mt-2">
                Use the left (<kbd>←</kbd>) and right (<kbd>→</kbd>) arrow keys to navigate through poems.
            </p>
        </>
    );
};

export default ExplorePage;
