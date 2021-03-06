import React , { useState , useEffect } from 'react';
import classes from './AddAssignment.module.css';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import useInput from '../../hooks/use-input';
import { COURSE_LIST } from '../../constant/course';
import useHttp from '../../hooks/use-http';
import { BASE_URL,ASSIGNMENT_PATH } from '../../constant/urls';
import { useNavigate } from "react-router-dom";
import Snackbar from '../../UI/Snackbar/Snackbar';



const AddAssignment = (props) => {

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
const [batchList, setBatchList] = useState([]);

const [batch, setBatch] = useState('');
const [batchIsValid, setBatchIsValid] = useState();
const [isBatchTouched, setIsBatchTouched] = useState(false);
const {isLoading , error , sendRequest:getData} = useHttp();
const {isLoading:addLoading , error:addError , sendRequest:addRequest} = useHttp();
let navigate = useNavigate();
const [isAddAssignmentError, setIsAddAssignmentError] = useState('');


const handleBatchList  = (batchListResponse) => {
  console.log(batchListResponse);
    if(batchListResponse.status){
      setBatchList(batchListResponse.response);
    } else {
      setBatchList([]);
    }
}


const getBatchByCourseId = (courseId) => {  
  const obj = {
    courseId : courseId
  } 
  const requestConfig = {
    url:BASE_URL + '/batch/getBatchByCourseID',
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    }
  }
  getData(requestConfig , handleBatchList.bind(null)); 
}


let courseList =  COURSE_LIST; 

useEffect(()=> { 
  const identifier = setTimeout(() => {
    setFormIsValid(
      enteredNameIsValid && enteredDescriptionIsValid && courseIsValid && 
      batchIsValid && enteredStartDateIsValid && enteredEndDateIsValid
    )
  },500);   
  return () => {
    clearTimeout(identifier);
  }    
},[enteredNameIsValid,enteredDescriptionIsValid,courseIsValid,
  batchIsValid, enteredStartDateIsValid,enteredEndDateIsValid]);

const addAssignmentsData = (assignmentAddResponse) => {
  if(assignmentAddResponse.status){
    resetNameInput();
    resetDescriptionInput();
    setCourse('');
    setCourseIsValid(true);
    setBatch('');
    setBatchIsValid(true);
    resetStartDateInput();
    resetEndDateInput();
    alert('Assignment added successfully');
    setIsAddAssignmentError('');
    props.showForm(false);   // set view mode to list
    return navigate("/dashboard/assignment"); 
  } else {
    setIsAddAssignmentError(assignmentAddResponse.message);
        setTimeout(()=> {
          setIsAddAssignmentError('');
        },4000);
  }

}


const submitHandler = (event) => {
  event.preventDefault();  
  const obj = {
    assignmentName:enteredName,
    description:enteredDescription,
    userType:loginUserDetail ? loginUserDetail.userType : 'Admin',
    isBatchActive:true,
    startDate: enteredStartDate,
    endDate: enteredEndDate,
    isAssignmentActive:false,
    userId: loginUserDetail ? loginUserDetail._id : '',
    courseName: course.courseName,
    courseId: course.id,
    batchName: batch.batchName,
    batchId: batch._id,
    assignmentStatus:"Initial"
  }

  const requestConfig = {
    url:BASE_URL + ASSIGNMENT_PATH,
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {      
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    }
  }
  addRequest(requestConfig , addAssignmentsData.bind(null));   
};  

const onChangeCourse = (event) => {
  const courseData = courseList[event.target.options.selectedIndex-1];  
  setCourseIsValid(courseData && courseData.courseName.trim().length > 0);
  setCourse(courseData);
  if(courseData && courseData.id){
    getBatchByCourseId(courseData.id);
  }
}

const handleCourse = () => {
  setIsCourseTouched(true);   
  setCourseIsValid(course && course.courseName.trim().length > 0);
}

const onChangeBatch = (event) => {
  const batchData = batchList[event.target.options.selectedIndex-1];  
  setBatchIsValid(batchData && batchData.batchName.trim().length > 0);
  setBatch(batchData);  
}

const handleBatch = () => {
  setIsBatchTouched(true);   
  setBatchIsValid(batch && batch.batchName.trim().length > 0);
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

  <div>
  <div className={classes.control}>
    <label htmlFor="batch">Select Batch</label>
    <select className={classes.select} value={batch ? batch._id : ''} onBlur={handleBatch} onChange={onChangeBatch}>
      <option defaultValue="">Select Batch </option>
       {
         batchList.map(batch => (
           <option key={batch._id} value={batch._id}>{batch.batchName}</option>
         ))
       }
    </select>
    </div>   
    {isBatchTouched && !batchIsValid &&
      <p className={classes['error-text']}>Please select the batch.</p>}
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
       <p className={classes['error-text']}>Please enter the assignment Start Date.</p>}
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
          <p className={classes['error-text']}>Please enter the assignment End Date.</p>}
        </div>

     <div className={classes.actions}>
       <Button type="submit" className={classes.btn} disabled={!formIsValid}>
         SAVE
       </Button>
     </div>
   </form>
   {isAddAssignmentError && <Snackbar severity="error-msg">{isAddAssignmentError}</Snackbar> }
    </Card>
  )
}

export default AddAssignment