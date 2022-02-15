import React , { useState , useEffect } from 'react';
import classes from './AddBatch.module.css';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import useInput from '../../hooks/use-input';
import { COURSE_LIST } from '../../constant/course';
import useHttp from '../../hooks/use-http';
import { BASE_URL,BATCH_PATH } from '../../constant/urls';
import { useNavigate } from "react-router-dom";
import Snackbar from '../../UI/Snackbar/Snackbar';



const AddBatch = (props) => {

  const loginUserDetail = JSON.parse(localStorage.getItem('loginUserdetails'));
    const { value:enteredName, 
        isValid:enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler:nameChangedHandler,
        inputBlurHandler:nameBlurHandler,
        reset:resetNameInput
      } = useInput(value => value.trim()!=='');

    const { value:enteredDescription, 
        isValid:enteredDescriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler:descriptionChangedHandler,
        inputBlurHandler:descriptionBlurHandler,
        reset:resetDescriptionInput
      } = useInput(value => value.trim()!=='');     

    const { value:enteredStartDate, 
        isValid:enteredStartDateIsValid,
        hasError: startDateInputHasError,
        valueChangeHandler:startDateChangedHandler,
        inputBlurHandler:startDateBlurHandler,
        reset:resetStartDateInput
      } = useInput(value => value.trim()!=='');

      const { value:enteredEndDate, 
        isValid:enteredEndDateIsValid,
        hasError: endDateInputHasError,
        valueChangeHandler:endDateChangedHandler,
        inputBlurHandler:endDateBlurHandler,
        reset:resetEndDateInput
      } = useInput(value => value.trim()!=='');

      
        
const [formIsValid, setFormIsValid] = useState(false);
const [course, setCourse] = useState('');
const [courseIsValid, setCourseIsValid] = useState();
const [isCourseTouched, setIsCourseTouched] = useState(false);
const {isLoading:addLoading , error:addError , sendRequest:addRequest} = useHttp();
let navigate = useNavigate();
const [isAddrror, setIsAddrror] = useState('');


let courseList =  COURSE_LIST; 

useEffect(()=> { 
  const identifier = setTimeout(() => {
    setFormIsValid(
      enteredNameIsValid && enteredDescriptionIsValid && courseIsValid && 
        enteredStartDateIsValid && enteredEndDateIsValid
    )
  },500);   
  return () => {
    clearTimeout(identifier);
  }    
},[enteredNameIsValid,enteredDescriptionIsValid,courseIsValid,
  enteredStartDateIsValid,enteredEndDateIsValid]);

const addBatchData = (batchAddResponse) => {
  if(batchAddResponse.status){
    resetNameInput();
    resetDescriptionInput();
    setCourse('');
    setCourseIsValid(true);
    resetStartDateInput();
    resetEndDateInput();
    alert('Batch added successfully');
    setIsAddrror('');
    props.showForm(false);   // set view mode to list
    return navigate("/dashboard/batch"); 
  } else {
    setIsAddrror(batchAddResponse.message);
        setTimeout(()=> {
          setIsAddrror('');
        },4000);
  }

}


const submitHandler = (event) => {
  event.preventDefault();  
  const obj = {
    description:enteredDescription,
    userType:loginUserDetail ? loginUserDetail.userType : 'Admin',
    isBatchActive:false,
    startDate: enteredStartDate,
    endDate: enteredEndDate,
    userId: loginUserDetail ? loginUserDetail._id : '',
    courseName: course.courseName,
    courseId: course.id,
    batchName: enteredName
  }

  const requestConfig = {
    url:BASE_URL + BATCH_PATH,
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {      
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    }
  }
  addRequest(requestConfig , addBatchData.bind(null));   
};  

const onChangeCourse = (event) => {
  const courseData = courseList[event.target.options.selectedIndex-1];  
  setCourseIsValid(courseData && courseData.courseName.trim().length > 0);
  setCourse(courseData);  
}

const handleCourse = () => {
  setIsCourseTouched(true);   
  setCourseIsValid(course && course.courseName.trim().length > 0);
}

const nameInputClasses = nameInputHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;
const descriptionInputClasses = descriptionHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;
const startDateInputClasses = startDateInputHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;
const endDateInputClasses = endDateInputHasError ? `${classes['control']} ${classes.invalid}` : `${classes['control']}`;


  return (      
    <Card className={classes['assignment-form']}>
    <form onSubmit={submitHandler}>
    <div>
    <div className={classes.control}>
      <label htmlFor="course">Select Course</label>
      <select className={classes.select} value={course ? course.id : ''} onBlur={handleCourse} onChange={onChangeCourse}>
        <option defaultValue="">Select Course </option>
         {
           courseList.map(course => (
             <option key={course.id} value={course.id}>{course.courseName}</option>
           ))
         }
      </select>
      </div>   
      {isCourseTouched && !courseIsValid &&
        <p className={classes['error-text']}>Please select the course.</p>}
  </div>
    <div className='form-input'>  
    <div className={nameInputClasses}>
     <label htmlFor="name">Batch Name</label>
     <input
         type="text"
         id="name"
         value={enteredName}
         onChange={nameChangedHandler}
         onBlur={nameBlurHandler}
     />
     
     </div>
     {nameInputHasError && 
       <p className={classes['error-text']}>Please enter the batch name.</p>}
       </div>
       <div>
     <div className={descriptionInputClasses}>
     <label htmlFor="description">Description</label>
     <input
         type="text"
         id="description"
         value={enteredDescription}
         onChange={descriptionChangedHandler}
         onBlur={descriptionBlurHandler}
     />
     </div>
     {descriptionHasError && 
       <p className={classes['error-text']}>Please enter the description.</p>}
     </div> 

     
     <div className='form-input'>  
    <div className={startDateInputClasses}>
     <label htmlFor="startDate">Start Date</label>
     <input
         type="date"
         id="startDate"
         value={enteredStartDate}
         onChange={startDateChangedHandler}
         onBlur={startDateBlurHandler}
     />
     
     </div>
        {startDateInputHasError && 
       <p className={classes['error-text']}>Please enter the batch Start Date.</p>}
       </div>

       <div className='form-input'>  
       <div className={endDateInputClasses}>
        <label htmlFor="endDate">End Date</label>
        <input
            type="date"
            id="endDate"
            value={enteredEndDate}
            onChange={endDateChangedHandler}
            onBlur={endDateBlurHandler}
        />
        
        </div>
           {endDateInputHasError && 
          <p className={classes['error-text']}>Please enter the batch End Date.</p>}
        </div>

     <div className={classes.actions}>
       <Button type="submit" className={classes.btn} disabled={!formIsValid}>
         SAVE
       </Button>
     </div>
   </form>
   {isAddrror && <Snackbar severity="error-msg">{isAddrror}</Snackbar> }
    </Card>
  )
}

export default AddBatch