import React from 'react';
import './TopicHeader.css';
import PropTypes from 'prop-types';

const TopicHeader = (props) => {
    return (
        <div>
            <div className="topicheader">{props.text && props.text[0].toUpperCase()+props.text.slice(1)}</div>
        </div>
    );
};

TopicHeader.propTypes = {
    text: PropTypes.string
  };

export default TopicHeader;