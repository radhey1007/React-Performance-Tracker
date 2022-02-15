import React, {useState , useCallback, useEffect}  from 'react';
import Card from '../../UI/Card/Card';
import useHttp from '../../hooks/use-http';
import { BASE_URL, USER_PATH } from '../../constant/urls';
import MaterialTable from 'material-table';


const Teacher = () => {

  const loginUserDetail = JSON.parse(localStorage.getItem('loginUserdetails'));
  const [teacherList, setTeacherList] = useState([]);
  const {isLoading , error , sendRequest:getTeacherData} = useHttp();
  const {isLoading:isdeleteLoading , error:deleteError , sendRequest:deleteTeacher} = useHttp();

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Contact', field: 'contact' },
    { title: 'Email', field: 'email' },
    { title: 'Batch Assigned Status', field: 'isBatchAssigned' },
    { title: 'Task Assigned Status', field: 'isTaskAssigned' },
    {title: 'User Type', field: 'userType'}
  ]

  const handleTeacherRecord  = (teacherListResponse) => {
      if(teacherListResponse.status){
        setTeacherList(teacherListResponse.response);
      } else {
        setTeacherList([]);
      }
  }

  const getTeacherList = () => {
    let obj = {
      userType:'Teacher'
    };
    const requestConfig = {
      url:BASE_URL + USER_PATH + '/getUserByType',
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    getTeacherData(requestConfig , handleTeacherRecord.bind(null)); 
  }

  useEffect(() => {
    getTeacherList();
  },[]);
  
  const handleEdit = (id) => {
    console.log(id);
  } 

  const handleRemove = (deleteResponse) => {
    if(deleteResponse.status){
      alert('Record Deleted Successfully');      
      getTeacherList();
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
    deleteTeacher(requestConfig , handleRemove.bind(null)); 
  } 

  const action = [
    {
      icon: 'edit',
      tooltip: 'Edit User',
      onClick: (event, rowData) => handleEdit(rowData._id)
    },
    rowData => ({
      icon: 'delete',
      tooltip: 'Delete User',
      onClick: (event, rowData) => handleDelete(rowData._id)
    })
  ];
 
  return <div>  
  {isLoading && <h2 className="loading">Loading...</h2>}
  {teacherList.length > 0 && <MaterialTable
    title="Teacher Record"
    columns={columns}
    data={teacherList}
    actions={ action}
    /> }</div>
    ;
}

export default Teacher;
