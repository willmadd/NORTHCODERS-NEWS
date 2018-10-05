import React from 'react';

const ErrorPage = (props) => {
    // console.log(props.location.state)
    return (
        <div>
            {props.location.state ? props.location.state.message:"page not found"}
            <h1>Error</h1>
        </div>
    );
};

export default ErrorPage;