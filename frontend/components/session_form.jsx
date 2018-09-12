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
      <div className="session-form-background">
        <div className="session-form-main">
          <div className="session-form-header">
            <h2>{this.props.formTitle}</h2>
          </div>
          <form className="session-form" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <input type="text" className="session-form-field" placeholder="Your Email" onChange={this.updateField("email")} value={this.state.email} />
              </li>
              <li>
                <input className="session-form-field" type="password" placeholder="Password" onChange={this.updateField("password")} value={this.state.password} />
              </li>
              <li>
                <input type='submit' value={this.props.formType}/>
              </li>
            </ul>
          </form>
          <ul>
            {this.props.errors.session.map((error) => {
              return <li>{error}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
