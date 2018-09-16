import React from 'react';
import { Route } from 'react-router-dom';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './sign_up_form_container';
import GreetingContainer from "./greeting_container";
import DashboardContainer from "./dashboard_container";
import { AuthRoute, ProtectedRoute } from './../util/route_util';
import NavBar from './navbar';
import NavBarSignupContainer from "./navbar_signup_container";
import NavBarLoginContainer from "./navbar_login_container";
import RouteIndexContainer from "./routes/route_index/route_index_container";
import RouteBuilderContainer from "./routes/route_builder_container";
import RouteShowContainer from './routes/route_show/route_show_container'

  const App = () => (
    <div id="main">
      <header id="master-header">
        <AuthRoute path='/login' component={NavBarLoginContainer} />
        <AuthRoute path='/signup' component={NavBarSignupContainer} />
        <AuthRoute exact path='/' component={NavBarSignupContainer} />
      </header>
      <ProtectedRoute exact path='/routes' component={RouteIndexContainer} />
      <ProtectedRoute exact path='/new_route' component={RouteBuilderContainer} />
      <Route exact path='/' component={GreetingContainer} />
      <ProtectedRoute path="/routes/:routeId" component={RouteShowContainer} />
      <ProtectedRoute exact path='/dashboard' component={DashboardContainer} />
      <AuthRoute path='/login' component={LoginFormContainer} />
      <AuthRoute path='/signup' component={SignupFormContainer} />
    </div>
  );

export default App;
