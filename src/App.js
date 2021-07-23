import { useContext } from 'react'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import "./App.scss"
import Login from './pages/Login'
import Quiz from './pages/Quiz'
import "./VoList.scss"
import Home from './pages/Home'
import Navigation from './component/Navigation'
import AuthContext from './store/auth-context'
import Introduce from './pages/Introduce'
import Settings from './pages/Settings'


const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Router>
      <div style={BUTTON_WRAPPER_STYLES}>
        <Navigation />
        <Switch>
          <Route exact path='/'>
            <Introduce />
          </Route>
          {!authCtx.isLoggedIn && (<Route exact path="/login">
            <Login />
          </Route>)}
          {authCtx.isLoggedIn && (<Route exact path="/home">
            <Home />
          </Route>)}
          {authCtx.isLoggedIn && (<Route exact path="/quiz">
            <Quiz />
          </Route>)}
          {authCtx.isLoggedIn && (<Route exact path="/settings">
            <Settings />
          </Route>)}
          <Route path='*'>
            <Redirect to ="/"/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App