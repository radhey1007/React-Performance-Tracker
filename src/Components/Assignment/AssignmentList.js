import React, {useState , useEffect}  from 'react';
import useHttp from '../../hooks/use-http';
import { BASE_URL,ASSIGNMENT_PATH } from '../../constant/urls';
import MaterialTable from 'material-table';


const AssignmentList = () => {

  const loginUserDetail = JSON.parse(localStorage.getItem('loginUserdetails'));
  const [assignmentList, setAssignmentList] = useState([]);
  const {isLoading , error , sendRequest:getData} = useHttp();
  const {isLoading:isAssignmentLoading , error:assignmentError , sendRequest:deleteAssignment} = useHttp();

  const columns = [
    { title: 'Assignment Name', field: 'assignmentName' },   
    { title: 'Batch Name', field: 'batchName' },
    { title: 'Course Name', field: 'courseName' },
    { title: 'Start Date', field: 'startDate' },
    {title: 'End Date', field: 'endDate'},
    { title: 'Progress Status', field: 'assignmentStatus' },
    { title: 'Active Status', field: 'isAssignmentActive' },
  ]

  const handleRecord  = (assignmentListResponse) => {
    console.log(assignmentListResponse)
      if(assignmentListResponse.status){
        setAssignmentList(assignmentListResponse.response);
      } else {
        setAssignmentList([]);
      }
  }

  const getAssignmentList = () => {   
    const requestConfig = {
      url:BASE_URL + '/assignment',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    getData(requestConfig , handleRecord.bind(null)); 
  }

  useEffect(() => {
    getAssignmentList();
  },[]);
  
  const handleEdit = (id) => {
    console.log(id);
  } 


  const handleRemove = (deleteResponse) => {
    if(deleteResponse.status){
      alert('Record Deleted Successfully');      
      getAssignmentList();
    }
  }

  const handleDelete = (id) => {
    const requestConfig = {
      url:BASE_URL + ASSIGNMENT_PATH + '/'+ id,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    deleteAssignment(requestConfig , handleRemove.bind(null)); 
  } 

  const action = [
    {
      icon: 'edit',
      tooltip: 'Edit Assignment',
      onClick: (event, rowData) => handleEdit(rowData._id)
    },
    rowData => ({
      icon: 'delete',
      tooltip: 'Delete Assignment',
      onClick: (event, rowData) => handleDelete(rowData._id)
    })
  ];


 
  return <div> 
  {isLoading && <h2 className="loading">Loading...</h2>}
  {assignmentList.length > 0 && <MaterialTable
    title="Assignment List"
    columns={columns}
    data={assignmentList}
    actions={ action}
    // options={
    // }
    /> }</div>
    ;
}

export default AssignmentList;
