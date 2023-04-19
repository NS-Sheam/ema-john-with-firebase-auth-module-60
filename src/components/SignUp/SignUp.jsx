import React, { useContext, useState } from 'react';
import "./SignUp.css"
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
const SignUp = () => {
    const [error, setError] = useState('');
    const { createUser } = useContext(AuthContext);
    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);
        setError('');
        if (password.length < 6) {
            setError('Password must be 6 charc');
        }
        else if (password !== confirm) {
            setError("Confirm password not match");
        }
        createUser(email, password)
        .then(result=> {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error => {
            console.log(error);
            setError(error);
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="confirm" id="" required />
                </div>
                <input type="submit" value="Login" className='btn-submit' />
            </form>
            <p><small>Already have an account? <Link to="/login">Login</Link></small></p>
            <p className="text-error">{error}</p>
        </div>
    );
};

export default SignUp;