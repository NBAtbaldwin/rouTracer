import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input'
import { Link } from "react-router-dom";

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      ul: false,
    }
    this.searchUpdated = this.searchUpdated.bind(this);
    this.KEYS_TO_FILTERS = ['email']
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  showUl() {
    let output = false;
    this.props.users.forEach(user => {
      if (user.email.includes(this.state.searchTerm) && this.state.searchTerm.length > 0) {
        output = true;
      }
    })
    return output;
  }

  render () {


    const hasProps = () => {
      const filteredUsers = this.props.users.filter(createFilter(this.state.searchTerm, this.KEYS_TO_FILTERS))

      const displayField = (term) => {
        return (
          <ul className={this.showUl() === false ? "hidden" : ""}>
            {filteredUsers.map(user => {
              if (user.email.includes(term) && term.length > 0) {
                return (
                  <li>
                    <div className='prof-pic'></div>
                    <div>
                      <p><Link to={`profile/${user.id}`}>{user.email}</Link></p>
                    </div>
                  </li>
                )
              }
            })}
          </ul>
        )
      }

      return (
        <div>
          <SearchInput className="search-input" onChange={this.searchUpdated} />
          {displayField(this.state.searchTerm)}
        </div>
      )
    }

    const noProps = () => {
      return(
        <div>
        </div>
      )
    }

    return (
      <div className="search-master">
        {this.props.users ? hasProps() : noProps()}
      </div>
    )


  }
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

}

export default SearchBar;
