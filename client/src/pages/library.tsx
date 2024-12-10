import CompositionList from '../components/compositionList';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';

const Library = () => {
    const { loading, error, data } = useQuery(QUERY_ME, {
        fetchPolicy: 'cache-and-network',
    });


    if (loading) return <p>Loading your library...</p>;
    if (error) return <p>Error loading your library: {error.message}</p>;

    const savedCompositions = data?.me?.library || [];

    return (
        <div>
            <p className="title is-4">Your Library</p>
            {savedCompositions.length > 0 ? (
                <CompositionList filterBySaved={true} />
            ) : (
                <p className="subtitle">Your library is empty. Start collecting your favorite compositions!</p>
            )}
        </div>
    );
};


export default Library;
