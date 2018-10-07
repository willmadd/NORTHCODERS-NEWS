import { Link } from "react-router-dom";
import * as api from "../api";
import React, { Component } from "react";
import Welcome from "./Welcome";

class Menu extends Component {
  state = {
    users: [],
    topics: [],
    showSignUp: false
  };

  componentDidMount = () => {
    this.getTopics();
    this.getUsers();
    let visited = localStorage["alreadyVisited"];
    if (visited) {
      this.setState({
        showSignUp: false
      });
    } else {
      localStorage["alreadyVisited"] = true;
      this.setState({
        showSignUp: true
      });
    }
  };

  render() {
    return (
      <div className="mainNav">
        {this.state.showSignUp && (
          <Welcome
            closeWelcome={() => this.showSignUp()}
            updateUsers={this.updateUsers}
            changeUser={this.props.changeUser}
          />
        )}

        <nav>
          <ul>
              <Link to="/">
            <li className="menuItem">
              Home
            </li>
              </Link>
            <li className="menuItem">
              <a>Topics</a>
              <ul className="dropdown">
                {this.state.topics.map(topic => {
                  return (
                    <Link to={`/topics/${topic.slug}`} key={topic._id}>
                      <li  className="dropDownItem">
                        {topic.title}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </li>
            
            <li id="signupbutton" className="menuItem">
              <button onClick={() => this.showSignUp()}>Sign Up</button>
            </li>


        <li className="menuItem">
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
              <option value="">
                Log In
              </option>
              {this.state.users.length
                ? this.state.users.map(user => {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.username}
                      </option>
                    );
                  })
                : "Loading Users..."}
            </select>
          </form>
        </div>
          </li>

          </ul>
        </nav>
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

  showSignUp = () => {
    this.setState({
      showSignUp: !this.state.showSignUp
    });
  };

  updateUsers = newUser => {
    let users = [...this.state.users, newUser];
    this.setState({
      users
    });
  };
}

export default Menu;
