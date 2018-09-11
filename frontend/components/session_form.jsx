import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => this.props.history.push('/'));
  }

  updateField(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  render() {
    return(
      <div>
        <h2>{this.props.formType}</h2>
        <Link to={this.props.formType === "Sign Up" ? `/login` : `/signup`} >{this.props.formType === "Sign Up" ? "Login" : "Sign Up"}</Link>
        <form onSubmit={this.handleSubmit}>
          <label>Username
            <input type="text" onChange={this.updateField("username")} value={this.state.username} />
          </label>
          <label>Password
            <input type="text" onChange={this.updateField("password")} value={this.state.password} />
          </label>
          <input type='submit' value={this.props.formType}/>
        </form>
        <ul>
          {this.props.errors.session.map((error) => {
            return <li>{error}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(SessionForm);
