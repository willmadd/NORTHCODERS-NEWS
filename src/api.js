import axios from "axios";

const DB_URL = "https://evening-cliffs-44997.herokuapp.com/api";

export const getArticlesByTopic = topic => {
  return axios
    .get(`${DB_URL}/topics/${topic}/articles`)
    .then(({ data }) => data.topicData);
};

export const getAllArticles = () => {
  return axios
    .get(`${DB_URL}/articles`)
    .then(({ data }) => data.articlesWithCommentCount)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

export const getArticleById = id => {
  return axios
    .get(`${DB_URL}/articles/${id}`)
    .then(({ data }) => data.articleData)

};

export const getCommentsByArticleId = id => {
  return axios
    .get(`${DB_URL}/articles/${id}/comments`)
    .then(({ data }) => {
      return data.commentData;
    })
    .catch(err => {});
};

export const changeVote = (direction, id) => {
  return axios
    .put(`${DB_URL}/articles/${id}?vote=${direction}`)
    .then(({ data }) => data.article)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

export const getTopics = () => {
  return axios
    .get(`${DB_URL}/topics`)
    .then(({ data }) => data.topicData)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

export const postComment = (newComment, id) => {
  return axios
    .post(`${DB_URL}/articles/${id}/comments`, newComment)
    .then(({ data }) => data)

    .catch(err => {
      console.log(err);
      throw err;
    });
};

export const deleteComment = id => {
  return axios
    .delete(`${DB_URL}/comments/${id}`)
    .then(({ data }) => data)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

export const postArticle = (newArticle, topic) => {
  return axios
    .post(`${DB_URL}/topics/${topic}/articles`, newArticle)
    .then(({ data }) => data)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

export const changeCommentVote = (direction, id) => {
  return axios
    .put(`${DB_URL}/comments/${id}?vote=${direction}`)
    .then(({ data }) => data)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

export const getUserInfo = username => {
  return axios.get(`${DB_URL}/users/${username}`).then(({ data }) => data.userData);
  
};


export const getAllUsers = () => {
  return axios
    .get(`${DB_URL}/users`)
    .then(({ data }) => data.users)
    .catch(err => {
      console.log(err);
      throw err;
    });
};


export const addUser = (newUser) => {
  return axios
    .post(`${DB_URL}/users`, newUser)
    .then(({ data }) => data.user)
    .catch(err => {
      console.log(err);
      throw err;
    });
};