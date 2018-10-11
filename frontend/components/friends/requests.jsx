import React from 'react';
import { Link } from "react-router-dom";

class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    this.props.fetchPendingFriends();
  }

  handleConfirm(userId, friendId) {
    return () => {
      this.props.updateFriendship({requestee_id: userId, requester_id: friendId, status: 'accepted' }).then(() => (
        this.props.fetchPendingFriends()
      ))
    }
  }

  handleDelete(userId, pendingId) {
    return () => {
      this.props.deleteFriendship({requestee_id: userId, requester_id: pendingId, status: 'denied' })
    }
  }

  render() {
    // console.log(this.props.pendingFriends)
    const noProps = () => {
      return (
        <ul className="request-master empty">
          <li className="empty-requests">No pending friend requests</li>
        </ul>
      )
    }
    const hasProps = () => {
      return (
        <ul className="request-master">
          {this.props.pendingFriends.map((pending, idx) => {
            if (idx < 6) {
              return (
                <li key={idx}>
                  <section>
                    <div className='prof-pic'></div>
                    <p><Link to={`profile/${pending.id}`}>{pending.email}</Link> wants to follow you</p>
                  </section>
                  <div>
                    <div onClick={this.handleConfirm(this.props.currentUser.id, pending.id)}>Confirm</div>
                    <div onClick={this.handleDelete(this.props.currentUser.id, pending.id)}>Ignore</div>
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
        {this.props.pendingFriends.length > 0 ? hasProps() : noProps()}
      </div>
    )
  }
}

export default Requests;
