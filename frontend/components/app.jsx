import React from 'react';
import { Route } from 'react-router-dom';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './sign_up_form_container';
import GreetingContainer from "./greeting_container";
import Dashboard from "./dashboard";
import { AuthRoute } from './../util/route_util';

  const App = () => (
    <div>
      <header>
        <h1>Stråååvå</h1>
      </header>
      <Route exact path='/' component={GreetingContainer} />
      <Route exact path='/dashboard' component={Dashboard} />
      <AuthRoute path='/login' component={LoginFormContainer} />
      <AuthRoute path='/signup' component={SignupFormContainer} />
    </div>
  );

export default App;
