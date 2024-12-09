import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations.js';
import Auth from '../utils/auth.js';

const Signup = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { input: { ...formState } },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="content box mt-3" style={{marginBottom: "20px"}}>
            <h2 className="has-text-primary">Sign Up</h2>
            <div className="">
                {data ? (
                    <p>
                        Success! You may now head{' '}
                        <Link to="/">back to the homepage.</Link>
                    </p>
                ) : (
                    <form onSubmit={handleFormSubmit}>

                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    className="input"
                                    placeholder="Your first and last name"
                                    name="name"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    className="input"
                                    placeholder="Your email"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                    className="input"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="control">
                            <button
                                className="button is-primary"
                                style={{ cursor: 'pointer' }}
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}

                {error && (
                    <div className="is-danger">
                        {error.message}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Signup;
