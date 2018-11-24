import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/dashboard" />
    )
  )}/>
);

const Protected = ({ component: Component, path, loggedIn, exact, foo }) => {
  function toRender(props) {
    if (!loggedIn) {
      return <Redirect to='/login' />;
    } else {
      return <Component {...props} />;
    }
  }
  return (
    <Route path={path} exact={exact} render={toRender} />
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.id),
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
