import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries.js';
import { FOLLOW_USER } from '../utils/mutations.js';

const ProfilePage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { name },
    });
    const [followUser] = useMutation(FOLLOW_USER, {
        refetchQueries: [{ query: QUERY_ME }], // Refetch the current user's data to update follows
    });

    const handleFollow = async (followId: string) => {
        try {
            await followUser({ variables: { followId } });
            alert('Followed successfully!');
        } catch (err) {
            console.error(err);
            alert('Error following user.');
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error loading profile: {error.message}</p>;

    const user = data?.user;
    const isFollowing = data?.me?.follows.some((f: any) => f._id === user._id);

    return (
        <div>
            <h1>{user.name}'s Profile</h1>
            <button onClick={() => handleFollow(user._id)} disabled={isFollowing}>
                {isFollowing ? 'Following' : 'Follow'}
            </button>
            <h2>Compositions</h2>
            <ul>
                {user.compositions.map((composition: any) => (
                    <li key={composition._id}>
                        <h3>{composition.compositionTitle}</h3>
                        <p>{composition.compositionText}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfilePage;

