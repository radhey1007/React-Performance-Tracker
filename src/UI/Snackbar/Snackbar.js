import React from 'react';
import classes from './Snackbar.module.css';

const Snackbar = (props) => {

  const className = `${classes[props.severity]}`;   

  return (
    <div className={className}>
        {props.children}
    </div>     
  )
}

export default Snackbar