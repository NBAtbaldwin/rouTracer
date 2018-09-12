import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

// then(() => this.props.history.push('/'))

  updateField(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  render() {
    return(
      <div>
        <h2>{this.props.formType}</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Email
            <input type="text" onChange={this.updateField("email")} value={this.state.email} />
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
