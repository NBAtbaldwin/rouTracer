import React from 'react';
import { Link } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    this.props.fetchPendingFriends();
  }

  handleConfirm(userId, friendId) {
    return () => {
      this.props.updateFriendship({requestee_id: userId, requester_id: friendId, status: 'accepted' })
    }
  }

  render() {
    // console.log(this.props.pendingFriends)
    const noProps = () => {
      return (
        <div>
          sucka
        </div>
      )
    }
    const hasProps = () => {
      return (
        <div>
          Yo
          <ul>
            {this.props.pendingFriends.map(friend => {
              return (
                <li>
                  <button onClick={this.handleConfirm(this.props.currentUser.id, friend.id)}>confirm {friend.email}: {friend.id}</button>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
    return (
      <div>
        {this.props.pendingFriends.length > 0 ? hasProps() : noProps()}
      </div>
    )
  }
}

export default Profile;
