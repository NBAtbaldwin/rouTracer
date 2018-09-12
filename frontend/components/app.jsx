import React from 'react';
import { Route } from 'react-router-dom';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './sign_up_form_container';
import GreetingContainer from "./greeting_container";
import DashboardContainer from "./dashboard_container";
import { AuthRoute, ProtectedRoute } from './../util/route_util';

  const App = () => (
    <div>
      <header>
        <h1>Stråååvå</h1>
      </header>
      <Route exact path='/' component={GreetingContainer} />
      <ProtectedRoute exact path='/dashboard' component={DashboardContainer} />
      <AuthRoute path='/login' component={LoginFormContainer} />
      <AuthRoute path='/signup' component={SignupFormContainer} />
    </div>
  );

export default App;
