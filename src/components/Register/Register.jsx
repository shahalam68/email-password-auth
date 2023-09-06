import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';


const auth = getAuth(app);



const Register = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {

        // 1. prevent page refresh
        event.preventDefault();
        setSuccess('');
        setError('');
        // 2.collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(name,email, password);
        // create user in firebase

        // validate
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('your password. must be at least 6 characters in length. that it must contain at least one upper case letter')
            return;
        }
        else if (!/(?=.*\d)/.test(password)) {
            setError('your password. must be at least 6 characters in length. that it must contain at least one upper case letter');
            return;
        }
        else if (password.length < 6) {
            setError('your password. must be at least 6 characters in length. that it must contain at least one upper case letter');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                event.target.reset();
                setSuccess('User has been register in successfuly')
                sendVerificationEmail(result.user)
                updateUserdata(result.user,name)
            })
            .catch(error => {
                setError(error.message);
                console.error(error.message);
            });
    }
    const sendVerificationEmail = (user) => {
        sendEmailVerification(auth.currentUser)
            .then(result => {
                console.log(result);
                alert('please verify your email address')
            })
    };
    const updateUserdata = (user,name) => {
        updateProfile(user,{
            displayName:name
        })
        .then(() =>{
            console.log('user name updated');
        })
        .catch(error =>{
            console.log(error.message);
            setError(error.message);
        })
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        // setEmail(event.target.value);
    }


    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }
    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-primary mt-4'>Please Ragistar!!!</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded ps-2'  type="text" name='name' id='name' placeholder='Your Name' required />
                <br />
                <input className='w-50 mb-4 rounded ps-2' onChange={handleEmailChange} type="email" name='email' id='email' placeholder='Your email' required />
                <br />
                <input className='w-50 mb-4 rounded' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p>Already have an account please <Link to="/login">Login</Link> </p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;