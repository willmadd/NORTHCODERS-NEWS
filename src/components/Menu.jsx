import { Link } from "react-router-dom";
import * as api from "../api";
import React, { Component } from "react";
import Welcome from "./Welcome";

class Menu extends Component {
  state = {
    users: [],
    topics: [],
    showSignUp:false
  };

  componentDidMount = () => {
    this.getTopics();
    this.getUsers();
  };


//   componentDidUpdate = (prevProps, prevState) => {
//  console.log('ddddd')
//  console.log(prevState.users)
//  console.log(this.state.users)
//     if(prevState.users.length !== this.state.users.length){
//       this.getUsers();
//       console.log('getting users')
//     }
//   };


  render() {
    return (
      <div className="mainNav">
      {this.state.showSignUp && <Welcome closeWelcome={()=>this.showSignUp()} updateUsers={this.updateUsers} changeUser={this.props.changeUser}/>}
        <Link to="/">
          <h2 className="menuItem">Home</h2>
        </Link>
        <button className="menuItem" onClick={()=>this.showSignUp()}><h2>Sign Up</h2></button>
        <h2 className="menuItem">Topics</h2>
        <select>
          {this.state.topics.map(topic => {
            return <option key={topic._id}>{topic.title}</option>;
          })}
        </select>

        <ul className="topicList">
          {this.state.topics.map(topic => {
            return <li key={topic._id} className="topicListItem">{topic.title}</li>;
          })}
        </ul>

        <div className="styled-select slate">
          <form>
            <select
              defaultValue=""
              className="menuItem"
              id="navSelect"
              onChange={event => {
                this.props.changeUser(event.target.value);
              }}
            >
              <option value="" disabled>
                Log In
              </option>
              {this.state.users.length
                ? this.state.users.map(user => {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  })
                : "Loading Users..."}
            </select>
          </form>
        </div>
        jjjj

        
      </div>
    );
  }

  getTopics = () => {
    api.getTopics().then(topics => {
      this.setState({
        topics
      });
    });
  };

  getUsers = () => {
    api.getAllUsers().then(users => {
      this.setState({
        users
      });
    });
  };

showSignUp = () =>{
  this.setState({
    showSignUp: !this.state.showSignUp
  })
}

updateUsers = (newUser)=>{
  let users = [...this.state.users, newUser]
this.setState({
users
})
}

}

export default Menu;
