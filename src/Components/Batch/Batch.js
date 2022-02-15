import React from 'react';
import AddBatch from './AddBatch';
import BatchList from './BatchList';
import Wrapper from './../../helper/Wrapper';
import {useState} from 'react';
import { Button } from '@material-ui/core';

const Batch = () => {

  const [isOpen, setIsOpen] = useState(false);

  const showForm = (value) => {
    setIsOpen(value);
  }

  return  (   
            <Wrapper>
             <div className="main-heading">Batch </div>
             {!isOpen && <Button variant="contained" onClick={() => showForm(true)}>Add Batch </Button> }
            {isOpen && <Button variant="contained" onClick={()=> showForm(false)}>View Batch </Button> }
             {isOpen && <AddBatch showForm={showForm}/>}
             {!isOpen && <BatchList />}
            </Wrapper>
          )
}

export default Batch;
