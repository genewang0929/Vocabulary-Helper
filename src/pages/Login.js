import React, { useState, useRef, useContext } from 'react'
import ForgotPW from '../component/ForgotPW';
import "../Login.scss"
import { useHistory } from 'react-router';
import AuthContext from '../store/auth-context';


function Login() {
    const [login, setLogin] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const checkpasswordRef = useRef();

    const authCtx = useContext(AuthContext);

    const submitHandler = e => {
        e.preventDefault();

        const enterEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        let checkedPassword = null;

        if(!login) {
            checkedPassword = checkpasswordRef.current.value;
            if(checkedPassword !== enteredPassword) {
                alert("Confirm Password incorrect!");
                return;
            }
        }
        
        let url;

        if(login) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTXNggDtSFcuo5OAhVook6DZf6bFNdNdg";
        } else {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTXNggDtSFcuo5OAhVook6DZf6bFNdNdg";
        }
        
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enterEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    let errorMessage = 'Authentication failed!';
                    throw new Error(errorMessage);
                });
            }
        }).then(data => {
            const expirationTime = new Date(
                new Date().getTime() + (+data.expiresIn * 1000)
            );
            authCtx.login(data.idToken, expirationTime.toISOString());
            history.replace('/home');
        }).catch(err => {
            alert(err.message);
        });
    }
    
    return (
        <div>
            {login?<form className="login container" onSubmit={submitHandler}>
                <div className="login head"><h1 className="login text">Login</h1></div>
                <h1 className="login__input user">Email:</h1>
                <div className="login type"><input className="login__input" type="email" placeholder="Enter Email" ref={emailInputRef}></input></div>
                <h1 className="login__input user">Password:</h1>
                <div className="login type"><input type="password" className="login__input" placeholder="Enter Password" ref={passwordInputRef}></input></div>
                <div className="login type"><button className="login__button">Login</button></div>
                <div className="login type"><a className="forgot" href="#" onClick={() => {setIsOpen(true)}}>Forgot Password?</a></div>
                <div className="login type line"></div>
                <div className="login type"><button className="login__button second" onClick={() => {setLogin(false)}}>Sign Up</button></div>
            </form>:null}
            <ForgotPW open={isOpen} onClose={() => setIsOpen(false)}/>
            {login?null:<form className="login container" onSubmit={submitHandler}>
                <div className="login head"><h1 className="login text">Sign Up</h1></div>
                <h1 className="login__input user">Email Address:</h1>
                <div className="login type"><input className="login__input" type="email" placeholder="Enter Email" ref={emailInputRef}></input></div>
                <h1 className="login__input user">Set Password:</h1>
                <div className="login type"><input type="password" className="login__input" placeholder="Enter Password" ref={passwordInputRef}></input></div>
                <h1 className="login__input user">Confirm Password:</h1>
                <div className="login type"><input type="password" className="login__input" placeholder="Enter Password" ref={checkpasswordRef}></input></div>
                <div className="login type"><button className="login__button">Sign Up</button></div>
                <div className="login type"><a className="forgot" href="#" onClick={() => {setLogin(true)}}>Already had an account?</a></div>
            </form>}
        </div>
    )
}

export default Login
