import React, { Component } from "react";
import "./Articles.css";
import moment from "moment";
import * as api from "../api";
import sortBy from "lodash.sortby";
import VoteControl from "./VoteControl";
import {Link} from "react-router-dom";
import Topicheader from "./Topicheader";
import SubmittedBy from "./SubmittedBy";
import Loader from "./Loader";
import ArticleAdder from "./ArticleAdder";





class articles extends Component {
  state = {
    articles: [],
    // voteChange: 0
  };

  componentDidMount = () => {
    this.getArticles(this.props.match.params.topic_slug);
  };

  componentDidUpdate = (prevProps, prevState) => {
    // if (prevProps !== this.props ||prevState !== this.state) {
    //   this.getArticles(this.props.match.params.topic);
    // }
  };

  render() {
    return (
      <div className="bodycontent">
      {!this.state.articles[0] && <Loader/>}
      {this.props.match.params.topic_slug && <ArticleAdder topic ={this.props.match.params.topic_slug} addArticle={this.addArticle}/>}
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
                  <Topicheader text={article.belongs_to}/>
                  <h3>{article.title}</h3>

                  <p>
                    {article.body
                      .split(" ")
                      .slice(0, 15)
                      .join(" ")}
                    {article.body.split(" ")[16] && "..."}
                  </p>
                </Link>
                  <SubmittedBy userid = {article.created_by._id} created_at={article.created_at} username={article.created_by.username}/>
                  <hr />
                  <div className="articleInteractive">
                  <p className="commentCount">{article.comment}</p>
                  <VoteControl count={article.votes} vote={this.voteArticle} id={article._id}/>
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

          }
        }
        return article;
      });
      this.setState({
        articles: newState,
      });
    });
  };

  getArticles = topic => {
    if (topic) {
      api.getArticlesByTopic(topic).then(articles => {
        this.setState({
          articles
        });
      });
    } else {
      api.getAllArticles().then(articles => {
        this.setState({
          articles
        });
      });
    }
  };

  addArticle = (newArticle) => {
    const newArticles = [...this.state.articles, newArticle.article]
    this.setState({
      articles:newArticles
    })
  }
}

export default articles;
