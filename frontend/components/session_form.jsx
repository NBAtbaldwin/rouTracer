import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      disabled: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, {email: this.state.email, password: this.state.password});
    this.setState({disabled: true});
    this.props.processForm(user);
  }
// then(() => this.props.history.push('/'))

  componentWillUnmount() {
    this.props.clearSessionErrors();
  }

  updateField(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  loginDemoUser() {
    this.props.loginDemoUser();
    this.setState({disabled: true});
  }

  render() {
    const demoUserButton = <button className="demo-user-button" onClick={this.loginDemoUser} disabled={this.state.disabled}>Demo User</button>;
    // let demoUserButton;
    // if (this.props.formTitle === "Log In") {
    //   demoUserButton = <button className="demo-user-button" onClick={this.loginDemoUser} disabled={this.state.disabled}>Demo User</button>;
    // } else {
    //   demoUserButton = <span></span>;
    // }
    return(
      <div className="session-form-background">
        <div className="session-form-main">
          <div className="session-form-header">
            <h2>{this.props.formTitle}</h2>
          </div>
          <div className="session-form-title">
            <h3>{this.props.formType}</h3>
          </div>
          <form className="session-form" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <input type="text" className="session-form-field" placeholder="Your Email" onChange={this.updateField("email")} value={this.state.email} />
              </li>
              <li>
                <input className="session-form-field" type="password" placeholder="Password" onChange={this.updateField("password")} value={this.state.password} />
              </li>
              <ul>
                {this.props.errors.session.map((error) => {
                  return <li className="session-form-error">{error}</li>;
                })}
              </ul>
              <li>
                <input className="session-form-submit" type='submit' value={this.props.formTitle} disabled={this.state.disabled} />
              </li>
              <li className="session-form-line"></li>
            </ul>
          </form>
          <div className="demo-user-button-container">
            {demoUserButton}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);


// const demoUser = {email: "user@example.com", password: "demouser"};
// let demoUserButton;
// if (this.props.formTitle === "Log In") {
//   demoUserButton = <button className="demo-user-button" onClick={() => this.props.processForm(demoUser)}>Demo User</button>;
// } else {
//   demoUserButton = <span></span>;
// }
