import React, { useRef, useContext } from 'react'
import "../Settings.scss"
import AuthContext from '../store/auth-context';

function Settings() {
    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);
    const submitHandler = e => {
        e.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value;
    
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDTXNggDtSFcuo5OAhVook6DZf6bFNdNdg', 
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token,
                    password: enteredNewPassword,
                    reutrnSecureToken: false
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            alert('Successfully change password!');
        })
    }

    return (
        <div>
            <form className="Settings" onSubmit={submitHandler}>
                <div><h1 className="Settings font">Change Password</h1></div>
                <div className="newpassword">
                    <h1 className="newpassword text">New Password:</h1>
                    <input type="password" placeholder="Enter Password" className="newpassword enterpass" minLengh="7" ref={newPasswordInputRef}></input>
                </div>
                <button className="Settings start">Change</button>
            </form>
        </div>
    )
}

export default Settings
