import CompositionList from '../components/compositionList';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
import { getRandomQuote } from '../assets/quotes.js'

const Library = () => {
    const { loading, error, data } = useQuery(QUERY_ME, {
        fetchPolicy: 'cache-and-network',
    });


    if (loading) return <p className="title is-4 has-text-primary">Loading your library...</p>;
    if (error) return <p className="title is-4 has-text-danger">Error loading your library: {error.message}</p>;

    const savedCompositions = data?.me?.library || [];

    const quote = getRandomQuote();

    return (
        <div>
            <section className="hero is-small has-background-primary-dark">
                <div className="hero-body is-flex-direction-column">
                    <p className="title has-text-primary">Your Library</p>
                    <p className="subtitle">{quote.quote}<br />- {quote.author}</p>
                </div>
            </section>
            {savedCompositions.length > 0 ? (
                <CompositionList filterBySaved={true} />
            ) : (
                <p className="subtitle">Your library is empty. Start collecting your favorite compositions!</p>
            )}
        </div>
    );
};


export default Library;
