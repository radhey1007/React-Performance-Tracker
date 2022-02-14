import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card/Card';

function PageNotFound() {
  return <Card className="main-container">
            <h2> Page not Found :-) </h2>
            <Link to="/">Go to Home Page.</Link>
        </Card>;
}

export default PageNotFound;
