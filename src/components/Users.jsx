import React, { Component } from "react";
import * as api from "../api";
import Loader from "./Loader";

class Users extends Component {
  state = {
    user: {}
  };

  componentDidMount = () => {
      console.log(this.props.match.params.username)
    api.getUserInfo(this.props.match.params.username).then(res => {
        console.log(res)
      this.setState({
        user: res
      });
    });
  };

  render() {
    return (
      <div>

        {!this.state.user.username && <Loader/>}
        {this.state.user && <div>
        <h3> User Name: {this.state.user.username}</h3>
        <h3> Name: {this.state.user.name}</h3>
        <h3> id: {this.state.user._id}</h3>
        <img
          src={`${this.state.user.avatar_url}`}
          onError={img=>{img.target.src = "/images/ncninja.svg"}}
          height="40"
          width="40"
          alt="Avatar for User"
        />
        </div>
        }
      </div>
    );
  }
}

export default Users;
