import React, { useState , useEffect } from 'react';

import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import classes from './Login.module.css';


const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  useEffect(()=> {
    // Here we are using the cleanup function to prevent the multiple,
    // function call at the time of key change (Example like API Call)

    const identifier = setTimeout(()=> {
      // console.log('check num of call in useEffect');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      )
    },500);   
    return () => {
      // console.log('CLEAUP FUNCTION, For preventing the API CALL MULTIPLE TIME ');
      clearTimeout(clearTimeout);
    }    
  },[enteredEmail,enteredPassword])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);   
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let userList = localStorage.getItem('userList') || [];
    if(userList.length > 0) {
      userList = JSON.parse(userList); 
      const currentUser = userList.filter(user => user.email === enteredEmail);
      if(currentUser && currentUser.length > 0){
          props.onLogin('Admin');
          console.log('Admin');
      } else {
          props.onLogin('Guest');
          console.log('Guest User');
      }
    }    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
