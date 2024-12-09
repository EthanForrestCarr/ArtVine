import CompositionList from '../components/compositionList';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Library = () => {
    const { loading, error, data } = useQuery(QUERY_ME, {
        fetchPolicy: 'cache-and-network',
    });


    if (loading) return <p>Loading your library...</p>;
    if (error) return <p>Error loading your library: {error.message}</p>;

    const savedCompositions = data?.me?.library || [];

    return (
        <div>
            <h1>Your Library</h1>
            {savedCompositions.length > 0 ? (
                <CompositionList filterBySaved={true} />
            ) : (
                <p>Your library is empty. Start collecting your favorite compositions!</p>
            )}
        </div>
    );
};


export default Library;
