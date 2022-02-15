import React, {useState , useEffect}  from 'react';
import useHttp from '../../hooks/use-http';
import { BASE_URL, BATCH_PATH } from '../../constant/urls';
import MaterialTable from 'material-table';
import Wrapper from '../../helper/Wrapper';


const BatchList = () => {

  const loginUserDetail = JSON.parse(localStorage.getItem('loginUserdetails'));
  const [batchList, setBatchList] = useState([]);
  const {isLoading , error , sendRequest:getData} = useHttp();

  const {isLoading:isBatchLoading , error:batchError , sendRequest:deleteBatch} = useHttp();

  const columns = [
    { title: 'Batch Name', field: 'batchName' },
    { title: 'Status', field: 'isBatchActive' },
    { title: 'Course Name', field: 'courseName' },
    { title: 'Start Date', field: 'startDate' },
    {title: 'End Date', field: 'endDate'}
  ]

  const handleRecord  = (batchListResponse) => {
    console.log(batchListResponse)
      if(batchListResponse.status){
        setBatchList(batchListResponse.response);
      } else {
        setBatchList([]);
      }
  }

  const getBatchList = () => {   
    const requestConfig = {
      url:BASE_URL + '/batch',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    getData(requestConfig , handleRecord.bind(null)); 
  }

  useEffect(() => {
    getBatchList();
  },[]);
  
  const handleEdit = (id) => {
    console.log(id);
  } 

  const handleRemove = (deleteResponse) => {
    if(deleteResponse.status){
      alert('Record Deleted Successfully');      
      getBatchList();
    }
  }

  const handleDelete = (id) => {
    const requestConfig = {
      url:BASE_URL + BATCH_PATH + '/'+ id,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    deleteBatch(requestConfig , handleRemove.bind(null)); 
  } 

  const action = [
    {
      icon: 'edit',
      tooltip: 'Edit Assignment',
      onClick: (event, rowData) => handleDelete(rowData._id)
    },
    rowData => ({
      icon: 'delete',
      tooltip: 'Delete Assignment',
      onClick: (event, rowData) => handleDelete(rowData._id)
    })
  ];
 
  return <Wrapper> 
  {isLoading && <h2 className="loading">Loading...</h2>}
  {batchList.length > 0 && <MaterialTable
    title="Batch List"
    columns={columns}
    data={batchList}
    actions={ action}
    // options={
    // }
    /> }</Wrapper>
    ;
}

export default BatchList;
