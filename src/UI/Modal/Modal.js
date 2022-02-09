import React from 'react';
import ReactDOM from 'react-dom';
import Card from './../Card/Card';
import Button from './../Button/Button';
import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className= {classes.backdrop} onClick={props.onConfirm}/>
}

const ModalOverlay = (props) => {
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>User Details</h2>
            </header>
            <div className={classes.content}>
                <p><span className={classes['text-heading']}>Name:</span>{props.data.name}</p>
            </div>
            <div className={classes.content}>
                <p><span className={classes['text-heading']}>Email:</span>{props.data.email}</p>
            </div>
            <div className={classes.content}>
               <p><span className={classes['text-heading']}>Contact:</span>{props.data.contact}</p>
            </div>
            <footer className={classes.actions}>
                <Button onClick={props.onConfirm}>Okay!</Button>
            </footer>
            </Card>
    )
}

const Modal = (props) => {
  return  <React.Fragment>
  { ReactDOM.createPortal(
      <Backdrop onConfirm={props.onConfirm} />, 
      document.getElementById('backdrop-root')
      )
  }
  { ReactDOM.createPortal(
      <ModalOverlay title={props.title} message={props.message} data={props.data}  onClick={props.onConfirm} />, 
      document.getElementById('overlay-root')
      )
  }

</React.Fragment>;
}

export default Modal;
