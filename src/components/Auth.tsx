import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { json } from 'stream/consumers';
import { useAppDispatch, useAppSelector } from '../hooks'
import authSlice, { loggedIn } from './authSlice';
import { Navigate } from 'react-router-dom'

function Auth() {

    const dispatch = useAppDispatch();
    const {loginWithRedirect} = useAuth0();
    const {user} = useAuth0();

    if(user?.email_verified){
        console.log("authed")
        dispatch(loggedIn(true));
        return <Navigate to="/home" />
    }
    
    return (
    <div>
        Auth
        <button
        onClick={() => loginWithRedirect()}
        > LogIn</button>
        {JSON.stringify(user, null, 2)}

    </div>
    )
}

export default Auth