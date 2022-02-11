import React from 'react';
import Card from '../../UI/Card/Card';
import AddAssignment from './AddAssignment';
import AssignmentList from './AssignmentList';
import Wrapper from './../../helper/Wrapper';

const Assignment = () => {
  return  (   
            <Wrapper>
             <div className="main-heading">Assignment Page</div>
             <AddAssignment />
             <AssignmentList />
            </Wrapper>
          )
}

export default Assignment;
