import  { useState , useEffect } from 'react';

import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import classes from './Login.module.css';
import useInput from '../../hooks/use-input';

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const { value:enteredEmail, 
    isValid:enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler:emailChangedHandler,
    inputBlurHandler:emailBlurHandler,
    reset:resetEmailInput
  } = useInput(value => value.includes('@')); 

  const { value:enteredPassword, 
    isValid:enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler:passwordChangedHandler,
    inputBlurHandler:passwordBlurHandler,
    reset:resetPasswordInput
  } = useInput(value => value!=='' && value.length > 3 && value.length < 8);

  useEffect(()=> {
    const identifier = setTimeout(()=> {
      setFormIsValid(
        enteredEmailIsValid && enteredPasswordIsValid
      )
    },500);   
    return () => {
      // console.log('CLEAUP FUNCTION, For preventing the API CALL MULTIPLE TIME ');
      clearTimeout(clearTimeout);
    }    
  },[enteredEmailIsValid,enteredPasswordIsValid])

  const submitHandler = (event) => {
    event.preventDefault();
    let obj = {
      email:enteredEmail,
      password:enteredPassword
    }
    console.log(obj);       
  };

  const emailInputClasses = emailInputHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;
  const passwordInputClasses = passwordInputHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <div>
        <div className={emailInputClasses}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
          />
        </div>
        {emailInputHasError && 
          <p className={classes['error-text']}>Please enter the email.</p>}
        </div>
        <div>
        <div className={passwordInputClasses}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
          />
        </div>
        {passwordInputHasError && 
          <p className={classes['error-text']}>Please enter the password.</p>}
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
