import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Loading from '../Loading';
import Login from '../Login';
import PasswordForgot from '../PasswordForgot';
import PasswordReset from '../PasswordReset';
import Profile from '../Profile';
import Register from '../Register';
import './App.css';
import { SecuredRoute } from './SecureRoute';

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login/:notify?" component={Login} />
            <Route path="/password/reset/:token" component={PasswordReset} />
            <Route path="/password/forgot" component={PasswordForgot} />
            <SecuredRoute path="/" redirectTo="dashboard" component={Dashboard} />
            <SecuredRoute path="/dashboard" component={Dashboard} />
            <SecuredRoute path="/profile" component={Profile} />
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
