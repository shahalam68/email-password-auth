import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase/firebase.config';


const auth = getAuth(app);



const Register = () => {

    const [email,setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email,password);
        // create user in firebase

        createUserWithEmailAndPassword(auth,email,password)
        .then( result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        setEmail(event.target.value);
    }


    const handlePasswordBlur = (event) =>{
        // console.log(event.target.value);
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Ragistar</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded ps-2' onChange={handleEmailChange} type="email" name='email' id='email' placeholder='Your email' />
                <br />
                <input className='w-50 mb-4 rounded' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your password' />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;