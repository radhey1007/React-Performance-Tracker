import React , { useState , useEffect } from 'react';
import classes from '../Register/Register.module.css';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import { BASE_URL, USER_PATH } from '../../constant/urls';
import Snackbar from '../../UI/Snackbar/Snackbar';
import { useNavigate } from "react-router-dom";


const EditUser = (props) => {

    const loginUserDetail = JSON.parse(localStorage.getItem('loginUserdetails')) || {};
    const editFormData = props.editFormData;
    let successMessage = '';
    let buttonLabel = '';
    let registerModal = {
      name:'',
      contact:'',
      email:'',
      password:'',
      userType:'',
      isBatchAssigned:false,
      isTaskAssigned:false,
      isSoftDelete:false,
      adminCode: '',
    } 
    if(editFormData !=={}){
      registerModal = {
        name:editFormData.name,
        contact:editFormData.contact,
        email:editFormData.email,
        password:editFormData.password,
        userType:editFormData.userType,
        isBatchAssigned:editFormData.isBatchAssigned,
        isTaskAssigned:editFormData.isTaskAssigned,
        isSoftDelete:editFormData.isSoftDelete,
        adminCode: editFormData,
      } 
    }
   
    if(props.viewMode==='edit'){
      successMessage = 'Record updated successfully.'
      buttonLabel = 'Update';
    } else if(props.viewMode==='add') {
      successMessage = 'User added successfully.'
      buttonLabel = 'Add';
    }else {
      successMessage = 'Register successfully.'
      buttonLabel = 'Register';
    }
    

    let { value:enteredName, 
            isValid:enteredNameIsValid,
            hasError: nameInputHasError,
            valueChangeHandler:nameChangedHandler,
            inputBlurHandler:nameBlurHandler,
            reset:resetNameInput
          } = useInput(value => value.trim()!=='');

    const { value:enteredEmail, 
            isValid:enteredEmailIsValid,
            hasError: emailInputHasError,
            valueChangeHandler:emailChangedHandler,
            inputBlurHandler:emailBlurHandler,
            reset:resetEmailInput
          } = useInput(value => value.includes('@'));     
          
     const { value:enteredContact, 
            isValid:enteredContactIsValid,
            hasError: contactInputHasError,
            valueChangeHandler:contactChangedHandler,
            inputBlurHandler:contactBlurHandler,
            reset:resetContactInput
          } = useInput(value => value!=='' && !isNaN(value) && value.length===10); 
          
      const { value:enteredPassword, 
            isValid:enteredPasswordIsValid,
            hasError: passwordInputHasError,
            valueChangeHandler:passwordChangedHandler,
            inputBlurHandler:passwordBlurHandler,
            reset:resetPasswordInput
          } = useInput(value => value!=='' && value.length > 3 && value.length < 8); 
           
    const [formIsValid, setFormIsValid] = useState(false);
    const [userType, setUserType] = useState('');
    const [userTypeIsValid, setUserTypeIsValid] = useState();
    const [isUserTypeTouched, setIsUserTypeTouched] = useState(false);
    const [adminCode, setAdmincode] = useState('');
    const [adminCodeIsValid, setAdminCodeIsValid] = useState();
    const [isAdminCodeTouched, setIsAdminCodeTouched] = useState(false);
    let userTypeList = ['','Student','Teacher','Admin']; 
    const {isLoading , error , sendRequest:sendRegisterRequest} = useHttp();
    const [isRegistrationSuccess , setIsRegistrationSuccess] = useState(false);
    const [registerError, setRegisterError] = useState('');
    let navigate = useNavigate();

  

    useEffect(()=> { 
      const identifier = setTimeout(() => {
        setFormIsValid(
          enteredNameIsValid && enteredEmailIsValid && enteredContactIsValid &&
          enteredPasswordIsValid && userTypeIsValid
        )
      },500);   
      return () => {
        clearTimeout(identifier);
      }    
    },[enteredNameIsValid,enteredEmailIsValid, enteredPasswordIsValid ,enteredContactIsValid , 
      userTypeIsValid]);

    const adminCodeChangeHandler = (event) => {
      setAdmincode(event.target.value);
    };    

    const validateAdminHandler = () => {
      setIsAdminCodeTouched(true);
      setAdminCodeIsValid(adminCode==='ADMIN');
    };

    // 1 => Normal User
    // 2 => Admin User

    const registerUser = (registerResponse) => {
      if(registerResponse.status){
        setIsRegistrationSuccess(true);
        resetNameInput();
        resetEmailInput();
        resetContactInput();
        resetPasswordInput();      
        setUserType('');
        setUserTypeIsValid(true);
        setTimeout(() => {
          if(props.viewMode===''){
            setIsRegistrationSuccess(false);
            return navigate("/");    
          } else {
            props.handleViewForm();
          }
        },3000);
      } else {
        setRegisterError(registerResponse.message);
        setTimeout(()=> {
          setRegisterError('');
        },4000);
      }
    }
  
    const submitHandler = (event) => {
      event.preventDefault();  
      const obj = {
        name:enteredName,
        contact:enteredContact,
        email:enteredEmail,
        password:enteredPassword,
        userType:userType,
        isBatchAssigned:false,
        isTaskAssigned:false,
        isSoftDelete:false,
        adminCode:adminCode
      }
      const requestConfig = {
        url:BASE_URL + USER_PATH,
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        }
      }
      sendRegisterRequest(requestConfig , registerUser.bind(null));  
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

    const nameInputClasses = nameInputHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;
    const emailInputClasses = emailInputHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;
    const contactInputClasses = contactInputHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;
    const passwordInputClasses = passwordInputHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;

   

  return <Card className={classes.register}>
  <h2>Edit User</h2>
  <form onSubmit={submitHandler}>
   <div className='form-input'>  
   <div className={nameInputClasses}>
    <label htmlFor="name">Name</label>
    <input
        type="text"
        id="name"
        value={enteredName}
        onChange={nameChangedHandler}
        onBlur={nameBlurHandler}
    />
    
    </div>
    {nameInputHasError && 
      <p className={classes['error-text']}>Please enter the name.</p>}
      </div>
      <div>
    <div className={contactInputClasses}>
    <label htmlFor="contact">Contact</label>
    <input
        type="text"
        id="contact"
        value={enteredContact}
        onChange={contactChangedHandler}
        onBlur={contactBlurHandler}
    />
    </div>
    {contactInputHasError && 
      <p className={classes['error-text']}>Please enter the contact.</p>}
    </div>
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
      <div className={classes.control}>
        <label htmlFor="userType">User Type</label>
        <select className={classes.select} value={userType} onBlur={handleUserType} onChange={onChangeUserType}>
          <option defaultValue="">Select User Type</option>
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
        {buttonLabel}
      </Button>
    </div>
  </form>

     {isRegistrationSuccess && !error && <Snackbar severity="success-msg">{successMessage}</Snackbar> }   
     {registerError && <Snackbar severity="error-msg">{registerError}</Snackbar> }   

</Card>;
}

export default EditUser;
