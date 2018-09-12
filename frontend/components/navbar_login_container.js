import { signup } from './../actions/session_actions';
import { connect } from 'react-redux';
import NavBar from './navbar';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors,
    linkText: "Sign Up",
    linkRoute: "/signup"
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     processForm: (user) => dispatch(login(user)),
//   };
// };

export default connect(mapStateToProps, null)(NavBar);
