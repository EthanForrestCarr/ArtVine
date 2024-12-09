import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations.js';
import Auth from '../utils/auth.js';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error("Login Failed", e);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className="content box mt-3" style={{marginBottom: "20px"}}>
            <h2 className="has-text-primary">Login</h2>
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                <form onSubmit={handleFormSubmit}>

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

                    <button
                        className="button is-primary"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            )}

            {error && (
                <div className="is-danger">
                    {error.message}
                </div>
            )}
        </main>
    );
};

export default Login;
