import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
import { REMOVE_COMPOSITION, UPDATE_COMPOSITION } from '../utils/mutations.js';
import authService from '../utils/auth.js';

const ManageCompositions: React.FC = () => {
    const { loading, error, data, refetch } = useQuery(QUERY_ME);
    const [removeComposition] = useMutation(REMOVE_COMPOSITION, {
        onCompleted: () => {
            refetch();
        },
        onError: (err) => {
            console.error('Error removing Composition:', err);
        },
    });

    const [updateComposition] = useMutation(UPDATE_COMPOSITION, {
        onCompleted: () => {
            refetch();
        },
        onError: (err) => {
            console.error('Error updating Composition:', err);
        },
    });

    const [helperTextStyle, setHelperTextStyle] = useState('help is-hidden');
    const [helperText, setHelperText] = useState('');
    const [editingComposition, setEditingComposition] = useState<any>(null);
    const [removingComposition, setRemovingComposition] = useState<any>(null);

    const handleRemove = async (compositionId: string) => {
        if (!authService.loggedIn()) {
            return alert('You need to be logged in to remove a poem.');
        }

        try {
            setHelperText('Removing...');
            setHelperTextStyle('help is-warning');

            // Call REMOVE_COMPOSITION mutation
            await removeComposition({
                variables: { compositionId }, // Pass the composition ID to the mutation
            });

            setHelperText('Poem has been removed successfully!');
            setHelperTextStyle('help is-success');
            setRemovingComposition(null);
        } catch (err) {
            console.error(err);
            setHelperText('An error occurred while removing the poem.');
            setHelperTextStyle('help is-danger');
        }
    };

    const handleEdit = (composition: any) => {
        setEditingComposition(composition);
    };

    const handleSave = async () => {
        if (!authService.loggedIn()) {
            return alert('You need to be logged in to edit a poem.');
        }

        try {
            setHelperText('Saving...');
            setHelperTextStyle('help is-warning');

            const variables = {
                compositionId: editingComposition._id,
                input: {
                    compositionTitle: editingComposition.compositionTitle,
                    compositionText: editingComposition.compositionText,
                    compositionAuthor: editingComposition.compositionAuthor,
                    tags: editingComposition.tags,
                },
            };

            console.log('Updating composition with variables:', variables);

            // Call UPDATE_COMPOSITION mutation
            const response = await updateComposition({ variables });

            console.log('Update response:', response);

            setHelperText('Poem has been updated successfully!');
            setHelperTextStyle('help is-success');
            setEditingComposition(null);
        } catch (err) {
            console.error('Error updating Composition:', err);
            setHelperText('An error occurred while updating the poem.');
            setHelperTextStyle('help is-danger');
        }
    };

    if (loading) return <p>Loading Compositions...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const compositions = data?.me?.compositions ?? [];

    return (
        <div className="manage-compositions">
            {/* DAT P TAG STARTS HERE NOW */}
            <p className={helperTextStyle}>{helperText}</p>
            {/* DAT P TAG ENDS HERE NOW */}
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {compositions.map((composition: any) => (
                        <tr key={composition._id}>
                            <td>{composition.compositionTitle}</td>
                            <td>{composition.compositionAuthor}</td>
                            <td>
                                <button className="button is-primary is-small mr-2">
                                    <Link
                                        className="has-text-black"
                                        to={`/compositionDetails/${composition._id}`}
                                    >
                                        View
                                    </Link>
                                </button>
                                <button
                                    className="button is-info is-small mr-2"
                                    onClick={() => handleEdit(composition)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="button is-small is-danger"
                                    onClick={() => setRemovingComposition(composition)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {/* the p tag was here before */}
            </table>

            {editingComposition && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                            <h2 className="title">Edit Composition</h2>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        value={editingComposition.compositionTitle}
                                        onChange={(e) =>
                                            setEditingComposition({
                                                ...editingComposition,
                                                compositionTitle: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Text</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={editingComposition.compositionText}
                                        onChange={(e) =>
                                            setEditingComposition({
                                                ...editingComposition,
                                                compositionText: e.target.value,
                                            })
                                        }
                                    ></textarea>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Tags</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        value={editingComposition.tags}
                                        onChange={(e) =>
                                            setEditingComposition({
                                                ...editingComposition,
                                                tags: e.target.value,
                                            })
                                        }
                                    />
                                    <p className="help">Separate tags with commas</p>
                                </div>
                            </div>
                            <button className="button is-success mr-3" onClick={handleSave}>
                                Save
                            </button>
                            <button
                                className="button"
                                onClick={() => setEditingComposition(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => setEditingComposition(null)}
                    ></button>
                </div>
            )}
            {removingComposition && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                            <h2 className="title">Remove Composition</h2>
                            <p>Are you sure you want to permanently delete the following composition?</p>
                            <p className="has-text-weight-bold m-4">Composition Title: {removingComposition.compositionTitle}</p>
                            <button
                                className="button is-danger mr-3"
                                onClick={() => handleRemove(removingComposition._id)}
                            >
                                Confirm
                            </button>
                            <button
                                className="button"
                                onClick={() => setRemovingComposition(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => setRemovingComposition(null)}
                    ></button>
                </div>
            )}
        </div>
    );
};

export default ManageCompositions;