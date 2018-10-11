import React from 'react';
import { Link } from "react-router-dom";

class SuggestedFriends extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    const that = this;
    this.props.fetchUser(this.props.currentUser.id).then( () => {
      Object.keys(that.props.friends).forEach(id => {
        that.props.fetchUser(id);
      })
    })
  }

  handleCreate(userId, suggestedId) {
    return () => {
      this.props.createFriendship({requester_id: userId, requestee_id: suggestedId, status: 'pending' })
    }
  }

  render() {
    // console.log(this.props.pendingFriends)
    const noProps = () => {
      console.log(this.props.friends)
      return (
        <div className="suggested-friends-master">

        </div>
      )
    }
    const hasProps = () => {
      return (
        <div className="suggested-friends-master">
          <div>Suggested Friends</div>
          <ul>
            {this.props.suggestedFriends.map((suggested, idx) => {
              if (idx < 6) {
                return (
                  <li key={idx}>
                    <div className='prof-pic'></div>
                    <div>
                      <p><Link to={`profile/${suggested.id}`}>{suggested.email}</Link></p>
                      <div onClick={this.handleCreate(this.props.currentUser.id, suggested.id)}>Request to Follow</div>
                    </div>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      )
    }
    return (
      <div>
        {this.props.suggestedFriends.length > 0 ? hasProps() : noProps()}
      </div>
    )
  }
}

export default SuggestedFriends;
