import React, { Component } from "react";
import TopicHeader from "./Topicheader";
import PropTypes from "prop-types";
import * as api from "../api";

class ArticleAdder extends Component {
  state = {
    title: "",
    body: ""
  };
  render() {
    return (
      <div>
        <TopicHeader text={this.props.topic} />

{this.props.user?
  
<div>

        <h1>Add an Article...</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title
            <input
              type="textarea"
              id="titleInput"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </label>
          <label>
            Article
            <input
              type="textarea"
              id="bodyInput"
              name="body"
              onChange={this.handleChange}
              value={this.state.body}
            />
          </label>
          <input type="submit" />
        </form>
</div>
:<h1>Please Log in to submit an article</h1>}




      </div>
    );
  }

  handleChange = event => {
    if (event.target.name === "title") {
      this.setState({
        title: event.target.value
      });
    } else if (event.target.name === "body") {
      this.setState({
        body: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    let newArticleBody = {
      title: this.state.title,
      body: this.state.body,
      created_by: this.props.user
    };

    api
      .postArticle(newArticleBody, this.props.topic)
      .then(res => {
          this.props.addArticle(res);
      });

    this.setState({
      body: "",
      title: ""
    });
  };
}


ArticleAdder.propTypes = {
    topic: PropTypes.string.isRequired,
    addArticle: PropTypes.func.isRequired,
    user: PropTypes.string

  };
  


export default ArticleAdder;
