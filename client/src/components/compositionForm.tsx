import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMPOSITION } from '../utils/mutations';
import Auth from '../utils/auth';

const CompositionForm: React.FC = () => {
    const [compositionTitle, setCompositionTitle] = useState('');
    const [compositionText, setCompositionText] = useState('');
    const [tags, setTags] = useState('');
    const [addComposition] = useMutation(ADD_COMPOSITION);

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
            await addComposition({
                variables: {
                    input: {
                        compositionTitle,
                        compositionText,
                        compositionAuthor: Auth.getProfile().data.email,
                        tags: tagsArray,
                    },
                },
            });
            setCompositionTitle('');
            setCompositionText('');
            setTags('');
            alert('Poem added successfully!');
            
        } catch (err) {
            console.error(err);
            alert('An error occurred while submitting your poem.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    value={compositionTitle}
                    onChange={(e) => setCompositionTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Poem:
                <textarea
                    value={compositionText}
                    onChange={(e) => setCompositionText(e.target.value)}
                    required
                ></textarea>
            </label>
            <label>
                Tags (separate with commas):
                <textarea
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    required
                ></textarea>
            </label>
            <button type="submit">Submit Poem</button>
        </form>
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