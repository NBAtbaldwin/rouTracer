import { login } from './../actions/session_actions';
import { connect } from 'react-redux';
import NavBar from './navbar';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors,
    linkText: "Log In",
    linkRoute: "/login",
    currentUser: state.entities.users[state.session.id],
  };
};


export default connect(mapStateToProps, null)(NavBar);
