import React from 'react';
import { Link } from "react-router-dom";
import Loading from "./../loading/loading";

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
    const noProps = () => {
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
                    <img src={suggested.photoUrl} className="prof-pic"></img>
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
    const loadingLogic = () => {
      if (this.props.loading) {
        return(
          <div className="suggested-friends-container">
            <Loading />
          </div>
        )
      } else {
        return (
          <div className="suggested-friends-container">
            {this.props.suggestedFriends.length > 0 ? hasProps() : noProps()}
          </div>
        )
      }
    }

    return (
      <>
        {loadingLogic()}
      </>
    )
  }
}

export default SuggestedFriends;
