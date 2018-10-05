import React, { Component } from "react";
import "./App.css";
import Menu from "./components/Menu";
import "./components/Menu.css";
import TitleBar from "./components/TitleBar";
import { Route, Switch } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Users from "./components/Users";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";
import ErrorPage from "./components/ErrorPage";

class App extends Component {
  state = {
    user: "",
    viewWelcome: true
  };

  componentDidMount = () => {
    let visited = localStorage["alreadyVisited"];
    if (visited) {
      this.setState({
        viewWelcome: false
      });
    } else {
      localStorage["alreadyVisited"] = true;
      this.setState({
        viewWelcome: true
      });
    }
  };

  render() {
    return (
      <div>

        <Menu changeUser={this.changeUser} />

        {this.state.viewWelcome && (
          <Welcome
          closeWelcome={this.closeWelcome}
          changeUser={this.changeUser}
          />
        )}
        <TitleBar />
          <Switch>
        <Route exact path="/" component={Articles} />
        <Route exact path="/topics/:topic_slug" component={Articles} />
        <Route
          exact
          path="/articles/:article_id"
          render={routerProps => (
            <Article {...routerProps} user={this.state.user} />
            )}
            />

        <Route exact path="/users/:username" component={Users} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/error" component={ErrorPage}/>
        <ErrorPage />
            </Switch>
      </div>
    );
  }

  changeUser = user => {
    console.log('changeuser activated')
    this.setState({
      user
    });
  };

  closeWelcome = () => {
    this.setState({
      viewWelcome:false
    })
  };
}

export default App;
