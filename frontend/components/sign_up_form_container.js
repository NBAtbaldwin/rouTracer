import { signup, login, clearSessionErrors } from './../actions/session_actions';
import { connect } from 'react-redux';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors,
    formType: "Sign up with email",
    formTitle: "Sign Up",
  };
};

const demoUser = {email: "user@example.com", password: "demouser"};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    processForm: (user) => dispatch(signup(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    loginDemoUser: () => dispatch(login(demoUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
