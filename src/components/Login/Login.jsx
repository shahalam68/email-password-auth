import {  getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';


const auth = getAuth(app);
const Login = () => {
    //   const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    //   };

    //   const handlePasswordChange = (e) => {
    //     setPassword(e.target.value);
    //   };

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        setSuccess('');
        setError('');
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('your password. must be at least 6 characters in length. that it must contain at least one upper case letter');
        }
        else if (!/(?=.*\d)/.test(password)) {
            setError('your password. must be at least 6 characters in length. that it must contain at least one upper case letter');
            return;
        }
        else if (password.length < 6) {
            setError('your password. must be at least 6 characters in length. that it must contain at least one upper case letter');
            return;
        }
        signInWithEmailAndPassword(auth,email,password)
        .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                event.target.reset();
                setSuccess('User has been Logged in successfuly')
            })
        .catch(error => {
            setError(error.message)
        })
    };


    const handleResetPassword = event => {
        const email = emailRef.current.value;
        if(!email){
            alert('please provide your email to reset password')
            return;
        }
        sendPasswordResetEmail(auth,email)
        .then(() =>{
            alert('please check your email')
        })
        .catch(error =>{
            setError(error.message)
        })
    }
    return (
        <div className=' mx-auto'>
            <h2 className='text-center'>Please Login</h2>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    ref={emailRef}
                                    name='email'
                                    className="form-control"
                                    id="email"
                                    placeholder='Your Email'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name='password'
                                    placeholder='Your Password'
                                    className="form-control"
                                    id="password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">Login</button>
                        </form>
                        <p><small>Forget Password<button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
                        <p>New to this website please <Link to='/registar'>Register</Link></p>
                        <p className='test-danger'>{error}</p>
                        <p className='text-success'>{success}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;