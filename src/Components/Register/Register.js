import React , { useState , useEffect } from 'react';
import classes from './Register.module.css';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';

const Register = (props) => {

    let registerModal = {
        'contact': '',
        'email': '',
        'name': '',
        'password': '',
        'role':'1'
    }
    if(props.editUserData && props.editUserData.name){
        registerModal.name = props.editUserData.name;
        registerModal.email = props.editUserData.email;
        registerModal.contact = props.editUserData.contact;
        registerModal.password = props.editUserData.password;
    }
    const [enteredName, setEnteredName] = useState(registerModal.name);
    const [nameIsValid, setNameIsValid] = useState();
    const [isNameTouched, setIsNameTouched] = useState(false);
    const [enteredContact, setEnteredContact] = useState(registerModal.contact);
    const [contactIsValid, setContactIsValid] = useState();
    const [isContactTouched, setIsContactTouched] = useState(false);
    const [enteredEmail, setEnteredEmail] = useState(registerModal.email);
    const [emailIsValid, setEmailIsValid] = useState();
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState(registerModal.password);
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [userType, setUserType] = useState('');
    const [userTypeIsValid, setUserTypeIsValid] = useState();
    const [isUserTypeTouched, setIsUserTypeTouched] = useState(false);
    const [adminCode, setAdmincode] = useState('');
    const [adminCodeIsValid, setAdminCodeIsValid] = useState();
    const [isAdminCodeTouched, setIsAdminCodeTouched] = useState(false);

    let userTypeList = ['','Student','Teacher','Admin'];
  
    useEffect(()=> { 
      const identifier = setTimeout(()=> {
        setFormIsValid(
          enteredEmail.includes('@') && enteredPassword.trim().length > 6
        )
      },500);   
      return () => {
        clearTimeout(identifier);
      }    
    },[enteredEmail,enteredPassword])
  
    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);   
    };
    
    const contactChangeHandler = (event) => {
    setEnteredContact(event.target.value);
    };

    const emailChangeHandler = (event) => {
      setEnteredEmail(event.target.value);   
    };
  
    const passwordChangeHandler = (event) => {
      setEnteredPassword(event.target.value);
    };

    const adminCodeChangeHandler = (event) => {
      setAdmincode(event.target.value);
    };

    const validateNameHandler = () => {
        setIsNameTouched(true);
        setNameIsValid(enteredName.trim().length > 0);
    };

    const validateContactHandler = () => {
        setIsContactTouched(true);
        setContactIsValid(enteredContact.trim().length > 0);
    };
  
    const validateEmailHandler = () => {
      setIsEmailTouched(true);
      setEmailIsValid(enteredEmail.includes('@'));
    };
  
    const validatePasswordHandler = () => {
      setIsPasswordTouched(true);
      setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const validateAdminHandler = () => {
      setIsAdminCodeTouched(true);
      setAdminCodeIsValid(adminCode==='ADMIN');
    };

    // 1 => Normal User
    // 2 => Admin User
  
    const submitHandler = (event) => {
      event.preventDefault();  
      setIsNameTouched(true);    
      const obj = {
        name:enteredName,
        contact:enteredContact,
        email:enteredEmail,
        password:enteredPassword,
        userType:userType,
        role:1,
        adminCode:adminCode
      }
      console.log(obj , 'obj');   
    };  

    const onChangeUserType = (event) => {
      const userTypes = userTypeList[event.target.options.selectedIndex];
      setUserTypeIsValid(userTypes.trim().length > 0);
      setUserType(userTypes);
      if(userType!=='Admin'){
       setAdmincode('');
      }
    }

    const handleUserType = () => {
      setIsUserTypeTouched(true);   
      setUserTypeIsValid(userType.trim().length > 0);
    }


  return <Card className={classes.register}>
  <form onSubmit={submitHandler}>
   <div className='form-input'>  
  <div
    className={`${classes.control} ${
        nameIsValid === false ? classes.invalid : ''
    }`}
    >
    <label htmlFor="name">Name</label>
    <input
        type="text"
        id="name"
        value={enteredName}
        onChange={nameChangeHandler}
        onBlur={validateNameHandler}
    />
    
    </div>
    {isNameTouched && !nameIsValid && 
      <p className={classes['error-text']}>Please enter the name.</p>}
      </div>
      <div>
    <div
    className={`${classes.control} ${
        contactIsValid === false ? classes.invalid : ''
    }`}
    >
    <label htmlFor="contact">Contact</label>
    <input
        type="text"
        id="contact"
        value={enteredContact}
        onChange={contactChangeHandler}
        onBlur={validateContactHandler}
    />
    </div>
    {isContactTouched && !contactIsValid && 
      <p className={classes['error-text']}>Please enter the contact.</p>}
    </div>
    <div>
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
      {isEmailTouched && !emailIsValid && 
        <p className={classes['error-text']}>Please enter the email.</p>}
    </div>   
    <div>
      <div className={classes.control}>
        <label htmlFor="userType">User Type</label>
        <select className={classes.select} onBlur={handleUserType} onChange={onChangeUserType}>
          <option defaultValue="Student">Select User Type</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Admin">Admin</option>
        </select>
        </div>   
        {isUserTypeTouched && !userTypeIsValid &&
          <p className={classes['error-text']}>Please select the user type.</p>}
    </div>
     <div>
    {userType==='Admin' && <div className={`${classes.control} ${
        adminCodeIsValid === false ? classes.invalid : ''
      }`}>
      <label htmlFor="admincode">Admin Code</label>
      <input
        type="text"
        id="admincode"
        value={adminCode}
        onChange={adminCodeChangeHandler}
        onBlur={validateAdminHandler}
      />
      </div>     
    }
    {userType==='Admin' && isAdminCodeTouched && !adminCodeIsValid && 
      <p className={classes['error-text']}>Please enter the admin code.</p>}
    </div>
    <div>
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
      {isPasswordTouched && !passwordIsValid && 
        <p className={classes['error-text']}>Please enter the password.</p>}
    </div>
    <div className={classes.actions}>
      <Button type="submit" className={classes.btn} disabled={!formIsValid}>
        Register
      </Button>
    </div>
  </form>
</Card>;
}

export default Register;
