import React, {Fragment, Suspense} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch,} from 'react-router-dom'
import packageJson from '../../../package.json'
import Dashboard from '../Dashboard'
import Loading from '../Loading'
import Login from '../Login'
import PasswordForgot from '../PasswordForgot'
import PasswordReset from '../PasswordReset'
import Profile from '../Profile'
import Register from '../Register'
import './App.css'

export const version = packageJson.version

const isLoggedIn = () => {
  return localStorage.getItem('TOKEN_KEY') !== null
}

const SecuredRoute = ({component: Component}) => {
  return (
    <Route
      render={properties => {
        if (!isLoggedIn()) {
          return <Redirect to="/login"/>
        }
        return <Component {...properties} />
      }}
    />
  )
}

function App() {
  return (
    <Fragment>
      <Suspense fallback={<Loading/>}>
        <Router>
          <Switch>
            <Route path='/register' component={Register}/>
            <Route path='/login/:notify?' component={Login}/>
            <Route path='/password/reset/:token' component={PasswordReset}/>
            <Route path='/password/forgot' component={PasswordForgot}/>
            <SecuredRoute path='/' redirectTo='dashboard' component={Dashboard}/>
            <SecuredRoute path='/dashboard' component={Dashboard}/>
            <SecuredRoute path='/profile' component={Profile}/>
          </Switch>
        </Router>
      </Suspense>
    </Fragment>
  )
}

export default App
