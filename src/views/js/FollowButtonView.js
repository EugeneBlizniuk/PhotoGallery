import React, { Component } from "react";
import { isFollowing, unfollowUser, followUser } from "../../util/APIUtils";
import './../css/FollowButton.css';

class FollowButtonView extends Component {
    constructor({currentUser, user}) {
        super();
        this.state = {
            hidden: true,
            following: false,
            currentUser: currentUser,
            user: user
        }
        
        if (this.state.currentUser !== null) {
            this.setFollowing();
            this.setHidden();
        }

        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }

    setHidden() {
        let currentUser = this.state.currentUser;
        if (currentUser !== null) {

            let user = this.state.user;
            if (currentUser.username !== user.username) {
                this.state.hidden = false;
            }
        }
    }

    setFollowing() {
        isFollowing(this.state.user.username)
        .then(response => {
            this.setState(
                {
                    following: response.following
                }
            )
        })
        .catch(() => {
            this.setState({
                serverError: true,
            });
        });  
    }

    unfollow() {
        unfollowUser(this.state.user.username)
        .then(response => {
            this.setState(
                {
                    following: response.following
                }
            )
        })
        .catch(() => {
            this.setState({
                serverError: true
            });
        });  
    }

    follow() {
        followUser(this.state.user.username)
        .then(response => {
            this.setState(
                {
                    following: response.following
                }
            )
        })
        .catch(() => {
            this.setState({
                serverError: true
            });
        });  
    }

    render() {
        if (this.state.user != null) {
            if (this.state.following) {
                return <div> <button className='follow-button' type='submit' 
                hidden={this.state.hidden} onClick={this.unfollow}>Unfollow</button> 
                </div>
            } else {
                return <div> <button className='follow-button' type='submit'
                 hidden={this.state.hidden} onClick={this.follow}>Follow</button> 
                </div>
            }
        }
    }
}

export default FollowButtonView;