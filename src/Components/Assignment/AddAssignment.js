import React , { useState , useEffect } from 'react';
import classes from './AddAssignment.module.css';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import useInput from '../../hooks/use-input';
import { COURSE_LIST } from '../../constant/course';

const AddAssignment = () => {

    const { value:enteredName, 
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
let courseList =  COURSE_LIST; 

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

const submitHandler = (event) => {
  event.preventDefault();  
  const obj = {
    name:enteredName,
    contact:enteredContact,
    email:enteredEmail,
    password:enteredPassword,
    userType:userType,
    role:1,
    adminCode:adminCode
  }
  resetNameInput();
  resetEmailInput();
  resetContactInput();
  resetPasswordInput();      
  setUserType('');
  setUserTypeIsValid(true);
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

const nameInputClasses = nameInputHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;
const contactInputClasses = contactInputHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;




  return (      
    <Card className={classes['assignment-form']}>
    <form onSubmit={submitHandler}>
    <div>
    <div className={classes.control}>
      <label htmlFor="userType">Select Course</label>
      <select className={classes.select} value={userType} onBlur={handleUserType} onChange={onChangeUserType}>
        <option defaultValue="">Select Course </option>
         {
           courseList.map(course => (
             <option key={course.id} value={course.id}>{course.courseName}</option>
           ))
         }
      </select>
      </div>   
      {isUserTypeTouched && !userTypeIsValid &&
        <p className={classes['error-text']}>Please select the course.</p>}
  </div>
    <div className='form-input'>  
    <div className={nameInputClasses}>
     <label htmlFor="name">Assignment Name</label>
     <input
         type="text"
         id="name"
         value={enteredName}
         onChange={nameChangedHandler}
         onBlur={nameBlurHandler}
     />
     
     </div>
     {nameInputHasError && 
       <p className={classes['error-text']}>Please enter the assignment name.</p>}
       </div>
       <div>
     <div className={contactInputClasses}>
     <label htmlFor="contact">Description</label>
     <input
         type="text"
         id="contact"
         value={enteredContact}
         onChange={contactChangedHandler}
         onBlur={contactBlurHandler}
     />
     </div>
     {contactInputHasError && 
       <p className={classes['error-text']}>Please enter the description.</p>}
     </div>              
     <div className={classes.actions}>
       <Button type="submit" className={classes.btn} disabled={!formIsValid}>
         Register
       </Button>
     </div>
   </form>
    </Card>
  )
}

export default AddAssignment