import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMPOSITION } from '../utils/mutations.js';
import Auth from '../utils/auth.js';

const CompositionForm: React.FC = () => {
    const [compositionTitle, setCompositionTitle] = useState('');
    const [compositionText, setCompositionText] = useState('');
    const [compositionAuthor, setCompositionAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [addComposition] = useMutation(ADD_COMPOSITION);

    const [helperTextStyle, setHelperTextStyle] = useState('help is-hidden');
    const [helperText, setHelperText] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!Auth.loggedIn()) {
            return alert('You need to be logged in to submit a poem.');
        }

        // Validate input before sending the mutation
        if (!compositionTitle.trim() || !compositionText.trim()) {
            return alert('Please fill in all required fields.');
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
        <div className = "submit-form">
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

{/* <div>  
    <h2>Submission Terms and Conditions</h2>
    <p>By submitting your work to ArtVine, you agree to the following:
        Originality of Work
        You affirm that the work you submit is your original work and does not infringe upon any copyright, trademark, or other intellectual property rights of any third party.
        Copyright Compliance
        You confirm that your submission does not contain material that violates any copyright laws, including but not limited to:
        Work created by someone else without proper authorization.
        Material taken from copyrighted works without the necessary permissions.
        License to Display
        By submitting your work, you grant ArtVine a non-exclusive, royalty-free license to publish and display your work on our platform. You retain full ownership of your work and may withdraw your submission at any time.
        Responsibility for Submissions
        You agree to take full responsibility for the content of your submission, including any legal consequences arising from copyright disputes.
        Indemnification
        You agree to indemnify and hold ArtVine harmless from any claims, damages, or liabilities arising from your submission, including disputes over copyright ownership.
    </p>

    <h3>Submission Agreement</h3>
    <form action="/submit" method="post">
        <input type="checkbox" id="agreement" name="agreement" value="agree">
        <label htmlFor="agreement"> I confirm that the work I am submitting is my original work, and I agree to the submission terms and conditions.</label>
        </input>
    </form>
    
</div> */}