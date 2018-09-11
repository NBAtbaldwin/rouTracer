import { signup } from './../actions/session_actions';
import { connect } from 'react-redux';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors,
    formType: "Sign Up"
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    processForm: (user) => dispatch(signup(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
