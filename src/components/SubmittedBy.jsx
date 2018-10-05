import React from "react";
import moment from "moment";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


const SubmittedBy = (props) => {
  return (
    <div>
      <p className="minorText">
        Submitted {moment(props.created_at).fromNow()} by{" "}
        <Link to={`/users/${props.username}`}>{props.username}</Link>
      </p>
    </div>
  );
};

SubmittedBy.propTypes = {
    created_at: PropTypes.string,
    username: PropTypes.string,
    userid: PropTypes.string

  };


export default SubmittedBy;
