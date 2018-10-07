import React, { Component } from "react";
import "./Articles.css";
import moment from "moment";
import * as api from "../api";
import sortBy from "lodash.sortby";
import VoteControl from "./VoteControl";
import { Link, Redirect } from "react-router-dom";
import Topicheader from "./Topicheader";
import SubmittedBy from "./SubmittedBy";
import Loader from "./Loader";
import ArticleAdder from "./ArticleAdder";
import PropTypes from "prop-types";



class Articles extends Component {
  state = {
    articles: [],
    error: null
    // voteChange: 0
  };

  componentDidMount = () => {

    this.getArticles(this.props.match.params.topic_slug);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.match.params.topic_slug !== this.props.match.params.topic_slug
    ) {
      this.getArticles(this.props.match.params.topic_slug);
    }
  };

  render() {
    console.log(this.props.user)
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
      <div className="bodycontent">
        {!this.state.articles[0] && <Loader />}
        {this.props.match.params.topic_slug && (
          <ArticleAdder
            topic={this.props.match.params.topic_slug}
            addArticle={this.addArticle}
            user={this.props.user}
          />
        )}
        <ul className="articleUL">
          {sortBy([...this.state.articles], article => {
            return new moment(article.created_at);
          })
            .reverse()
            .slice(0, 21)
            .map(article => {
              return (
                <li key={article._id} className="articleCard">
                  <Link to={`/articles/${article._id}`}>
                    <img
                      className="articleCardImage"
                      src={`https://picsum.photos/600/200&${article._id}`}
                      alt="title"
                    />
                  </Link>
                  <Link to={`/topics/${article.belongs_to}`}>
                    <Topicheader text={article.belongs_to} />
                  </Link>
                  <Link to={`/articles/${article._id}`}>
                    <h3>{article.title}</h3>

                    <p>
                      {article.body
                        .split(" ")
                        .slice(0, 15)
                        .join(" ")}
                      {article.body.split(" ")[16] && "..."}
                    </p>
                  </Link>
                  <SubmittedBy
                    userid={article.created_by._id}
                    created_at={article.created_at}
                    username={article.created_by.username}
                  />
                  <hr />
                  <div className="articleInteractive">
                    <p className="commentCount">{article.comment}</p>
                    <VoteControl
                      count={article.votes}
                      vote={this.voteArticle}
                      id={article._id}
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  voteArticle = (direction, id) => {
    api.changeVote(direction, id).then(res => {
      const newState = [...this.state.articles].map(article => {
        if (article._id === res._id) {
          return {
            ...res,
            comment: article.comment
          };
        }
        return article;
      });
      this.setState({
        articles: newState
      });
    });
  };

  getArticles = topic => {
    if (topic) {
      api.getArticlesByTopic(topic).then(articles => {
        this.setState({
          articles
        });
      })
      .catch(error=>{
        this.setState({
          error
        })
      });
    } else {
      api.getAllArticles().then(articles => {
        this.setState({
          articles
        });
      })
      .catch(error=>{
        this.setState({
          error
        })
      });
    }
  };

  addArticle = newArticle => {
    console.log(newArticle)
    const newArticles = [...this.state.articles, newArticle.article];
    console.log(newArticles)
    this.setState({
      articles: newArticles
    });
  };
}


Articles.propTypes = {
  user: PropTypes.string
};

export default Articles;
