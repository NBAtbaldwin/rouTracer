import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleDropdown() {
    this.setState({ open: !this.state.open });
  }

  handleDelete(){
    this.props.deleteActivity(this.props.id).then(() => this.props.history.push("/"));
  }

  render() {
    return (
      <section
        onBlur={() => this.toggleDropdown()}
        onFocus={() => this.toggleDropdown()}
        tabIndex="0"
        >
        <button><Link to={`/edit_activity/${this.props.id}`}><i className="fas fa-edit"></i></Link></button>
        <button><i className="fas fa-wrench"></i>
          {this.state.open && (
            <div onClick={this.handleDelete}>
              <div>delete item</div>
            </div>
          )}
        </button>

      </section>
    );
  }
}

export default withRouter(Dropdown);
