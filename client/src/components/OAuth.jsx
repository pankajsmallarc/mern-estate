import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from '@firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider;
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const inputJson = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            }
            const res = axios.post('http://localhost:4000/api/auth/google', inputJson);
            const data = (await res).data;
            dispatch(signInSuccess(data))
            navigate('/')
            console.log("Data====>", data)
        } catch (error) {
            console.log("Could not sign with google", error);
        }
    }

    return (
        <button onClick={handleGoogleClick} type="button" className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Continue with google</button>
    )
}

export default OAuth