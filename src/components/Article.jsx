import React, { Component } from "react";
import * as api from "../api";
import "./Article.css";
import Topicheader from "./Topicheader";
import VoteControl from "./VoteControl";
import SubmittedBy from "./SubmittedBy";
import Loader from "./Loader";
import ListComments from "./ListComments";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'

class Article extends Component {
  state = {
    article: {},
    comments: [],
    finishedLoading: false,
    error:null
  };

  componentDidMount = () => {
    this.fetchArticle();
  };





  render() {
    if(this.state.error) {
      return <Redirect to=
      {{
        pathname:"/error",
        state:{
          message: this.state.error.message
        }
      }}
      />
    }
    return (
      <div className="articleBody">
        <h1>{this.state.article.title}</h1>
        <div>
          {this.state.article._id ? (
            <div>
              <img
                src={`https://picsum.photos/${window.innerWidth - 50}/300&${
                  this.state.article.article_id
                }`}
                alt={`${this.state.article.belongs_to}`}
              />
              <Topicheader text={this.state.article.belongs_to} />
              <p>{this.state.article.body}</p>
              <SubmittedBy
                username={this.state.article.created_by.username}
                userid={this.state.article.created_by._id}
                created_at={this.state.article.created_at}
              />
              <VoteControl count={this.state.article.votes} id={this.state.article._id} vote={this.updateVote}/>
              <hr />
              <ListComments articleid={this.state.article._id} updateComments={this.updateComments} user={this.props.user}/>
              
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }


  fetchArticle = () => {
    api.getArticleById(this.props.match.params.article_id).then(article => {
      this.setState({
        article
      });
    })
    .catch(error=>{
      this.setState({
          error
      })
    })
  };

updateVote=(direction, id)=>{
  api.changeVote(direction, id)
  .then(article => {

    this.setState({
      article
    })
  })
}


}

Article.propTypes = {
    user: PropTypes.string,

  };


export default Article;
