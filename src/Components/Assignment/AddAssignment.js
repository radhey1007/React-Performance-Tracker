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

const { value:enteredDescription, 
        isValid:enteredDescriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler:descriptionChangedHandler,
        inputBlurHandler:descriptionBlurHandler,
        reset:resetDescriptionInput
      } = useInput(value => value.trim()!=='');     
      
        
const [formIsValid, setFormIsValid] = useState(false);
const [course, setCourse] = useState('');
const [courseIsValid, setCourseIsValid] = useState();
const [isCourseTouched, setIsCourseTouched] = useState(false);


let courseList =  COURSE_LIST; 

useEffect(()=> { 
  const identifier = setTimeout(() => {
    setFormIsValid(
      enteredNameIsValid && enteredDescriptionIsValid && courseIsValid
    )
  },500);   
  return () => {
    clearTimeout(identifier);
  }    
},[enteredNameIsValid,enteredDescriptionIsValid,courseIsValid]);


const submitHandler = (event) => {
  event.preventDefault();  
  const obj = {
    assignment_name:enteredName,
    assignment_description:enteredDescription
  }
  resetNameInput();
  resetDescriptionInput();
  setCourse('');
  setCourseIsValid(true);
  console.log(obj , 'obj');   
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
     <div className={classes.actions}>
       <Button type="submit" className={classes.btn} disabled={!formIsValid}>
         SAVE
       </Button>
     </div>
   </form>
    </Card>
  )
}

export default AddAssignment