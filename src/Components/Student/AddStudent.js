import React from 'react'
import wrapper from '../../helper/Wrapper';
import Register from '../Register/Register';

const AddStudent= (props) => {
  return (
    <wrapper>
        <Register viewMode={props.viewMode} 
         handleViewForm={props.handleViewForm} 
         editFormData={props.editFormData} 
        />
    </wrapper>
  )
}

export default AddStudent