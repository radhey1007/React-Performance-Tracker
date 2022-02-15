import React from 'react';
import AddAssignment from './AddAssignment';
import AssignmentList from './AssignmentList';
import Wrapper from './../../helper/Wrapper';
import {useState} from 'react';
import { Button } from '@material-ui/core';

const Assignment = () => {

  const [isOpen, setIsOpen] = useState(false);

  const showAssignmentForm = (value) => {
    setIsOpen(value);
  }

  return  (   
            <Wrapper>
             <div className="main-heading">Assignment Page</div>
             {!isOpen && <Button variant="contained" onClick={() => showAssignmentForm(true)}>Add Assignment </Button> }
            {isOpen && <Button variant="contained" onClick={()=>showAssignmentForm(false)}>View Assignment </Button> }
             {isOpen && <AddAssignment showForm={showAssignmentForm}/>}
             {!isOpen && <AssignmentList />}
            </Wrapper>
          )
}

export default Assignment;
