import React, { useState } from 'react';
import { useMutation, OperationVariables, ApolloQueryResult } from '@apollo/client';
import { ADD_COMPOSITION } from '../utils/mutations';
import authService from '../utils/auth';

interface CompositionFormProps {
    refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
}

const CompositionForm: React.FC<CompositionFormProps> = ({ refetch }) => {
    const [compositionTitle, setCompositionTitle] = useState('');
    const [compositionText, setCompositionText] = useState('');
    const [compositionAuthor, setCompositionAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [areTermsVisible, setAreTermsVisible] = useState(false);
    const [addComposition] = useMutation(ADD_COMPOSITION);

    const [helperTextStyle, setHelperTextStyle] = useState('help is-hidden');
    const [helperText, setHelperText] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!authService.loggedIn()) {
            return alert('You need to be logged in to submit a poem.');
        }

        // Validate input before sending the mutation
        if (!compositionTitle.trim() || !compositionText.trim()) {
            return alert('Please fill in all required fields.');
        }

        if (!agreeToTerms) {
            return alert('You must agree to the submission terms and conditions to submit your composition.');
        }

        const tagsArray = tags.split(',').map((tag) => tag.trim()).filter((tag) => tag);

        try {
            setHelperText('Submitting...');
            setHelperTextStyle('help is-warning');
            await addComposition({
                variables: {
                    input: {
                        compositionTitle,
                        compositionText,
                        compositionAuthor,
                        tags: tagsArray,
                    },
                },
            });
            refetch();
            setCompositionTitle('');
            setCompositionText('');
            setCompositionAuthor('');
            setTags('');
            setHelperText('You poem has been added successfully!')
            setHelperTextStyle('help is-success');
            // alert('Poem added successfully!');

        } catch (err) {
            console.error(err);
            // alert('An error occurred while submitting your poem.');
            setHelperText('An error occured while submitting your poem.');
            setHelperTextStyle('help is-danger');
        }
    };

    return (
        <div className="submit-form">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Title:</label>
                    <input
                        className="input"
                        type="text"
                        value={compositionTitle}
                        onChange={(e) => setCompositionTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <label className="label">Author:</label>
                    <input
                        className="input"
                        type="text"
                        value={compositionAuthor}
                        onChange={(e) => setCompositionAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <label className="label">Poem:</label>
                    <textarea
                        className="textarea textarea-input"
                        wrap="off"
                        rows={10}
                        value={compositionText}
                        onChange={(e) => setCompositionText(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="field">
                    <label className="label">Tags (separate with commas):
                        <textarea
                            className="input"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            required
                        ></textarea>
                    </label>
                    {/* Submission Agreement Section */}
                    <div className="field">
                        <h3
                            className="label is-clickable"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setAreTermsVisible(!areTermsVisible)}
                        >
                            Submission Agreement Terms and Conditions
                            <span style={{ marginLeft: '0.5rem' }}>
                                {areTermsVisible ? '▲' : '▼'}
                            </span>
                        </h3>
                        <p className={areTermsVisible ? '' : 'is-hidden'}>
                            By submitting your work to ArtVine, you agree to the following terms:
                            <ul>
                                <li className="ml-5">Originality of Work:
                                    <ul>
                                        <li className="ml-5 has-text-weight-light">You affirm that the work you submit is your original work and does not infringe upon any copyright, trademark, or other intellectual property rights of any third party.</li>
                                    </ul>
                                </li>
                                <li className="ml-5">Copyright Compliance:
                                    <ul>
                                        <li className="ml-5 has-text-weight-light">You confirm that your submission does not contain material that violates any copyright laws, including but not limited to:
                                            <ul>
                                                <li className="ml-5 has-text-weight-light">Work created by someone else without proper authorization.</li>
                                                <li className="ml-5 has-text-weight-light">Material taken from copyrighted works without the necessary permissions.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="ml-5">License to Display:
                                    <ul>
                                        <li className="ml-5 has-text-weight-light">By submitting your work, you grant ArtVine a non-exclusive, royalty-free license to publish and display your work on our platform. You retain full ownership of your work and may withdraw your submission at any time.</li>
                                    </ul>
                                </li>
                                <li className="ml-5">Responsibility for Submissions:
                                    <ul>
                                        <li className="ml-5 has-text-weight-light">You agree to take full responsibility for the content of your submission, including any legal consequences arising from copyright disputes.</li>
                                    </ul>
                                </li>
                                <li className="ml-5">Indemnification:
                                    <ul>
                                        <li className="ml-5 has-text-weight-light">You agree to indemnify and hold ArtVine harmless from any claims, damages, or liabilities arising from your submission, including disputes over copyright ownership.</li>
                                    </ul>
                                </li>
                            </ul>
                        </p>
                        <div>
                            <input
                                type="checkbox"
                                id="agreement"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                required
                            />
                            <label htmlFor="agreement" style={{ marginLeft: '0.5rem' }}>
                                I confirm that the work I am submitting is my original work, and I agree to the submission terms and conditions.
                            </label>
                        </div>
                    </div>
                </div>
                <button className="button is-primary mb-2" type="submit">Submit Poem</button>
                <p className={helperTextStyle}>
                    {helperText}
                </p>
            </form>
        </div>
    );
};

export default CompositionForm;

