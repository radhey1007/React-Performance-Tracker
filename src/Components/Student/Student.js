import React, {useState , useCallback, useEffect}  from 'react';
import Card from '../../UI/Card/Card';
import useHttp from '../../hooks/use-http';
import { BASE_URL, USER_PATH } from '../../constant/urls';
import MaterialTable from 'material-table';
import AddStudent from './AddStudent';
import Wrapper from '../../helper/Wrapper';
import { Button } from '@material-ui/core';
import EditUser from './EditUser';

const Student = () => {

  const loginUserDetail = JSON.parse(localStorage.getItem('loginUserdetails'));
  const [studentList, setStudentList] = useState([]);
  const {isLoading , error , sendRequest:getStudentData} = useHttp();
  const {isLoading:isdeleteLoading , error:deleteError , sendRequest:deleteStudent} = useHttp();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  let editId = '';
  let editFormData = {};

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Contact', field: 'contact' },
    { title: 'Email', field: 'email' },
    { title: 'Batch Assigned Status', field: 'isBatchAssigned' },
    { title: 'Task Assigned Status', field: 'isTaskAssigned' },
    {title: 'User Type', field: 'userType'}
  ]

  const handleStudentRecord  = (studentListResponse) => {
      if(studentListResponse.status){
        setStudentList(studentListResponse.response);
      } else {
        setStudentList([]);
      }
  }

  const getStudentList = () => {
    let obj = {
      userType:'Student'
    };
    const requestConfig = {
      url:BASE_URL + USER_PATH + '/getUserByType',
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    getStudentData(requestConfig , handleStudentRecord.bind(null)); 
  }

  useEffect(() => {
    getStudentList();
  },[]);
  
  const handleEdit = (row) => {
    console.log(row);
    editId = row._id;
    editFormData = row;
    setIsEditMode(true);
  } 

  const handleRemove = (deleteResponse) => {
    if(deleteResponse.status){
      alert('Record Deleted Successfully');      
      getStudentList();
    }
  }

  const handleDelete = (id) => {
    const requestConfig = {
      url:BASE_URL + USER_PATH + '/'+ id,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    deleteStudent(requestConfig , handleRemove.bind(null)); 
  } 

  const action = [
    {
      icon: 'edit',
      tooltip: 'Edit User',
      onClick: (event, rowData) => handleEdit(rowData)
    },
    rowData => ({
      icon: 'delete',
      tooltip: 'Delete User',
      onClick: (event, rowData) => handleDelete(rowData._id)
    })
  ];


  
  const showForm = (value) => {
    setIsOpen(value);
  }

  const showListView = () => {
    setIsOpen(true);
  }

 
  return <Wrapper>  
   {!isOpen && !isEditMode && <Button variant="contained" onClick={() => showForm(true)}>Add Student </Button> }
   {isOpen && !isEditMode && <Button variant="contained" onClick={()=> showForm(false)}>View Student </Button> }
   {!isOpen && <div>{isLoading && <h2 className="loading">Loading...</h2>}
   {!isEditMode && studentList.length > 0 && <MaterialTable
    title="Student Record"
    columns={columns}
    data={studentList}
    actions={ action}
    /> }
    </div>}
    {isOpen && !isEditMode && <AddStudent handleViewForm={showListView} viewMode="add" editFormData={{}} />}
    {isEditMode && <EditUser handleViewForm={showListView} viewMode="edit" editFormData={editFormData} />}
    </Wrapper>
    ;
}

export default Student;
