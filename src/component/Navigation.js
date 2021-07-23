import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "../App.scss"
import AuthContext from '../store/auth-context'

const Navigation = () => {
    const authCtx = useContext(AuthContext);
    const isLogged = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    }

    return (
        <div>
            <div className="header">
                {!isLogged ? <Link to="/"><img src={require("../img/logo.png").default} alt="dynastiii" className="header logo"></img></Link>
                : <Link to="/home"><img src={require("../img/logo.png").default} alt="dynastiii" className="header logo"></img></Link>}
                {isLogged ? <Link to="/home" className="btn home">Home</Link> : null}
                {isLogged ? <Link to="/quiz" className="btn quiz">Quiz</Link> : null}
                {isLogged ? <Link to="/settings" className="btn settings">Settings</Link> : null}
                {isLogged ? <Link to="/login" className="btn login" onClick={logoutHandler}>Logout</Link> : null}
                {!isLogged ? <Link to="/login" className="btn login">Login</Link> : null}
            </div>
        </div>
    )
}

export default Navigation
