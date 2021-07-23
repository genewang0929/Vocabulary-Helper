import React, {useState, useEffect, useCallback, useContext} from 'react';
import { auth } from "../firebase";

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

export function useAuth() {
    return useContext(AuthContext)
  }

function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
}

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjEexpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjEexpirationTime - currentTime;

    return remainingDuration;
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const stroedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(stroedExpirationDate);

    if(remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    };
}

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if(tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    
    const userIsLoggedIn = !!token;


    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        if(logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if(tokenData) {
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        resetPassword
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;